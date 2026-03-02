import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The simplest and best solution is to wrap the column in a container with overflow-hidden
// and padding, but let's just make the text column have a higher z-index than the carousel column.

// Left column is col-span-5
// Right column is col-span-7

const leftColSearch = /className="lg:col-span-5 flex flex-col justify-center"/g;
const leftColReplace = `className="lg:col-span-5 flex flex-col justify-center relative z-20"`;

const rightColSearch = /className="lg:col-span-7 relative z-10 w-full"/g;
const rightColReplace = `className="lg:col-span-7 relative z-0 w-full"`;

if (leftColSearch.test(content)) {
    content = content.replace(leftColSearch, leftColReplace);
    content = content.replace(rightColSearch, rightColReplace);
    
    // and remove the mask from the embla container
    content = content.replace(/<div className="-my-12 py-12" style=\{\{ maskImage: "linear-gradient\(to right, transparent 0%, black 15%\)" \}\} ref=\{emblaRef\}>/, '<div className="-my-12 py-12" ref={emblaRef}>');
    
    fs.writeFileSync(filePath, content);
    console.log("Made text column higher z-index to naturally overlap the carousel.");
} else {
    console.log("Could not find the left column class.");
}
