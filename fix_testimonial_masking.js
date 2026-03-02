import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The ultimate fix for "card overlapping the text on the left" vs "card getting cut at the top/bottom":
// We put a solid mask gradient exactly on the left edge. 
// mask-image: linear-gradient(to right, transparent 0px, black 40px)
// It fades the left edge slightly and stops it from bleeding over the text.

const searchString = /<div className="overflow-hidden -my-12 py-12" ref=\{emblaRef\}>/g;
const replaceString = `<div className="-my-12 py-12" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 15%)" }} ref={emblaRef}>`;

if(searchString.test(content)) {
    content = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied linear gradient mask.");
} else {
    console.log("Could not find container.");
}
