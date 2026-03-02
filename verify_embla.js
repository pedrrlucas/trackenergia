import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The type Autoplay might need to be destructured correctly or imported correctly.
// Also we need to make sure the array argument for plugins is correct.

const regex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{\n\s*loop: true,\n\s*align: "start",\n\s*containScroll: "trimSnaps",\n\s*\}, \[Autoplay\(\{ delay: 5000, stopOnInteraction: false \}\)\]\);/;

if (regex.test(content)) {
    console.log("Embla configuration is intact.");
} else {
    console.log("Embla configuration is MISSING or malformed.");
}
