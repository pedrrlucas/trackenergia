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
      className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
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

      const startX = header.right + 8; // bico começa fora no canto direito
      const endX = logo.left + logo.width * 0.5 - arrow.width * 0.06; // para perto da bolinha
      const distance = Math.max(1, startX - endX);

      return { header, startX, endX, distance };
    };

    let raf = 0;
    const start = performance.now();
    const total = 920; // rápido e elegante

    let last = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);

      // Mantém a caminhada fluida: atualiza sempre o deslocamento (transform),
      // e limita apenas o "progress" (reveal do menu) para não pesar.
      const m = measure();
      if (m) {
        const x = m.startX - eased * m.distance;
        const p = (m.startX - x) / m.distance;

        // A seta encolhe ~10% nos instantes finais (mais perceptível)
        // (do ~70% até ~100% do percurso)
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

  // Ordem pedida: Depoimentos → Abordagem → Serviços → Início (a seta vem da direita)
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
          className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white/22 px-4 py-3 ring-1 ring-white/18 backdrop-blur"
        >
          {/* Seta (imagem anexada) percorre todo o header até a logo e some ao chegar */}
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
            <span
              ref={logoRef}
              data-testid="logo-mark"
              className="grid h-10 w-10 place-items-center"
            >
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
            className="relative rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
          >
            Fale Conosco
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
      <img data-testid="img-hero" src={heroImg} alt="Energia e infraestrutura" className="h-screen w-full object-cover" />
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
              className="relative aspect-[16/10] w-[calc(100%+120px)] max-w-none overflow-hidden rounded-[28px] bg-gradient-to-br from-zinc-100 via-white to-zinc-100 ring-1 ring-zinc-200 md:w-[calc(100%+160px)] lg:w-[calc(100%+220px)]"
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
              A Track nasceu em 2024 com um propósito diferente do mercado tradicional: não vendemos equipamentos.
              Nosso foco é entregar <span className="font-medium text-zinc-800">soluções reais</span> para quem precisa, entendendo o setor com profundidade
              e conectando cada cliente à solução energética ideal, sem excessos e sem soluções genéricas.
            </p>
          </div>

        </motion.div>
      </div>
    </motion.section>
  );
}

