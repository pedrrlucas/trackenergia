import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The error shows: src=imageMap[serviceId] || ''
// This is invalid JSX! It must be src={imageMap[serviceId] || ""}

content = content.replace(/src=imageMap\[serviceId\] \|\| ''/g, 'src={imageMap[serviceId] || ""}');
content = content.replace(/src=imageMap\[serviceId\] \|\| ""/g, 'src={imageMap[serviceId] || ""}');

fs.writeFileSync(filePath, content);
console.log("Fixed JSX syntax error in img src attribute");
