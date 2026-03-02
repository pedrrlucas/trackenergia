import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The best way to achieve:
// 1. Cut on the left side exactly at the container boundary.
// 2. DO NOT cut the top/bottom shadows.
// Is to use `overflow-hidden`, but expand the container vertically with padding/margin.
// `<div className="overflow-hidden -my-8 py-8" ref={emblaRef}>`
// This makes the container 2rem (32px) taller on top and bottom, but visually takes the same space because of negative margin.
// The left/right boundaries remain exactly aligned with the column.

const searchRegex = /<div className="-my-12 py-12" style=\{\{ clipPath: "polygon\(.*?\)" \}\} ref=\{emblaRef\}>/g;
const replaceString = `<div className="overflow-hidden -my-12 py-12" ref={emblaRef}>`;

if(searchRegex.test(content)) {
    content = content.replace(searchRegex, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied overflow-hidden with vertical padding/margin expansion.");
} else {
    // maybe it was replaced differently
    const fallbackSearch = /<div className="[^"]*" style=\{\{ clipPath: "polygon\(.*?\)" \}\} ref=\{emblaRef\}>/g;
    if(fallbackSearch.test(content)) {
        content = content.replace(fallbackSearch, replaceString);
        fs.writeFileSync(filePath, content);
        console.log("Applied overflow-hidden with vertical padding/margin expansion (fallback).");
    } else {
        console.log("Could not find the clip-path container.");
    }
}
