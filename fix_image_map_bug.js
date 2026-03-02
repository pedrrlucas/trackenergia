import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// I also noticed in the previous error the vite hot reload failed with "export is incompatible" due to Fast Refresh.
// It's possible I added exports or variables that shouldn't be there, or the image tags are still not right.

content = content.replace(/\{imageMap\[serviceId\] \|\| ""\}/g, "imageMap[serviceId] || ''");

fs.writeFileSync(filePath, content);
