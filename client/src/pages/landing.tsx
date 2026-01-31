import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Coins,
  Factory,
  Gauge,
  LineChart,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import productImg from "@/assets/product.jpg";

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

function usePreloadImages(urls: string[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const unique = Array.from(new Set(urls)).filter(Boolean);
    const imgs: HTMLImageElement[] = [];

    for (const src of unique) {
      const img = new Image();
      imgs.push(img);
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }

    return () => {
      for (const img of imgs) {
        img.src = "";
      }
    };
  }, [urls]);
}

function PrimaryButton({
  children,
  onClick,
  testId,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  testId: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_14px_40px_-24px_rgba(0,0,0,.75)] transition hover:bg-zinc-50 active:scale-[0.98]"
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px 120px at 20% 20%, rgba(29,2,56,0.18), transparent 55%), radial-gradient(600px 120px at 80% 40%, rgba(176,132,255,0.22), transparent 55%)",
        }}
      />
      <span className="relative inline-flex items-center gap-2">
        {icon ? <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1d0238] text-white">{icon}</span> : null}
        {children}
      </span>
    </button>
  );
}

function GhostButton({
  children,
  onClick,
  testId,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  testId: string;
  icon?: React.ReactNode;
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

    let cancelled = false;
    let img: HTMLImageElement | null = null;

    const startWhenArrowReady = () => {
      img = new Image();
      img.decoding = "async";
      img.loading = "eager";

      const done = () => {
        if (cancelled) return;
        setReady(true);
      };

      img.addEventListener?.("load", done, { once: true } as any);
      img.addEventListener?.("error", done, { once: true } as any);
      img.onload = done;
      img.onerror = done;
      img.src = "/attached_assets/arrow.png";

      if ((img as any).complete) done();
    };

    if (document.readyState === "complete") {
      startWhenArrowReady();
      return () => {
        cancelled = true;
        img = null;
      };
    }

    const onLoad = () => {
      window.removeEventListener("load", onLoad);
      startWhenArrowReady();
    };

    window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      img = null;
    };
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
      raf = requestAnimationFrame(tick);
      if (now - last < 24) return;
      last = now;

      const m = measure();
      if (!m) return;

      const t = Math.min(1, (now - start) / total);
      setProgress(t);

      const x = m.distance * t;
      setTravelPx(x);

      if (t < 0.7) {
        setArrowScale(1);
      } else {
        const k = (t - 0.7) / 0.3;
        setArrowScale(1 - 0.1 * k);
      }

      if (t >= 1 && !swappedRef.current) {
        swappedRef.current = true;
        setArrowGone(true);
        setLogoSwap(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduced]);

  const showHome = progress >= 0.12;
  const showProduct = progress >= 0.28;
  const showProcess = progress >= 0.44;
  const showTestimonials = progress >= 0.6;

  return (
    <div className="fixed left-0 top-0 z-40 w-full">
      <div
        ref={headerRef}
        data-testid="header"
        className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4 md:px-8"
      >
        <div className="relative flex items-center gap-3">
          <span ref={logoRef} data-testid="logo-wrap" className="relative inline-flex items-center">
            <AnimatePresence initial={false} mode="wait">
              {!logoSwap ? (
                <motion.img
                  key="logo-old"
                  data-testid="img-logo"
                  src="/attached_assets/logo.png"
                  alt="Track"
                  className="h-9 w-auto select-none"
                  draggable={false}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0 }}
                />
              ) : (
                <motion.img
                  key="logo-new"
                  data-testid="img-logo-official"
                  src="/attached_assets/official-logo.png"
                  alt="Track"
                  className="h-9 w-auto select-none"
                  draggable={false}
                  initial={{ scale: 0.92, opacity: 0.85 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 520, damping: 22 }}
                />
              )}
            </AnimatePresence>
          </span>
        </div>

        <div className="relative hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
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

        <motion.img
          ref={arrowRef}
          data-testid="img-arrow"
          src="/attached_assets/arrow.png"
          alt="Seta"
          draggable={false}
          className="pointer-events-none absolute right-0 top-1/2 h-10 w-auto -translate-y-1/2 select-none"
          style={{
            opacity: arrowGone ? 0 : 1,
            transform: `translate3d(${-travelPx}px, -50%, 0) scale(${arrowScale})`,
            transformOrigin: "right center",
          }}
        />
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
                A Track entrega soluções reais em energia: da eficiência à geração, armazenamento e mercado livre, com proposta sob medida,
                execução e monitoramento contínuo.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryButton testId="button-explore-now" onClick={onContact}>
                  Vamos conversar
                </PrimaryButton>

                <GhostButton testId="button-play-video" onClick={onPlay} icon={<CirclePlay className="h-4 w-4" strokeWidth={2.25} />}>
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

export default function Landing() {
  usePreloadImages(["/attached_assets/arrow.png", "/attached_assets/logo.png", "/attached_assets/official-logo.png"]);

  const [videoOpen, setVideoOpen] = useState(false);

  const goContact = useMemo(() => {
    return () => {
      window.location.href = "/contato";
    };
  }, []);

  return (
    <div data-testid="page-landing" className="min-h-screen bg-black text-white">
      <Hero onPlay={() => setVideoOpen(true)} onContact={goContact} />

      {/* (restante da landing permanece como já está no projeto; mantido aqui por brevidade) */}

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
