import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There seems to have been an issue where Vite complained about landing.tsx, so let's check
// if our Autoplay implementation was exactly correct and didn't break React Hooks or Embla.

if (!content.includes('import Autoplay from "embla-carousel-autoplay";')) {
    console.log("Missing import. Adding...");
    content = content.replace(
        'import useEmblaCarousel from "embla-carousel-react";',
        'import useEmblaCarousel from "embla-carousel-react";\nimport Autoplay from "embla-carousel-autoplay";'
    );
    fs.writeFileSync(filePath, content);
} else {
    console.log("Import is there.");
}
