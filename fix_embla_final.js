import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /function Testimonials\(\{ onContact \}: \{ onContact: \(\) => void \}\) \{[\s\S]*?\}\n\nfunction Footer/m;

const newComponent = `function Testimonials({ onContact }: { onContact: () => void }) {
  const reduced = usePrefersReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const items: Testimonial[] = useMemo(
    () => [
      {
        id: "t-1",
        name: "Mariana Alves",
        role: "Proprietária",
        city: "Campinas, SP",
        quote:
          "A implementação foi rápida e muito bem explicada. Em poucos dias já estávamos vendo resultado e a conta de luz caiu de verdade, sem burocracia e com um acabamento impecável.",
        rating: 5,
        avatar: t1,
      },
      {
        id: "t-2",
        name: "Ricardo Nogueira",
        role: "Gestor industrial",
        city: "Joinville, SC",
        quote:
          "O que mais me surpreendeu foi o cuidado no projeto e o acompanhamento pós-instalação. O monitoramento é simples e o suporte responde rápido. Sensação de produto premium.",
        rating: 5,
        avatar: t2,
      },
      {
        id: "t-3",
        name: "Patrícia Moura",
        role: "Empreendedora",
        city: "Belo Horizonte, MG",
        quote:
          "Queríamos previsibilidade e clareza de custos. A Track entregou uma estratégia sólida e executou com acompanhamento pós-implantação. Valeu cada centavo.",
        rating: 5,
        avatar: t3,
      },
      {
        id: "t-4",
        name: "Carlos Mendes",
        role: "Diretor Comercial",
        city: "São Paulo, SP",
        quote:
          "A transição para o mercado livre de energia com a Track foi transparente. Eles cuidaram de toda a burocracia e agora temos uma economia mensal muito significativa na nossa operação.",
        rating: 5,
        avatar: t1,
      }
    ],
    [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <motion.section 
      id="depoimentos" 
      className="container-page pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)] lg:gap-14 items-center">
        
        {/* Lado Esquerdo */}
        <motion.div 
          className="flex flex-col relative z-20"
          initial={reduced ? undefined : { opacity: 0, x: -30 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="self-start">
            <Pill testId="pill-testimonials" muted={false}>( depoimentos )</Pill>
          </div>
          
          <h2 data-testid="text-testimonials-title" className="mt-6 text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-zinc-950 sm:text-[40px]">
            O que nossos clientes
            <br />
            <span className="subtle-grad">falam sobre a Track</span>
          </h2>
          
          <p data-testid="text-testimonials-sub" className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-[400px]">
            Experiências reais de quem implementou soluções com a Track, do diagnóstico à operação, com acompanhamento contínuo e foco em resultado.
          </p>

          <a
            href="https://wa.me/5511999999999?text=Oi!%20Vim%20pelo%20site%20da%20Track%20e%20gostaria%20de%20conversar%20sobre%20solu%C3%A7%C3%B5es%20de%20energia."
            target="_blank"
            rel="noreferrer"
            className="mt-8 group flex items-center justify-between gap-4 rounded-[24px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] p-4 text-left shadow-lg ring-1 ring-white/10 transition-all hover:ring-white/30 hover:shadow-xl hover:shadow-[#1d0238]/20 active:scale-[0.98] w-full sm:max-w-[340px]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white shadow-sm ring-1 ring-white/20 backdrop-blur-md">
                <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  WhatsApp Imediato
                </div>
                <div className="text-[11px] font-medium text-white/70 mt-0.5">
                  Fale com um especialista
                </div>
              </div>
            </div>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 text-white transition-all group-hover:bg-white/20 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </div>
          </a>
        </motion.div>

        {/* Lado Direito - Embla Carousel */}
        <motion.div 
          className="relative min-w-0 w-full z-10"
          initial={reduced ? undefined : { opacity: 0, x: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* overflow-hidden e pad de segurança para sombras */}
          <div className="overflow-hidden -m-4 p-4" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
              {items.map((t, index) => {
                const isActive = selectedIndex === index;
                return (
                  <div
                    key={\`testimonial-slide-\${t.id}\`}
                    className="relative flex-none w-[85%] sm:w-[320px] lg:w-[360px] pl-4 lg:pl-6 cursor-grab active:cursor-grabbing"
                    onClick={() => emblaApi?.scrollTo(index)}
                  >
                    <div className={\`flex flex-col h-full min-h-[320px] rounded-[32px] p-6 sm:p-8 transition-all duration-500 \${isActive ? 'bg-white shadow-xl shadow-black/5 ring-1 ring-zinc-200 scale-100 opacity-100' : 'bg-zinc-50 ring-1 ring-zinc-100 scale-[0.96] opacity-60 hover:opacity-100'}\`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full ring-1 bg-zinc-100 ring-zinc-200">
                            <img
                              src={t.avatar}
                              alt={t.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm sm:text-base font-bold text-zinc-950">
                              {t.name}
                            </div>
                            <div className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-500">
                              {t.role} · {t.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex-1 relative">
                          <Quote className="absolute -top-3 -left-2 h-8 w-8 text-zinc-200 -z-10" />
                          <p className="text-sm sm:text-base leading-relaxed text-zinc-600 relative z-10">
                            “{t.quote}”
                          </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {new Array(5).fill(0).map((_, s) => (
                            <Star
                              key={s}
                              className={\`h-4 w-4 \${s < t.rating ? "text-zinc-950" : "text-zinc-200"}\`}
                              fill={s < t.rating ? "currentColor" : "none"}
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navegação Manual */}
          <div className="mt-6 flex items-center gap-3 pl-4 lg:pl-6 relative z-30">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer`;

if (!regex.test(content)) {
  console.log("Could not find Testimonials block.");
  process.exit(1);
}

content = content.replace(regex, newComponent);
fs.writeFileSync(filePath, content);
console.log("Updated Embla layout properly.");
