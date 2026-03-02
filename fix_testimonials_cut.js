import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O problema de corte nas bordas geralmente acontece por causa de "overflow-hidden" no container embla
// ou margens/paddings negativos com overflow restrito, especialmente quando tem sombras, bordas ou animações de scale.
// Vamos olhar a estrutura do carrossel em Testimonials.

// Regex para buscar o container do embla:
// <div className="overflow-hidden" ref={emblaRef}>
// O container do Embla tem `overflow-hidden` nativamente ou por nossa classe para esconder os slides fora da view.
// O problema é que o "card" que fica selecionado provavelmente sofre um scale (ex: scale-100) e os inativos scale-95.
// Mas o container de dentro ou o border superior está batendo no teto do overflow-hidden.
// Para corrigir isso, o container overflow-hidden precisa de um pouco de padding, ex: `py-4 -my-4` ou só `py-2`.

const emblaContainerRegex = /<div className="overflow-hidden" ref=\{emblaRef\}>/g;
const newEmblaContainer = '<div className="overflow-hidden py-4 -my-4" ref={emblaRef}>'; // Dá espaço pra borda não bater no teto

if (emblaContainerRegex.test(content)) {
    content = content.replace(emblaContainerRegex, newEmblaContainer);
    fs.writeFileSync(filePath, content);
    console.log("Added vertical padding to embla container to prevent top border cut.");
} else {
    // maybe it has other classes
    const altRegex = /<div className="overflow-hidden[\s\S]*?" ref=\{emblaRef\}>/g;
    const match = content.match(altRegex);
    if(match) {
        console.log("Found embla container: " + match[0]);
    }
}
