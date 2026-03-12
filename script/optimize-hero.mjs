/**
 * Gera versões otimizadas da imagem do hero (vários tamanhos + WebP).
 * Reduz drasticamente o tempo de carregamento (a original tem ~13MB).
 */
import sharp from "sharp";
import { mkdir, stat } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "client", "public", "hero");

const SOURCE_MOBILE = { path: join(root, "client", "src", "assets", "images", "hero-solar (2).jpg"), prefix: "hero", previewFile: "hero-preview.webp" };
const SOURCE_DESKTOP = { path: join(root, "client", "src", "assets", "images", "hero-solar-desk.jpg"), prefix: "hero-desk", previewFile: "hero-desk-preview.webp" };

const WIDTHS = [480, 960, 1280, 1920];
/** Desktop: 75% da resolução para reduzir tamanho do download */
const DESKTOP_RESOLUTION_SCALE = 0.75;
const DESKTOP_WIDTHS = WIDTHS.map((w) => Math.round(w * DESKTOP_RESOLUTION_SCALE)); // [360, 720, 960, 1440]
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 80;
const PREVIEW_WIDTH = 640;
const PREVIEW_QUALITY_WEBP = 50;
const PREVIEW_MIN_BYTES = 3 * 1024;

async function getSources() {
  const list = [SOURCE_MOBILE];
  try {
    await stat(SOURCE_DESKTOP.path);
    list.push(SOURCE_DESKTOP);
  } catch {
    // hero-solar-desk.jpg opcional
  }
  return list;
}

function getWidthsForPrefix(prefix) {
  return prefix === "hero-desk" ? DESKTOP_WIDTHS : WIDTHS;
}

async function needsBuild() {
  const SOURCES = await getSources();
  for (const { path: srcPath, prefix, previewFile } of SOURCES) {
    const widths = getWidthsForPrefix(prefix);
    try {
      const srcStat = await stat(srcPath);
      const previewPath = join(outDir, previewFile);
      try {
        const previewStat = await stat(previewPath);
        if (previewStat.mtimeMs < srcStat.mtimeMs) return true;
        if (previewStat.size < PREVIEW_MIN_BYTES) return true;
      } catch {
        return true;
      }
      for (const w of widths) {
        const webp = join(outDir, `${prefix}-${w}.webp`);
        const jpg = join(outDir, `${prefix}-${w}.jpg`);
        try {
          const [webpStat, jpgStat] = await Promise.all([stat(webp), stat(jpg)]);
          if (webpStat.mtimeMs < srcStat.mtimeMs || jpgStat.mtimeMs < srcStat.mtimeMs) return true;
        } catch {
          return true;
        }
      }
    } catch {
      return true;
    }
  }
  return false;
}

async function processSource(srcPath, prefix, previewFile) {
  const { writeFile } = await import("fs/promises");
  const meta = await sharp(srcPath).metadata();
  const baseWidths = getWidthsForPrefix(prefix);
  const maxW = Math.min(meta.width || 1920, Math.max(...baseWidths));
  const widths = baseWidths.filter((w) => w <= maxW).length ? baseWidths.filter((w) => w <= maxW) : [maxW];
  const pipeline = sharp(srcPath);

  const previewBuf = await pipeline
    .clone()
    .resize(PREVIEW_WIDTH)
    .webp({ quality: PREVIEW_QUALITY_WEBP })
    .toBuffer();
  await writeFile(join(outDir, previewFile), previewBuf);

  const buffers = await Promise.all(
    widths.map(async (w) => {
      const [webp, jpg] = await Promise.all([
        pipeline.clone().resize(w).webp({ quality: WEBP_QUALITY }).toBuffer(),
        pipeline.clone().resize(w).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer(),
      ]);
      return { w, webp, jpg };
    })
  );

  for (const { w, webp, jpg } of buffers) {
    await Promise.all([
      writeFile(join(outDir, `${prefix}-${w}.webp`), webp),
      writeFile(join(outDir, `${prefix}-${w}.jpg`), jpg),
    ]);
  }
}

async function main() {
  try {
    const shouldRun = await needsBuild();
    if (!shouldRun) {
      console.log("hero: imagens já atualizadas, a ignorar.");
      return;
    }

    await mkdir(outDir, { recursive: true });
    const SOURCES = await getSources();
    for (const { path: srcPath, prefix, previewFile } of SOURCES) {
      await processSource(srcPath, prefix, previewFile);
    }
    console.log("hero: imagens otimizadas (WebP + JPG) + preview em client/public/hero/");
  } catch (err) {
    console.error("optimize-hero:", err.message);
    process.exit(1);
  }
}

main();
