import fs from 'fs';

const filePath = 'client/src/components/site-shell.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<footer id="footer" className="w-full bg-\[#0a0014\] relative border-t border-white\/5 overflow-hidden">/;

const replacement = `<footer id="footer" className="w-full bg-[#0a0014] relative border-t border-white/5 overflow-hidden rounded-t-[40px] lg:rounded-t-[64px] mt-4 lg:mt-8">`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
  console.log("Updated footer classes.");
} else {
  console.log("Could not find footer classes to replace.");
}
