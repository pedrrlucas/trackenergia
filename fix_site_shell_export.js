import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// I replaced everything after "export function SiteFooter" but I need to make sure SiteShell is included.
// SiteShell was at the bottom, so I probably overwrote it.
// Let's check if it exists.
if (!content.includes('export function SiteShell')) {
    console.log("SiteShell is missing! Adding it back.");
    
    // Add SiteShell back after SiteFooter
    const siteShellCode = `
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const reduced = usePrefersReducedMotion();
  const onHome = String(location) === "/" || String(location) === "";

  // Na home: ao carregar com hash (/#servicos etc), rolar até a seção após o conteúdo estar no DOM
  React.useEffect(() => {
    if (!onHome) return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const id = hash.split("?")[0];
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [onHome, reduced]);

  // Na home: links âncora (/#inicio, /#servicos, etc.) fazem scroll suave em vez de recarregar
  React.useEffect(() => {
    if (!onHome) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.startsWith("/#") ? href.slice(2).split("?")[0] : href.slice(1).split("?")[0];
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      if (href.startsWith("/#")) window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onHome, reduced]);

  const onContact = () => setLocation("/contato");

  return (
    <div data-testid="site-shell" className="min-h-screen w-full bg-black">
      <div className="relative">
        <SiteHeader onContact={onContact} />
        {children}
        <SiteFooter onContact={onContact} />
      </div>
    </div>
  );
}
`;
    content += siteShellCode;
    fs.writeFileSync(filePath, content);
} else {
    console.log("SiteShell is present.");
}
