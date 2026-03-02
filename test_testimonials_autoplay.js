import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue right now is the autoplay doesn't seem to be working.
// Autoplay plugin returns an object when called: Autoplay({ delay: 5000, stopOnInteraction: false })
// But wait, the stopOnInteraction option means if the user interacts (clicks or drags), 
// it will NOT stop if false. This is what we want (it resets, but keeps playing).

// A potential problem is that the component re-renders and the plugin reference is lost or recreated.
// Embla docs recommend defining plugins array OUTSIDE the component or using useMemo.

const regex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{\n\s*loop: true,\n\s*align: "start",\n\s*containScroll: "trimSnaps",\n\s*\}, \[Autoplay\(\{ delay: 5000, stopOnInteraction: false \}\)\]\);/;

const replacement = `const autoplayPlugin = useMemo(() => Autoplay({ delay: 5000, stopOnInteraction: false }), []);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  }, [autoplayPlugin]);`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Moved Autoplay plugin instantiation into useMemo.");
} else {
    // maybe it was replaced differently
    const altRegex = /const \[emblaRef, emblaApi\] = useEmblaCarousel\([\s\S]*?\[Autoplay\(\{ delay: 5000, stopOnInteraction: false \}\)\]\);/g;
    if(altRegex.test(content)) {
        content = content.replace(altRegex, replacement);
        fs.writeFileSync(filePath, content);
        console.log("Moved Autoplay plugin instantiation into useMemo (alt match).");
    } else {
        console.log("Could not find the Autoplay plugin instantiation in Testimonials.");
    }
}

