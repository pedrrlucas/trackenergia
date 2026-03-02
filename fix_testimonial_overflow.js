import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There's a subtle padding/margin issue in the Testimonial component's Embla container.
// It has `overflow-hidden -m-4 p-4` and because the active card scales up, its box-shadow/border
// hits the top edge of this container and gets clipped.

// We need to either make it overflow-visible or increase the vertical padding 
// e.g., `<div className="overflow-visible -mx-4 px-4 py-8" ref={emblaRef}>`

content = content.replace(
  /<div className="overflow-hidden -m-4 p-4" ref=\{emblaRef\}>/,
  '<div className="overflow-visible -mx-4 px-4 py-6" ref={emblaRef}>'
);

fs.writeFileSync(filePath, content);
console.log("Fixed testimonial overflow clipping.");
