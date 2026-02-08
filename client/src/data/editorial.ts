/**
 * Fonte única dos artigos editoriais.
 *
 * Ordem do array: o primeiro = artigo em destaque na home (badge "Novo");
 * os demais aparecem na lista lateral, com paginação automática (3 por página).
 * Ao adicionar um novo artigo, coloque-o no início do array para ser o "Novo".
 *
 * Para adicionar: copie um bloco existente, altere id, category, title, excerpt,
 * date, readTime, image e content. Use createEditorialContent() para o padrão visual.
 * Imagens: blog1, blog2, blog3, blog4 (ou importe nova em assets/images).
 */

import blog1 from "@/assets/images/blog-tech_1.jpg";
import blog2 from "@/assets/images/blog-tech_2.jpg";
import blog3 from "@/assets/images/blog-tech_3.jpg";
import blog4 from "@/assets/images/blog-tech_4.jpg";

export type EditorialPost = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  authorName?: string;
  authorRole?: string;
  tags?: string[];
};

type SectionInput = {
  title: string;
  paragraphs: string[];
  quote?: string;
};

/**
 * Gera o HTML do corpo do artigo no padrão do site (lead + seções com barra roxa e opcional blockquote).
 * Use para novos artigos e edite apenas os textos.
 */
export function createEditorialContent(config: {
  lead: string;
  sections: SectionInput[];
}): string {
  const { lead, sections } = config;
  const leadHtml = `<p class="lead text-xl text-zinc-600 font-medium leading-relaxed mb-10 border-b border-zinc-100 pb-10">${lead}</p>`;
  const sectionsHtml = sections
    .map((s) => {
      let body = s.paragraphs
        .map((p) => `<p class="text-zinc-600 leading-relaxed mb-6">${p}</p>`)
        .join("");
      if (s.quote) {
        body += `\n          <blockquote class="border-l-4 border-[#1d0238] pl-6 py-2 my-8 italic text-lg text-zinc-800 bg-zinc-50 rounded-r-lg pr-4">\n            "${s.quote}"\n          </blockquote>`;
      }
      return `        <section>
           <h3 class="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
              <span class="h-8 w-1 bg-[#1d0238] rounded-full"></span>
              ${s.title}
           </h3>
           ${body}
        </section>`;
    })
    .join("\n\n");
  return `
      ${leadHtml}
      
      <div class="space-y-12">
${sectionsHtml}
      </div>
    `;
}

