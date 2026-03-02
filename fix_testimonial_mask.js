import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue happens because `overflow-hidden` on the wrapper stops horizontal bleeding, 
// but it also clips the top and bottom if we don't have enough vertical padding or if the 
// mask itself gets confused. 

// And the new issue mentioned: "agora o card fica atras de 'O que nossos clientes falam...' ao invés de ser cortado ao passar"
// This means the overflow-hidden was actually preventing the card from bleeding over the text column on the left.
// Since we removed it or changed it, the card now visually overlaps the text column as you drag it left.

// We need a proper clipping mask or we just need the `overflow-hidden` container to be 
// exactly what we want without cutting the top/bottom shadows.

const searchString = /<div className="overflow-hidden -my-6 py-6 -mx-4 px-4" ref=\{emblaRef\}>/g;
const replaceString = `<div className="overflow-hidden -mx-4 px-4 -my-8 py-8 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_100%)] lg:[mask-image:none]" ref={emblaRef}>`;

if(searchString.test(content)) {
    content = content.replace(searchString, replaceString);
    fs.writeFileSync(filePath, content);
    console.log("Applied CSS mask-image and vertical padding.");
} else {
    // If it didn't find the string, let's just do a generic replace on the Embla container for Testimonials
    const fallbackSearch = /<div className="overflow-visible -mx-4 px-4 py-6" ref=\{emblaRef\}>/g;
    if(fallbackSearch.test(content)) {
        content = content.replace(fallbackSearch, replaceString);
        fs.writeFileSync(filePath, content);
        console.log("Applied CSS mask-image using fallback search.");
    } else {
        console.log("Could not find the container to apply the mask.");
    }
}
