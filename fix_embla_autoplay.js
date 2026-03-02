import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O reset do Autoplay quando há interação manual
// No Embla v8 o Autoplay precisa ser acessado através do .plugins().autoplay

const fixAutoplayImportRegex = /import Autoplay from "embla-carousel-autoplay";/g;
const hasImport = fixAutoplayImportRegex.test(content);

if (!hasImport) {
    content = content.replace(
        /import useEmblaCarousel from "embla-carousel-react";/,
        'import useEmblaCarousel from "embla-carousel-react";\nimport Autoplay from "embla-carousel-autoplay";'
    );
}

const resetCodeRegex = /const scrollPrev = useCallback\(\(\) => \{\n\s*if \(emblaApi\) \{\n\s*emblaApi\.scrollPrev\(\);\n\s*const autoplay = emblaApi\.plugins\(\)\.autoplay;\n\s*if \(autoplay\) autoplay\.reset\(\);\n\s*\}\n\s*\}, \[emblaApi\]\);\n\n\s*const scrollNext = useCallback\(\(\) => \{\n\s*if \(emblaApi\) \{\n\s*emblaApi\.scrollNext\(\);\n\s*const autoplay = emblaApi\.plugins\(\)\.autoplay;\n\s*if \(autoplay\) autoplay\.reset\(\);\n\s*\}\n\s*\}, \[emblaApi\]\);/g;

// If it's not exactly as we expect, we rewrite it.
if (!resetCodeRegex.test(content)) {
    // If the old one is there:
    const oldCode = /const scrollPrev = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollPrev\(\);\n\s*\}, \[emblaApi\]\);\n\n\s*const scrollNext = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollNext\(\);\n\s*\}, \[emblaApi\]\);/g;
    
    if(oldCode.test(content)){
        content = content.replace(oldCode, `const scrollPrev = useCallback(() => {
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
  }, [emblaApi]);`);
    }
}

fs.writeFileSync(filePath, content);
console.log("Verified Autoplay reset setup in landing.tsx.");
