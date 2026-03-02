import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the section definition for servicos
const regex = /<motion\.section \s*id="servicos" \s*className="container-page overflow-hidden bg-\[#0a0014\] rounded-\[40px\] lg:rounded-\[48px\] py-16 sm:py-20 lg:py-28 relative shadow-2xl mx-auto my-12 sm:my-16 lg:my-20"([\s\S]*?)<div className="relative z-10 flex flex-col gap-10 lg:gap-14">/m;

const newSection = `<motion.section 
      id="servicos" 
      className="container-page pb-12 sm:pb-16 lg:pb-20"
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative overflow-hidden bg-[#0a0014] rounded-[40px] lg:rounded-[48px] py-16 sm:py-20 lg:py-24 ring-1 ring-white/10 shadow-[0_0_80px_rgba(29,2,56,0.5)]">
      {/* Background decorations */}
      <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#30045c]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#1d0238]/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-10 lg:gap-14">`;

content = content.replace(regex, newSection);

// Update Pill inside it - let's make it explicitly look good on dark bg
// We can change the pill component slightly or just use inline styles if needed, but Pill doesn't take className easily.
// Actually, let's use a custom dark Pill for this section instead of the standard component if needed, or change muted to false and wrap it.
// Let's replace the Pill with a custom one or just check if Pill accepts className.
// Looking at the standard Pill usage, let's replace <Pill testId="pill-services" muted={true}>( serviços )</Pill>
// with a custom dark-mode styled badge that matches the site.
const pillRegex = /<div className="self-start">\s*<Pill testId="pill-services" muted=\{true\}>\(\s*serviços\s*\)<\/Pill>\s*<\/div>/m;
const newPill = `<div className="self-start">
              <div data-testid="pill-services" className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                ( serviços )
              </div>
            </div>`;
content = content.replace(pillRegex, newPill);

fs.writeFileSync(filePath, content);
console.log("Fixed Services container structure and Pill styling.");
