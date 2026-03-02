import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue right now is that the section itself has "bg-gradient-to-b from-[#0d0115] via-[#150120] to-black"
// And when we added the mask to the image, the section's background still looks like a solid block underneath.
// Or maybe the section background should just be the same color as the next section so they blend perfectly.
// The next section is "Sobre a Track", which has a white background (from the SiteShell or body).
// Actually, the body is white! So if the hero is black/dark purple, and the next section is white, 
// the rounded corners at the bottom of the hero reveal the white background of the body underneath.
// The user complained about the "sombreamento reservado do hero aparecer como um retângulo" quando rola a tela.
// This means the image itself probably had a hard edge because the image container height was smaller than the section height.

// Let's remove the mask and just fix the image container to have the exact same height as the section,
// or let's use a soft gradient on the image.

// I will remove the mask because it might be causing the rectangle effect if it cuts off sharply.
// And I will add a gradient at the bottom of the section instead.

const maskRegex = /maskImage: "linear-gradient\(to bottom, black 60%, transparent 100%\)",\n\s*WebkitMaskImage: "linear-gradient\(to bottom, black 60%, transparent 100%\)"/g;

if (maskRegex.test(content)) {
    content = content.replace(maskRegex, '');
    fs.writeFileSync(filePath, content);
    console.log("Removed mask.");
}

// Ensure image is h-full w-full object-cover
const imgClassRegex = /h-full w-full object-cover object-left md:object-center/g;
// Actually, earlier I replaced `h-full min-h-screen w-full object-cover` with `h-full w-full object-cover`. 
// But what about the absolute inset-0? If the container is min-h-[115vh], absolute inset-0 makes it cover everything.
// Let's add a subtle shadow gradient to the bottom of the HERO SECTION itself, inside the absolute inset-0.

const gradientInsert = `<div className="absolute inset-0 bg-gradient-to-t from-black via-[#0d0115]/50 to-transparent pointer-events-none" aria-hidden />`;
// We'll insert it right after the image container.

const target = /<div className="absolute inset-0 noise opacity-\[0\.06\]" aria-hidden \/>\n\s*<\/motion\.div>/g;
if (target.test(content)) {
    content = content.replace(target, `<div className="absolute inset-0 noise opacity-[0.06]" aria-hidden />\n        ${gradientInsert}\n      </motion.div>`);
    fs.writeFileSync(filePath, content);
    console.log("Added inner gradient over the image.");
}
