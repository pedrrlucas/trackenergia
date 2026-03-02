import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// I will replace the entire <motion.section data-testid="section-service-scope"> block with an image block.
// Let's use string replacement for the exact block.

const exactScopeRegex = /<motion\.section\s*data-testid="section-service-scope"[\s\S]*?<\/motion\.section>/;

const newImageBlock = `<motion.section
                data-testid="section-service-image"
                className="relative overflow-hidden rounded-[28px] ring-1 ring-zinc-200/50 group h-full min-h-[300px]"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1d0238]/10 to-[#30045c]/10 blur-2xl -z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 text-white">
                  <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] mb-4 border border-white/20 shadow-sm">
                    {service.tag}
                  </div>
                </div>
              </motion.section>`;

if (exactScopeRegex.test(content)) {
    content = content.replace(exactScopeRegex, newImageBlock);
    fs.writeFileSync(filePath, content);
    console.log("Replaced scope accordion with image block.");
} else {
    console.log("Could not find scope block to replace.");
}

