import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

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
      {children}
    </span>
  );
}


export default function Contact() {
  const reduced = usePrefersReducedMotion();

  const whatsapp = useMemo(
    () => ({
      numberLabel: "+55 11 99999-9999",
      waLink: "https://wa.me/5511999999999",
      message:
        "Oi! Vim pelo site da Track e gostaria de conversar sobre soluções de energia (eficiência, geração, armazenamento ou mercado livre).",
    }),
    [],
  );

  const mail = "contato@trackenergia.com.br";
  const phoneLabel = "+55 11 99999-9999";
  const phoneTel = "+5511999999999";

  return (
    <div data-testid="page-contact" className="min-h-screen bg-white">
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
              data-testid="link-header-home"
              href="/"
              className="relative z-10 inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 transition hover:text-zinc-900"
            >
              Voltar
            </a>

            <div data-testid="text-header-title" className="relative z-10 text-xs font-semibold text-zinc-700">
              Contato
            </div>

            <a
              data-testid="link-header-services"
              href="/servicos"
              className="relative z-10 inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 transition hover:text-zinc-900"
            >
              Serviços
            </a>
          </div>
        </div>
      </header>

      <main data-testid="main-contact" className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.08] noise" />
          <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12 overflow-x-hidden">
          <div className="pt-24 sm:pt-24 lg:pt-28">
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
                <Pill testId="pill-contact">( contato )</Pill>
              </div>
              <h1 data-testid="text-contact-title" className="mt-5 text-balance text-[46px] font-medium leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-[56px]">
                Fale com a Track
              </h1>
              <p data-testid="text-contact-subtitle" className="mt-4 max-w-[680px] text-sm leading-6 text-zinc-600">
                Um ponto de contato direto, sem fricção. WhatsApp para resposta rápida, e-mail para detalhes, e telefone para urgências.
              </p>
            </motion.div>

            <div className="mt-8 grid w-full justify-items-center gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
              <motion.section
                data-testid="section-contact-primary"
                className="relative w-full max-w-[760px] overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] p-7 ring-1 ring-black/10 sm:p-8 lg:max-w-none"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="absolute inset-0 hero-overlay opacity-65" />
                <div className="absolute inset-0 noise opacity-[0.20]" />

                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div data-testid="text-whatsapp-title" className="text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:text-[40px]">
                        WhatsApp
                        <span className="subtle-grad-dark"> imediato</span>
                      </div>
                      <div data-testid="text-whatsapp-sub" className="mt-3 max-w-[520px] text-sm leading-6 text-white/70">
                        Clique e comece agora. A gente responde com clareza e direciona os próximos passos.
                      </div>
                    </div>

                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                      <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                  </div>

                  <a
                    data-testid="button-whatsapp-primary"
                    href={`${whatsapp.waLink}?text=${encodeURIComponent(whatsapp.message)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 group inline-flex w-full items-center justify-between gap-4 rounded-[22px] bg-white px-5 py-4 text-left text-zinc-950 shadow-lg shadow-black/20 ring-1 ring-white/30 transition hover:bg-zinc-50 active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1d0238] text-white shadow-sm transition group-hover:bg-[#30045c]">
                        <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
                      </span>
                      <span>
                        <span data-testid="text-whatsapp-cta" className="block text-sm font-semibold">
                          Entrar em contato agora
                        </span>
                        <span data-testid="text-whatsapp-number" className="mt-0.5 block text-[12px] text-zinc-600">
                          {whatsapp.numberLabel}
                        </span>
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900">
                      Abrir
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 transition group-hover:bg-zinc-200">
                        <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </span>
                  </a>

                  <div className="mt-7 hidden gap-3 sm:grid sm:grid-cols-3">
                    {[{ icon: <Clock className="h-4 w-4" strokeWidth={2.25} />, t: "Resposta rápida", d: "Fluxo direto no WhatsApp" }, { icon: <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />, t: "Clareza", d: "Sem promessas vagas" }, { icon: <Sparkles className="h-4 w-4" strokeWidth={2.25} />, t: "Próximo passo", d: "Um plano simples de ação" }].map((b, i) => (
                      <div
                        data-testid={`card-benefit-${i}`}
                        key={i}
                        className="rounded-[20px] bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur"
                      >
                        <div className="flex items-center gap-2 text-white">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/12">{b.icon}</span>
                          <div data-testid={`text-benefit-title-${i}`} className="text-xs font-semibold">
                            {b.t}
                          </div>
                        </div>
                        <div data-testid={`text-benefit-desc-${i}`} className="mt-2 text-[11px] leading-5 text-white/65">
                          {b.d}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                data-testid="section-contact-options"
                className="w-full max-w-[760px] rounded-[32px] bg-white p-6 ring-1 ring-zinc-200 sm:p-7 lg:max-w-none"
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div data-testid="text-options-title" className="text-lg font-semibold tracking-tight text-zinc-950">
                      Outras formas
                    </div>
                    <div data-testid="text-options-sub" className="mt-1 text-sm text-zinc-600">
                      Prefere e-mail, telefone ou redes sociais? Sem problema.
                    </div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                    <Sparkles className="h-5 w-5 text-zinc-800" strokeWidth={2.25} />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <a
                    data-testid="button-email"
                    href={`mailto:${mail}`}
                    className="group flex items-center justify-between gap-4 rounded-[22px] bg-zinc-50 px-4 py-4 ring-1 ring-zinc-200 transition hover:bg-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white ring-1 ring-zinc-200">
                        <Mail className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
                      </span>
                      <span>
                        <span data-testid="text-email-label" className="block text-xs font-semibold text-zinc-950">
                          E-mail
                        </span>
                        <span data-testid="text-email-value" className="mt-0.5 block text-[12px] text-zinc-600">
                          {mail}
                        </span>
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 transition group-hover:translate-x-0.5">Abrir</span>
                  </a>

                  <a
                    data-testid="button-phone"
                    href={`tel:${phoneTel}`}
                    className="group flex items-center justify-between gap-4 rounded-[22px] bg-zinc-50 px-4 py-4 ring-1 ring-zinc-200 transition hover:bg-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white ring-1 ring-zinc-200">
                        <Phone className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
                      </span>
                      <span>
                        <span data-testid="text-phone-label" className="block text-xs font-semibold text-zinc-950">
                          Celular
                        </span>
                        <span data-testid="text-phone-value" className="mt-0.5 block text-[12px] text-zinc-600">
                          {phoneLabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 transition group-hover:translate-x-0.5">Ligar</span>
                  </a>
                </div>

                <div className="mt-7">
                  <div data-testid="text-social-title" className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Redes sociais
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <a
                      data-testid="button-social-facebook"
                      href="#"
                      className="group flex items-center justify-center gap-2 rounded-[18px] bg-white px-3 py-3 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" strokeWidth={2.25} />
                      Facebook
                    </a>
                    <a
                      data-testid="button-social-instagram"
                      href="#"
                      className="group flex items-center justify-center gap-2 rounded-[18px] bg-white px-3 py-3 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" strokeWidth={2.25} />
                      Instagram
                    </a>
                    <a
                      data-testid="button-social-linkedin"
                      href="#"
                      className="group flex items-center justify-center gap-2 rounded-[18px] bg-white px-3 py-3 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2.25} />
                      LinkedIn
                    </a>
                  </div>

                  <div data-testid="text-social-hint" className="mt-3 text-[11px] leading-5 text-zinc-500">
                    Se preferir, mande uma mensagem curta com seu objetivo (economia, resiliência, expansão ou migração para mercado livre).
                  </div>
                </div>
              </motion.section>
            </div>

            <div className="h-12" />
          </div>
        </div>
      </main>

    </div>
  );
}
