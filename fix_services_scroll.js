import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// A issue acontece porque os cards da direita não podem se tornar o "active" pois o embla não consegue 
// alinhar o último slide no canto esquerdo da tela por falta de espaço em branco no final (padding).
// A solução é ou adicionar um pseudo-espaço final, mudar pra "loop: true" de novo, ou centralizar "align: center".
// Vamos usar um espaçamento no container ou alinhar para conseguir selecionar.

content = content.replace(
  /const \[emblaRef, emblaApi\] = useEmblaCarousel\(\{\n\s*loop: false,\n\s*align: "start",\n\s*dragFree: true,\n\s*containScroll: "trimSnaps",\n\s*\}\);/g,
  `const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "", // Retirar trimSnaps para permitir ir até o fim
  });`
);

// Precisamos dar a opção das setas de também atualizar o item ativo pro ultimo qnd não puder mais rolar
// Então faremos o setActiveId junto ao clique ou ajustaremos o onSelect.

fs.writeFileSync(filePath, content);
console.log("Fixed embla containScroll property.");
