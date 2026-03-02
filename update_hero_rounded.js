import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /id="inicio"\s+className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-\[#0d0115\] via-\[#150120\] to-black"/;

const replacement = `id="inicio"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0d0115] via-[#150120] to-black rounded-b-[40px] lg:rounded-b-[64px]"`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
  console.log("Updated hero classes.");
} else {
  console.log("Could not find hero classes to replace.");
}
