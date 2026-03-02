import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The image is marginTrack (imported as marginTrack). We want to add it to the ProductFeature section.
// Look for where we define the decorations:
// {/* Background decorations */}
// <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
// <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#30045c]/40 rounded-full blur-[140px] pointer-events-none" />

const replacement = `{/* Background decorations */}
      <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
      
      {/* Margin Track Decoration */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[400px] overflow-visible opacity-15 mix-blend-luminosity hidden lg:block">
        <img
          src={marginTrack}
          alt=""
          className="absolute right-[-10%] top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 object-cover grayscale invert brightness-75"
        />
      </div>

      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#30045c]/40 rounded-full blur-[140px] pointer-events-none" />`;

content = content.replace(
  /\{\/\* Background decorations \*\/\}\n\s*<div className="absolute inset-0 noise opacity-30 mix-blend-overlay" \/>\n\s*<div className="absolute top-\[-20%\] left-\[-10%\]/m,
  replacement.replace('<div className="absolute top-[-20%] left-[-10%]', '<div className="absolute top-[-20%] left-[-10%]')
);

fs.writeFileSync(filePath, content);
console.log("Added marginTrack graphic to Services section.");
