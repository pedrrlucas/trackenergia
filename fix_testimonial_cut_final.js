import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The best way to clip horizontally but not vertically is to use a container with a negative margin 
// and overflow-hidden on the X-axis ONLY. CSS has `overflow-x-hidden` and `overflow-y-visible`.
// Let's replace the container class.

const searchString = /<div className="overflow-hidden -my-12 py-12" ref=\{emblaRef\}>/g;
const replaceString = `<div className="overflow-x-hidden overflow-y-visible -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 -my-12 py-12" ref={emblaRef}>`;

if(searchString.test(content)) {
    content = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied overflow-x-hidden with overflow-y-visible for perfect horizontal cut.");
} else {
    console.log("Could not find the container.");
}
