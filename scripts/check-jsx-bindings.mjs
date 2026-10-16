import fs from "node:fs";
import path from "node:path";
import { Linter } from "eslint";

// ESLint's core no-undef does not check JSX names. A component accidentally
// pasted into a CSS string must fail before the site reaches production.
const linter = new Linter();
const rule = {
  meta: { type: "problem", schema: [], messages: { missing: "JSX component {{name}} is not defined." } },
  create(context) {
    return {
      JSXOpeningElement(node) {
        let root = node.name;
        while (root.type === "JSXMemberExpression") root = root.object;
        if (root.type !== "JSXIdentifier" || !/^[A-Z]/.test(root.name)) return;
        let scope = context.sourceCode.getScope(node);
        while (scope) {
          if (scope.set.has(root.name)) return;
          scope = scope.upper;
        }
        context.report({ node, messageId: "missing", data: { name: root.name } });
      },
    };
  },
};
const config = {
  files: ["**/*.jsx"],
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } }, ecmaVersion: "latest", sourceType: "module" },
  plugins: { bindings: { rules: { defined: rule } } },
  rules: { "bindings/defined": "error" },
};
let failures = 0;
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(filename);
    else if (filename.endsWith(".jsx")) {
      const messages = linter.verify(fs.readFileSync(filename, "utf8"), [config], { filename });
      for (const message of messages) {
        console.error(filename + ":" + message.line + " " + message.message);
        failures++;
      }
    }
  }
}
// Prove the guard catches this incident, including a misleading CSS definition.
const fixture = 'const css = "const Missing = () => null"; const App = () => <Missing />;';
if (!linter.verify(fixture, [config], { filename: "fixture.jsx" }).some(m => m.ruleId === "bindings/defined")) {
  throw new Error("JSX binding guard self-test failed");
}
scan("src");
if (failures) process.exitCode = 1;
else console.log("PASS: all JSX component references resolve to bindings");
