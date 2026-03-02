import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We want to use clip-path to clip exactly at the horizontal boundaries (left/right)
// but let the vertical boundaries (top/bottom) bleed out so the shadow/scaling isn't cut off.
// clip-path: polygon(0% -50%, 100% -50%, 100% 150%, 0% 150%)
// This means:
// Top-Left: 0% X, -50% Y
// Top-Right: 100% X, -50% Y
// Bottom-Right: 100% X, 150% Y
// Bottom-Left: 0% X, 150% Y
// So it cuts off any X < 0% and any X > 100%, but allows Y from -50% to 150%.

const searchString = /<div className="overflow-x-hidden overflow-y-visible -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 -my-12 py-12" ref=\{emblaRef\}>/g;
const replaceString = `<div className="-my-12 py-12" style={{ clipPath: "polygon(0% -50%, 100% -50%, 100% 150%, 0% 150%)" }} ref={emblaRef}>`;

if(searchString.test(content)) {
    content = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied clip-path fix.");
} else {
    console.log("Could not find the container.");
}
