import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There are a couple layout problems right now in the footer. The gap between columns
// isn't perfect, especially in mobile view. We need to make sure the instagram grid
// respects the available space.

const currentFooterClass = /<div className="flex flex-col gap-16 py-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 lg:py-24">/g;
const newFooterClass = '<div className="flex flex-col gap-12 py-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-24">';

content = content.replace(currentFooterClass, newFooterClass);

fs.writeFileSync(filePath, content);
console.log("Fixed grid spacing in footer.");
