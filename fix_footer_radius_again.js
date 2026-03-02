import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<footer id="footer" className="w-full bg-\[#0a0014\] relative border-t border-white\/5 overflow-hidden rounded-t-\[24px\] lg:rounded-t-\[32px\] mt-4 lg:mt-8">/;

const replacement = `<footer id="footer" className="w-full bg-[#0a0014] relative border-t border-white/5 overflow-hidden rounded-t-[16px] lg:rounded-t-[24px] mt-4 lg:mt-8">`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
  console.log("Updated footer radius to be even smaller.");
} else {
  console.log("Could not find footer classes to replace.");
}
