import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Looking for "export function SiteShell" 
if(content.includes("export function SiteShell")) {
    console.log("SiteShell is correctly exported.");
} else {
    console.log("SiteShell is MISSING!");
}
