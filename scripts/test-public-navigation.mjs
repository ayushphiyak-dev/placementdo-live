import assert from "node:assert/strict";
import fs from "node:fs";
import { publicDocumentFor } from "../src/utils/publicNavigation.js";
for (const page of ["blog", "faq", "about", "contact", "privacy-policy", "terms-of-service", "disclaimer"]) {
  assert.equal(publicDocumentFor(page), "/" + page);
}
assert.equal(publicDocumentFor("dashboard"), null);
assert.equal(publicDocumentFor("landing"), null);
const source = fs.readFileSync("src/InterviewAI_v5.jsx", "utf8");
assert.ok(source.includes("const documentPath = publicDocumentFor(v)"));
assert.ok(!source.includes("<BlogHub"));
assert.ok(!source.includes("const FAQPage"));
assert.ok(source.includes("<SiteFooter />"));
console.log("PASS: public document routing and extracted component regression checks");
