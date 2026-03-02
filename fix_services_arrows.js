import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue happens because the array "products" is larger, and embla sets boundaries. 
// When the rightmost item is reached, it doesn't align to 'start' cleanly without a spacer.
// To ensure the arrows ALWAYS allow selection of the next/prev item regardless of scroll limits,
// we override scrollNext and scrollPrev to manually track our index and use scrollTo if scrollNext fails.

const regex = /const scrollPrev = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollPrev\(\);\n\s*\}, \[emblaApi\]\);\n\n\s*const scrollNext = useCallback\(\(\) => \{\n\s*if \(emblaApi\) emblaApi\.scrollNext\(\);\n\s*\}, \[emblaApi\]\);/m;

const replacement = `const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = products.findIndex(p => p.id === activeId);
    if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setActiveId(products[prevIndex].id);
        emblaApi.scrollTo(prevIndex);
    }
  }, [emblaApi, activeId, products]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = products.findIndex(p => p.id === activeId);
    if (currentIndex < products.length - 1) {
        const nextIndex = currentIndex + 1;
        setActiveId(products[nextIndex].id);
        emblaApi.scrollTo(nextIndex);
    }
  }, [emblaApi, activeId, products]);`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Fixed arrow logic for Services carousel.");
} else {
    console.log("Could not find the arrow logic to replace.");
}
