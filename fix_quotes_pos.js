import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// A figurinha de aspas (-bottom-4 -right-2) precisa descer um pouco (ex: -bottom-6 ou -bottom-8)

const regex = /<Quote className="absolute -bottom-4 -right-2 h-12 w-12 text-\[\#1d0238\] opacity-70"/g;
const replacement = '<Quote className="absolute -bottom-8 -right-2 h-12 w-12 text-[#1d0238] opacity-70"';

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Moved quotes down.");
} else {
    // try another regex if classes were slightly different
    const altRegex = /<Quote className="absolute -bottom-[0-9]+ -right-[0-9]+ h-12 w-12 text-\[\#1d0238\] opacity-70"/g;
    if(altRegex.test(content)) {
        content = content.replace(altRegex, '<Quote className="absolute -bottom-8 -right-2 h-12 w-12 text-[#1d0238] opacity-70"');
        fs.writeFileSync(filePath, content);
        console.log("Moved quotes down (alt regex).");
    } else {
        console.log("Could not find the quote icon classes to replace.");
    }
}
