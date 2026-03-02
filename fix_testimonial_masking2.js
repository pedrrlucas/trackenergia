import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There are a few issues playing with each other:
// 1. We removed the white background from the left column when my previous script failed to find it.
// 2. The mask-image was not fading effectively because we need it to fade FROM transparent TO black as it goes right.

// First, let's make sure the left column has a white background and higher z-index to physically block the cards.
const leftColSearch = /className="flex flex-col relative z-20"/;
const leftColReplace = `className="flex flex-col relative z-20 bg-white lg:pr-8 py-4 -my-4 lg:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"`;

if (leftColSearch.test(content)) {
    content = content.replace(leftColSearch, leftColReplace);
    console.log("Added background to the left text column.");
}

// Second, let's fix the mask on the right column (embla container).
// We want the left edge to fade to transparent.
const rightMaskSearch = /<div className="-my-12 py-12 lg:\[mask-image:linear-gradient\(to_right,transparent_0%,black_10%,black_100%\)\]" ref=\{emblaRef\}>/;
const rightMaskReplace = `<div className="-my-12 py-12 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)] overflow-visible" ref={emblaRef}>`;

if (rightMaskSearch.test(content)) {
    content = content.replace(rightMaskSearch, rightMaskReplace);
    console.log("Updated mask gradient on the carousel.");
}

fs.writeFileSync(filePath, content);
