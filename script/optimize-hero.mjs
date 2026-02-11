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
const srcPath = join(root, "client", "src", "assets", "images", "hero-solar (2).jpg");
const outDir = join(root, "client", "public", "hero");

const WIDTHS = [480, 960, 1280, 1920];
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 80;
const PREVIEW_WIDTH = 640;
const PREVIEW_QUALITY_WEBP = 50;
const PREVIEW_FILE = "hero-preview.webp"; // WebP ~20–50KB; carrega instantâneo

const PREVIEW_MIN_BYTES = 3 * 1024; // mínimo para considerar preview válido

async function needsBuild() {
  try {
    const srcStat = await stat(srcPath);
    const previewPath = join(outDir, PREVIEW_FILE);
    try {
      const previewStat = await stat(previewPath);
      if (previewStat.mtimeMs < srcStat.mtimeMs) return true;
      if (previewStat.size < PREVIEW_MIN_BYTES) return true; // regenerar se muito pequeno
    } catch {
      return true;
    }
    for (const w of WIDTHS) {
      const webp = join(outDir, `hero-${w}.webp`);
      const jpg = join(outDir, `hero-${w}.jpg`);
      try {
        const [webpStat, jpgStat] = await Promise.all([stat(webp), stat(jpg)]);
        if (webpStat.mtimeMs < srcStat.mtimeMs || jpgStat.mtimeMs < srcStat.mtimeMs) return true;
      } catch {
        return true;
      }
    }
    return false;
  } catch {
    return true;
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
    const meta = await sharp(srcPath).metadata();
    const maxW = Math.min(meta.width || 1920, 1920);

    const widths = WIDTHS.filter((w) => w <= maxW);
    if (widths.length === 0) widths.push(maxW);

    const pipeline = sharp(srcPath);

    // Miniatura leve para carregamento instantâneo (blur-up); depois a qualidade cheia substitui com transição
    const previewBuf = await pipeline
      .clone()
      .resize(PREVIEW_WIDTH)
      .webp({ quality: PREVIEW_QUALITY_WEBP })
      .toBuffer();
    const { writeFile } = await import("fs/promises");
    await writeFile(join(outDir, PREVIEW_FILE), previewBuf);

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
        writeFile(join(outDir, `hero-${w}.webp`), webp),
        writeFile(join(outDir, `hero-${w}.jpg`), jpg),
      ]);
    }

    console.log("hero: imagens otimizadas + preview em client/public/hero/");
  } catch (err) {
    console.error("optimize-hero:", err.message);
    process.exit(1);
  }
}

main();
