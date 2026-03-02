import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Precisamos garantir que o Autoplay resete quando o usuário clica nas setinhas manuais
// embla-carousel-autoplay plugin tem um método .reset()

const resetLogicRegex = /const scrollPrev = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollPrev\(\);\n\s*\}, \[emblaApi\]\);\n\n\s*const scrollNext = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollNext\(\);\n\s*\}, \[emblaApi\]\);/g;

const replacement = `const scrollPrev = useCallback(() => {
    if (emblaApi) {
        emblaApi.scrollPrev();
        const autoplay = emblaApi.plugins().autoplay;
        if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
        emblaApi.scrollNext();
        const autoplay = emblaApi.plugins().autoplay;
        if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);`;

if (resetLogicRegex.test(content)) {
    content = content.replace(resetLogicRegex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Added Autoplay reset logic on manual navigation.");
} else {
    console.log("Could not find the arrow logic to replace in Testimonials.");
}
