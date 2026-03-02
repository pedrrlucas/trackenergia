import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There are duplicate declarations of constants.
// Let's remove ALL of them and add them once right before SiteFooter or SiteShell.

content = content.replace(/const WHATSAPP_LINK = "https:\/\/wa\.me\/5511999999999";/g, '');
content = content.replace(/const WHATSAPP_MESSAGE = "Oi! Vim pelo site da Track e gostaria de conversar sobre soluções de energia.";/g, '');
content = content.replace(/const CONTACT_EMAIL = "contato@trackenergia\.com\.br";/g, '');
content = content.replace(/const INSTAGRAM_USERNAME = "track\.energia";/g, '');
content = content.replace(/const INSTAGRAM_PROFILE_URL = `https:\/\/www\.instagram\.com\/\$\{INSTAGRAM_USERNAME\}\/`;/g, '');

const constants = `
const WHATSAPP_LINK = "https://wa.me/5511999999999";
const WHATSAPP_MESSAGE = "Oi! Vim pelo site da Track e gostaria de conversar sobre soluções de energia.";
const CONTACT_EMAIL = "contato@trackenergia.com.br";
const INSTAGRAM_USERNAME = "track.energia";
const INSTAGRAM_PROFILE_URL = \`https://www.instagram.com/\${INSTAGRAM_USERNAME}/\`;

export function SiteFooter`;

content = content.replace('export function SiteFooter', constants);

fs.writeFileSync(filePath, content);
console.log("Removed duplicate constants.");
