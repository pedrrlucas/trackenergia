import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There's one detail left: for the left column (text) to physically overlap the right column (cards),
// we need to set a grid or a container where they truly overlap, or we use negative margins on the cards container.
// Right now, the right column has `lg:-ml-12` but it might be pushed by the grid gap `lg:gap-14`.
// Also, the left column has a white background `bg-white`, but it needs to extend outwards to cover the gap.

const leftColSearch = /className="flex flex-col relative z-20 bg-white pr-4 lg:pr-8"/g;
const leftColReplace = `className="flex flex-col relative z-20 bg-white pr-4 lg:pr-8 lg:-mr-[100px] lg:pl-12 lg:-ml-12"`;

if (leftColSearch.test(content)) {
    content = content.replace(leftColSearch, leftColReplace);
    fs.writeFileSync(filePath, content);
    console.log("Made text column wider with negative margin to overlap cards perfectly.");
} else {
    // fallback search
    const fallbackLeftCol = /className="flex flex-col relative z-20 pr-4 lg:pr-8"/g;
    if (fallbackLeftCol.test(content)) {
        content = content.replace(fallbackLeftCol, `className="flex flex-col relative z-20 bg-white pr-4 lg:pr-8 lg:-mr-[100px] lg:py-12"`);
        fs.writeFileSync(filePath, content);
        console.log("Made text column wider with negative margin to overlap cards perfectly (fallback).");
    } else {
        console.log("Could not find left column.");
    }
}
