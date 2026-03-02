import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Enable loop mode
content = content.replace(
  /loop: false,\n\s*align: "start",\n\s*containScroll: "trimSnaps",/g,
  'loop: true,\n    align: "start",\n    containScroll: "trimSnaps",'
);

// Move the quote icon
// From: <Quote className="absolute -top-3 -left-2 h-8 w-8 text-zinc-200 -z-10" />
// To:   <Quote className="absolute -bottom-2 -right-2 h-10 w-10 text-zinc-100 -z-10" />
content = content.replace(
  /<Quote className="absolute -top-3 -left-2 h-8 w-8 text-zinc-200 -z-10" \/>/g,
  '<Quote className="absolute -bottom-4 -right-2 h-12 w-12 text-zinc-100 -z-10 opacity-70" />'
);

fs.writeFileSync(filePath, content);
console.log("Updated loop to true and moved quote icon to bottom right.");
