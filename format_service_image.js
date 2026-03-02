import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O bloco da imagem precisa exibir a imagem cobrindo toda a área, com um efeito moderno (zoom no hover, etc)
// e sem os textos do Acordeon antigo. O regex anterior já substituiu, mas vamos garantir que fique perfeito.
// "deixe a foto de maneira formtada e bem moderna"

const currentImageBlockRegex = /<motion\.section\n\s*data-testid="section-service-image"\n\s*className="relative overflow-hidden rounded-\[28px\] ring-1 ring-zinc-200\/50 group h-full min-h-\[360px\] shadow-sm"[\s\S]*?<\/motion\.section>/;

const enhancedImageBlock = `<motion.section
                data-testid="section-service-image"
                className="relative w-full h-full min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-[28px] lg:rounded-[36px] bg-zinc-900 group shadow-lg"
                initial={reduced ? undefined : { opacity: 0, x: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1d0238]/30 to-[#30045c]/30 blur-2xl -z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                {/* Gradiente escuro para dar contraste e volume */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white flex flex-col justify-end">
                  <div className="inline-flex w-fit items-center rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] mb-4 border border-white/20 shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                    {service.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.1] transition-transform duration-500 group-hover:-translate-y-1">
                    {service.title}
                  </h3>
                </div>
              </motion.section>`;

if (currentImageBlockRegex.test(content)) {
    content = content.replace(currentImageBlockRegex, enhancedImageBlock);
    fs.writeFileSync(filePath, content);
    console.log("Enhanced service image block with modern formatting.");
} else {
    console.log("Could not find the current image block to enhance.");
}
