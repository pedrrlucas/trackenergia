import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue "params is not defined" happens because I used `params.id` in my earlier regex replacements:
// src={imageMap[params.id] || ""} and {tagMap[params.id] || "SOLUÇÃO"}
// But inside ServiceDetailPage the id is stored in `serviceId` variable from the useMemo hook!

content = content.replace(/imageMap\[params\.id\]/g, 'imageMap[serviceId]');
content = content.replace(/tagMap\[params\.id\]/g, 'tagMap[serviceId]');

fs.writeFileSync(filePath, content);
console.log("Fixed params.id reference error.");
