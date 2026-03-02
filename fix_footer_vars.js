import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// A issue anterior é que as variáveis estavam perdidas antes ou depois de onde deviam.
// Vamos certificar de colocar as váriaveis corretamente antes do componente SiteShell que quebrou.
// A mensagem de erro: The requested module '/src/components/site-shell.tsx' does not provide an export named 'SiteShell'

const footerRegex = /export function SiteShell/s;

if (!content.includes("export function SiteShell")) {
    console.log("Adding SiteShell back...");
    content += `\nexport function SiteShell({ children }: { children: React.ReactNode }) {
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

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onHome, reduced]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}`;
    fs.writeFileSync(filePath, content);
} else {
    console.log("SiteShell component is present.");
}
