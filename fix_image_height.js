import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The grid is defined as `<div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">`
// The image container has `min-h-[320px] sm:min-h-[420px] h-full` which might be forcing it to be too tall,
// thus stretching the adjacent grid item (Resultados esperados).
// We should remove the `min-h-[420px]` and rely on the natural height of the adjacent item, or just set it to `h-full` without a large `min-h`.
// The problem is if the image container dictates the height, it's because it's taller. The "Resultados esperados" card should dictate the height.

const regex = /className="relative w-full h-full min-h-\[320px\] sm:min-h-\[420px\] overflow-hidden rounded-\[28px\] lg:rounded-\[36px\] bg-zinc-900 group shadow-lg"/;
const replacement = `className="relative w-full h-full min-h-[320px] lg:min-h-0 overflow-hidden rounded-[28px] lg:rounded-[36px] bg-zinc-900 group shadow-lg"`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Fixed image height to respect adjacent card.");
} else {
    console.log("Could not find the image container classes.");
}
