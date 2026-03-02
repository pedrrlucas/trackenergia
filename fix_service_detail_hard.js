import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// I need to replace the section that starts around line 385 containing "O que entregamos"
// Let's use a very broad regex to find that whole block.
// It looks like it's inside a column layout.

const fullBlockRegex = /\{\/\* Entregas \*\/\}\s*<div[^>]*>[\s\S]*?<h2[^>]*>\s*O que entregamos[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newImageBlock = `{/* Entregas substituídas por Imagem */}
          <div className="mt-12 w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1d0238]/20 to-[#30045c]/20 blur-3xl -z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
            <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] ring-1 ring-black/5 shadow-xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
                  {product.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">Solução em {product.title}</h3>
              </div>
            </div>
          </div>`;

if(content.includes('O que entregamos')) {
    // If the regex above fails, we'll try a simpler replace
    const exactRegex = /\{\/\* Entregas \*\/\}\s*<div className="mt-12 rounded-\[24px\] bg-white p-6 sm:p-8 ring-1 ring-zinc-200 shadow-sm relative overflow-hidden">[\s\S]*?<\/Accordion>\s*<\/div>/;
    
    if (exactRegex.test(content)) {
        content = content.replace(exactRegex, newImageBlock);
        fs.writeFileSync(filePath, content);
        console.log("Replaced accordion with modern image block.");
    } else {
        // Find the "mt-12 rounded-[24px]" block manually if it lacks the comment
        const alternativeRegex = /<div className="mt-12 rounded-\[24px\] bg-white p-6 sm:p-8 ring-1 ring-zinc-200 shadow-sm relative overflow-hidden">[\s\S]*?<\/Accordion>\s*<\/div>/;
        if(alternativeRegex.test(content)) {
            content = content.replace(alternativeRegex, newImageBlock);
            fs.writeFileSync(filePath, content);
            console.log("Replaced accordion (alt regex) with modern image block.");
        } else {
            console.log("Failed to match the specific accordion block structure.");
        }
    }
} else {
    console.log("Could not find 'O que entregamos' in file.");
}

