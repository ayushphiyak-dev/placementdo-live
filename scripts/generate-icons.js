import sharp from "sharp";
import fs from "fs";

async function generate() {
  console.log("Generating og-image.png...");
  await sharp("public/og-image.svg")
    .png()
    .toFile("public/og-image.png");

  console.log("Generating favicon-32x32.png...");
  await sharp("public/favicon.svg")
    .resize(32, 32)
    .png()
    .toFile("public/favicon-32x32.png");

  console.log("Generating apple-touch-icon.png...");
  await sharp("public/favicon.svg")
    .resize(180, 180)
    .png()
    .toFile("public/apple-touch-icon.png");
    
  console.log("Removing default favicon.ico if it's the vite one");
  // We can just create a small 32x32 ico file by simple renaming or just delete it.
  if (fs.existsSync("public/favicon.ico")) {
    fs.unlinkSync("public/favicon.ico");
  }
  // also rm vite.svg to avoid any confusion if versel fallback
  if (fs.existsSync("public/vite.svg")) {
    fs.unlinkSync("public/vite.svg");
  }

  console.log("Done!");
}

generate().catch(console.error);
