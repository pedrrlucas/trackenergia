import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regexMask = /<div className="-my-12 py-12" ref=\{emblaRef\}>/;
const replaceMask = `<div className="-my-12 py-12 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_100%)]" ref={emblaRef}>`;

if (regexMask.test(content)) {
    content = content.replace(regexMask, replaceMask);
    fs.writeFileSync(filePath, content);
    console.log("Applied mask to embla container.");
} else {
    console.log("Could not find embla container to apply mask.");
}
