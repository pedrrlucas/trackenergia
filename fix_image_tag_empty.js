import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There's a subtle bug still: earlier I used a regex that might have resulted in empty tags
// like `<img src="" />` because the serviceId extraction was wrong or the map keys are wrong.

// Let's verify how `serviceId` is derived:
// const id = path.split("/servicos/")[1]?.split("/")[0] ?? "";
// And what are the keys in our map:
// "eficiencia", "geracao", "armazenamento", "mercado-livre", "assinatura", "eletromobilidade", "om-fv"

// But what if the ID is just "om" instead of "om-fv"?
// Let's log if there's any fallback for the tag map and image map that is failing.
// Let's also check if {tagMap[serviceId] || "SOLUÇÃO"} is wrapped in curly braces properly.
// The previous replace was: detailContent.replace(/\{service\.tag\}/g, '{tagMap[params.id] || "SOLUÇÃO"}');
// And then: content.replace(/tagMap\[params\.id\]/g, 'tagMap[serviceId]');
// Which means it became: {tagMap[serviceId] || "SOLUÇÃO"} -> This is correct JSX.

// Let's check how it looks currently in the code by searching for "imageMap["
console.log("Image map usage:");
console.log(content.match(/src=\{imageMap\[serviceId\] \|\| ""\}/));

console.log("Tag map usage:");
console.log(content.match(/\{tagMap\[serviceId\] \|\| "SOLUÇÃO"\}/));
