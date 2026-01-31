import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
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

function Header() {
  const [, setLocation] = useLocation();

  return (
    <header data-testid="header-contact" className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <button
            data-testid="button-back-home"
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            Voltar
          </button>

          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-black via-[#12001f] to-[#1d0238] ring-1 ring-black/10">
              <div className="h-4 w-4 rotate-12 rounded-sm bg-white" />
            </div>
            <div>
              <div data-testid="text-header-brand" className="text-sm font-semibold tracking-tight text-zinc-950">
                Track
              </div>
              <div data-testid="text-header-sub" className="-mt-0.5 text-[11px] text-zinc-500">Contato</div>
            </div>
          </div>

          <a
            data-testid="link-header-whatsapp"
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer data-testid="footer-contact" className="w-full bg-white">
      <div className="w-full bg-gradient-to-r from-black via-[#12001f] to-[#1d0238]">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="grid gap-10 py-10 md:grid-cols-[360px_minmax(0,1fr)] md:items-start md:gap-16 md:py-12">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <span className="h-4 w-4 rotate-12 rounded-sm bg-white" />
                </span>
                <span data-testid="text-footer-brand" className="text-sm font-semibold text-white">
                  Track
                </span>
              </div>

              <div data-testid="text-footer-address" className="mt-5 text-xs leading-5 text-white/60">
                Track, Soluções em energia
                <br />
                Brasil
              </div>

              <div className="mt-6 flex items-center gap-3 text-white/70">
                {[{ k: "fb", label: "Facebook" }, { k: "ig", label: "Instagram" }, { k: "in", label: "LinkedIn" }].map((s) => (
                  <a
                    data-testid={`link-social-${s.k}`}
                    key={s.k}
                    href="#"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/8 ring-1 ring-white/10 transition hover:bg-white/12"
                    aria-label={s.label}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div data-testid="text-footer-title" className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[46px]">
                Vamos conversar
                <br />
                sobre sua energia
              </div>
              <p data-testid="text-footer-desc" className="mt-5 max-w-[620px] text-sm leading-6 text-white/60">
                Conte para a gente o contexto e o objetivo. Respondemos com clareza e próximos passos simples.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  data-testid="button-footer-whatsapp"
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                  WhatsApp
                </a>
                <button
                  data-testid="button-footer-home"
                  onClick={() => setLocation("/")}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/12 transition hover:bg-white/14 active:scale-[0.98]"
                >
                  Voltar para Início
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] text-zinc-500">
          <div data-testid="text-footer-copyright">©2026 Track. Todos os direitos reservados</div>
          <div className="flex items-center gap-4">
            <button data-testid="link-footer-home" onClick={() => setLocation("/")} className="transition hover:text-zinc-950">
              Início
            </button>
            <a data-testid="link-footer-email" href="mailto:contato@trackenergia.com.br" className="transition hover:text-zinc-950">
              contato@trackenergia.com.br
            </a>
          </div>
        </div>
      </div>
    </footer>
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
      <Header />

      <main data-testid="main-contact" className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.08] noise" />
          <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="pt-10 sm:pt-12 lg:pt-14">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Pill testId="pill-contact">( contato )</Pill>
              <h1 data-testid="text-contact-title" className="mt-5 text-balance text-[46px] font-medium leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-[56px]">
                Fale com a Track
              </h1>
              <p data-testid="text-contact-subtitle" className="mt-4 max-w-[680px] text-sm leading-6 text-zinc-600">
                Um ponto de contato direto, sem fricção. WhatsApp para resposta rápida, e-mail para detalhes, e telefone para urgências.
              </p>
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
              <motion.section
                data-testid="section-contact-primary"
                className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] p-7 ring-1 ring-black/10 sm:p-8"
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
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1d0238] text-white shadow-sm transition group-hover:bg-[#30045c]">
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
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 ring-1 ring-zinc-200 transition group-hover:bg-zinc-200">
                        <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </span>
                  </a>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[{ icon: <Clock className="h-4 w-4" strokeWidth={2.25} />, t: "Resposta rápida", d: "Fluxo direto no WhatsApp" }, { icon: <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />, t: "Clareza", d: "Sem promessas vagas" }, { icon: <Sparkles className="h-4 w-4" strokeWidth={2.25} />, t: "Próximo passo", d: "Um plano simples de ação" }].map((b, i) => (
                      <div
                        data-testid={`card-benefit-${i}`}
                        key={i}
                        className="rounded-[20px] bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur"
                      >
                        <div className="flex items-center gap-2 text-white">
                          <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 ring-1 ring-white/12">{b.icon}</span>
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
                className="rounded-[32px] bg-white p-6 ring-1 ring-zinc-200 sm:p-7"
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
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-zinc-200">
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
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-zinc-200">
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

            <motion.section
              data-testid="section-contact-note"
              className="mt-6 rounded-[28px] bg-gradient-to-br from-white via-white to-zinc-50 p-6 ring-1 ring-zinc-200 sm:p-7"
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={revealTransition}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div data-testid="text-note-title" className="text-sm font-semibold text-zinc-950">
                    O que enviar na primeira mensagem
                  </div>
                  <div data-testid="text-note-desc" className="mt-1 max-w-[860px] text-sm leading-6 text-zinc-600">
                    Para acelerar, diga: (1) cidade/estado, (2) tipo de operação (casa/empresa), (3) objetivo (reduzir custo, autonomia, mercado livre) e (4) prazo.
                  </div>
                </div>
                <a
                  data-testid="button-note-whatsapp"
                  href={`${whatsapp.waLink}?text=${encodeURIComponent(whatsapp.message)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
                  Abrir WhatsApp
                </a>
              </div>
            </motion.section>

            <div className="h-12" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
