import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /function Services\(\) \{[\s\S]*?\n\nfunction Differential\(\)/m;

const newComponent = `function Services() {
  const reduced = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [activeId, setActiveId] = useState<string>(products[0].id);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: any) => {
    if (!api) return;
    const snapIndex = api.selectedScrollSnap();
    if (products[snapIndex]) {
      setActiveId(products[snapIndex].id);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on("select", () => onSelect(emblaApi));
    emblaApi.on("reInit", () => onSelect(emblaApi));
    
    onSelect(emblaApi);
    
    return () => {
      emblaApi.off("select", () => onSelect(emblaApi));
      emblaApi.off("reInit", () => onSelect(emblaApi));
    };
  }, [emblaApi, onSelect]);

  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeId) || products[0],
    [activeId]
  );

  return (
    <motion.section 
      id="servicos" 
      className="container-page py-16 sm:py-20 lg:py-28 overflow-hidden bg-black rounded-[40px] lg:rounded-[64px] my-10 relative"
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorações de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12001f] to-black opacity-80" />
      <div className="absolute inset-0 noise opacity-20" />
      
      {/* Brilhos Radiais */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#30045c]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1d0238]/40 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 flex flex-col gap-12 lg:gap-16">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-4 sm:px-8 lg:px-12">
          <motion.div 
            className="flex flex-col max-w-2xl"
            initial={reduced ? undefined : { opacity: 0, x: -30 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="self-start">
               <Pill testId="pill-services" muted={false}>( serviços )</Pill>
            </div>
            <h2 data-testid="text-services-title" className="mt-6 text-balance text-[36px] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px] md:text-[52px]">
              Energia sob medida
              <br />
              <span className="subtle-grad-dark">Da estratégia à operação</span>
            </h2>
            <p data-testid="text-services-sub" className="mt-6 text-base leading-relaxed text-white/60 max-w-lg">
              Analisamos oportunidades, desenhamos a proposta ideal e executamos com
              monitoramento após a implementação, sempre com o radar ligado para melhorias.
            </p>
          </motion.div>
          
          <motion.div 
            className="hidden lg:flex items-center gap-3"
            initial={reduced ? undefined : { opacity: 0, x: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <button
              onClick={scrollPrev}
              className="grid h-14 w-14 place-items-center rounded-full bg-white/10 shadow-sm ring-1 ring-white/20 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md"
              aria-label="Serviço anterior"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              className="grid h-14 w-14 place-items-center rounded-full bg-white/10 shadow-sm ring-1 ring-white/20 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md"
              aria-label="Próximo serviço"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        {/* Carousel de Destaque Único */}
        <motion.div 
          className="relative w-full px-4 sm:px-8 lg:px-12"
          initial={reduced ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
           <div className="overflow-visible" ref={emblaRef}>
             <div className="flex touch-pan-y gap-6 lg:gap-8 py-4" style={{ backfaceVisibility: 'hidden' }}>
                {products.map((p) => {
                  const isActive = activeId === p.id;
                  
                  return (
                    <div
                      key={\`service-slide-\${p.id}\`}
                      className={\`relative shrink-0 w-[85vw] sm:w-[500px] lg:w-[680px] h-[480px] sm:h-[560px] lg:h-[640px] cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] \${isActive ? 'scale-100 opacity-100 z-10' : 'scale-[0.95] opacity-40 hover:opacity-60 z-0'}\`}
                      onClick={() => setActiveId(p.id)}
                    >
                      <div className="absolute inset-0 rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] overflow-hidden bg-zinc-900 group">
                        <img
                           src={p.image}
                           alt={p.title}
                           className={\`h-full w-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] \${isActive ? 'scale-105' : 'scale-100'}\`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        
                        <div className={\`absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-12 transition-all duration-500 \${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}\`}>
                           <div className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md ring-1 ring-white/20">
                             {p.tag}
                           </div>
                           <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.05] tracking-[-0.02em] text-white mb-4">
                             {p.title}
                           </h3>
                           <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-[480px] mb-8">
                             {p.subtitle}
                           </p>
                           
                           <Link 
                             href={\`/servicos/\${p.id}\`}
                             className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 group/btn"
                           >
                             Explorar solução
                             <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.5} />
                           </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
           </div>
        </motion.div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-center gap-4 mt-2">
            <button
              onClick={scrollPrev}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 shadow-sm ring-1 ring-white/20 text-white transition-all hover:bg-white/20 active:scale-95 backdrop-blur-md"
              aria-label="Serviço anterior"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 shadow-sm ring-1 ring-white/20 text-white transition-all hover:bg-white/20 active:scale-95 backdrop-blur-md"
              aria-label="Próximo serviço"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
        </div>

      </div>
    </motion.section>
  );
}

function Differential()`;

if (!regex.test(content)) {
  console.log("Could not find Services component to replace!");
  process.exit(1);
}

const newContent = content.replace(regex, newComponent);
fs.writeFileSync(filePath, newContent);
console.log("Replaced Services component successfully.");
