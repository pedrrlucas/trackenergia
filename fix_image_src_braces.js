import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Correção para o caso do src estar ficando como src="imageMap[serviceId] || ''" (string literal)
// ao invés de usar as chaves corretas: src={imageMap[serviceId] || ''}

content = content.replace(/src="imageMap\[serviceId\] \|\| ''"/g, "src={imageMap[serviceId] || ''}");

fs.writeFileSync(filePath, content);
