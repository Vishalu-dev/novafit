/**
 * Converts jpg/jpeg/png under src/assets/images to WebP.
 * Skips logos (already optimized) and existing .webp files.
 */
import { readdir, stat, unlink } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../src/assets/images");

const SKIP_DIRS = new Set(["logos"]);
const CONVERT_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir, files = []) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    const st = await stat(full);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) await walk(full, files);
    } else {
      const ext = extname(name).toLowerCase();
      if (CONVERT_EXT.has(ext)) files.push(full);
    }
  }
  return files;
}

const files = await walk(root);
const report = [];
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  const meta = await sharp(file).metadata();
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  await sharp(file)
    .webp({ quality: 82, effort: 4 })
    .toFile(out);
  const after = (await stat(out)).size;
  await unlink(file);
  totalBefore += before;
  totalAfter += after;
  report.push({
    file: basename(file),
    before,
    after,
    saved: before - after,
    width: meta.width,
    height: meta.height,
  });
}

console.log(JSON.stringify({ report, totalBefore, totalAfter, totalSaved: totalBefore - totalAfter }, null, 2));
