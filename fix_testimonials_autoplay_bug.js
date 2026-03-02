import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There might be an issue with how Autoplay plugin is passed to useEmblaCarousel in landing.tsx.
// Let's replace the entire Testimonials setup for embla with a safe, confirmed one.

const regex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{[\s\S]*?\}, \[Autoplay\(\{ delay: 5000, stopOnInteraction: false \}\)\]\);/;

const fallback = `const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);`;

if(!regex.test(content)) {
    // If it's not exactly that, maybe it's still the old one without array
    const oldRegex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{[\s\S]*?containScroll: "trimSnaps",\n\s*\}\);/;
    if(oldRegex.test(content)) {
        content = content.replace(oldRegex, fallback);
        fs.writeFileSync(filePath, content);
        console.log("Updated to add Autoplay array.");
    } else {
        console.log("Could not find embla initialization in Testimonials.");
    }
} else {
    console.log("Autoplay is already correctly configured.");
}
