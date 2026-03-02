import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There might be another overflow issue deeper in the component. The card itself 
// (or its flex container) might be causing clipping.

const targetCardRegex = /className="relative flex-none w-\[85%\] sm:w-\[320px\] lg:w-\[360px\] pl-4 lg:pl-6 cursor-grab active:cursor-grabbing"/;
const newCardClass = `className="relative flex-none w-[85%] sm:w-[320px] lg:w-[360px] pl-4 lg:pl-6 cursor-grab active:cursor-grabbing py-2"`;

if(targetCardRegex.test(content)) {
    content = content.replace(targetCardRegex, newCardClass);
    fs.writeFileSync(filePath, content);
    console.log("Added vertical padding to the individual testimonial cards to prevent shadow clipping.");
} else {
    console.log("Could not find card class to add padding.");
}

