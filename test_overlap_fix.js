import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O background branco cortou a mistura visual de textos, porém, em telas muito grandes, o `mask-image`
// foi removido ou não está sendo o suficiente para o fade.

// A solução definitiva para carrosséis que rolam horizontalmente atrás de um bloco fixo:
// Aplicar um fade gradual no lado esquerdo do Embla wrapper E também usar z-index.
// O fade gradual cria uma transição suave.

const maskReplace = /<div className="-my-12 py-12 lg:\[mask-image:linear-gradient\(to_right,transparent_0%,black_10%\)\]" ref=\{emblaRef\}>/;
const newMask = `<div className="-my-12 py-12 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)]" ref={emblaRef}>`;

if (maskReplace.test(content)) {
    content = content.replace(maskReplace, newMask);
    fs.writeFileSync(filePath, content);
    console.log("Updated mask-image gradient to properly fade out the cards on the left edge.");
} else {
    console.log("Could not find mask string to update.");
}
