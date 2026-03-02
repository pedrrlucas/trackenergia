import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There's a bug in how SiteFooter is defined or used that's crashing the site.
// Let's replace the whole SiteFooter with a correctly working version.

const correctFooter = `function SiteFooter({ onContact }: { onContact: () => void }) {
  const { data, isLoading } = useQuery<{ posts: InstagramPost[] }>({
    queryKey: ["/api/instagram/posts"],
    staleTime: 60 * 60 * 1000,
  });
  const posts = data?.posts ?? [];
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const gap = 6;
    const card = el.querySelector<HTMLElement>("[data-ig-card]");
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-[#0a0014] relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 noise opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#30045c]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1d0238]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-8 lg:px-10 2xl:px-12 relative z-10">
        <div className="flex flex-col gap-16 py-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 lg:py-24">
          
          <div className="lg:col-span-4 flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                <img src={footerLogoMark} alt="" className="h-5 w-5 object-contain" />
              </span>
              <img
                src={footerLogoText}
                alt="Track"
                data-testid="text-footer-brand"
                className="h-4 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>

            <p data-testid="text-footer-address" className="text-sm leading-relaxed text-white/50 max-w-xs font-medium">
              Da estratégia à operação: excelência em eficiência, geração, armazenamento e gestão de energia.
              <br/><br/>
              Uberlândia, Minas Gerais
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                data-testid="icon-whatsapp"
                href={\`\${WHATSAPP_LINK}?text=\${encodeURIComponent(WHATSAPP_MESSAGE)}\`}
                target="_blank"
                rel="noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2} />
              </a>
              <a
                data-testid="icon-email"
                href={\`mailto:\${CONTACT_EMAIL}\`}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                aria-label="E-mail"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2} />
              </a>
              <a
                data-testid="icon-linkedin"
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 data-testid="text-footer-nav-title" className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-6">
              Empresa
            </h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-white/60">
              <a data-testid="link-footer-home" href="/#inicio" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Início
              </a>
              <a data-testid="link-footer-editorial" href="/#editorial" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Sobre nós
              </a>
              <a data-testid="link-footer-servicos" href="/#servicos" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                O que fazemos
              </a>
              <a data-testid="link-footer-testimonials" href="/#depoimentos" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Depoimentos
              </a>
              <Link data-testid="link-footer-contact" href="/contato" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Contato
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 data-testid="text-footer-solutions-title" className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-6">
              Soluções
            </h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-white/60">
              <Link data-testid="link-footer-efficiency" href="/servicos/eficiencia" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Eficiência
              </Link>
              <Link data-testid="link-footer-generation" href="/servicos/geracao" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Geração
              </Link>
              <Link data-testid="link-footer-storage" href="/servicos/armazenamento" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Armazenamento
              </Link>
              <Link data-testid="link-footer-trading" href="/servicos/comercializacao" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Comercialização
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-6">
              <h4 data-testid="text-footer-instagram-title" className="text-xs font-bold uppercase tracking-[0.15em] text-white/30">
                Instagram
              </h4>
              <a
                data-testid="link-footer-instagram"
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-white/50 transition hover:text-white group"
              >
                @{INSTAGRAM_USERNAME}
                <Instagram className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            </div>

            <div data-testid="carousel-instagram" className="group relative rounded-[20px] bg-white/[0.02] p-2 border border-white/5 backdrop-blur-sm">
              <div
                ref={scrollRef}
                className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain"
                style={{ scrollPaddingLeft: 8, scrollPaddingRight: 8 }}
              >
                {isLoading || posts.length === 0
                  ? new Array(6).fill(0).map((_, i) => (
                      <div
                        data-testid={\`card-footer-ig-\${i}\`}
                        data-ig-card
                        key={i}
                        className="relative aspect-square w-[calc((100%-16px)/3)] shrink-0 snap-start overflow-hidden rounded-xl bg-white/5 border border-white/5"
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                      </div>
                    ))
                  : posts.slice(0, 6).map((post, i) => (
                      <a
                        data-testid={\`card-footer-ig-\${i}\`}
                        data-ig-card
                        key={post.id}
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square w-[calc((100%-16px)/3)] shrink-0 snap-start overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-[0.98] hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        aria-label={\`Post do Instagram \${i + 1}\`}
                      >
                        <img
                          src={post.thumbnail_url || post.media_url}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Instagram className="h-6 w-6 text-white drop-shadow-lg" strokeWidth={1.5} />
                        </div>
                      </a>
                    ))}
              </div>

              <button
                type="button"
                data-testid="button-ig-prev"
                onClick={() => scrollBy(-1)}
                className="pointer-events-none absolute -left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#12001f] text-white border border-white/10 opacity-0 shadow-xl transition-all duration-300 hover:bg-white/10 hover:scale-110 group-hover:opacity-100 md:grid md:group-hover:pointer-events-auto z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                data-testid="button-ig-next"
                onClick={() => scrollBy(1)}
                className="pointer-events-none absolute -right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#12001f] text-white border border-white/10 opacity-0 shadow-xl transition-all duration-300 hover:bg-white/10 hover:scale-110 group-hover:opacity-100 md:grid md:group-hover:pointer-events-auto z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 py-8 text-[13px] text-white/40 font-medium">
          <div data-testid="text-footer-copyright">© {new Date().getFullYear()} Track Energia. Todos os direitos reservados.</div>
          <div className="flex gap-6 mt-4 sm:mt-0">
             <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
             <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}`;

content = content.replace(/function SiteFooter[\s\S]*?const WHATSAPP_LINK/m, correctFooter + "\n\nconst WHATSAPP_LINK");
fs.writeFileSync(filePath, content);
console.log("SiteFooter replaced correctly.");
