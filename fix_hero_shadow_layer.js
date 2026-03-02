import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// O user disse: "deixe o sombreamento reservado do hero apenas para a imagem (agora ele aparece como retangulo, aparecendo ao rolar a tela)"
// Isso acontece porque o container da hero agora tem 115vh de altura, mas a imagem ou seus gradients estavam 
// configurados para cobrir o "inset-0" inteiro ou havia um fundo escuro que não acompanhava a imagem, ou o gradiente ficava 
// exposto em baixo.

// The hero container has: className="relative min-h-[115vh] w-full overflow-hidden bg-gradient-to-b from-[#0d0115] via-[#150120] to-black rounded-b-[16px] lg:rounded-b-[24px] pb-24"
// The image container: <motion.div className="absolute inset-0 overflow-hidden origin-center" ...>
// This means the image container is taking the full 115vh.
// But there's a gradient block: <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:via-black/40" />

const gradientRegex = /<div className="absolute inset-0 bg-gradient-to-t from-black via-black\/80 to-transparent lg:via-black\/40" \/>/g;
if(gradientRegex.test(content)) {
    content = content.replace(gradientRegex, '<div className="absolute inset-0 bg-gradient-to-t from-black via-[#0d0115]/90 to-transparent lg:via-[#0d0115]/60" />');
    fs.writeFileSync(filePath, content);
    console.log("Updated gradient color.");
}

// Another possible issue: The hero image might have "h-[100vh]" instead of "h-full".
// Let's look for "h-full min-h-screen" in the img tags.
// <img className="absolute inset-0 h-full min-h-screen w-full object-cover ...
const imgClassRegex = /h-full min-h-screen w-full object-cover/g;
content = content.replace(imgClassRegex, 'h-full w-full object-cover');
fs.writeFileSync(filePath, content);
console.log("Updated img classes to exactly match the container.");
