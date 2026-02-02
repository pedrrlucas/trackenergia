import React, { useMemo } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Sparkles, Zap, Leaf, Shield, Wrench, LineChart, BatteryCharging, Cable } from "lucide-react";

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

type ServiceSubtopic = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

type ServiceSection = {
  id: string;
  title: string;
  description: string;
};

type ServiceDetail = {
  id: string;
  title: string;
  summary: string;
  longText: string;
  outcomes: string[];
  scope: string[];
  sections: ServiceSection[];
};

const SERVICES: Record<string, ServiceDetail> = {
  "eficiencia": {
    id: "eficiencia",
    title: "Eficiência energética",
    summary: "Corte desperdícios com um plano simples, medido e executável — sem promessas vagas.",
    longText:
      "Eficiência não é só trocar equipamento: é entender seu consumo de ponta a ponta, priorizar o que tem melhor retorno e executar com governança. A Track entra com diagnóstico, recomendações claras e acompanhamento — para virar rotina, não só um relatório.",
    outcomes: ["Redução de custos", "Melhora de performance", "Governança e indicadores"],
    scope: ["Levantamento e medições", "Mapa de oportunidades", "Plano de ação e priorização", "Acompanhamento e ajustes"],
    sections: [
      {
        id: "diagnostico",
        title: "Diagnóstico e mapa de perdas",
        description: "Levantamento técnico e leitura do perfil de consumo para identificar perdas, riscos e oportunidades com base em dados.",
      },
      {
        id: "demanda",
        title: "Gestão de demanda",
        description: "Ajustes de rotina e estratégia para reduzir picos, controlar demanda e manter previsibilidade de custos.",
      },
      {
        id: "roadmap",
        title: "Roadmap de payback",
        description: "Plano priorizado com retorno esperado, cronograma e governança para execução e acompanhamento.",
      },
    ],
  },
  "geracao": {
    id: "geracao",
    title: "Sistemas de geração própria",
    summary: "Do projeto à entrega: geração própria integrada à sua operação e ao seu consumo.",
    longText:
      "Geração própria precisa nascer alinhada com o consumo real e com a operação do local. A Track desenha, implanta e comissiona com foco em segurança, performance e integração — para você acompanhar resultados sem fricção.",
    outcomes: ["Economia recorrente", "Autonomia", "Previsibilidade"],
    scope: ["Dimensionamento", "Projeto executivo", "Implantação e comissionamento", "Monitoramento e suporte"],
    sections: [
      {
        id: "dimensionamento",
        title: "Dimensionamento sob medida",
        description: "Arquitetura e potência do sistema alinhadas ao consumo real, com margem para expansão e integração ao local.",
      },
      {
        id: "implantacao",
        title: "Implantação e comissionamento",
        description: "Execução com checklist, segurança e conformidade — validando o funcionamento antes da entrega.",
      },
      {
        id: "monitoramento",
        title: "Monitoramento",
        description: "Acompanhamento por indicadores para garantir performance, identificar desvios e agir rápido quando necessário.",
      },
    ],
  },
  "armazenamento": {
    id: "armazenamento",
    title: "Armazenamento de energia",
    summary: "Estratégia e implantação para estabilidade, resiliência e continuidade de operação.",
    longText:
      "Armazenamento é controle: você decide quando usar energia da rede e quando usar sua própria reserva. Criamos a arquitetura ideal para reduzir picos, aumentar resiliência e deixar a operação mais previsível — com segurança e integração ao seu sistema elétrico.",
    outcomes: ["Resiliência", "Peak shaving", "Continuidade"],
    scope: ["Arquitetura e segurança", "Integrações", "Operação e manutenção", "Relatórios"],
    sections: [
      {
        id: "homecare",
        title: "HomeCare",
        description: "Resiliência para residências e pequenos comércios, com autonomia e operação simples no dia a dia.",
      },
      {
        id: "peak-shaving",
        title: "Peak shaving",
        description: "Estratégia para reduzir picos de demanda, aliviar custos e melhorar previsibilidade usando a reserva de energia.",
      },
      {
        id: "continuidade",
        title: "Continuidade operacional",
        description: "Arquitetura para ambientes que não podem parar, com redundância, estabilidade e plano de contingência.",
      },
    ],
  },
  "mercado-livre": {
    id: "mercado-livre",
    title: "Mercado livre de energia",
    summary: "Estruture a migração com governança e mantenha a gestão com clareza e controle.",
    longText:
      "No mercado livre, a vantagem vem com método: análise de viabilidade, estratégia de contratação e governança para manter controle de risco. A Track organiza o processo e acompanha a execução para você ter economia sem perder previsibilidade.",
    outcomes: ["Estratégia", "Gestão de risco", "Economia"],
    scope: ["Análise de viabilidade", "Modelagem e contratação", "Migração", "Gestão pós-migração"],
    sections: [
      {
        id: "viabilidade",
        title: "Viabilidade e modelagem",
        description: "Simulações e cenários para entender aderência, economia potencial e riscos antes de migrar.",
      },
      {
        id: "contratos",
        title: "Contratação e governança",
        description: "Estruturação de contratação com regras claras, cláusulas e governança para proteger o seu negócio.",
      },
      {
        id: "gestao",
        title: "Gestão pós-migração",
        description: "Acompanhamento contínuo por indicadores, relatórios e ajustes para manter a estratégia saudável.",
      },
    ],
  },
  "assinatura": {
    id: "assinatura",
    title: "Assinatura de energia",
    summary: "Um modelo simples: economia previsível, condições claras e acompanhamento constante.",
    longText:
      "Assinatura é sobre simplicidade: você mantém seu consumo normal e recebe uma estrutura pensada para gerar economia sem burocracia. A Track ajuda a encaixar o modelo no seu perfil e acompanha resultados de forma transparente.",
    outcomes: ["Simplicidade", "Previsibilidade", "Acompanhamento"],
    scope: ["Aderência ao perfil", "Definição de condições", "Onboarding", "Acompanhamento"],
    sections: [
      {
        id: "perfil",
        title: "Aderência ao perfil",
        description: "Checagem objetiva de histórico, sazonalidade e consumo para confirmar encaixe do modelo.",
      },
      {
        id: "condicoes",
        title: "Condições transparentes",
        description: "Condições claras, sem ambiguidades: termos, prazos e expectativa de economia bem explicados.",
      },
      {
        id: "acompanhamento",
        title: "Acompanhamento",
        description: "Acompanhamento por relatórios e ajustes para manter a economia prevista ao longo do tempo.",
      },
    ],
  },
  "eletromobilidade": {
    id: "eletromobilidade",
    title: "Eletromobilidade",
    summary: "Infraestrutura de recarga pronta para operar hoje e escalar amanhã.",
    longText:
      "Projetamos a infraestrutura considerando potência, perfil de uso e expansão futura. A Track cuida do desenho elétrico, seleção de hardware e implantação — com uma operação simples e segura para o dia a dia.",
    outcomes: ["Infra pronta", "Segurança", "Operação"],
    scope: ["Projeto elétrico", "Seleção de hardware", "Implantação", "Operação e manutenção"],
    sections: [
      {
        id: "projeto",
        title: "Projeto elétrico",
        description: "Planejamento de potência, proteções e conformidade para operar com segurança e margem de expansão.",
      },
      {
        id: "hardware",
        title: "Seleção de hardware",
        description: "Escolha de equipamentos compatíveis com o caso de uso, com manutenção e operação simples.",
      },
      {
        id: "operacao",
        title: "Operação e manutenção",
        description: "Rotina de operação com checklist, suporte e evolução conforme o uso e crescimento do sistema.",
      },
    ],
  },
  "om-fv": {
    id: "om-fv",
    title: "O&M fotovoltaico",
    summary: "Rotina, indicadores e manutenção para manter performance e confiabilidade ao longo do tempo.",
    longText:
      "O&M é onde a performance se mantém (ou se perde). Montamos rotina de inspeção, limpeza, correções e relatórios para que o sistema entregue o que promete, com transparência e previsibilidade.",
    outcomes: ["Performance", "Confiabilidade", "Relatórios"],
    scope: ["Inspeções", "Limpeza", "Correções", "Relatórios e indicadores"],
    sections: [
      {
        id: "inspecoes",
        title: "Inspeções",
        description: "Inspeções elétricas, estruturais e termográficas para identificar riscos e falhas cedo.",
      },
      {
        id: "limpeza",
        title: "Limpeza e performance",
        description: "Rotina de limpeza com padrão de qualidade e registro para manter geração e confiabilidade.",
      },
      {
        id: "relatorios",
        title: "Relatórios e indicadores",
        description: "Relatórios claros com KPIs, alertas e plano de ação para correções e melhorias.",
      },
    ],
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
            <div className="pt-24 sm:pt-24 lg:pt-28">
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
      <header data-testid="header-page" className="pointer-events-none absolute left-0 right-0 top-0 z-20">
        <div className="container-page pointer-events-auto">
          <div
            data-testid="header-shell"
            className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white px-4 py-3 ring-1 ring-zinc-200"
          >
            <div data-testid="bg-header-badge-sheen" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-white to-zinc-50" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.00) 18%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.00) 82%, rgba(0,0,0,0.02) 100%)",
                  opacity: 0.85,
                }}
              />
              <div className="absolute inset-0 noise opacity-[0.06]" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 52%)",
                }}
              />
            </div>

            <a
              data-testid="link-header-services"
              href="/servicos"
              className="relative z-10 inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 transition hover:text-zinc-900"
            >
              Serviços
            </a>

            <div data-testid="text-header-title" className="relative z-10 text-xs font-semibold text-zinc-700">
              Detalhe
            </div>

            <a
              data-testid="link-header-contact"
              href="/contato"
              className="relative z-10 inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 transition hover:text-zinc-900"
            >
              Contato
            </a>
          </div>
        </div>
      </header>

      <main data-testid="main-service-detail" className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.08] noise" />
          <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
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

                  <div className="mt-5 max-w-[860px]">
                    <p
                      data-testid="text-service-long"
                      className="text-sm leading-7 text-zinc-700"
                      style={{ textWrap: "pretty" as any }}
                    >
                      {service.longText}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <motion.section
                data-testid="section-service-scope"
                className="overflow-hidden rounded-[28px] bg-white ring-1 ring-zinc-200"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="px-7 pt-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div data-testid="text-scope-title" className="text-sm font-semibold text-zinc-950">
                        O que entregamos
                      </div>
                      <div data-testid="text-scope-sub" className="mt-1 text-sm text-zinc-600">
                        Cada item abre com mais detalhes.
                      </div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                      <ArrowRight className="h-5 w-5 text-zinc-900" strokeWidth={2.25} />
                    </div>
                  </div>
                </div>

                <Accordion.Root type="single" collapsible className="mt-6 grid divide-y divide-zinc-200">
                  {service.scope.map((s, i) => (
                    <Accordion.Item key={i} value={String(i)} className="">
                      <Accordion.Header className="">
                        <Accordion.Trigger
                          data-testid={`accordion-scope-trigger-${i}`}
                          className="group flex w-full cursor-pointer items-center justify-between gap-4 px-7 py-5 text-left"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-zinc-950">{s}</div>
                          </div>
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200">
                            <ChevronRight className="h-4 w-4 transition group-data-[state=open]:rotate-90" strokeWidth={2.25} />
                          </span>
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="px-7 pb-6 data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown">
                        <div data-testid={`accordion-scope-content-${i}`} className="text-sm leading-6 text-zinc-600">
                          Entregáveis e passos típicos para <span className="font-medium text-zinc-800">{s}</span>, ajustados ao seu contexto e às prioridades do projeto.
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
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
                        data-testid={`row-outcome-${i}`}
                        className="flex items-center gap-3 rounded-[20px] bg-white/10 p-4 ring-1 ring-white/12"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/12">
                          <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </span>
                        <div className="text-sm font-semibold text-white">{o}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 hidden md:flex">
                    <a
                      data-testid="link-talk-track-outcomes"
                      href="/contato"
                      className="text-sm font-semibold text-white/90 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                    >
                      Falar com a Track
                    </a>
                  </div>
                </div>
              </motion.aside>
            </div>

            <section data-testid="section-service-sections" className="mt-6 overflow-hidden rounded-[32px] bg-white ring-1 ring-zinc-200">
              <div className="px-7 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div data-testid="text-sections-title" className="text-sm font-semibold text-zinc-950">
                      Tópicos do serviço
                    </div>
                    <div data-testid="text-sections-sub" className="mt-1 text-sm text-zinc-600">
                      Clique para expandir. Ao abrir, você tem um atalho para chamar no WhatsApp.
                    </div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                    <Sparkles className="h-5 w-5 text-zinc-900" strokeWidth={2.25} />
                  </div>
                </div>
              </div>

              <Accordion.Root type="single" collapsible className="mt-6 grid divide-y divide-zinc-200">
                {service.sections.map((sec, index) => (
                  <Accordion.Item key={sec.id} value={sec.id}>
                    <Accordion.Header>
                      <Accordion.Trigger
                        data-testid={`accordion-section-trigger-${sec.id}`}
                        className="group flex w-full cursor-pointer items-center justify-between gap-4 px-7 py-6 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200">
                            {(() => {
                              const id = sec.id;
                              const Icon =
                                id.includes("home") ? Shield :
                                id.includes("peak") ? LineChart :
                                id.includes("cont") ? Zap :
                                id.includes("viab") ? LineChart :
                                id.includes("contr") ? Shield :
                                id.includes("gest") ? LineChart :
                                id.includes("perfil") ? Shield :
                                id.includes("cond") ? Shield :
                                id.includes("acom") ? LineChart :
                                id.includes("projeto") ? Cable :
                                id.includes("hardware") ? Wrench :
                                id.includes("oper") ? Wrench :
                                id.includes("inspec") ? Wrench :
                                id.includes("limp") ? Wrench :
                                id.includes("relat") ? LineChart :
                                id.includes("dimen") ? Leaf :
                                id.includes("impl") ? Wrench :
                                id.includes("monitor") ? LineChart :
                                BatteryCharging;
                              return <Icon className="h-4 w-4" strokeWidth={2.25} />;
                            })()}
                          </div>
                          <div>
                            <div data-testid={`text-section-title-${sec.id}`} className="text-sm font-semibold text-zinc-950">
                              {sec.title}
                            </div>
                            <div data-testid={`text-section-index-${sec.id}`} className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                              Tópico {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200">
                          <ChevronRight className="h-4 w-4 transition group-data-[state=open]:rotate-90" strokeWidth={2.25} />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="px-7 pb-7 data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div data-testid={`text-section-desc-${sec.id}`} className="text-sm leading-6 text-zinc-600">
                            {sec.description}
                          </div>
                        </div>

                        <a
                          data-testid={`link-section-whatsapp-${sec.id}`}
                          href="https://wa.me/5511999999999"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-full bg-zinc-950 px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-zinc-900 md:w-auto md:py-1.5"
                        >
                          Chamar no WhatsApp
                        </a>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
