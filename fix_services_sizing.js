import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /function ProductFeature\(\{ product, products, onContact \}: \{ product: Product; products: Product\[\]; onContact: \(\) => void \}\) \{[\s\S]*?\n\/\/ Process component removed\n\nfunction Testimonials/m;

const newComponent = `function ProductFeature({ product, products, onContact }: { product: Product; products: Product[]; onContact: () => void }) {
  const reduced = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
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
  }, [products]);

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

  return (
    <motion.section 
      id="servicos" 
      className="container-page py-16 sm:py-20 lg:py-28 overflow-hidden bg-[#0a0014] rounded-[40px] lg:rounded-[64px] my-10 relative shadow-[0_0_100px_rgba(29,2,56,0.3)]"
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#30045c]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#1d0238]/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-10 lg:gap-14">
        
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
            <h2 data-testid="text-services-title" className="mt-6 text-balance text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[42px] md:text-[48px]">
              Energia sob medida
              <br />
              <span className="subtle-grad-dark">Da estratégia à operação</span>
            </h2>
            <p data-testid="text-services-sub" className="mt-4 text-sm sm:text-base leading-relaxed text-white/60 max-w-xl">
              Analisamos oportunidades, desenhamos a proposta ideal e executamos com monitoramento após a implementação. Sempre de olho no futuro.
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
              className="grid h-12 w-12 place-items-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95 backdrop-blur-xl"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95 backdrop-blur-xl"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="relative w-full"
          initial={reduced ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
           <div className="overflow-visible px-4 sm:px-8 lg:px-12 pb-8" ref={emblaRef}>
             <div className="flex touch-pan-y gap-4 sm:gap-6" style={{ backfaceVisibility: 'hidden' }}>
                {products.map((p) => {
                  const isActive = activeId === p.id;
                  
                  return (
                    <div
                      key={\`service-slide-\${p.id}\`}
                      // Reduzimos o width para acomodar aprox 3.5 a 4 cards na tela (desktop), 2.5 (tablet) e 1.2 (mobile)
                      className={\`relative shrink-0 w-[80vw] sm:w-[320px] lg:w-[360px] h-[360px] sm:h-[420px] lg:h-[460px] cursor-pointer transition-all duration-[600ms] ease-out \${isActive ? 'scale-100 opacity-100 z-10' : 'scale-[0.98] opacity-70 hover:opacity-100 z-0'}\`}
                      onClick={() => setActiveId(p.id)}
                    >
                      <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] overflow-hidden group bg-zinc-900 border border-white/10">
                        <img
                           src={p.image}
                           alt={p.title}
                           className={\`h-full w-full object-cover transition-transform duration-[1000ms] ease-out \${isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'}\`}
                        />
                        {/* Gradiente um pouco mais suave */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                        
                        <div className={\`absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-[600ms] ease-out \${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}\`}>
                           <div className="inline-flex mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                             {p.tag}
                           </div>
                           <h3 className="text-xl sm:text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-white mb-2">
                             {p.title}
                           </h3>
                           <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 mb-6">
                             {p.subtitle}
                           </p>
                           
                           {isActive && (
                             <motion.div
                               initial={{ opacity: 0, height: 0, marginTop: 0 }}
                               animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                               transition={{ duration: 0.4 }}
                             >
                               <Link 
                                 href={\`/servicos/\${p.id}\`}
                                 className="inline-flex items-center justify-between w-full sm:w-auto gap-4 rounded-full bg-white px-5 py-3 text-xs font-bold text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
                               >
                                 <span className="tracking-wide">Explorar solução</span>
                                 <div className="grid place-items-center w-6 h-6 rounded-full bg-black/5">
                                   <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                                 </div>
                               </Link>
                             </motion.div>
                           )}
                        </div>
                      </div>
                    </div>
                  );
                })}
             </div>
           </div>
        </motion.div>

        <div className="flex lg:hidden items-center justify-center gap-4 mt-[-1rem] pb-8">
            <button
              onClick={scrollPrev}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 active:scale-95 backdrop-blur-md"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 active:scale-95 backdrop-blur-md"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
        </div>

      </div>
    </motion.section>
  );
}

// Process component removed

function Testimonials`;

if (!regex.test(content)) {
  console.log("Could not find ProductFeature component to replace!");
  process.exit(1);
}

const newContent = content.replace(regex, newComponent);
fs.writeFileSync(filePath, newContent);
console.log("Adjusted Services cards to show more items per screen.");
