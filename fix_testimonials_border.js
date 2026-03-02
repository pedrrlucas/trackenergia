import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue happens because the active card is scaling to 1.05 or 1 (it scales up) and the border 
// on top is getting clipped by either the container's overflow or a margin.

const activeCardRegex = /className=\{\`relative mr-4 sm:mr-6 flex w-\[85vw\] max-w-\[500px\] sm:w-\[450px\] shrink-0 flex-col justify-between overflow-hidden rounded-\[24px\] sm:rounded-\[32px\] border \$\{isActive \? 'border-zinc-200\/80 bg-white shadow-xl shadow-zinc-200\/50 scale-100 z-10' : 'border-zinc-200\/40 bg-white\/50 scale-\[0\.95\] opacity-60 z-0'\} p-6 sm:p-10 transition-all duration-700 ease-\[0\.16,1,0\.3,1\]\`\}/;

const safeCardClasses = `className={\`relative mr-4 sm:mr-6 flex w-[85vw] max-w-[500px] sm:w-[450px] shrink-0 flex-col justify-between rounded-[24px] sm:rounded-[32px] border \${isActive ? 'border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50 scale-100 z-10' : 'border-zinc-200/40 bg-white/50 scale-[0.95] opacity-60 z-0'} p-6 sm:p-10 transition-all duration-700 ease-[0.16,1,0.3,1]\`}`;

if(activeCardRegex.test(content)) {
    content = content.replace(activeCardRegex, safeCardClasses);
    fs.writeFileSync(filePath, content);
    console.log("Removed overflow-hidden from individual cards, keeping rounded corners.");
} else {
    console.log("Could not find the specific card classes to fix clipping.");
}
