import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// A imagem que ficou no lugar do "O que entregamos" precisa ter o formato alinhado.
// A classe atual tem h-full min-h-[300px]. Vamos garantir que ela seja arredondada e moderna.

const regex = /<motion\.section\n\s*data-testid="section-service-image"\n\s*className="relative overflow-hidden rounded-\[28px\] ring-1 ring-zinc-200\/50 group h-full min-h-\[300px\]"/;

const replacement = `<motion.section
                data-testid="section-service-image"
                className="relative overflow-hidden rounded-[28px] ring-1 ring-zinc-200/50 group h-full min-h-[360px] shadow-sm"`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Updated service image styling.");
} else {
    console.log("Could not find service image block to update styling.");
}