const editorialPosts: EditorialPost[] = [
  {
    id: "1",
    category: "Tendências",
    title: "O futuro da energia solar no Brasil: o que esperar para 2026",
    excerpt:
      "Com novas regulamentações e avanços tecnológicos, o cenário para geração distribuída promete grandes oportunidades.",
    date: "05 Fev 2026",
    readTime: "5 min",
    image: blog1,
    content: createEditorialContent({
      lead:
        "O setor de energia solar no Brasil vive um momento de transformação acelerada. Com a consolidação da geração distribuída e a abertura do mercado livre, 2026 promete ser um ano divisor de águas para consumidores e empresas.",
      sections: [
        {
          title: "Novas fronteiras tecnológicas",
          paragraphs: [
            "A evolução dos painéis fotovoltaicos tem permitido uma eficiência cada vez maior, mesmo em áreas com menor incidência solar. Tecnologias como células de perovskita e módulos bifaciais estão se tornando mais acessíveis, aumentando o ROI (Retorno sobre Investimento) dos projetos.",
            "Além disso, a integração com sistemas de armazenamento (baterias) está permitindo que empresas se tornem praticamente independentes da rede elétrica tradicional durante horários de pico, quando a tarifa é mais cara.",
          ],
        },
        {
          title: "O papel da regulação",
          paragraphs: [
            "As recentes atualizações no marco legal da geração distribuída trouxeram mais segurança jurídica para investidores. Embora algumas taxas tenham sido implementadas, a transparência nas regras do jogo atraiu capital estrangeiro e fomentou a profissionalização do setor.",
          ],
          quote:
            "A energia solar não é mais apenas uma alternativa sustentável, é uma estratégia financeira indispensável para a competitividade industrial.",
        },
        {
          title: "Mercado Livre de Energia",
          paragraphs: [
            "A migração para o Mercado Livre de Energia continua sendo uma tendência forte. Para 2026, espera-se que consumidores de média tensão tenham acesso facilitado a esse ambiente, permitindo a negociação direta com geradores e a escolha de fontes renováveis com certificação.",
          ],
        },
        {
          title: "Conclusão",
          paragraphs: [
            "Preparar-se para esse novo cenário exige planejamento e parceiros estratégicos. A transição energética não é apenas sobre trocar a fonte de energia, mas sobre inteligência no consumo e gestão eficiente de recursos.",
          ],
        },
      ],
    }),
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["Energia", "Inovação", "Futuro", "Brasil"],
  },
  {
    id: "2",
    category: "Tecnologia",
    title: "Armazenamento inteligente: a revolução das baterias",
    excerpt:
      "Como sistemas de storage estão mudando a forma como indústrias consomem energia.",
    date: "02 Fev 2026",
    readTime: "4 min",
    image: blog2,
    content: createEditorialContent({
      lead:
        "Baterias não são mais apenas backup. Elas se tornaram ferramentas ativas de gestão energética, permitindo arbitragem de preços e estabilidade operacional em larga escala.",
      sections: [
        {
          title: "Além do backup",
          paragraphs: [
            "O conceito de BESS (Battery Energy Storage Systems) evoluiu. Hoje, indústrias utilizam armazenamento para 'peak shaving' - reduzindo a demanda contratada nos horários de ponta e economizando milhões anualmente.",
          ],
        },
      ],
    }),
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["Baterias", "Tecnologia", "Gestão"],
  },
  {
    id: "3",
    category: "Sustentabilidade",
    title: "ESG na prática: reduzindo a pegada de carbono",
    excerpt:
      "Estratégias reais para empresas que buscam impacto ambiental positivo e economia.",
    date: "28 Jan 2026",
    readTime: "6 min",
    image: blog3,
    content: "Conteúdo do artigo...",
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["ESG", "Sustentabilidade"],
  },
  {
    id: "4",
    category: "Mercado",
    title: "Mercado Livre de Energia: vale a pena migrar?",
    excerpt:
      "Uma análise detalhada sobre custos, benefícios e o momento certo para a transição.",
    date: "20 Jan 2026",
    readTime: "7 min",
    image: blog4,
    content: "Conteúdo do artigo...",
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["Mercado Livre", "Energia"],
  },
  {
    id: "5",
    category: "Inovação",
    title: "Hidrogênio Verde: o combustível do futuro",
    excerpt:
      "Entenda o potencial do H2V e como o Brasil pode liderar essa transformação global.",
    date: "15 Jan 2026",
    readTime: "5 min",
    image: blog2,
    content: "Conteúdo do artigo...",
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["Hidrogênio", "Inovação"],
  },
  {
    id: "6",
    category: "Eficiência",
    title: "Gestão energética industrial 4.0",
    excerpt:
      "Sensores, IoT e IA aplicados para otimização de consumo em tempo real.",
    date: "10 Jan 2026",
    readTime: "4 min",
    image: blog3,
    content: "Conteúdo do artigo...",
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["IoT", "Indústria 4.0"],
  },
  {
    id: "7",
    category: "Regulação",
    title: "Novas tarifas de energia e impacto no setor",
    excerpt:
      "O que muda com as bandeiras tarifárias e como se proteger da volatilidade.",
    date: "05 Jan 2026",
    readTime: "6 min",
    image: blog1,
    content: "Conteúdo do artigo...",
    authorName: "Roberto Mendes",
    authorRole: "Engenheiro Especialista em Renováveis",
    tags: ["Tarifas", "Regulação"],
  },
];

export default editorialPosts;
