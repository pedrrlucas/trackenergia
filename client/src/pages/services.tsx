import React, { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Cable,
  ChevronRight,
  Factory,
  Leaf,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getServiceSearchContent, isSearchStopword } from "./service-detail";

const revealViewport = { once: true, amount: 0.22 } as const;
const revealTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function Pill({ children, testId }: { children: React.ReactNode; testId: string }) {
  return (
    <span
      data-testid={testId}
      className="inline-flex items-center gap-2 rounded-full bg-[#1d0238]/7 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-700 ring-1 ring-[#1d0238]/18"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
      {children}
    </span>
  );
}

type Service = {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  icon: React.ReactNode;
  gradient: string;
};

export default function Services() {
  const reduced = usePrefersReducedMotion();
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = useMemo<Service[]>(
    () => [
      {
        id: "eficiencia",
        title: "Eficiência energética",
        subtitle: "Diagnóstico, plano e execução com foco em resultado real.",
        bullets: ["Medição e mapa de perdas", "Roadmap de payback", "Gestão de demanda"],
        icon: <LineChart className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#1d0238] via-[#240045] to-[#30045c]",
      },
      {
        id: "geracao",
        title: "Sistemas de geração própria",
        subtitle: "Projeto e implantação com integração à operação.",
        bullets: ["Dimensionamento sob medida", "Execução e comissionamento", "Monitoramento"],
        icon: <Leaf className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#12001f] via-[#1d0238] to-[#30045c]",
      },
      {
        id: "armazenamento",
        title: "Armazenamento de energia",
        subtitle: "Quando todas as luzes se apagam sua casa ainda tem energia.",
        bullets: ["Tranquilidade em apagões", "Segurança energética", "Tecnologia de ponta"],
        icon: <BatteryCharging className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#0b0b12] via-[#12001f] to-[#1d0238]",
      },
      {
        id: "mercado-livre",
        title: "Mercado livre de energia",
        subtitle: "Estratégia, migração e gestão com governança.",
        bullets: ["Viabilidade e modelagem", "Migração e contratos", "Gestão pós-migração"],
        icon: <Building2 className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#1d0238] via-[#12001f] to-[#0b0b12]",
      },
      {
        id: "assinatura",
        title: "Assinatura de energia",
        subtitle: "Modelo simples para economia previsível.",
        bullets: ["Condições transparentes", "Aderência ao perfil", "Acompanhamento"],
        icon: <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#30045c] via-[#1d0238] to-[#12001f]",
      },
      {
        id: "eletromobilidade",
        title: "Eletromobilidade",
        subtitle: "Infraestrutura de recarga e operação pronta para escalar.",
        bullets: ["Projeto elétrico", "Seleção de hardware", "Operação e manutenção"],
        icon: <Cable className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#12001f] via-[#30045c] to-[#1d0238]",
      },
      {
        id: "om-fv",
        title: "O&M fotovoltaico",
        subtitle: "Performance e confiabilidade com rotina e telemetria.",
        bullets: ["Inspeções e limpeza", "Relatórios e indicadores", "Correções e melhorias"],
        icon: <Factory className="h-5 w-5" strokeWidth={2.25} />,
        gradient: "from-[#0b0b12] via-[#1d0238] to-[#30045c]",
      },
    ],
    [],
  );

  const searchContentById = useMemo(() => getServiceSearchContent(), []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    // Até 2 caracteres: mostrar tudo (sem filtro)
    if (searchQuery.trim().length <= 2) return services;

    const normalize = (s: string) =>
      s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const lowerQuery = normalize(searchQuery.trim());
    const terms = lowerQuery.split(/\s+/).filter((t) => t.length > 0);
    const significantTerms = terms.filter((t) => !isSearchStopword(t));

    if (significantTerms.length === 0) return [];

    const scored = services
      .map((s) => {
        const titleNorm = normalize(s.title);
        const subtitleNorm = normalize(s.subtitle);
        const bulletsNorm = s.bullets.map((b) => normalize(b));
        const pageContent = searchContentById[s.id] ?? "";

        let score = 0;
        let termsMatched = 0;

        for (const term of significantTerms) {
          let termScore = 0;
          if (titleNorm.includes(term)) termScore = Math.max(termScore, 15);
          if (subtitleNorm.includes(term)) termScore = Math.max(termScore, 8);
          if (bulletsNorm.some((b) => b.includes(term))) termScore = Math.max(termScore, 5);
          if (pageContent.includes(term)) termScore = Math.max(termScore, 1);

          if (termScore > 0) {
            score += termScore;
            termsMatched += 1;
          }
        }

        if (termsMatched === 0) return { service: s, score: 0, termsMatched: 0 };

        if (titleNorm.includes(lowerQuery) || subtitleNorm.includes(lowerQuery) || bulletsNorm.some((b) => b.includes(lowerQuery))) {
          score += 12;
        }
        score += termsMatched * 2;

        return { service: s, score, termsMatched };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.service);
  }, [searchQuery, services, searchContentById]);

  return (
    <div data-testid="page-services" className="min-h-screen bg-white">
      <main data-testid="main-services" className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.08] noise" />
          <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="pt-24 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                data-testid="link-back-home"
                href="/"
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 transition hover:text-zinc-950"
              >
                ← Voltar para a página inicial
              </a>

              <div className="mt-3">
                <Pill testId="pill-services">( serviços )</Pill>
              </div>

              <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1
                    data-testid="text-services-title"
                    className="mt-5 text-balance text-[46px] font-medium leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-[56px]"
                  >
                    O que a Track entrega
                  </h1>
                  <p
                    data-testid="text-services-subtitle"
                    className="mt-4 max-w-[720px] text-sm leading-6 text-zinc-600"
                  >
                    7 serviços que cobrem estratégia, execução e operação — cada um com escopo claro, entregáveis e um próximo passo objetivo.
                  </p>
                </div>

              </div>

              <div className="mt-10 max-w-lg">
                <div className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-4 py-3.5 shadow-sm ring-1 ring-zinc-200 transition-all focus-within:ring-2 focus-within:ring-[#30045c]/20 hover:ring-zinc-300">
                  <Search className="h-5 w-5 text-zinc-400 transition group-focus-within:text-[#30045c]" />
                  <input
                    data-testid="input-search-services"
                    type="text"
                    placeholder="Buscar por serviço, termo ou palavra-chave..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-medium text-zinc-400 hover:text-zinc-600"
                    >
                      Limpar
                    </button>
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-50 to-white opacity-50" />
                </div>
              </div>
            </motion.div>

            <div className="mt-10 overflow-hidden rounded-[32px] bg-white ring-1 ring-zinc-200">
              <div className="grid divide-y divide-zinc-200">
                {filteredServices.length > 0 ? (
                  filteredServices.map((s, index) => (
                    <motion.a
                    key={s.id}
                    data-testid={`row-service-${s.id}`}
                    href={`/servicos/${s.id}`}
                    className="group relative grid gap-4 px-6 py-6 transition hover:bg-zinc-50 sm:grid-cols-[1.1fr_.9fr_auto] sm:items-center"
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...revealTransition, delay: reduced ? 0 : index * 0.02 }}
                  >
                    <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient} opacity-[0.05]`} />
                      <div className="absolute inset-0 noise opacity-[0.05]" />
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 transition group-hover:bg-white">
                        <span className="text-zinc-900">{s.icon}</span>
                      </div>
                      <div>
                        <div data-testid={`text-service-title-${s.id}`} className="text-base font-semibold tracking-tight text-zinc-950">
                          {s.title}
                        </div>
                        <div data-testid={`text-service-sub-${s.id}`} className="mt-1 text-sm leading-6 text-zinc-600">
                          {s.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="relative grid gap-2 sm:pl-4">
                      {s.bullets.map((b, i) => (
                        <div
                          key={i}
                          data-testid={`text-service-bullet-${s.id}-${i}`}
                          className="flex items-center gap-2 text-[12px] text-zinc-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="relative inline-flex items-center justify-end gap-2 text-xs font-semibold text-zinc-950">
                      <span data-testid={`text-service-cta-${s.id}`} className="hidden sm:inline">Ver detalhes</span>
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-50 ring-1 ring-zinc-200 transition group-hover:bg-zinc-100">
                        <ChevronRight className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
                      </div>
                    </div>
                  </motion.a>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-zinc-50 text-zinc-400">
                      <Search className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-zinc-900">Nenhum serviço encontrado</p>
                    <p className="text-sm text-zinc-500">
                      Tente buscar por outros termos ou palavras-chave.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
