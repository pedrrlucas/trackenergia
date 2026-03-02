import fs from 'fs';

const detailPath = 'client/src/pages/service-detail.tsx';
let detailContent = fs.readFileSync(detailPath, 'utf8');

// Precisamos importar as imagens reais do projeto ou mapeá-las, já que no service-detail.tsx elas podem não estar presentes.
// Vamos criar um mapeamento na própria página ou verificar como os dados estão lá.

if (!detailContent.includes("import hero1 from")) {
  const imports = `import hero1 from "@/assets/images/services/eficiencia.jpg";
import hero2 from "@/assets/images/services/geracao.jpg";
import hero3 from "@/assets/images/services/armazenamento.jpg";
import hero4 from "@/assets/images/services/mercado-livre.jpg";
import hero5 from "@/assets/images/services/assinatura.jpg";
import hero6 from "@/assets/images/services/eletromobilidade.jpg";
import hero7 from "@/assets/images/services/om.jpg";

const imageMap: Record<string, string> = {
  "eficiencia": hero1,
  "geracao": hero2,
  "armazenamento": hero3,
  "mercado-livre": hero4,
  "assinatura": hero5,
  "eletromobilidade": hero6,
  "om-fv": hero7
};

const tagMap: Record<string, string> = {
  "eficiencia": "ANÁLISE",
  "geracao": "GERAÇÃO PRÓPRIA",
  "armazenamento": "ARMAZENAMENTO",
  "mercado-livre": "MERCADO LIVRE",
  "assinatura": "ASSINATURA",
  "eletromobilidade": "ELETROMOBILIDADE",
  "om-fv": "O&M"
};
`;

  detailContent = detailContent.replace('import { useLocation } from "wouter";', `import { useLocation } from "wouter";\n${imports}`);
}

// Depois substituímos o src={service.image} e o {service.tag} para usar o mapeamento.
detailContent = detailContent.replace(/src=\{service\.image\}/g, 'src={imageMap[params.id] || ""}');
detailContent = detailContent.replace(/\{service\.tag\}/g, '{tagMap[params.id] || "SOLUÇÃO"}');

fs.writeFileSync(detailPath, detailContent);
console.log("Fixed image and tag mapping in service-detail.tsx.");
