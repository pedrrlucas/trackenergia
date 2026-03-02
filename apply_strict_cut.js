import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// We want to remove the horizontal bleeding/mask so it cuts off exactly at the container edge
// just like it used to, but keep the vertical padding so the shadow isn't cut off.

const searchString = /<div className="overflow-hidden -mx-4 px-4 -my-8 py-8 \[mask-image:linear-gradient\(to_right,transparent_0%,black_15%,black_100%\)\] lg:\[mask-image:none\]" ref=\{emblaRef\}>/g;
const replaceString = `<div className="overflow-hidden -my-12 py-12" ref={emblaRef}>`;

if(searchString.test(content)) {
    content = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied strict horizontal cut with vertical padding.");
} else {
    // try fallback
    content = content.replace(/<div className="[^"]*" ref=\{emblaRef\}>/, '<div className="overflow-hidden -my-12 py-12" ref={emblaRef}>');
    fs.writeFileSync(filePath, content);
    console.log("Applied strict horizontal cut using fallback.");
}
