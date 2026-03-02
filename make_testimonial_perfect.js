import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O objetivo é parar que os textos se misturem "agr o card fica atras (...) e sendo mostrado, ficando misturado".
// Isso significa que o background white está com opacity ou algo está fazendo ele transparente,
// Ou o container pai não permite o background blockear os filhos do grid com z-index adequadamente.

// A melhor abordagem técnica para "bloquear o que passa atrás em um grid":
// 1. A coluna da ESQUERDA ganha `z-index: 20` e `background-color: white`.
// 2. A coluna da ESQUERDA ganha um pseudo-elemento ou box-shadow grande branco para encobrir o "gap".
// 3. O Carrossel na DIREITA ganha `z-index: 0` e tem `margin-left` negativa para empurrá-lo para debaixo da Esquerda.

const leftSearch = /className="flex flex-col relative z-20 bg-white pr-4 lg:pr-8 lg:-mr-\[100px\] lg:py-12"/;
const leftReplace = `className="flex flex-col relative z-20 bg-white pr-4 lg:pr-8 lg:-my-12 lg:py-12 shadow-[50px_0_0_0_#ffffff] lg:shadow-[100px_0_0_0_#ffffff]"`;

if (leftSearch.test(content)) {
    content = content.replace(leftSearch, leftReplace);
}

// Ensure right column is properly structured
const rightSearch = /className="lg:col-span-7 relative z-0 w-full lg:-ml-12"/;
const rightReplace = `className="lg:col-span-7 relative z-0 w-full lg:-ml-20"`; // Push it further behind the shadow

if (rightSearch.test(content)) {
    content = content.replace(rightSearch, rightReplace);
}

fs.writeFileSync(filePath, content);
console.log("Applied heavy shadow trick to ensure solid white blocking.");

