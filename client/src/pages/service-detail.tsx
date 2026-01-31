import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, ChevronRight, MessageCircle } from "lucide-react";

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

type ServiceDetail = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  scope: string[];
};

const SERVICES: Record<string, ServiceDetail> = {
  "eficiencia": {
    id: "eficiencia",
    title: "Eficiência energética",
    summary: "Corte desperdícios com um plano simples, medido e executável — sem promessas vagas.",
    outcomes: ["Redução de custos", "Melhora de performance", "Governança e indicadores"],
    scope: ["Levantamento e medições", "Mapa de oportunidades", "Plano de ação e priorização", "Acompanhamento e ajustes"],
  },
  "geracao": {
    id: "geracao",
    title: "Sistemas de geração própria",
    summary: "Do projeto à entrega: geração própria integrada à sua operação e ao seu consumo.",
    outcomes: ["Economia recorrente", "Autonomia", "Previsibilidade"],
    scope: ["Dimensionamento", "Projeto executivo", "Implantação e comissionamento", "Monitoramento e suporte"],
  },
  "armazenamento": {
    id: "armazenamento",
    title: "Armazenamento de energia",
    summary: "Estratégia e implantação para estabilidade, resiliência e continuidade de operação.",
    outcomes: ["Resiliência", "Peak shaving", "Continuidade"],
    scope: ["Arquitetura e segurança", "Integrações", "Operação e manutenção", "Relatórios"],
  },
  "mercado-livre": {
    id: "mercado-livre",
    title: "Mercado livre de energia",
    summary: "Estruture a migração com governança e mantenha a gestão com clareza e controle.",
    outcomes: ["Estratégia", "Gestão de risco", "Economia"],
    scope: ["Análise de viabilidade", "Modelagem e contratação", "Migração", "Gestão pós-migração"],
  },
  "assinatura": {
    id: "assinatura",
    title: "Assinatura de energia",
    summary: "Um modelo simples: economia previsível, condições claras e acompanhamento constante.",
    outcomes: ["Simplicidade", "Previsibilidade", "Acompanhamento"],
    scope: ["Aderência ao perfil", "Definição de condições", "Onboarding", "Acompanhamento"],
  },
  "eletromobilidade": {
    id: "eletromobilidade",
    title: "Eletromobilidade",
    summary: "Infraestrutura de recarga pronta para operar hoje e escalar amanhã.",
    outcomes: ["Infra pronta", "Segurança", "Operação"],
    scope: ["Projeto elétrico", "Seleção de hardware", "Implantação", "Operação e manutenção"],
  },
  "om-fv": {
    id: "om-fv",
    title: "O&M fotovoltaico",
    summary: "Rotina, indicadores e manutenção para manter performance e confiabilidade ao longo do tempo.",
    outcomes: ["Performance", "Confiabilidade", "Relatórios"],
    scope: ["Inspeções", "Limpeza", "Correções", "Relatórios e indicadores"],
  },
};

export default function ServiceDetailPage() {
  const reduced = usePrefersReducedMotion();
  const [location] = useLocation();

  const { service, serviceId } = useMemo(() => {
    const path = String(location);
    const id = path.split("/servicos/")[1]?.split("/")[0] ?? "";
    return { serviceId: id, service: SERVICES[id] };
  }, [location]);

  if (!service) {
    return (
      <div data-testid="page-service-detail" className="min-h-screen bg-white">
        <main className="relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
            <div className="absolute inset-0 opacity-[0.08] noise" />
          </div>

          <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="pt-20 sm:pt-24 lg:pt-28">
              <a
                data-testid="link-back-services"
                href="/servicos"
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 transition hover:text-zinc-950"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
                Voltar para serviços
              </a>

              <div className="mt-6 rounded-[28px] bg-white p-7 ring-1 ring-zinc-200">
                <div data-testid="text-service-not-found" className="text-sm font-semibold text-zinc-950">
                  Serviço não encontrado
                </div>
                <div className="mt-2 text-sm text-zinc-600">O link pode estar errado. Escolha um serviço na lista.</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div data-testid="page-service-detail" className="min-h-screen bg-white">
      <main data-testid="main-service-detail" className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.08] noise" />
          <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="pt-20 sm:pt-24 lg:pt-28">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                data-testid="link-back-services"
                href="/servicos"
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 transition hover:text-zinc-950"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
                Voltar para serviços
              </a>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Pill testId="pill-service">( serviço )</Pill>
                  <h1
                    data-testid="text-service-title"
                    className="mt-5 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-[56px]"
                  >
                    {service.title}
                  </h1>
                  <p data-testid="text-service-summary" className="mt-4 max-w-[760px] text-sm leading-6 text-zinc-600">
                    {service.summary}
                  </p>
                </div>

                <a
                  data-testid="button-service-whatsapp"
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-900"
                >
                  Falar no WhatsApp
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition group-hover:translate-x-0.5">
                    <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </a>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <motion.section
                data-testid="section-service-scope"
                className="rounded-[28px] bg-white p-7 ring-1 ring-zinc-200"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div data-testid="text-scope-title" className="text-sm font-semibold text-zinc-950">
                      Escopo (o que entregamos)
                    </div>
                    <div data-testid="text-scope-sub" className="mt-1 text-sm text-zinc-600">
                      Um roteiro claro de trabalho, do diagnóstico ao acompanhamento.
                    </div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                    <ArrowRight className="h-5 w-5 text-zinc-900" strokeWidth={2.25} />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {service.scope.map((s, i) => (
                    <div
                      key={i}
                      data-testid={`row-scope-${i}`}
                      className="flex items-start gap-3 rounded-[18px] bg-zinc-50 px-4 py-3 ring-1 ring-zinc-200"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1d0238] text-white">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <div className="text-sm text-zinc-800">{s}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.aside
                data-testid="aside-service-outcomes"
                className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] p-7 ring-1 ring-black/10"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="absolute inset-0 hero-overlay opacity-65" />
                <div className="absolute inset-0 noise opacity-[0.20]" />

                <div className="relative">
                  <div data-testid="text-outcomes-title" className="text-sm font-semibold text-white">
                    Resultados esperados
                  </div>
                  <div data-testid="text-outcomes-sub" className="mt-1 text-sm text-white/70">
                    Três impactos que buscamos priorizar nesse serviço.
                  </div>

                  <div className="mt-6 grid gap-3">
                    {service.outcomes.map((o, i) => (
                      <div
                        key={i}
                        data-testid={`card-outcome-${i}`}
                        className="rounded-[20px] bg-white/10 p-4 ring-1 ring-white/12"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-white">{o}</div>
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/12">
                            <ChevronRight className="h-4 w-4 text-white" strokeWidth={2.25} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    data-testid="link-service-contact"
                    href="/contato"
                    className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-white/90 transition hover:text-white"
                  >
                    Falar com a Track
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </a>
                </div>
              </motion.aside>
            </div>

            <div className="mt-10">
              <a
                data-testid="button-next-service"
                href={serviceId ? "/servicos" : "/servicos"}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 transition hover:translate-x-0.5"
              >
                Ver todos os serviços
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
