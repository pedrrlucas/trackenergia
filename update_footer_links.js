import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="lg:col-span-2 flex flex-col">\s*<h4 data-testid="text-footer-solutions-title" className="text-xs font-bold uppercase tracking-\[0\.15em\] text-white\/30 mb-6">\s*Soluções\s*<\/h4>\s*<nav className="flex flex-col gap-4 text-sm font-medium text-white\/60">[\s\S]*?<\/nav>\s*<\/div>/;

const replacement = `<div className="lg:col-span-2 flex flex-col">
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
              <Link data-testid="link-footer-mercado-livre" href="/servicos/mercado-livre" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Mercado Livre
              </Link>
              <Link data-testid="link-footer-assinatura" href="/servicos/assinatura" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Assinatura
              </Link>
              <Link data-testid="link-footer-eletromobilidade" href="/servicos/eletromobilidade" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                Eletromobilidade
              </Link>
              <Link data-testid="link-footer-om-fv" href="/servicos/om-fv" className="w-fit transition-colors hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
                O&M de Usinas FV
              </Link>
            </nav>
          </div>`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Updated footer solutions links.");
} else {
    console.log("Could not find the footer solutions block.");
}
