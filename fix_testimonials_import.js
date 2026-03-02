import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There was a typo in our previous logic for the Autoplay reset that was crashing the Vite builder.
// The error usually happens when we try to access plugins().autoplay when it's undefined or hasn't initialized yet.
// We need to add safe checks for the autoplay plugin.

const buggyResetRegex = /const scrollPrev = useCallback\(\(\) => \{\n\s*if \(emblaApi\) \{\n\s*emblaApi\.scrollPrev\(\);\n\s*const autoplay = emblaApi\.plugins\(\)\.autoplay;\n\s*if \(autoplay\) autoplay\.reset\(\);\n\s*\}\n\s*\}, \[emblaApi\]\);\n\n\s*const scrollNext = useCallback\(\(\) => \{\n\s*if \(emblaApi\) \{\n\s*emblaApi\.scrollNext\(\);\n\s*const autoplay = emblaApi\.plugins\(\)\.autoplay;\n\s*if \(autoplay\) autoplay\.reset\(\);\n\s*\}\n\s*\}, \[emblaApi\]\);/g;

const safeReset = `const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    try {
      const autoplay = emblaApi.plugins()?.autoplay;
      if (autoplay && typeof autoplay.reset === 'function') autoplay.reset();
    } catch(e) {}
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    try {
      const autoplay = emblaApi.plugins()?.autoplay;
      if (autoplay && typeof autoplay.reset === 'function') autoplay.reset();
    } catch(e) {}
  }, [emblaApi]);`;

if (buggyResetRegex.test(content)) {
    content = content.replace(buggyResetRegex, safeReset);
    fs.writeFileSync(filePath, content);
    console.log("Made autoplay reset safe to prevent crashes.");
} else {
    console.log("Could not find the buggy reset logic to replace.");
}

