import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const constants = `
const WHATSAPP_LINK = "https://wa.me/5511999999999";
const WHATSAPP_MESSAGE = "Oi! Vim pelo site da Track e gostaria de conversar sobre soluções de energia.";
const CONTACT_EMAIL = "contato@trackenergia.com.br";
const INSTAGRAM_USERNAME = "track.energia";
const INSTAGRAM_PROFILE_URL = \`https://www.instagram.com/\${INSTAGRAM_USERNAME}/\`;

export function SiteFooter`;

if (!content.includes('const WHATSAPP_LINK = "https://wa.me/5511999999999";')) {
  content = content.replace('export function SiteFooter', constants);
  fs.writeFileSync(filePath, content);
  console.log("Added missing constants.");
} else {
  console.log("Constants already exist.");
}
