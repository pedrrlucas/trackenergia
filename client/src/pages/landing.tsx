import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  MoveUpRight,
  Quote,
  Star,
} from "lucide-react";

const revealViewport = { once: true, amount: 0.22 } as const;
const revealTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;

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

function usePreloadImages(urls: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const unique = Array.from(new Set(urls)).filter(Boolean);

    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    for (const src of unique) {
      const img = new Image();
      imgs.push(img);
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }

    return () => {
      cancelled = true;
      if (cancelled) imgs.length = 0;
    };
  }, [urls.join("|")]);
}
import heroImg from "@/assets/images/hero-solar.jpg";
import processImg from "@/assets/images/process-installation.jpg";
import productImg from "@/assets/images/product-solarfield.jpg";
import product1 from "@/assets/images/product-1.jpg";
import product2 from "@/assets/images/product-2.jpg";
import product3 from "@/assets/images/product-3.jpg";
import product4 from "@/assets/images/product-4.jpg";
import product5 from "@/assets/images/product-5.jpg";
import product6 from "@/assets/images/product-6.jpg";
import product7 from "@/assets/images/product-7.jpg";
import t1 from "@/assets/images/testimonial-1.png";
import t2 from "@/assets/images/testimonial-2.png";
import t3 from "@/assets/images/testimonial-3.png";

type Product = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  specLeft: string[];
  specRight: string[];
  image: string;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  avatar: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function Pill({
  children,
  muted,
  testId,
}: {
  children: React.ReactNode;
  muted?: boolean;
  testId: string;
}) {
  return (
    <span
      data-testid={testId}
      className={
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-wide " +
        (muted
          ? "bg-white/10 text-white/70 ring-1 ring-white/15"
          : "bg-[#1d0238]/7 text-zinc-700 ring-1 ring-[#1d0238]/18")
      }
    >
      <span className={muted ? "h-1.5 w-1.5 rounded-full bg-white/70" : "h-1.5 w-1.5 rounded-full bg-[#30045c]"} />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  onClick,
  testId,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  testId: string;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_10px_30px_-20px_rgba(0,0,0,.65)] transition active:scale-[0.98]"
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1d0238] text-white transition group-hover:translate-x-0.5">
        <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </button>
  );
}

