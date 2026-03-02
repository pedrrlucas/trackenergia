import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue described by the user is that the card now "mistura" (mixes) with the text
// meaning the background white wasn't enough or wasn't applied correctly, or the mask makes them translucent.
// Let's force the Left Column to have a solid background and be positioned completely above the carousel.
// E.g., Left Col: `relative z-20 bg-white`
// Right Col: `relative z-0` and move it visually behind the left col using negative margin if needed.

// Remove any lingering masks that make things transparent and weird
content = content.replace(/lg:\[mask-image:linear-gradient\(.*?\)\]/g, "");
content = content.replace(/style=\{\{ maskImage: ".*?" \}\}/g, "");

// Ensure Left column is solid white and blocks
const leftColRegex = /<motion\.div \n\s*className="flex flex-col relative z-20.*?"/;
const newLeftCol = `<motion.div 
          className="flex flex-col relative z-20 bg-white pr-4 lg:pr-12 py-4 lg:py-8"`;
if(leftColRegex.test(content)) {
    content = content.replace(leftColRegex, newLeftCol);
}

// Right column container
const rightColRegex = /<motion\.div \n\s*className="lg:col-span-7 relative z-0 w-full"/;
const newRightCol = `<motion.div 
          className="lg:col-span-7 relative z-0 w-full lg:-ml-12"`; // negative margin to slide behind the padding
if(rightColRegex.test(content)) {
    content = content.replace(rightColRegex, newRightCol);
}

// Carousel wrapper (remove the clipping entirely, just use padding)
const wrapperRegex = /<div className="-my-12 py-12  overflow-visible" ref=\{emblaRef\}>/;
const newWrapper = `<div className="-my-12 py-12 overflow-visible" ref={emblaRef}>`;
if(wrapperRegex.test(content)) {
    content = content.replace(wrapperRegex, newWrapper);
}

fs.writeFileSync(filePath, content);
console.log("Forced solid background and overlap fix.");

