import fs from 'fs';

const filePath = 'client/src/pages/landing.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The onSelect logic from embla may still override our activeId state when we scroll.
// We need to either disconnect onSelect entirely or make sure it doesn't fight our arrows.
// Since we want the user to be able to drag AND use arrows, let's look at the onSelect logic.

const onSelectRegex = /const onSelect = useCallback\(\(api: any\) => \{\n\s*if \(\!api\) return;\n\s*const snapIndex = api\.selectedScrollSnap\(\);\n\s*if \(products\[snapIndex\]\) \{\n\s*setActiveId\(products\[snapIndex\]\.id\);\n\s*\}\n\s*\}, \[products\]\);/m;

const newOnSelect = `const onSelect = useCallback((api: any) => {
    if (!api) return;
    const snapIndex = api.selectedScrollSnap();
    // Only update if it's naturally dragged, if we used arrows, activeId is already set correctly
    if (products[snapIndex] && api.internalEngine().dragHandler.pointerDown()) {
      setActiveId(products[snapIndex].id);
    }
  }, [products]);`;

// A simpler way: we just let people click to select, or use arrows to select. We completely remove 
// the auto-selection on scroll (onSelect mapping to setActiveId) because it's buggy with the boundary limits.

const betterOnSelect = `const onSelect = useCallback((api: any) => {
    // We intentionally do not auto-select on scroll anymore. 
    // Selection is now explicitly via click on the card, or by using the arrows.
  }, []);`;

if(onSelectRegex.test(content)) {
    content = content.replace(onSelectRegex, betterOnSelect);
    fs.writeFileSync(filePath, content);
    console.log("Removed auto-select on scroll to prevent fights with the arrows.");
} else {
    console.log("Could not find onSelect logic to replace.");
}