function GhostButton({
  children,
  onClick,
  icon,
  testId,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  testId: string;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/9 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/14 active:scale-[0.98]"
    >
      {icon ? (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/14 ring-1 ring-white/14 transition group-hover:bg-white/16">
          {icon}
        </span>
      ) : null}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}

function Nav({ onContact }: { onContact: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [travelPx, setTravelPx] = useState(0);
  const [arrowScale, setArrowScale] = useState(1);
  const [arrowGone, setArrowGone] = useState(false);
  const [logoSwap, setLogoSwap] = useState(false);
  const swappedRef = React.useRef(false);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const arrowRef = React.useRef<HTMLImageElement | null>(null);
  const logoRef = React.useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const arrowImg = new Image();
    arrowImg.src = "/attached_assets/arrow.png";

    const startWhenReady = () => {
      const done = () => setReady(true);
      if (arrowImg.complete) return done();
      arrowImg.addEventListener("load", done, { once: true });
      arrowImg.addEventListener("error", done, { once: true });
    };

    if (document.readyState === "complete") {
      startWhenReady();
      return;
    }

    const onLoad = () => {
      startWhenReady();
      window.removeEventListener("load", onLoad);
    };

    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!ready || reduced) {
      setProgress(reduced ? 1 : 0);
      return;
    }

    const headerEl = headerRef.current;
    const arrowEl = arrowRef.current;
    const logoEl = logoRef.current;
    if (!headerEl || !arrowEl || !logoEl) return;

    const measure = () => {
      const header = headerEl.getBoundingClientRect();
      const arrow = arrowEl.getBoundingClientRect();
      const logo = logoEl.getBoundingClientRect();

      const startX = header.right + 8;
      const endX = logo.left + logo.width * 0.5 - arrow.width * 0.06;
      const distance = Math.max(1, startX - endX);

      return { header, startX, endX, distance };
    };

    let raf = 0;
    const start = performance.now();
    const total = 920;

    let last = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);

      const m = measure();
      if (m) {
        const x = m.startX - eased * m.distance;
        const p = (m.startX - x) / m.distance;

        const shrinkStart = 0.7;
        const shrinkP = Math.max(0, Math.min(1, (p - shrinkStart) / (1 - shrinkStart)));
        const scale = 1 - 0.1 * shrinkP;

        setTravelPx(x - m.header.left);
        setArrowScale(scale);

        if (now - last > 24 || t >= 1) {
          last = now;
          setProgress(Math.max(0, Math.min(1, p)));
          if (p >= 0.999 && !swappedRef.current) {
            swappedRef.current = true;
            setLogoSwap(true);
            setArrowGone(true);
          }
        }
      }

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduced]);

  const showTestimonials = progress >= 0.26;
  const showProcess = progress >= 0.42;
  const showProduct = progress >= 0.58;
  const showHome = progress >= 0.74;

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
      <div className="container-page pointer-events-auto">
        <div
          ref={headerRef}
          data-testid="header-shell"
          className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white/10 px-4 py-3 ring-1 ring-white/16 backdrop-blur md:backdrop-blur-lg"
        >
          <div
            data-testid="bg-header-glass-sheen"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 78%, rgba(255,255,255,0.36) 100%)",
              opacity: 0.95,
              zIndex: 0,
            }}
          />
          <div
            data-testid="bg-header-glass-vignette"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 56%)",
              zIndex: 0,
            }}
          />
          <div data-testid="bg-header-glass-noise" className="pointer-events-none absolute inset-0 noise opacity-[0.08]" />

          <div
            data-testid="bg-header-glass-edge"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, rgba(0,0,0,0.10) 100%)",
              opacity: 0.35,
              zIndex: 0,
            }}
          />

          <div
            data-testid="bg-header-glass-highlight"
            className="pointer-events-none absolute -left-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[-12deg] rounded-full blur-md"
            style={{ background: "rgba(255,255,255,0.30)" }}
          />
          <div
            data-testid="bg-header-glass-highlight-2"
            className="pointer-events-none absolute -right-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[12deg] rounded-full blur-md"
            style={{ background: "rgba(255,255,255,0.20)" }}
          />

          {!arrowGone ? (
            <div data-testid="anim-arrow-layer" className="pointer-events-none absolute inset-0">
              <div
                data-testid="anim-arrow-track"
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{
                  transform: `translate3d(${travelPx}px, 0, 0)`,
                  willChange: "transform",
                }}
              >
                <div
                  data-testid="anim-arrow-mask"
                  className="relative overflow-hidden"
                  style={{
                    width: `${Math.max(1, Math.round(progress * 100))}%`,
                    willChange: "width",
                  }}
                >
                  <img
                    ref={arrowRef}
                    data-testid="img-header-arrow"
                    src="/attached_assets/arrow.png"
                    alt="Seta"
                    className="h-[46px] w-auto origin-left opacity-[0.98] md:h-[52px]"
                    style={{
                      transform: `scale(${arrowScale})`,
                      willChange: "transform",
                      imageRendering: "auto",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <a data-testid="link-logo" href="#top" className="relative flex items-center gap-3">
            <span data-testid="text-header-tagline" className="sr-only">
              Da análise à operação: eficiência, geração, armazenamento e gestão de energia com acompanhamento.
            </span>
            <span ref={logoRef} data-testid="logo-mark" className="grid h-10 w-10 place-items-center">
              {!logoSwap ? (
                <img
                  data-testid="img-logo"
                  src="/attached_assets/logo.png"
                  alt="Track"
                  className="h-10 w-10 object-contain"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              ) : (
                <img
                  data-testid="img-logo-final"
                  src="/attached_assets/official-logo.png"
                  alt="Track"
                  className="h-10 w-10 object-contain animate-[logoBoop_520ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              )}
            </span>
            <span data-testid="text-logo" className="text-sm font-semibold text-white">
              Track
            </span>
          </a>

          <div data-testid="nav-desktop" className="hidden items-center gap-7 text-xs font-medium text-white/78 md:flex">
            <motion.a
              data-testid="link-nav-home"
              href="#top"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showHome ? "auto" : "none", visibility: showHome ? "visible" : "hidden" }}
            >
              Início
            </motion.a>
            <motion.a
              data-testid="link-nav-product"
              href="#product"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showProduct ? "auto" : "none", visibility: showProduct ? "visible" : "hidden" }}
            >
              Serviços
            </motion.a>
            <motion.a
              data-testid="link-nav-process"
              href="#process"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showProcess ? "auto" : "none", visibility: showProcess ? "visible" : "hidden" }}
            >
              Abordagem
            </motion.a>
            <motion.a
              data-testid="link-nav-testimonials"
              href="#testimonials"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showTestimonials ? "auto" : "none", visibility: showTestimonials ? "visible" : "hidden" }}
            >
              Depoimentos
            </motion.a>
          </div>

          <button
            data-testid="button-contact"
            onClick={onContact}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 backdrop-blur-xl transition hover:bg-white/80 hover:text-zinc-800 active:scale-[0.98]"
          >
            <span className="relative">
              <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-black/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Fale Conosco</span>
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 ring-1 ring-black/5 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-black/8 group-active:translate-x-0">
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700 transition duration-300 group-hover:translate-x-[1px]" strokeWidth={2.25} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          data-testid="modal-video"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] bg-[#1d0238] shadow-2xl ring-1 ring-white/10"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="text-sm font-semibold text-white">Visão geral Track</div>
              <button
                data-testid="button-close-video"
                onClick={onClose}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/14"
              >
                Fechar
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                data-testid="iframe-video"
                className="h-full w-full"
                src="https://www.youtube.com/embed/1kUE0BZtTRc?autoplay=1&mute=1"
                title="Vídeo Track"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Hero({ onPlay, onContact }: { onPlay: () => void; onContact: () => void }) {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-black">
      <img
        data-testid="img-hero"
        src={heroImg}
        alt="Energia e infraestrutura"
        className="h-screen w-full object-cover brightness-[0.78]"
      />
      <div className="absolute inset-0 hero-overlay noise" />

      <div className="absolute inset-0">
        <Nav onContact={onContact} />

        <div className="container-page pt-4 sm:pt-6">
          <div className="pt-[104px] sm:pt-[112px] lg:pt-[132px]">
            <div className="max-w-[520px] lg:max-w-[640px]">
              <h1
                data-testid="text-hero-title"
                className="text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[66px]"
              >
                Soluções de energia
                <br />
                com visão crítica
                <br />
                e execução completa
              </h1>

              <p
                data-testid="text-hero-subtitle"
                className="mt-4 max-w-[460px] text-xs leading-5 text-white/72 sm:text-sm sm:leading-6"
              >
                A Track entrega soluções reais em energia: da eficiência à geração, armazenamento e mercado livre, com proposta sob medida, execução e monitoramento contínuo.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryButton testId="button-explore-now" onClick={onContact}>
                  Vamos conversar
                </PrimaryButton>

                <GhostButton
                  testId="button-play-video"
                  onClick={onPlay}
                  icon={<CirclePlay className="h-4 w-4" strokeWidth={2.25} />}
                >
                  Ver vídeo
                </GhostButton>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between lg:mt-14">
              <div />

              <div className="flex w-full max-w-[360px] items-center justify-between gap-3 rounded-[22px] bg-white/10 p-3 ring-1 ring-white/16 backdrop-blur md:max-w-[420px] lg:max-w-[520px]">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/12">
                    <img data-testid="img-hero-card" src={productImg} alt="Painel" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div data-testid="text-hero-card-title" className="text-xs font-semibold text-white">
                      Track | Soluções em energia
                    </div>
                    <div data-testid="text-hero-card-desc" className="mt-0.5 text-[11px] leading-4 text-white/65">
                      Da análise à operação: eficiência, geração, armazenamento e gestão de energia com acompanhamento.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    data-testid="button-hero-card-prev"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14 active:scale-[0.98]"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" strokeWidth={2.25} />
                  </button>
                  <button
                    data-testid="button-hero-card-next"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14 active:scale-[0.98]"
                  >
                    <ChevronRight className="h-4 w-4 text-white" strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      className="container-page py-12 sm:py-16 lg:py-20"
      initial={reduced ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-center lg:grid-cols-[420px_1fr] lg:gap-14">
        <div className="relative">
          <Pill testId="pill-about" muted={false}>
            ( sobre a Track )
          </Pill>

          <div className="mt-5">
            <div
              data-testid="img-about-team-placeholder"
              className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-zinc-100 via-white to-zinc-100 ring-1 ring-zinc-200 sm:aspect-[16/9]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#100121]/10 via-transparent to-[#30045c]/10" />
              <div className="absolute inset-0 noise opacity-[0.08]" />

              <div className="absolute inset-0 grid place-items-center">
                <div data-testid="text-about-team-placeholder" className="text-xs font-medium text-zinc-500">
                  Espaço reservado para foto
                </div>
              </div>

              <button
                data-testid="button-about-how-we-work"
                className="group absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
              >
                Como trabalhamos
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="md:pl-10 lg:pl-0 lg:col-start-2"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
        >
          <div className="lg:ml-auto lg:max-w-[740px]">
            <h2
              data-testid="text-about-title"
              className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-[46px] lg:text-[56px]"
            >
              Fundada por dois sócios
              <br />
              vindos do setor solar e
              <br />
              <span className="subtle-grad">apaixonados</span> pela
              <br />
              <span className="subtle-grad">vastidão</span> de possibilidades
            </h2>
            <p data-testid="text-about-desc" className="mt-4 w-full text-sm leading-6 text-zinc-500">
              A Track nasceu em 2024 com um propósito diferente do mercado tradicional: não vendemos equipamentos. Nosso foco é entregar{" "}
              <span className="font-medium text-zinc-800">soluções reais</span> para quem precisa, entendendo o setor com profundidade e conectando cada cliente à solução energética ideal, sem excessos e sem soluções genéricas.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function Landing() {
  const reduced = usePrefersReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);

  const onContact = () => {
    window.location.href = "/contato";
  };

  const products = useMemo<Product[]>(
    () => [
      {
        id: "eficiencia",
        tag: "Eficiência",
        title: "Eficiência energética",
        subtitle: "Diagnóstico + roadmap + execução",
        desc: "Corte desperdícios com dados, priorização e acompanhamento — sem promessas vagas.",
        specLeft: ["Medição e mapa de perdas", "Roadmap de payback", "Gestão de demanda"],
        specRight: ["KPIs e governança", "Plano em 30–60 dias", "Acompanhamento"],
        image: product1,
      },
      {
        id: "geracao",
        tag: "Geração",
        title: "Sistemas de geração própria",
        subtitle: "Projeto + implantação + operação",
        desc: "Dimensionamento sob medida, implantação segura e integração ao consumo real.",
        specLeft: ["Projeto executivo", "Implantação e comissionamento", "Integração ao local"],
        specRight: ["Monitoramento", "Relatórios", "Evolução contínua"],
        image: product2,
      },
      {
        id: "armazenamento",
        tag: "Armazenamento",
        title: "Armazenamento de energia",
        subtitle: "Resiliência e estabilidade",
        desc: "Arquitetura para peak shaving, back-up e continuidade — com segurança e integração.",
        specLeft: ["Arquitetura e segurança", "Peak shaving", "Back-up"],
        specRight: ["Integrações", "Operação", "Indicadores"],
        image: product3,
      },
      {
        id: "mercado-livre",
        tag: "Mercado",
        title: "Mercado livre de energia",
        subtitle: "Migração + gestão + governança",
        desc: "Estratégia, migração e acompanhamento para manter controle de risco e previsibilidade.",
        specLeft: ["Viabilidade e modelagem", "Migração", "Gestão pós-migração"],
        specRight: ["Relatórios", "Governança", "Risco controlado"],
        image: product4,
      },
      {
        id: "assinatura",
        tag: "Assinatura",
        title: "Assinatura de energia",
        subtitle: "Economia previsível",
        desc: "Modelo simples com condições claras, aderência ao perfil e acompanhamento constante.",
        specLeft: ["Condições transparentes", "Aderência ao perfil", "Onboarding"],
        specRight: ["Acompanhamento", "Ajustes", "Previsibilidade"],
        image: product5,
      },
      {
        id: "eletromobilidade",
        tag: "Eletromobilidade",
        title: "Eletromobilidade",
        subtitle: "Infra e operação",
        desc: "Projeto elétrico, seleção de hardware e implantação com rotina pronta para escalar.",
        specLeft: ["Projeto elétrico", "Seleção de hardware", "Implantação"],
        specRight: ["Operação", "Manutenção", "Escala"],
        image: product6,
      },
      {
        id: "om-fv",
        tag: "O&M",
        title: "O&M fotovoltaico",
        subtitle: "Performance contínua",
        desc: "Rotina, indicadores e manutenção para manter confiabilidade e performance no tempo.",
        specLeft: ["Inspeções", "Limpeza", "Correções"],
        specRight: ["Relatórios", "KPIs", "Plano de ação"],
        image: product7,
      },
    ],
    [],
  );

  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        id: "1",
        name: "Cliente A",
        role: "Operações",
        city: "São Paulo",
        quote: "A Track trouxe clareza e governança. O plano virou rotina e os números apareceram rápido.",
        rating: 5,
        avatar: t1,
      },
      {
        id: "2",
        name: "Cliente B",
        role: "Financeiro",
        city: "Campinas",
        quote: "A proposta foi objetiva, com acompanhamento de verdade. Sem ruído e sem promessas vagas.",
        rating: 5,
        avatar: t2,
      },
      {
        id: "3",
        name: "Cliente C",
        role: "Engenharia",
        city: "Curitiba",
        quote: "Execução bem feita, checklist e transparência. A operação ficou muito mais previsível.",
        rating: 5,
        avatar: t3,
      },
    ],
    [],
  );

  usePreloadImages([heroImg, processImg, productImg, ...products.map((p) => p.image), t1, t2, t3]);

  return (
    <div data-testid="page-landing" className="min-h-screen bg-white">
      <main data-testid="main-landing" className="relative">
        <Hero onPlay={() => setVideoOpen(true)} onContact={onContact} />
        <About />

        <section id="product" className="container-page py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-center lg:grid-cols-[420px_1fr] lg:gap-14">
            <div>
              <Pill testId="pill-product" muted={false}>
                ( serviços )
              </Pill>
              <h2
                data-testid="text-product-title"
                className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-[46px] lg:text-[56px]"
              >
                Da análise à operação,
                <br />
                com acompanhamento.
              </h2>
              <p data-testid="text-product-desc" className="mt-4 max-w-[520px] text-sm leading-6 text-zinc-600">
                Eficiência, geração, armazenamento e gestão de energia com método. Cada serviço tem escopo claro, entregáveis e um próximo passo.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  data-testid="button-see-services"
                  href="/servicos"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
                >
                  Ver serviços
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </a>

                <a
                  data-testid="button-contact-product"
                  href="/contato"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-white active:scale-[0.98]"
                >
                  Fale com a Track
                </a>
              </div>
            </div>

            <ProductCarousel products={products} reduced={reduced} />
          </div>
        </section>

        <Process reduced={reduced} />
        <Testimonials testimonials={testimonials} reduced={reduced} />
      </main>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

function ProductCarousel({
  products,
  reduced,
}: {
  products: Product[];
  reduced: boolean;
}) {
  const [active, setActive] = useState(0);

  const activeProduct = products[active];

  const reveal = useScrollReveal(reduced, { y: 16 });

  return (
    <div data-testid="section-product-carousel" className="relative">
      <div className="relative overflow-hidden rounded-[34px] bg-white ring-1 ring-zinc-200">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="absolute inset-0 noise opacity-[0.06]" />

        <div className="relative p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div data-testid="text-product-tag" className="inline-flex items-center gap-2 rounded-full bg-[#1d0238]/7 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-700 ring-1 ring-[#1d0238]/18">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
                {activeProduct.tag}
              </div>
              <div data-testid="text-product-title" className="mt-4 text-balance text-[30px] font-medium leading-[1.06] tracking-[-0.03em] text-zinc-950 sm:text-[34px]">
                {activeProduct.title}
              </div>
              <div data-testid="text-product-subtitle" className="mt-2 max-w-[560px] text-sm leading-6 text-zinc-600">
                {activeProduct.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                data-testid="button-product-prev"
                onClick={() => setActive((a) => (a - 1 + products.length) % products.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 ring-1 ring-zinc-200 transition hover:bg-white active:scale-[0.98]"
              >
                <ChevronLeft className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
              </button>
              <button
                data-testid="button-product-next"
                onClick={() => setActive((a) => (a + 1) % products.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 ring-1 ring-zinc-200 transition hover:bg-white active:scale-[0.98]"
              >
                <ChevronRight className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr] lg:gap-7">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] ring-1 ring-black/10">
              <div className="absolute inset-0 hero-overlay opacity-60" />
              <div className="absolute inset-0 noise opacity-[0.18]" />

              <div className="relative p-6">
                <div data-testid="text-product-desc" className="text-sm leading-6 text-white/75">
                  {activeProduct.desc}
                </div>

                <div className="mt-6 grid gap-2">
                  {[...activeProduct.specLeft, ...activeProduct.specRight].slice(0, 6).map((s, i) => (
                    <div
                      key={s}
                      data-testid={`text-product-spec-${activeProduct.id}-${i}`}
                      className="flex items-center gap-2 text-[12px] text-white/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      {s}
                    </div>
                  ))}
                </div>

                <a
                  data-testid="link-product-detail"
                  href={`/servicos/${activeProduct.id}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 shadow-lg shadow-black/15 transition hover:bg-zinc-50 active:scale-[0.99]"
                >
                  Ver detalhes
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1d0238] text-white">
                    <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </a>
              </div>
            </div>

            <motion.div {...reveal} className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-zinc-200">
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
              <div className="absolute inset-0 noise opacity-[0.06]" />

              <img
                data-testid="img-product"
                src={activeProduct.image}
                alt={activeProduct.title}
                className="relative h-[260px] w-full object-cover sm:h-[320px]"
              />
              <div className="relative p-6">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    {activeProduct.specLeft.map((s, i) => (
                      <div
                        key={s}
                        data-testid={`text-product-left-${activeProduct.id}-${i}`}
                        className="flex items-center gap-2 text-[12px] text-zinc-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    {activeProduct.specRight.map((s, i) => (
                      <div
                        key={s}
                        data-testid={`text-product-right-${activeProduct.id}-${i}`}
                        className="flex items-center gap-2 text-[12px] text-zinc-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#30045c]" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {products.map((p, idx) => (
          <button
            key={p.id}
            data-testid={`button-product-tab-${p.id}`}
            onClick={() => setActive(idx)}
            className={
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition " +
              (idx === active
                ? "bg-[#1d0238] text-white ring-[#1d0238]"
                : "bg-zinc-50 text-zinc-700 ring-zinc-200 hover:bg-white")
            }
          >
            <span className={"h-1.5 w-1.5 rounded-full " + (idx === active ? "bg-white" : "bg-[#30045c]")} />
            {p.tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function Process({ reduced }: { reduced: boolean }) {
  const reveal = useScrollReveal(reduced, { y: 18 });

  return (
    <section id="process" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="absolute inset-0 opacity-[0.08] noise" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#30045c]/16 via-[#1d0238]/10 to-transparent blur-3xl" />
      </div>

      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-center lg:grid-cols-[420px_1fr] lg:gap-14">
          <div>
            <Pill testId="pill-process" muted={false}>
              ( abordagem )
            </Pill>
            <h2
              data-testid="text-process-title"
              className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-[46px] lg:text-[56px]"
            >
              Um método
              <br />
              simples e executável.
            </h2>
            <p data-testid="text-process-desc" className="mt-4 max-w-[520px] text-sm leading-6 text-zinc-600">
              Diagnóstico, plano e operação com acompanhamento. A Track entra para reduzir ruído e deixar o caminho claro.
            </p>
          </div>

          <motion.div {...reveal} className="relative overflow-hidden rounded-[34px] bg-white ring-1 ring-zinc-200">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
            <div className="absolute inset-0 noise opacity-[0.06]" />

            <img data-testid="img-process" src={processImg} alt="Processo" className="relative h-[320px] w-full object-cover sm:h-[360px]" />

            <div className="relative p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Análise", "Proposta", "Acompanhamento"].map((t, i) => (
                  <div
                    key={t}
                    data-testid={`card-process-${i}`}
                    className="rounded-[20px] bg-zinc-50 p-4 ring-1 ring-zinc-200"
                  >
                    <div data-testid={`text-process-title-${i}`} className="text-xs font-semibold text-zinc-950">
                      {t}
                    </div>
                    <div data-testid={`text-process-desc-${i}`} className="mt-2 text-[11px] leading-5 text-zinc-600">
                      {i === 0
                        ? "Entendemos consumo, perdas e oportunidades com dados."
                        : i === 1
                          ? "Plano claro com escopo, cronograma e retorno esperado."
                          : "Acompanhamos indicadores e ajustes para virar rotina."}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials, reduced }: { testimonials: Testimonial[]; reduced: boolean }) {
  const reveal = useScrollReveal(reduced, { y: 16 });

  return (
    <section id="testimonials" className="container-page py-12 sm:py-16 lg:py-20">
      <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-start lg:grid-cols-[420px_1fr] lg:gap-14">
        <div>
          <Pill testId="pill-testimonials" muted={false}>
            ( depoimentos )
          </Pill>
          <h2
            data-testid="text-testimonials-title"
            className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-[46px] lg:text-[56px]"
          >
            Quem já passou
            <br />
            por aqui
            <br />
            <span className="subtle-grad">falam sobre a Track</span>
          </h2>
          <p data-testid="text-testimonials-desc" className="mt-4 max-w-[520px] text-sm leading-6 text-zinc-600">
            Credibilidade vem com rotina, não com promessa. A gente entra para trazer clareza, executar e acompanhar.
          </p>
        </div>

        <motion.div {...reveal} className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              data-testid={`card-testimonial-${t.id}`}
              className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-zinc-200"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
              <div className="absolute inset-0 noise opacity-[0.06]" />

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      data-testid={`img-testimonial-${t.id}`}
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-2xl bg-zinc-100 object-cover ring-1 ring-zinc-200"
                    />
                    <div>
                      <div data-testid={`text-testimonial-name-${t.id}`} className="text-xs font-semibold text-zinc-950">
                        {t.name}
                      </div>
                      <div data-testid={`text-testimonial-role-${t.id}`} className="mt-0.5 text-[11px] text-zinc-600">
                        {t.role} · {t.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={"h-4 w-4 " + (i < t.rating ? "text-[#30045c]" : "text-zinc-200")}
                        strokeWidth={2.25}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                    <Quote className="h-4 w-4 text-zinc-900" strokeWidth={2.25} />
                  </div>
                  <div data-testid={`text-testimonial-quote-${t.id}`} className="text-sm leading-6 text-zinc-700">
                    {t.quote}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
