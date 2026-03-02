import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The user wants to replace the Accordion block (O que entregamos) with a modern formatted image 
// representing the service (product.image).

// First, find the accordion block. It looks like:
// <div className="mt-12 rounded-[24px] bg-white p-6 sm:p-8 ring-1 ring-zinc-200">
// ...
// <Accordion ...>
// ...
// </div>

const accordionRegex = /<div className="mt-12 rounded-\[24px\] bg-white p-6 sm:p-8 ring-1 ring-zinc-200 shadow-sm relative overflow-hidden">[\s\S]*?<\/div>/;

const newImageBlock = `<div className="mt-12 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1d0238]/20 to-[#30045c]/20 blur-3xl -z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
              <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] ring-1 ring-black/5 shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white">
                  <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
                    {product.tag}
                  </div>
                  <h3 className="text-xl sm:text-3xl font-medium tracking-tight">Solução em {product.title}</h3>
                </div>
              </div>
            </div>`;

if(accordionRegex.test(content)) {
    content = content.replace(accordionRegex, newImageBlock);
    fs.writeFileSync(filePath, content);
    console.log("Replaced accordion with modern image block.");
} else {
    // If we missed the exact regex, try finding the block that contains "O que entregamos"
    const fallbackRegex = /<div[^>]*>[\s\S]*?<h2[^>]*>O que entregamos<\/h2>[\s\S]*?<\/div>/;
    if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, newImageBlock);
        fs.writeFileSync(filePath, content);
        console.log("Replaced accordion (fallback regex) with modern image block.");
    } else {
        // Find Accordion tag directly
        const hardRegex = /<div className="mt-12[^>]*>[\s\S]*?<Accordion[\s\S]*?<\/Accordion>[\s\S]*?<\/div>/;
        if(hardRegex.test(content)) {
            content = content.replace(hardRegex, newImageBlock);
            fs.writeFileSync(filePath, content);
            console.log("Replaced accordion (hard regex) with modern image block.");
        } else {
            console.log("Could not find the accordion block to replace.");
        }
    }
}
