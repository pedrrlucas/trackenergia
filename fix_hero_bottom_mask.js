import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// A issue que o usuário apontou: "deixe o sombreamento reservado do hero apenas para a imagem (agora ele aparece como retangulo, aparecendo ao rolar a tela)"
// Isso ocorre porque o hero tem "bg-gradient-to-b from-[#0d0115] via-[#150120] to-black"
// E dentro tem um fundo com opacidade que desce muito reto ou mascara a imagem de um jeito quadrado.
// Pelo código que lemos antes, a section não tem sombreamento sobre a imagem especificamente focado no bottom. Apenas:
// className="absolute inset-0 h-full w-full object-cover object-left md:object-center brightness-100 contrast-[1.02]"
// Mas há algo na div do container da imagem: "className="absolute inset-0 overflow-hidden origin-center""
// E talvez esse background do hero não cubra corretamente, ou talvez o gradiente que deveria estar sumindo na imagem está com problema.
// Vamos analisar a estrutura correta.

// Para fazer a imagem "sumir" suavemente em direção ao fundo escuro na parte de baixo, em vez de deixar um corte quadrado
// (que ele chama de retângulo), podemos aplicar um gradient mask NA IMAGEM para ela se desfazer em transparente embaixo.

const imageContainerRegex = /<motion\.div\s+className="absolute inset-0 overflow-hidden origin-center"\s+style=\{\{\s*scale: reduced \? 1 : scaleImage,\s*willChange: "transform"\s*\}\}\s*>/m;

const replacement = `<motion.div 
        className="absolute inset-0 overflow-hidden origin-center"
        style={{
          scale: reduced ? 1 : scaleImage,
          willChange: "transform",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
        }}
      >`;

if (imageContainerRegex.test(content)) {
    content = content.replace(imageContainerRegex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Added gradient mask to hero image container to fade it out at the bottom smoothly.");
} else {
    console.log("Could not find hero image container.");
}