function ProductFeature({ product }: { product: Product }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      id="product"
      className="container-page pb-12 sm:pb-16 lg:pb-20"
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <motion.div
          className="rounded-[28px] bg-zinc-50 p-8 ring-1 ring-zinc-100"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Pill testId="pill-popular-product" muted={false}>
            ( soluções )
          </Pill>
          <h3
            data-testid="text-product-title"
            className="mt-6 text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em]"
          >
            {product.title}
            <br />
            <span className="subtle-grad">{product.subtitle}</span>
          </h3>
          <p data-testid="text-product-desc" className="mt-3 max-w-[520px] text-sm leading-6 text-zinc-500">
            {product.desc}
          </p>

          <div className="mt-8 grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-zinc-100">
            <div className="text-sm font-semibold text-zinc-900" data-testid="text-spec-title">
              Destaques da solução
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {product.specLeft.map((s, idx) => (
                  <li data-testid={`text-spec-left-${idx}`} key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1d0238]" />
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {product.specRight.map((s, idx) => (
                  <li data-testid={`text-spec-right-${idx}`} key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1d0238]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              data-testid="button-lets-talk"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1d0238] text-white">
                <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
              Vamos conversar
            </button>
            <button
              data-testid="button-explore-product"
              className="inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#30045c] active:scale-[0.98]"
            >
              Ver serviços
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[28px] lg:rounded-[32px]"
          initial={reduced ? undefined : { opacity: 0, scale: 0.985 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
        >
          <img
            data-testid="img-product"
            src={product.image}
            alt="Produto"
            className="h-full min-h-[420px] w-full object-cover lg:min-h-[540px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </motion.div>
      </div>
    </motion.section>
  );
}

function Process() {
  const reduced = usePrefersReducedMotion();

  const slides = useMemo(
    () => [
      {
        k: "01",
        title: "Parceria: diagnóstico do setor",
        desc: "Nos conectamos com empresas, grupos e cooperativas para entender os desafios mais comuns e impactantes do segmento e compor soluções que geram competitividade, segurança ou economia.",
        img: processImg,
      },
      {
        k: "02",
        title: "Cliente final: proposta sob medida",
        desc: "Analisamos perfil, objetivos e necessidades para desenhar uma proposta personalizada, sem excessos e sem soluções genéricas.",
        img: processImg,
      },
      {
        k: "03",
        title: "Execução completa e integração",
        desc: "Fazemos a implementação com coordenação técnica e foco em resultado: eficiência, geração própria, armazenamento, eletromobilidade e acesso ao mercado livre quando fizer sentido.",
        img: processImg,
      },
      {
        k: "04",
        title: "Monitoramento contínuo e melhorias",
        desc: "Após a entrega, acompanhamos performance, operação e manutenção quando necessário, com radar ligado para otimizações ao longo do tempo.",
        img: processImg,
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(2);

  return (
    <motion.section
      id="process"
      className="container-page pb-12 sm:pb-16 lg:pb-20"
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[32px] bg-black lg:rounded-[38px]"
        initial={reduced ? undefined : { scale: 0.995, opacity: 0 }}
        whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <img
          data-testid="img-process"
          src={slides[idx].img}
          alt="Processo"
          className="h-[480px] w-full object-cover sm:h-[520px] lg:h-[620px]"
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute inset-0 p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <Pill testId="pill-process" muted>
              ( como trabalhamos )
            </Pill>
          </div>

          <div className="mt-24 grid gap-8 md:mt-28 md:grid-cols-[1fr_420px] md:items-start lg:mt-36 lg:grid-cols-[1fr_520px]">
            <motion.div
              className="flex items-end"
              initial={reduced ? undefined : { opacity: 0, x: -10 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div>
                <div
                  data-testid="text-process-counter"
                  className="text-[56px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[64px] lg:text-[72px]"
                >
                  <span className="text-white">({slides[idx].k}</span>
                  <span className="text-white/55">/04)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.04 }}
            >
              <h3
                data-testid="text-process-title"
                className="text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white lg:text-[40px]"
              >
                {slides[idx].title}
              </h3>
              <p data-testid="text-process-desc" className="mt-3 text-sm leading-6 text-white/70">
                {slides[idx].desc}
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
            <div data-testid="progress-process-track" className="h-[2px] flex-1 rounded-full bg-white/22">
              <motion.div
                data-testid="progress-process-fill"
                className="h-full rounded-full bg-white"
                initial={reduced ? undefined : { width: 0 }}
                animate={{ width: `${((idx + 1) / slides.length) * 100}%` }}
                transition={reduced ? undefined : { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                data-testid="button-process-prev"
                onClick={() => setIdx((p) => (p - 1 + slides.length) % slides.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/12 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
              >
                <ChevronLeft className="h-4 w-4 text-white" strokeWidth={2.25} />
              </button>
              <button
                data-testid="button-process-next"
                onClick={() => setIdx((p) => (p + 1) % slides.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/12 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
              >
                <ChevronRight className="h-4 w-4 text-white" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const reduced = usePrefersReducedMotion();

  const [activeTop, setActiveTop] = useState<string | null>(null);
  const [activeBottom, setActiveBottom] = useState<string | null>(null);
  const [activeMobile, setActiveMobile] = useState<string | null>(null);

  const desktopFirstRow = useMemo(() => products.slice(0, 3), [products]);
  const desktopSecondRow = useMemo(() => products.slice(0, 4), [products]);

  return (
    <section className="container-page pb-12 sm:pb-16 lg:pb-20">
      <div className="flex items-start justify-between gap-6">
        <Pill testId="pill-our-product">( serviços )</Pill>
      </div>

      <div className="mt-6">
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col justify-between rounded-[28px] bg-white p-6 ring-1 ring-zinc-200">
              <div>
                <h3
                  data-testid="text-grid-title"
                  className="text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.03em]"
                >
                  Explore nossos
                  <br />
                  <span className="subtle-grad">serviços em energia</span>
                </h3>
                <p data-testid="text-grid-sub" className="mt-4 text-sm leading-6 text-zinc-500">
                  Do diagnóstico à operação: eficiência, geração própria, armazenamento, mercado livre e manutenção, sempre com proposta sob medida.
                </p>
              </div>

              <div className="mt-6">
                <button
                  data-testid="button-grid-explore"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#30045c] active:scale-[0.98]"
                >
                  Ver serviços
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            {desktopFirstRow.map((p) => (
              <motion.button
                data-testid={`card-product-top-${p.id}`}
                key={`top-${p.id}`}
                onHoverStart={() => setActiveTop(p.id)}
                onHoverEnd={() => setActiveTop((cur) => (cur === p.id ? null : cur))}
                onFocus={() => setActiveTop(p.id)}
                onBlur={() => setActiveTop((cur) => (cur === p.id ? null : cur))}
                className="group text-left"
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="relative overflow-hidden rounded-[28px] bg-zinc-100 ring-1 ring-zinc-200">
                  <img
                    data-testid={`img-product-top-${p.id}`}
                    src={p.image}
                    alt={p.title}
                    className="h-[248px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 to-transparent opacity-90" />

                  <AnimatePresence>
                    {activeTop === p.id ? (
                      <motion.div
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      >
                        <motion.div
                          className="glass inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none text-white"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          Ver detalhes
                          <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/16">
                            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                          </span>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-4">
                  <div
                    data-testid={`text-product-top-tag-${p.id}`}
                    className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500"
                  >
                    {p.tag}
                  </div>
                  <div data-testid={`text-product-top-title-${p.id}`} className="mt-2 text-sm font-semibold text-zinc-950">
                    {p.title}
                  </div>
                  <div data-testid={`text-product-top-sub-${p.id}`} className="mt-1 text-sm text-zinc-500">
                    {p.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-4 gap-6">
            {desktopSecondRow.map((p) => (
              <motion.button
                data-testid={`card-product-${p.id}`}
                key={`grid-${p.id}`}
                onHoverStart={() => setActiveBottom(p.id)}
                onHoverEnd={() => setActiveBottom((cur) => (cur === p.id ? null : cur))}
                onFocus={() => setActiveBottom(p.id)}
                onBlur={() => setActiveBottom((cur) => (cur === p.id ? null : cur))}
                className="group text-left"
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="relative overflow-hidden rounded-[26px] bg-zinc-100 ring-1 ring-zinc-200">
                  <img
                    data-testid={`img-product-grid-${p.id}`}
                    src={p.image}
                    alt={p.title}
                    className="h-[248px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-80" />

                  <AnimatePresence>
                    {activeBottom === p.id ? (
                      <motion.div
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      >
                        <motion.div
                          className="glass inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none text-white"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          Ver detalhes
                          <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/16">
                            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                          </span>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-4">
                  <div
                    data-testid={`text-product-grid-tag-${p.id}`}
                    className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500"
                  >
                    {p.tag}
                  </div>
                  <div data-testid={`text-product-grid-title-${p.id}`} className="mt-2 text-sm font-semibold text-zinc-950">
                    {p.title}
                  </div>
                  <div data-testid={`text-product-grid-sub-${p.id}`} className="mt-1 text-sm text-zinc-500">
                    {p.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <div className="pt-2">
            <Pill testId="pill-our-product-mobile">( nosso produto )</Pill>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h3
              data-testid="text-grid-title-mobile"
              className="text-balance text-[38px] font-medium leading-[1.06] tracking-[-0.03em]"
            >
              Explore nossos
              <br />
              <span className="subtle-grad">serviços em energia</span>
            </h3>
            <button
              data-testid="button-grid-explore-mobile"
              className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
            >
              Ver serviços
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {products.map((p, i) => (
              <motion.button
                data-testid={`card-product-mobile-${p.id}`}
                key={`mobile-${p.id}`}
                onHoverStart={() => setActiveMobile(p.id)}
                onHoverEnd={() => setActiveMobile((cur) => (cur === p.id ? null : cur))}
                onFocus={() => setActiveMobile(p.id)}
                onBlur={() => setActiveMobile((cur) => (cur === p.id ? null : cur))}
                className="group text-left"
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              >
                <div className="relative overflow-hidden rounded-[26px] bg-zinc-100 ring-1 ring-zinc-200">
                  <img
                    data-testid={`img-product-grid-mobile-${p.id}`}
                    src={p.image}
                    alt={p.title}
                    className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-80" />

                  <AnimatePresence>
                    {activeMobile === p.id ? (
                      <motion.div
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      >
                        <motion.div
                          className="glass inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold leading-none text-white"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          Ver detalhes
                          <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/16">
                            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                          </span>
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-4">
                  <div
                    data-testid={`text-product-grid-mobile-tag-${p.id}`}
                    className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500"
                  >
                    {p.tag}
                  </div>
                  <div data-testid={`text-product-grid-mobile-title-${p.id}`} className="mt-2 text-sm font-semibold text-zinc-950">
                    {p.title}
                  </div>
                  <div data-testid={`text-product-grid-mobile-sub-${p.id}`} className="mt-1 text-sm text-zinc-500">
                    {p.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>("t-2");

  const items: Testimonial[] = useMemo(
    () => [
      {
        id: "t-1",
        name: "Mariana Alves",
        role: "Proprietária",
        city: "Campinas, SP",
        quote:
          "A implementação foi rápida e muito bem explicada. Em poucos dias já estávamos vendo resultado e a conta de luz caiu de verdade, sem burocracia e com um acabamento impecável.",
        rating: 5,
        avatar: t1,
      },
      {
        id: "t-2",
        name: "Ricardo Nogueira",
        role: "Gestor industrial",
        city: "Joinville, SC",
        quote:
          "O que mais me surpreendeu foi o cuidado no projeto e o acompanhamento pós-instalação. O monitoramento é simples e o suporte responde rápido. Sensação de produto premium.",
        rating: 5,
        avatar: t2,
      },
      {
        id: "t-3",
        name: "Patrícia Moura",
        role: "Empreendedora",
        city: "Belo Horizonte, MG",
        quote:
          "Queríamos previsibilidade e clareza de custos. A Track entregou uma estratégia sólida e executou com acompanhamento pós-implantação. Valeu cada centavo.",
        rating: 5,
        avatar: t3,
      },
    ],
    [],
  );

  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <section id="testimonials" className="container-page pb-12 sm:pb-16 lg:pb-20">
      <div className="flex items-start justify-between gap-6">
        <Pill testId="pill-testimonials">( depoimentos )</Pill>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            data-testid="button-testimonials-prev"
            onClick={() => {
              const idx = items.findIndex((i) => i.id === activeItem.id);
              const next = (idx - 1 + items.length) % items.length;
              setActive(items[next].id);
            }}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#1d0238] text-white ring-1 ring-[#1d0238]/18 transition hover:bg-[#30045c] active:scale-[0.98]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <button
            data-testid="button-testimonials-next"
            onClick={() => {
              const idx = items.findIndex((i) => i.id === activeItem.id);
              const next = (idx + 1) % items.length;
              setActive(items[next].id);
            }}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#1d0238] text-white ring-1 ring-[#1d0238]/18 transition hover:bg-[#30045c] active:scale-[0.98]"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
        <motion.div
          className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] ring-1 ring-white/10"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="absolute inset-0 hero-overlay opacity-60" />
          <div className="absolute inset-0 noise opacity-[0.22]" />

          <div className="relative p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div data-testid="text-testimonials-title" className="text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                  O que nossos clientes
                  <br />
                  <span className="subtle-grad-dark">falam sobre a Track</span>
                </div>
                <p data-testid="text-testimonials-sub" className="mt-3 max-w-[520px] text-sm leading-6 text-white/70">
                  Experiências reais de quem implementou soluções com a Track, do diagnóstico à operação, com acompanhamento e foco em resultado.
                </p>
              </div>

              <div className="hidden sm:grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                <Quote className="h-5 w-5 text-white" strokeWidth={2.25} />
              </div>
            </div>

            <div className="mt-7 rounded-[22px] bg-white/10 p-6 ring-1 ring-white/12 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/12">
                    <img
                      data-testid="img-testimonial-active-avatar"
                      src={activeItem.avatar}
                      alt={activeItem.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div data-testid="text-testimonial-active-name" className="text-sm font-semibold text-white">
                      {activeItem.name}
                    </div>
                    <div data-testid="text-testimonial-active-role" className="mt-0.5 text-[12px] text-white/65">
                      {activeItem.role} · {activeItem.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1" aria-label="Avaliação">
                  {new Array(5).fill(0).map((_, i) => (
                    <Star
                      data-testid={`icon-testimonial-active-star-${i}`}
                      key={i}
                      className={"h-4 w-4 " + (i < activeItem.rating ? "text-white" : "text-white/25")}
                      fill={i < activeItem.rating ? "currentColor" : "none"}
                      strokeWidth={2}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeItem.id}
                  data-testid="text-testimonial-active-quote"
                  className="mt-4 text-sm leading-6 text-white/78"
                  initial={reduced ? undefined : { opacity: 0, y: 8 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  “{activeItem.quote}”
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                data-testid="button-testimonials-cta"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
                onClick={() => {
                  window.location.href = "/contato";
                }}
              >
                Converse com a gente
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1d0238] text-white">
                  <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
              <div data-testid="text-testimonials-proof" className="text-[11px] font-semibold uppercase tracking-wide text-white/55">
                4,9/5 · 1.200+ instalações
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {items.map((t, i) => {
            const selected = t.id === activeItem.id;
            return (
              <motion.button
                data-testid={`card-testimonial-${t.id}`}
                key={t.id}
                onClick={() => setActive(t.id)}
                onFocus={() => setActive(t.id)}
                className={
                  "group text-left rounded-[26px] p-5 ring-1 transition " +
                  (selected
                    ? "bg-[#1d0238] text-white ring-[#1d0238]/18"
                    : "bg-white text-zinc-950 ring-zinc-200 hover:bg-zinc-50")
                }
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        "h-11 w-11 overflow-hidden rounded-2xl ring-1 " +
                        (selected ? "bg-white/10 ring-white/12" : "bg-zinc-100 ring-zinc-200")
                      }
                    >
                      <img
                        data-testid={`img-testimonial-avatar-${t.id}`}
                        src={t.avatar}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div
                        data-testid={`text-testimonial-name-${t.id}`}
                        className={"text-sm font-semibold " + (selected ? "text-white" : "text-zinc-950")}
                      >
                        {t.name}
                      </div>
                      <div
                        data-testid={`text-testimonial-meta-${t.id}`}
                        className={"mt-0.5 text-[12px] " + (selected ? "text-white/65" : "text-zinc-500")}
                      >
                        {t.role} · {t.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {new Array(5).fill(0).map((_, s) => (
                      <Star
                        data-testid={`icon-testimonial-star-${t.id}-${s}`}
                        key={s}
                        className={
                          "h-3.5 w-3.5 " +
                          (selected
                            ? s < t.rating
                              ? "text-white"
                              : "text-white/25"
                            : s < t.rating
                              ? "text-zinc-950"
                              : "text-zinc-950/20")
                        }
                        fill={s < t.rating ? "currentColor" : "none"}
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                </div>

                <div
                  data-testid={`text-testimonial-snippet-${t.id}`}
                  className={
                    "mt-3 line-clamp-3 text-sm leading-6 " + (selected ? "text-white/75" : "text-zinc-500")
                  }
                >
                  “{t.quote}”
                </div>
              </motion.button>
            );
          })}

          <div className="flex items-center justify-between gap-3 sm:hidden">
            <button
              data-testid="button-testimonials-prev-mobile"
              onClick={() => {
                const idx = items.findIndex((i) => i.id === activeItem.id);
                const next = (idx - 1 + items.length) % items.length;
                setActive(items[next].id);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#1d0238] text-white ring-1 ring-[#1d0238]/18 transition hover:bg-[#30045c] active:scale-[0.98]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              data-testid="button-testimonials-next-mobile"
              onClick={() => {
                const idx = items.findIndex((i) => i.id === activeItem.id);
                const next = (idx + 1) % items.length;
                setActive(items[next].id);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#1d0238] text-white ring-1 ring-[#1d0238]/18 transition hover:bg-[#30045c] active:scale-[0.98]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
            </button>

            <div data-testid="text-testimonials-proof-mobile" className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              4,9/5 · 1.200+ instalações
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onPlay }: { onPlay: () => void }) {
  return (
    <footer id="footer" className="w-full bg-white">
      <div className="w-full bg-gradient-to-r from-black via-[#12001f] to-[#1d0238]">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="grid gap-12 py-10 md:grid-cols-[360px_minmax(0,1fr)] md:items-start md:gap-16 md:py-12">
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
                {[
                  { k: "ig", label: "Instagram" },
                  { k: "x", label: "X" },
                  { k: "in", label: "LinkedIn" },
                  { k: "yt", label: "YouTube" },
                ].map((s) => (
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

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div>
                <h3
                  data-testid="text-footer-title"
                  className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[46px]"
                >
                  Mude sua energia
                  <br />
                  e ilumine o futuro,
                  <br />
                  <span className="subtle-grad-dark">Energia limpa e confiável</span> feita
                  <br />
                  <span className="subtle-grad-dark">para</span> a vida moderna
                </h3>

                <p data-testid="text-footer-desc" className="mt-5 max-w-[620px] text-sm leading-6 text-white/60">
                  Energize sua casa ou empresa com soluções de energia eficientes e acessíveis, feitas para gerar impacto real.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <PrimaryButton
                    testId="button-footer-explore"
                    onClick={() => {
                      window.location.href = "/contato";
                    }}
                  >
                    Vamos conversar
                  </PrimaryButton>
                  <GhostButton
                    testId="button-footer-services"
                    onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Nossos Serviços
                  </GhostButton>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <div data-testid="text-footer-instagram-title" className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                    Instagram
                  </div>
                  <a
                    data-testid="link-footer-instagram"
                    href="#"
                    className="text-xs font-medium text-white/70 transition hover:text-white"
                  >
                    Ver mais
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {new Array(9).fill(0).map((_, i) => (
                    <a
                      data-testid={`card-footer-ig-${i}`}
                      key={i}
                      href="#"
                      className="group relative aspect-square overflow-hidden rounded-xl bg-white/8 ring-1 ring-white/10 transition hover:bg-white/10"
                      aria-label={`Post do Instagram ${i + 1}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/12" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </a>
                  ))}
                </div>

                <div data-testid="text-footer-instagram-hint" className="mt-3 text-[11px] leading-5 text-white/55">
                  Espaços reservados para 9 imagens quadradas (posts).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] text-zinc-500">
          <div data-testid="text-footer-copyright">©2026 Track. Todos os direitos reservados</div>
          <div className="flex items-center gap-4">
            <a data-testid="link-footer-terms" href="#" className="transition hover:text-zinc-950">
              Termos de uso
            </a>
            <a data-testid="link-footer-home" href="#top" className="transition hover:text-zinc-950">
              Início
            </a>
            <a data-testid="link-footer-product" href="#product" className="transition hover:text-zinc-950">
              Serviços
            </a>
            <a data-testid="link-footer-process" href="#process" className="transition hover:text-zinc-950">
              Processo
            </a>
            <a data-testid="link-footer-testimonials" href="#testimonials" className="transition hover:text-zinc-950">
              Depoimentos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [videoOpen, setVideoOpen] = useState(false);

  const primaryProduct: Product = useMemo(
    () => ({
      id: "solucoes-track",
      tag: "SOLUÇÕES TRACK",
      title: "Energia sob medida",
      subtitle: "Da estratégia à operação",
      desc: "Analisamos oportunidades, desenhamos a proposta ideal e executamos com monitoramento após a implementação, sempre com o radar ligado para melhorias.",
      specLeft: ["Eficiência energética", "Geração própria", "Armazenamento"],
      specRight: ["Mercado livre", "Assinatura de energia", "O&M fotovoltaico"],
      image: productImg,
    }),
    [],
  );

  const products: Product[] = useMemo(
    () => [
      {
        id: "eficiencia",
        tag: "ANÁLISE",
        title: "Eficiência energética",
        subtitle: "Análise de oportunidades e plano de ação",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product1,
      },
      {
        id: "geracao",
        tag: "GERAÇÃO PRÓPRIA",
        title: "Sistemas de geração própria",
        subtitle: "Projeto, execução e integração",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product2,
      },
      {
        id: "armazenamento",
        tag: "ARMAZENAMENTO",
        title: "Armazenamento de energia",
        subtitle: "Resiliência, estabilidade e autonomia",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product3,
      },
      {
        id: "mercado-livre",
        tag: "ESTRATÉGIA",
        title: "Mercado livre de energia",
        subtitle: "Análise de viabilidade e migração",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product4,
      },
      {
        id: "assinatura",
        tag: "ASSINATURA",
        title: "Assinatura de energia",
        subtitle: "Modelo simples para economia previsível",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product5,
      },
      {
        id: "eletromobilidade",
        tag: "INFRAESTRUTURA",
        title: "Eletromobilidade",
        subtitle: "Infraestrutura para recarga e operação",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product6,
      },
      {
        id: "om-fv",
        tag: "OPERAÇÃO",
        title: "O&M fotovoltaico",
        subtitle: "Operação e manutenção com monitoramento",
        desc: "",
        specLeft: [],
        specRight: [],
        image: product7,
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full">
        <Hero
          onPlay={() => setVideoOpen(true)}
          onContact={() => {
            window.location.href = "/contato";
          }}
        />
      </section>

      <About />
      <ProductFeature product={primaryProduct} />
      <Process />
      <ProductGrid products={products} />
      <Testimonials />
      <Footer onPlay={() => setVideoOpen(true)} />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
