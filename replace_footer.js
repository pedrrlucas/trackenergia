import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('export function SiteFooter');

if(startIdx !== -1) {
  content = content.substring(0, startIdx);
  const newFooter = `export function SiteFooter({ onContact }: { onContact: () => void }) {
  return (
    <footer id="footer" className="w-full bg-black">
      <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-8 lg:px-12 pt-20 pb-8 lg:pt-28 lg:pb-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          
          {/* Left Column */}
          <div className="flex flex-col max-w-sm">
            <div className="flex items-center gap-4 mb-10">
              <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white text-black">
                <img src={footerLogoMark} alt="" className="h-8 w-8 object-contain brightness-0" />
              </span>
              <img
                src={footerLogoText}
                alt="Track"
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </div>

            <div className="text-[17px] font-bold leading-relaxed text-white mb-10">
              Track. Soluções em energia<br/>
              Uberlândia, Minas Gerais
            </div>

            <div className="flex flex-wrap items-center gap-4 text-white">
              <a 
                href={\`\${WHATSAPP_LINK}?text=\${encodeURIComponent(WHATSAPP_MESSAGE)}\`}
                target="_blank" rel="noreferrer"
                className="grid h-14 w-14 place-items-center rounded-full bg-white text-black transition hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href={\`mailto:\${CONTACT_EMAIL}\`} className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-white/20 transition hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95">
                <Mail className="h-6 w-6" />
              </a>
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-white/20 transition hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-white/20 transition hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-white/20 transition hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Middle Columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-2 lg:gap-x-32 pt-4">
            <div>
              <div className="text-sm font-bold text-white mb-8">
                Navegação
              </div>
              <div className="flex flex-col gap-6 text-base font-bold text-white">
                <a href="/#inicio" className="transition hover:opacity-70">Início</a>
                <a href="/#editorial" className="transition hover:opacity-70">Editorial</a>
                <a href="/#servicos" className="transition hover:opacity-70">Serviços</a>
                <a href="/#depoimentos" className="transition hover:opacity-70">Depoimentos</a>
                <a href="/contato" className="transition hover:opacity-70">Contato</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-white mb-8">
                Soluções
              </div>
              <div className="flex flex-col gap-6 text-base font-bold text-white">
                <Link href="/servicos" className="flex items-center gap-2 transition hover:opacity-70 group">
                  Ver todas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </Link>
                <Link href="/servicos/eficiencia" className="transition hover:opacity-70">Eficiência</Link>
                <Link href="/servicos/geracao" className="transition hover:opacity-70">Geração própria</Link>
                <Link href="/servicos/armazenamento" className="transition hover:opacity-70">Armazenamento</Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col lg:items-end pt-4">
            <div className="flex items-center justify-between w-full lg:w-[420px] gap-8 mb-6">
              <div className="text-sm font-bold text-white">
                Fale conosco
              </div>
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white transition hover:opacity-70">
                @track.energia
              </a>
            </div>
            <div className="w-full lg:w-[420px]">
              <button onClick={onContact} className="group relative w-full overflow-hidden rounded-[40px] bg-white p-1 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex w-full items-center justify-between rounded-[36px] border border-black/10 bg-white px-8 py-10 sm:py-12">
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Inicie um projeto</span>
                    <span className="text-[32px] leading-none font-bold text-black tracking-tight">Entrar em<br/>contato</span>
                  </div>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-black text-white transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-24 border-t border-white pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[17px] font-bold text-white">
          <div>© {new Date().getFullYear()} Track. Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  );
}
`;
  content += newFooter;
  fs.writeFileSync(filePath, content);
  console.log("Footer completely updated.");
} else {
  console.log("Could not find export function SiteFooter in site-shell.tsx");
}
