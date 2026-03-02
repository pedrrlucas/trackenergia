import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue right now: the cards are overlapping and mixing with the text on the left,
// but we just added a background to the text column to fix it, maybe we need to make it more robust.

const textColSearch = /className="flex flex-col relative z-20 bg-white lg:pr-8 lg:-mr-8 py-4 lg:-my-4 lg:\[mask-image:linear-gradient\(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%\)\]"/;
const textColReplace = `className="flex flex-col relative z-20 bg-white lg:pr-12 lg:-mr-12 py-8 lg:-my-8"`;

if (textColSearch.test(content)) {
    content = content.replace(textColSearch, textColReplace);
    console.log("Updated background on text column to be larger.");
}

// Ensure the carousel column stays behind
const rightColSearch = /className="lg:col-span-7 relative z-10 w-full"/;
const rightColReplace = `className="lg:col-span-7 relative z-0 w-full"`;

if (rightColSearch.test(content)) {
    content = content.replace(rightColSearch, rightColReplace);
    console.log("Forced right column to z-0.");
}

// Adjust the embla container to fade out gently on the left before reaching the text
const emblaSearch = /<div className="-my-12 py-12 lg:\[mask-image:linear-gradient\(to_right,transparent_0%,black_15%,black_100%\)\] overflow-visible" ref=\{emblaRef\}>/;
const emblaReplace = `<div className="-my-12 py-12 lg:[mask-image:linear-gradient(to_right,transparent_0%,transparent_5%,black_20%,black_100%)] overflow-visible" ref={emblaRef}>`;

if (emblaSearch.test(content)) {
    content = content.replace(emblaSearch, emblaReplace);
    console.log("Refined the mask fade to stop the bleeding behind the text.");
}

fs.writeFileSync(filePath, content);
