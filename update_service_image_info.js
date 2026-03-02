import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const projectData = `const projectInfoMap: Record<string, { title: string, desc: string, stats: { label: string, value: string }[] }> = {
  "eficiencia": {
    title: "Modernização de Parque Industrial",
    desc: "Retrofit completo do sistema motriz e luminotécnico para indústria de embalagens.",
    stats: [{ label: "Economia", value: "24%" }, { label: "Payback", value: "14 meses" }]
  },
  "geracao": {
    title: "Usina Solar de Solo - MG",
    desc: "Projeto turn-key de geração distribuída para abastecer rede varejista regional.",
    stats: [{ label: "Capacidade", value: "2.5 MWp" }, { label: "Módulos", value: "4.500+" }]
  },
  "armazenamento": {
    title: "BESS para Resiliência em Data Center",
    desc: "Sistema de armazenamento em baterias para peak shaving e backup de missão crítica.",
    stats: [{ label: "Capacidade", value: "1.2 MWh" }, { label: "Autonomia", value: "4 horas" }]
  },
  "mercado-livre": {
    title: "Migração de Frota Logística",
    desc: "Estruturação de compra de energia incentivada para grande centro de distribuição.",
    stats: [{ label: "Redução de Custo", value: "31%" }, { label: "Fonte", value: "100% Renovável" }]
  },
  "assinatura": {
    title: "Consórcio para Franquias",
    desc: "Inclusão de 12 lojas de fast-food em modalidade de geração compartilhada sem investimento.",
    stats: [{ label: "Lojas atendidas", value: "12" }, { label: "Desconto", value: "18% na tarifa" }]
  },
  "eletromobilidade": {
    title: "Hub de Recarga Corporativa",
    desc: "Infraestrutura de carregadores rápidos (DC) para frota de veículos comerciais elétricos.",
    stats: [{ label: "Estações", value: "8 pontos" }, { label: "Potência", value: "120 kW/ponto" }]
  },
  "om-fv": {
    title: "Gestão Integrada de Usinas",
    desc: "Monitoramento 24/7 e manutenção preditiva de parque solar no nordeste do Brasil.",
    stats: [{ label: "Parque Gerido", value: "15 MWp" }, { label: "Uptime", value: "99.8%" }]
  }
};
`;

// Insert the projectInfoMap right after tagMap
if (!content.includes('projectInfoMap')) {
    content = content.replace(/const tagMap: Record<string, string> = \{[\s\S]*?\};\n/, match => match + '\n' + projectData);
}

// Now replace the overlay in the image
const oldOverlayRegex = /<div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white flex flex-col justify-end">[\s\S]*?<\/h3>\s*<\/div>/;

const newOverlay = `{/* Overlay com informações do projeto ilustrado */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="rounded-[20px] bg-black/40 backdrop-blur-xl border border-white/10 p-5 sm:p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                            Caso Real Ilustrado
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-2">
                          {projectInfoMap[serviceId]?.title || "Projeto Referência"}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {projectInfoMap[serviceId]?.desc || "Ilustração de uma de nossas implementações técnicas."}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 shrink-0">
                        {projectInfoMap[serviceId]?.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col gap-1 border-l border-white/10 pl-4">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">{stat.label}</span>
                            <span className="text-sm font-semibold">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>`;

content = content.replace(oldOverlayRegex, newOverlay);

fs.writeFileSync(filePath, content);
console.log("Updated service image overlay with specific project info.");
