import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There is a dark gradient overlay behind the text that might be causing the rectangle issue:
// <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full min-w-[320px] max-w-[min(720px,58vw)]"
// style={{ background: "linear-gradient(to right, rgba(13,1,21,0.52) 0%, rgba(21,1,32,0.42) 40%, transparent 100%)" }} />

// And also the image container is overflowing or not having its gradient at the bottom correct.

// Let's modify the image gradient that we changed before.
const oldGradient = '<div className="absolute inset-0 bg-gradient-to-t from-black via-[#0d0115]/90 to-transparent lg:via-[#0d0115]/60" />';
const newGradient = '<div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-[#0d0115]/80 to-transparent pointer-events-none" />';

if (content.includes(oldGradient)) {
    content = content.replace(oldGradient, newGradient);
    fs.writeFileSync(filePath, content);
    console.log("Fixed image bottom shadow to only be at the bottom.");
}

// But wait, there was no oldGradient replaced like that because the previous bash script ran AFTER we did edit. Let's find exactly what the hero has now.
