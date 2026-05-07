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

  console.log("Generating icon-512x512.png and icon.png (512x512)...");
  await sharp("public/favicon.svg")
    .resize(512, 512)
    .png()
    .toFile("public/icon-512x512.png");
  fs.copyFileSync("public/icon-512x512.png", "public/icon.png");

  console.log("Generating icon-192x192.png...");
  await sharp("public/favicon.svg")
    .resize(192, 192)
    .png()
    .toFile("public/icon-192x192.png");

  console.log("Generating opengraph-image.png (copy of og-image.png)...");
  fs.copyFileSync("public/og-image.png", "public/opengraph-image.png");

  console.log("Generating twitter-image.png (1200x600, cropped from og-image.png)...");
  const ogMeta = await sharp("public/og-image.png").metadata();
  const top = Math.floor((ogMeta.height - 600) / 2);
  await sharp("public/og-image.png")
    .extract({ left: 0, top, width: 1200, height: 600 })
    .png()
    .toFile("public/twitter-image.png");

  console.log("Generating favicon.ico...");
  fs.copyFileSync("public/favicon-32x32.png", "public/favicon.ico");
  // also rm vite.svg to avoid any confusion if vercel fallback
  if (fs.existsSync("public/vite.svg")) {
    fs.unlinkSync("public/vite.svg");
  }

  console.log("Done!");
}

generate().catch(console.error);
