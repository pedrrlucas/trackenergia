import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
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

function useScrollReveal(reduced: boolean, options?: { y?: number; x?: number; scale?: number }) {
  const y = options?.y ?? 18;
  const x = options?.x ?? 0;
  const scale = options?.scale ?? 1;

  if (reduced) {
    return { viewport: revealViewport, transition: revealTransition } as const;
  }

  return {
    initial: { opacity: 0, y, x, scale },
    whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
    viewport: revealViewport,
    transition: revealTransition,
  } as const;
}

function Field({
  label,
  value,
  icon,
  href,
  testId,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  href: string;
  testId: string;
}) {
  return (
    <a
      data-testid={testId}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group relative flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/14"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/12 transition group-hover:bg-white/12">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold tracking-wide text-white/72">{label}</div>
          <div className="truncate text-sm font-semibold text-white">{value}</div>
        </div>
      </div>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition group-hover:bg-white/14 group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4 text-white/90" strokeWidth={2.3} />
      </span>
    </a>
  );
}

function SocialChip({
  label,
  icon,
  href,
  testId,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  testId: string;
}) {
  return (
    <a
      data-testid={testId}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/14 backdrop-blur transition hover:bg-white/14"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition group-hover:bg-white/14">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

export default function Contact() {
  const reduced = usePrefersReducedMotion();
  const reveal = useScrollReveal(reduced);

  const whatsappHref = useMemo(() => {
    const phoneE164 = "5511999999999";
    const text = encodeURIComponent("Olá! Quero falar com a Track sobre soluções de energia.");
    return `https://wa.me/${phoneE164}?text=${text}`;
  }, []);

  return (
    <div data-testid="page-contact" className="min-h-screen bg-zinc-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 noise" />

        <div className="container-page relative pt-10 md:pt-14">
          <div className="flex items-center justify-between gap-4">
            <a
              data-testid="link-back-home"
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/14 backdrop-blur transition hover:bg-white/14"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
              Voltar
            </a>

            <div className="hidden items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/12 backdrop-blur md:flex">
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
              <span data-testid="text-location">Brasil</span>
            </div>
          </div>

          <motion.div {...reveal} className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80 ring-1 ring-white/14">
                <AtSign className="h-3.5 w-3.5" strokeWidth={2.2} />
                <span data-testid="pill-contact">Contato</span>
              </div>

              <h1 data-testid="text-contact-title" className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Vamos desenhar a melhor estratégia de energia para o seu negócio
              </h1>
              <p data-testid="text-contact-subtitle" className="mt-4 max-w-2xl text-pretty text-base text-white/74 md:text-lg">
                Fale com a Track e receba um direcionamento claro — sem enrolação. WhatsApp para contato imediato e, se preferir,
                e-mail, telefone e redes sociais.
              </p>

              <div className="mt-8">
                <a
                  data-testid="button-whatsapp"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-3xl bg-[#1d0238] px-6 py-5 shadow-[0_22px_70px_-44px_rgba(0,0,0,.85)] ring-1 ring-white/12 transition hover:bg-[#30045c] active:scale-[0.99]"
                >
                  <div className="absolute inset-0 opacity-60" style={{
                    background:
                      "radial-gradient(900px 300px at 20% 20%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(900px 300px at 80% 30%, rgba(176,132,255,0.22), transparent 60%)",
                  }} />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                        <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.25} />
                      </span>
                      <div>
                        <div data-testid="text-whatsapp-title" className="text-sm font-semibold text-white/85">
                          Contato imediato
                        </div>
                        <div data-testid="text-whatsapp-cta" className="text-lg font-semibold text-white">
                          Falar no WhatsApp
                        </div>
                      </div>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.4} />
                    </span>
                  </div>

                  <div className="relative mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/75">
                    <span data-testid="badge-response" className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/12">
                      Resposta rápida
                    </span>
                    <span data-testid="badge-orcamento" className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/12">
                      Orçamento e diagnóstico
                    </span>
                    <span data-testid="badge-consultoria" className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/12">
                      Consultoria técnica
                    </span>
                  </div>
                </a>
              </div>

              <motion.div {...useScrollReveal(reduced, { y: 16 })} className="mt-8 grid gap-3 md:grid-cols-2">
                <Field
                  testId="link-email"
                  label="E-mail"
                  value="contato@track.com.br"
                  href="mailto:contato@track.com.br"
                  icon={<Mail className="h-5 w-5 text-white/90" strokeWidth={2.25} />}
                />
                <Field
                  testId="link-phone"
                  label="Celular"
                  value="(11) 99999-9999"
                  href="tel:+5511999999999"
                  icon={<Phone className="h-5 w-5 text-white/90" strokeWidth={2.25} />}
                />
              </motion.div>
            </div>

            <motion.aside
              {...useScrollReveal(reduced, { y: 18, x: 10, scale: 0.98 })}
              className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/14 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div data-testid="text-contact-card-title" className="text-sm font-semibold text-white/80">
                    Outros canais
                  </div>
                  <div data-testid="text-contact-card-sub" className="mt-2 text-balance text-2xl font-semibold tracking-tight">
                    Acompanhe e chame a gente
                  </div>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                  <AtSign className="h-5 w-5 text-white/90" strokeWidth={2.2} />
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SocialChip
                  testId="link-social-instagram"
                  label="Instagram"
                  href="https://instagram.com"
                  icon={<Instagram className="h-4 w-4 text-white/90" strokeWidth={2.25} />}
                />
                <SocialChip
                  testId="link-social-linkedin"
                  label="LinkedIn"
                  href="https://linkedin.com"
                  icon={<Linkedin className="h-4 w-4 text-white/90" strokeWidth={2.25} />}
                />
              </div>

              <div className="mt-6 rounded-2xl bg-white/8 p-4 ring-1 ring-white/12">
                <div data-testid="text-contact-tip" className="text-sm font-semibold text-white">
                  Dica rápida
                </div>
                <p data-testid="text-contact-tip-body" className="mt-2 text-sm text-white/72">
                  Se você já tiver a sua conta de energia em mãos, acelera bastante a primeira conversa.
                </p>
              </div>

              <div className="mt-6">
                <a
                  data-testid="button-email"
                  href="mailto:contato@track.com.br"
                  className="group inline-flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[0_10px_30px_-20px_rgba(0,0,0,.65)] transition active:scale-[0.99]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" strokeWidth={2.25} />
                    Enviar e-mail
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1d0238] text-white transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </a>
              </div>

              <div className="mt-6 text-xs text-white/60">
                <div data-testid="text-disclaimer">Atendimento em horário comercial.</div>
              </div>
            </motion.aside>
          </motion.div>

          <div className="py-14" />
        </div>
      </div>
    </div>
  );
}
