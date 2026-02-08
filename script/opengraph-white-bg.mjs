import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, '../client/public/opengraph.png');
const outputPath = path.resolve(__dirname, '../client/public/opengraph.png');

const image = await sharp(inputPath);
const metadata = await image.metadata();
const { width, height } = metadata;

await sharp({
  create: {
    width: width || 1200,
    height: height || 630,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .png()
  .composite([{ input: inputPath }])
  .toFile(outputPath);

console.log('opengraph.png atualizado com fundo branco.');
