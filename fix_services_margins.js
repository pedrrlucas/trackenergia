import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The regex matches the container-page start of the ProductFeature
const regex = /<motion\.section \s*id="servicos" \s*className="container-page py-16 sm:py-20 lg:py-28 overflow-hidden bg-\[#0a0014\] rounded-\[40px\] lg:rounded-\[64px\] my-10 relative shadow-\[0_0_100px_rgba\(29,2,56,0\.3\)\]"/m;

// Replace container-page with matching padding as Editorial
// Editorial has: id="editorial" className="container-page py-16 sm:py-20 lg:py-28"
// And we should change the muted={false} to muted={true} or change the class of the Pill to match dark background.
// Actually Pill muted={true} means white transparent pill.

const newSection = `<motion.section 
      id="servicos" 
      className="container-page overflow-hidden bg-[#0a0014] rounded-[40px] lg:rounded-[48px] py-16 sm:py-20 lg:py-28 relative shadow-2xl mx-auto my-12 sm:my-16 lg:my-20"`;

content = content.replace(regex, newSection);

// Update Pill
const pillRegex = /<Pill testId="pill-services" muted=\{false\}>(.*?)<\/Pill>/m;
content = content.replace(pillRegex, '<Pill testId="pill-services" muted={true}>$1</Pill>');

fs.writeFileSync(filePath, content);
console.log("Fixed margin and Pill color.");
