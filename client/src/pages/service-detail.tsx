import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, ChevronRight, MessageCircle, Sparkles } from "lucide-react";

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

type ServiceDetail = {
  id: string;
  title: string;
  summary: string;
  longText: string;
  outcomes: string[];
  scope: string[];
  subtopics: ServiceSubtopic[];
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
    subtopics: [
      {
        id: "diagnostico",
        title: "Diagnóstico e mapa de perdas",
        description: "Levantamento técnico e leitura do seu perfil de consumo para achar onde a energia está ‘escapando’.",
        bullets: ["Medições e inspeções", "Curva de carga", "Mapa de perdas e riscos"],
      },
      {
        id: "demanda",
        title: "Gestão de demanda",
        description: "Ajustes operacionais para reduzir picos e evitar custos desnecessários.",
        bullets: ["Ponta x fora ponta", "Ajustes de operação", "Metas por setor"],
      },
      {
        id: "roadmap",
        title: "Roadmap de payback",
        description: "Um plano priorizado com retorno esperado e próximos passos bem definidos.",
        bullets: ["Prioridades", "Payback estimado", "Cronograma"],
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
    subtopics: [
      {
        id: "dimensionamento",
        title: "Dimensionamento sob medida",
        description: "Potência e arquitetura do sistema considerando consumo, perfil e expansão.",
        bullets: ["Leitura de consumo", "Simulações", "Escalabilidade"],
      },
      {
        id: "implantacao",
        title: "Implantação e comissionamento",
        description: "Execução organizada, com checklist e validação final do sistema.",
        bullets: ["Segurança", "Conformidade", "Entrega técnica"],
      },
      {
        id: "monitoramento",
        title: "Monitoramento",
        description: "Visibilidade contínua para garantir performance e detectar anomalias cedo.",
        bullets: ["KPIs", "Alertas", "Relatórios"],
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
    subtopics: [
      {
        id: "homecare",
        title: "HomeCare",
        description: "Resiliência para residências e pequenos comércios com foco em conforto e autonomia.",
        bullets: ["Back-up essencial", "Automação básica", "Operação simples"],
      },
      {
        id: "peak-shaving",
        title: "Peak shaving",
        description: "Reduza picos de demanda e custos associados com uma estratégia de uso inteligente.",
        bullets: ["Horários críticos", "Gestão de carga", "Otimização"],
      },
      {
        id: "continuidade",
        title: "Continuidade operacional",
        description: "Para ambientes que não podem parar: estabilidade e redundância.",
        bullets: ["Arquitetura robusta", "Segurança", "Planos de contingência"],
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
    subtopics: [
      {
        id: "viabilidade",
        title: "Viabilidade e modelagem",
        description: "Entenda se faz sentido migrar e qual modelo se encaixa no seu perfil.",
        bullets: ["Simulações", "Cenários", "Risco x retorno"],
      },
      {
        id: "contratos",
        title: "Contratação e governança",
        description: "Estrutura de contratos com clareza e proteção para o seu negócio.",
        bullets: ["Regras", "Preço", "Cláusulas"],
      },
      {
        id: "gestao",
        title: "Gestão pós-migração",
        description: "Acompanhamento contínuo para garantir que a estratégia continue funcionando.",
        bullets: ["Indicadores", "Ajustes", "Relatórios"],
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
    subtopics: [
      {
        id: "perfil",
        title: "Aderência ao perfil",
        description: "Checagem rápida para confirmar se o modelo funciona bem para você.",
        bullets: ["Histórico", "Sazonalidade", "Consumo"],
      },
      {
        id: "condicoes",
        title: "Condições transparentes",
        description: "Nada de pegadinha: condições claras e entendimento do que você contrata.",
        bullets: ["Termos", "Prazos", "Economia prevista"],
      },
      {
        id: "acompanhamento",
        title: "Acompanhamento",
        description: "Acompanhe indicadores e garanta que o modelo continue aderente ao longo do tempo.",
        bullets: ["Relatórios", "Ajustes", "Suporte"],
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
    subtopics: [
      {
        id: "projeto",
        title: "Projeto elétrico",
        description: "Planejamento para atender carga e evitar surpresas na operação.",
        bullets: ["Potência", "Proteções", "Normas"],
      },
      {
        id: "hardware",
        title: "Seleção de hardware",
        description: "Equipamentos que fazem sentido para o seu caso, sem excesso nem falta.",
        bullets: ["Capacidade", "Compatibilidade", "Manutenção"],
      },
      {
        id: "operacao",
        title: "Operação e manutenção",
        description: "Rotina simples e suporte para manter o sistema funcionando.",
        bullets: ["Checklist", "Suporte", "Evolução"],
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
    subtopics: [
      {
        id: "inspecoes",
        title: "Inspeções",
        description: "Identificação rápida de falhas e riscos antes de virarem problema.",
        bullets: ["Elétrica", "Estrutural", "Termografia"],
      },
      {
        id: "limpeza",
        title: "Limpeza e performance",
        description: "Procedimentos para manter a geração no nível ideal.",
        bullets: ["Rotina", "Qualidade", "Registro"],
      },
      {
        id: "relatorios",
        title: "Relatórios e indicadores",
        description: "Visão clara do que está funcionando e do que precisa ajuste.",
        bullets: ["KPIs", "Alertas", "Ações"],
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

                  <div
                    data-testid="text-service-long"
                    className="mt-5 max-w-[860px] rounded-[22px] bg-white/70 p-5 text-sm leading-6 text-zinc-700 ring-1 ring-zinc-200"
                  >
                    {service.longText}
                  </div>
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

            <motion.section
              data-testid="section-service-subtopics"
              className="mt-6 rounded-[28px] bg-white p-7 ring-1 ring-zinc-200"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={revealTransition}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div data-testid="text-subtopics-title" className="text-sm font-semibold text-zinc-950">
                    Tópicos dentro do serviço
                  </div>
                  <div data-testid="text-subtopics-sub" className="mt-1 text-sm text-zinc-600">
                    Subtópicos que detalham este serviço (ex.: HomeCare, peak shaving, continuidade).
                  </div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                  <Sparkles className="h-5 w-5 text-zinc-900" strokeWidth={2.25} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {service.subtopics.map((t, i) => (
                  <div
                    key={t.id}
                    data-testid={`card-subtopic-${t.id}`}
                    className="rounded-[22px] bg-zinc-50 p-5 ring-1 ring-zinc-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div data-testid={`text-subtopic-title-${t.id}`} className="text-sm font-semibold text-zinc-950">
                          {t.title}
                        </div>
                        <div data-testid={`text-subtopic-desc-${t.id}`} className="mt-1 text-sm leading-6 text-zinc-600">
                          {t.description}
                        </div>
                      </div>
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-zinc-200">
                        <ChevronRight className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      {t.bullets.map((b, bi) => (
                        <div
                          key={bi}
                          data-testid={`text-subtopic-bullet-${t.id}-${bi}`}
                          className="flex items-center gap-2 text-[12px] text-zinc-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Subtópico {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

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
