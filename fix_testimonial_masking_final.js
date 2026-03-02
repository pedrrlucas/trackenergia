import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const leftColSearch = /className="flex flex-col relative z-20"/;
const leftColReplace = `className="flex flex-col relative z-20 bg-white lg:pr-8 lg:-mr-8 py-4 lg:-my-4 lg:[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"`;

if (leftColSearch.test(content)) {
    content = content.replace(leftColSearch, leftColReplace);
    console.log("Added background to the left text column.");
}

fs.writeFileSync(filePath, content);
