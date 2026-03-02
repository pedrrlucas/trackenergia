import fs from 'fs';

const detailPath = 'client/src/pages/service-detail.tsx';
let detailContent = fs.readFileSync(detailPath, 'utf8');

const landingPath = 'client/src/pages/landing.tsx';
const landingContent = fs.readFileSync(landingPath, 'utf8');

const imgImportsMatch = landingContent.match(/import product1 from ".*?";\nimport product2 from ".*?";\nimport product3 from ".*?";\nimport product4 from ".*?";\nimport product5 from ".*?";\nimport product6 from ".*?";\nimport product7 from ".*?";/);

if (imgImportsMatch) {
  const correctImports = imgImportsMatch[0];
  
  // Use a string replacement instead of regex to avoid escaping issues
  const badImports = 'import hero1 from "@/assets/images/services/eficiencia.jpg";\nimport hero2 from "@/assets/images/services/geracao.jpg";\nimport hero3 from "@/assets/images/services/armazenamento.jpg";\nimport hero4 from "@/assets/images/services/mercado-livre.jpg";\nimport hero5 from "@/assets/images/services/assinatura.jpg";\nimport hero6 from "@/assets/images/services/eletromobilidade.jpg";\nimport hero7 from "@/assets/images/services/om.jpg";';
  
  const mapUpdate = `const imageMap: Record<string, string> = {
  "eficiencia": product1,
  "geracao": product2,
  "armazenamento": product3,
  "mercado-livre": product4,
  "assinatura": product5,
  "eletromobilidade": product6,
  "om-fv": product7
};`;
  
  detailContent = detailContent.replace(badImports, correctImports);
  detailContent = detailContent.replace(/const imageMap: Record<string, string> = \{[\s\S]*?\};/, mapUpdate);
  
  fs.writeFileSync(detailPath, detailContent);
  console.log("Fixed images imports in service-detail.tsx");
} else {
  console.log("Could not find image imports in landing.tsx");
}
