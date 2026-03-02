import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue happens because the embla container has `overflow-hidden` and the active 
// testimonial card is scaled or translates up, causing its top shadow/border to hit the 
// overflow boundary. The solution is to remove overflow-hidden from the inner card container
// or add more vertical padding (e.g. py-4 or py-6) to the embla container or change overflow-visible.

// Let's find the Embla container in Testimonials.
// We're looking for something like: <div className="overflow-hidden" ref={emblaRef}>
// If it's `overflow-hidden rounded-3xl` etc.
// Often it's a matter of changing `overflow-hidden` to `overflow-visible` on the `emblaRef` container,
// or adding `-my-4 py-4` to compensate.

// In landing.tsx:
//           <div className="overflow-hidden w-[calc(100%+32px)] -ml-4 pl-4 lg:w-auto lg:ml-0 lg:pl-0" ref={emblaRef}>
//           <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>

content = content.replace(
  /<div className="overflow-hidden[\s\S]*?" ref=\{emblaRef\}>/g,
  (match) => {
    // Only target the one in Testimonials, but there's also Services.
    // We can do a broader regex check.
    return match; // We'll look manually.
  }
);

