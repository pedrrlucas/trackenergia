import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix spacing on the section
content = content.replace(
  /className="container-page py-16 sm:py-20 lg:py-28 overflow-hidden bg-\[#0a0014\] rounded-\[40px\] lg:rounded-\[64px\] my-10 relative shadow-\[0_0_100px_rgba\(29,2,56,0\.3\)\]"/g,
  'className="container-page py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#0a0014] rounded-[32px] lg:rounded-[48px] mt-8 mb-16 lg:mt-12 lg:mb-20 relative shadow-[0_0_80px_rgba(29,2,56,0.2)]"'
);

// Fix Pill color by passing a class or changing to a custom div
content = content.replace(
  /<Pill testId="pill-services" muted=\{false\}>(.*?)<\/Pill>/g,
  '<div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md" data-testid="pill-services">$1</div>'
);

fs.writeFileSync(filePath, content);
console.log("Fixed spacing and Pill color.");
