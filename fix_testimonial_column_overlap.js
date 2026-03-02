import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Lado Esquerdo já está com z-20. Lado Direito (carousel) está com z-10.
// Porém, para que o z-index realmente funcione e esconda o carousel quando ele desliza para trás,
// o Lado Esquerdo (texto) precisa ter um BACKGROUND. 
// Atualmente ele é transparente, então o card que está atrás fica visível através dele.

// O container principal dos depoimentos tem background bg-white.
// Se colocarmos bg-white no Lado Esquerdo, ele esconde o que passa por trás.

const leftColSearch = /<motion\.div \n\s*className="flex flex-col relative z-20"/;
const leftColReplace = `<motion.div 
          className="flex flex-col relative z-20 bg-white lg:pr-8 py-4 -my-4"`;

if (leftColSearch.test(content)) {
    content = content.replace(leftColSearch, leftColReplace);
    
    // Além disso, vamos usar mask-image apenas no desktop, para dar um efeito de "fade out"
    // suave em vez de um corte brusco na esquerda, que fica bem mais premium e resolve o bug 
    // de visualização ao mesmo tempo!
    const maskSearch = /<div className="-my-12 py-12" style=\{\{ maskImage: "linear-gradient\\(to right, transparent 0%, black 15%\\)" \}\} ref=\{emblaRef\}>/;
    const maskReplace = `<div className="-my-12 py-12 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_10%)]" ref={emblaRef}>`;
    
    content = content.replace(maskSearch, maskReplace);
    
    fs.writeFileSync(filePath, content);
    console.log("Added background to left column to properly hide the sliding cards behind it.");
} else {
    console.log("Could not find left column search text.");
}
