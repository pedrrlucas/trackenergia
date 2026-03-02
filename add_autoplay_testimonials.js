import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add import if not exists
if (!content.includes("import Autoplay")) {
    content = content.replace(
        /import useEmblaCarousel from "embla-carousel-react";/,
        'import useEmblaCarousel from "embla-carousel-react";\nimport Autoplay from "embla-carousel-autoplay";'
    );
}

// Update the useEmblaCarousel call in Testimonials
const regex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{\n\s*loop: true,\n\s*align: "start",\n\s*containScroll: "trimSnaps",\n\s*\}\);/;

const replacement = `const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Added Autoplay to Testimonials.");
} else {
    console.log("Could not find Testimonials embla config to replace.");
}

