import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\{\/\* Margin Track Decoration \*\/\}\n\s*<div className="pointer-events-none absolute bottom-0 right-0 top-0 w-\[400px\] overflow-visible opacity-\[0\.08\] mix-blend-luminosity">\n\s*<img\n\s*src=\{marginTrack\}\n\s*alt=""\n\s*className="absolute right-\[-10%\] top-1\/2 h-auto w-\[150vh\] max-w-none -translate-y-1\/2 rotate-90 object-cover grayscale invert brightness-75"\n\s*\/>\n\s*<\/div>/m;

const replacement = `{/* Margin Track Decoration */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-full max-w-[400px] overflow-visible opacity-10 mix-blend-luminosity">
        <img
          src={marginTrack}
          alt=""
          className="absolute left-0 top-1/2 h-auto w-[180vh] max-w-none -translate-x-[40%] -translate-y-1/2 rotate-90 object-cover grayscale invert brightness-75"
        />
      </div>`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Moved margin track to the left side and scaled it up.");
} else {
    console.log("Could not find the margin track code to replace.");
}
