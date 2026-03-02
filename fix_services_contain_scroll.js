import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Put back containScroll: "trimSnaps" so the container stops scrolling when it hits the right edge
content = content.replace(
  /containScroll: "", \/\/ Retirar trimSnaps para permitir ir até o fim/g,
  'containScroll: "trimSnaps", // Mantém o limite de rolagem para não deixar buraco no final'
);

fs.writeFileSync(filePath, content);
console.log("Restored trimSnaps in Embla.");
