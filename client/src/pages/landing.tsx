import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  MoveUpRight,
  Quote,
  Star,
  X,
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
import marginTrack from "@/assets/images/margin-track.png";
import trackName from "@/assets/images/track-name.png";
import editorialPosts from "@/data/editorial";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Ordem pedida: Depoimentos → Serviços → Editorial → Início (a seta vem da direita)
  const showTestimonials = progress >= 0.26;
  const showProduct = progress >= 0.42;
  const showEditorial = progress >= 0.58;
  const showHome = progress >= 0.74;

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
      <div className="container-page pointer-events-auto">
        <div
          ref={headerRef}
          data-testid="header-shell"
          className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full px-4 py-3 ring-1 ring-white/18 backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 35%, rgba(29,2,56,0.12) 70%, rgba(255,255,255,0.14) 100%)",
          }}
        >
          <div data-testid="bg-header-glass-sheen" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 78%, rgba(255,255,255,0.34) 100%)", opacity: 0.85, zIndex: 0 }} />
          <div data-testid="bg-header-glass-vignette" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 58%)", zIndex: 0 }} />
          <div data-testid="bg-header-glass-noise" className="pointer-events-none absolute inset-0 noise opacity-[0.14]" />
          <div data-testid="bg-header-glass-highlight" className="pointer-events-none absolute -left-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[-12deg] rounded-full blur-md" style={{ background: "rgba(255,255,255,0.26)" }} />
          <div data-testid="bg-header-glass-highlight-2" className="pointer-events-none absolute -right-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[12deg] rounded-full blur-md" style={{ background: "rgba(255,255,255,0.18)" }} />
          {/* Seta (imagem anexada) percorre todo o header até a logo e some ao chegar */}
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
                {!arrowGone ? (
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
                ) : (
                  // Arrow disappears with a quick fade/scale out instead of disappearing instantly
                  <img
                    src="/attached_assets/arrow.png"
                    alt=""
                    className="h-[46px] w-auto origin-left opacity-0 transition-all duration-300 md:h-[52px]"
                    style={{
                      transform: `scale(0.8) translate(10px, 10px)`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <a data-testid="link-logo" href="/#inicio" className="relative flex items-center gap-3">
            <span data-testid="text-header-tagline" className="sr-only">
              Da análise à operação: eficiência, geração, armazenamento e gestão de energia com acompanhamento.
            </span>
            <span
              ref={logoRef}
              data-testid="logo-mark"
              className="grid h-10 w-10 place-items-center relative"
            >
              {logoSwap && (
                <div className="absolute inset-0 pointer-events-none grid place-items-center">
                   <div className="h-4 w-4 rounded-full bg-white animate-rippleExpand" />
                </div>
              )}
              {!logoSwap ? (
                <img
                  data-testid="img-logo"
                  src="/attached_assets/logo.png"
                  alt="Track"
                  className="h-10 w-10 object-contain transition-all duration-200"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                    transform: arrowGone ? "scale(0.9)" : "scale(1)",
                    opacity: arrowGone ? 0 : 1
                  }}
                />
              ) : (
                <img
                  data-testid="img-logo-final"
                  src="/attached_assets/official-logo.png"
                  alt="Track"
                  className="h-10 w-10 object-contain animate-logoSpring"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              )}
            </span>
            <img
              src={trackName}
              alt="Track"
              data-testid="text-logo"
              className="h-[14px] w-auto object-contain brightness-0 invert sm:invert-0"
            />
          </a>

          <div data-testid="nav-desktop" className="hidden items-center gap-7 text-xs font-medium text-white/78 md:flex">
            <motion.a
              data-testid="link-nav-home"
              href="/#inicio"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showHome ? "auto" : "none", visibility: showHome ? "visible" : "hidden" }}
            >
              Início
            </motion.a>
            <motion.a
              data-testid="link-nav-editorial"
              href="/#editorial"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showEditorial ? "auto" : "none", visibility: showEditorial ? "visible" : "hidden" }}
            >
              Editorial
            </motion.a>
            <motion.a
              data-testid="link-nav-product"
              href="/#servicos"
              className="transition hover:text-white"
              initial={{ opacity: 0, x: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: showProduct ? "auto" : "none", visibility: showProduct ? "visible" : "hidden" }}
            >
              Serviços
            </motion.a>
            <motion.a
              data-testid="link-nav-testimonials"
              href="/#depoimentos"
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
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 backdrop-blur-xl transition hover:bg-white/80 hover:text-zinc-800 active:scale-[0.98]"
          >
            <span className="relative">
              <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-black/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Fale Conosco</span>
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black/5 ring-1 ring-black/5 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-black/8 group-active:translate-x-0">
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700 transition duration-300 group-hover:translate-x-[1px]" strokeWidth={2.25} />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            data-testid="button-mobile-menu"
            style={{ zIndex: 10 }}
            onClick={() => setMobileMenuOpen(true)}
            className="group relative inline-flex md:hidden items-center justify-center h-9 w-9 overflow-hidden rounded-full bg-white/12 text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
          >
             <Menu className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar: renderizado em portal para não ser cortado pelo overflow-hidden do Hero */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="pointer-events-auto fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="pointer-events-auto fixed inset-y-0 right-0 z-[101] w-full max-w-xs bg-[#1d0238] p-6 shadow-2xl ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-semibold text-white">Menu</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {[
                      { label: "Início", href: "/#inicio" },
                      { label: "Editorial", href: "/#editorial" },
                      { label: "Serviços", href: "/#servicos" },
                      { label: "Depoimentos", href: "/#depoimentos" },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onContact();
                      }}
                      className="mt-4 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1d0238] shadow-lg active:scale-[0.98]"
                    >
                      <span>Fale Conosco</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </nav>

                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="h-px w-full bg-white/10 mb-6" />
                    <div className="flex items-center gap-4 text-white/60">
                      <a href="#" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
                      <a href="#" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
                      <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
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
    <section
      id="inicio"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0d0115] via-[#150120] to-black"
    >
      {/* overflow só no fundo para não criar contexto que corta o sidebar ao arrastar a página */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-testid="img-hero"
          src={heroImg}
          alt="Energia e infraestrutura"
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="h-screen w-full object-cover brightness-[0.78]"
        />
        <div className="absolute inset-0 hero-overlay noise" />
      </div>

      <div className="absolute inset-0">
        <Nav onContact={onContact} />

        <div className="container-page pt-4 sm:pt-6">
          <div className="pt-[104px] sm:pt-[112px] lg:pt-[132px]">
            <div className="flex flex-col min-h-[calc(100vh-140px)] justify-center">
              <div className="max-w-[580px] lg:max-w-[720px]">
                <h1
                  data-testid="text-hero-title"
                  className="text-balance text-[48px] font-medium leading-[1] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[76px]"
                >
                  Soluções de energia
                  <br />
                  com visão crítica
                  <br />
                  e execução completa
                </h1>

                <p
                  data-testid="text-hero-subtitle"
                  className="mt-6 max-w-[480px] text-sm leading-6 text-white/70 sm:text-base sm:leading-7"
                >
                  A Track entrega soluções reais em energia: da eficiência à geração, armazenamento e mercado livre, com proposta sob medida, execução e monitoramento contínuo.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
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

              <Link
                href="/servicos"
                data-testid="button-about-how-we-work"
                className="group absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
              >
                Como trabalhamos
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>
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

function Editorial() {
  const reduced = usePrefersReducedMotion();
  const [page, setPage] = useState(0);

  const posts = editorialPosts;
  const featured = posts[0];
  const listPosts = posts.slice(1); // Artigos "mais antigos" → laterais (sem "Novo")
  const totalPages = Math.max(1, Math.ceil(listPosts.length / 3));
  const safePage = totalPages > 1 ? Math.min(page, totalPages - 1) : 0;
  const currentList = listPosts.slice(safePage * 3, (safePage + 1) * 3);
  const hasMultiplePages = listPosts.length > 3;

  const handleNext = () => {
    setPage((p) => (p + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <motion.section
      id="editorial"
      className="container-page pb-12 sm:pb-16 lg:pb-20"
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="rounded-[40px] bg-zinc-50/80 p-6 sm:p-10 lg:p-12 ring-1 ring-zinc-100">
        <div className="flex items-center justify-between mb-8 lg:mb-10">
            <Pill testId="pill-editorial" muted={false}>
            ( editorial )
            </Pill>
            
            {hasMultiplePages && (
                <div className="hidden lg:flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500 mr-2">
                        Mais artigos
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={handlePrev}
                            className="grid h-8 w-8 place-items-center rounded-full bg-white ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
                        >
                            <ChevronLeft className="h-4 w-4 text-zinc-600" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="grid h-8 w-8 place-items-center rounded-full bg-white ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
                        >
                            <ChevronRight className="h-4 w-4 text-zinc-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>

        <div className={`grid gap-8 ${listPosts.length > 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : ""} lg:gap-10 items-stretch`}>
            {/* Featured Post (Left) - sempre o primeiro do array = "Novo"; os demais vão para os laterais */}
            <motion.div
            className="group relative flex flex-col sm:flex-row gap-6 lg:gap-8 overflow-hidden rounded-[32px] bg-white p-5 sm:p-8 ring-1 ring-zinc-100 transition-all hover:ring-zinc-200 hover:shadow-lg"
            initial={reduced ? undefined : { opacity: 0, x: -10 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            >
                <div className="hidden sm:block shrink-0">
                    <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-100/50 shadow-sm">
                        <img 
                            src={featured.image} 
                            alt={featured.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                            <span className="inline-block rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1d0238] backdrop-blur-md shadow-sm ring-1 ring-zinc-100">
                                Novo
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-1 flex-col justify-between h-full gap-4">
                    {/* Mobile Header: Image + Title/Meta side-by-side */}
                    <div className="flex sm:hidden gap-4 items-start">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-100/50 shadow-sm">
                            <img 
                                src={featured.image} 
                                alt={featured.title}
                                className="h-full w-full object-cover"
                            />
                             <div className="absolute top-1.5 left-1.5">
                                <span className="inline-block rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1d0238] backdrop-blur-md shadow-sm ring-1 ring-zinc-100">
                                    Novo
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 min-w-0">
                             <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="text-[#1d0238]">{featured.category}</span>
                                <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
                                <span>{featured.date}</span>
                                <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
                                <span>{featured.readTime}</span>
                             </div>
                             <h3 className="text-base font-bold leading-tight text-zinc-950 line-clamp-3">
                                {featured.title}
                             </h3>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Desktop Meta & Title */}
                        <div className="hidden sm:flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-zinc-500">
                            <span className="text-[#1d0238] font-bold uppercase tracking-wide">{featured.category}</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-300" />
                            <span>{featured.date}</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-300" />
                            <span>{featured.readTime} leitura</span>
                        </div>
                        
                        <h3 className="hidden sm:block text-xl font-bold leading-tight text-zinc-950 sm:text-2xl md:text-[28px] lg:text-3xl text-balance group-hover:text-[#1d0238] transition-colors">
                            {featured.title}
                        </h3>
                        
                        <p className="text-sm leading-relaxed text-zinc-600 line-clamp-3 lg:line-clamp-4">
                            {featured.excerpt}
                        </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-zinc-100/80 flex items-center justify-between group/btn">
                        <span className="text-xs font-bold uppercase tracking-wide text-zinc-400 transition-colors group-hover/btn:text-[#1d0238]">
                            Ler artigo completo
                        </span>
                        <Link href={`/editorial/${featured.id}`} className="absolute inset-0 z-10" aria-label="Ler artigo"></Link>
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-zinc-50 text-[#1d0238] transition-all group-hover/btn:bg-[#1d0238] group-hover/btn:text-white">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* List Posts (Right) - artigos mais antigos; paginação aumenta conforme há mais itens */}
            {listPosts.length > 0 && (
            <div className="flex flex-col gap-6 h-full justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={safePage}
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentList.map((post) => (
                            <Link 
                                key={post.id} 
                                href={`/editorial/${post.id}`}
                                className="group flex gap-4 items-start p-3 rounded-2xl transition-all hover:bg-white hover:shadow-md ring-1 ring-transparent hover:ring-zinc-100"
                            >
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-100/50">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-1 py-0.5">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400 group-hover:text-zinc-500">
                                        <span className="text-[#1d0238]">{post.category}</span>
                                        <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
                                        <span>{post.date}</span>
                                    </div>
                                    
                                    <h4 className="text-sm font-semibold leading-snug text-zinc-900 group-hover:text-[#1d0238] transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    
                                    <div className="mt-1 flex items-center text-[10px] font-bold uppercase tracking-wide text-zinc-400 transition group-hover:text-[#1d0238]">
                                        Ler mais
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
                
                {/* Mobile Pagination - só aparece quando há mais de uma página */}
                {hasMultiplePages && (
                <div className="flex lg:hidden items-center justify-between pt-4 border-t border-zinc-200 mt-2">
                    <span className="text-xs font-medium text-zinc-500">
                        Página {safePage + 1} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={handlePrev}
                            className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
                        >
                            <ChevronLeft className="h-5 w-5 text-zinc-600" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
                        >
                            <ChevronRight className="h-5 w-5 text-zinc-600" />
                        </button>
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
      </div>
    </motion.section>
  );
}

function ProductFeature({ product, products, onContact }: { product: Product; products: Product[]; onContact: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string>(products[0].id);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Detectar viewport desktop (lg = 1024px) para ativar rotação automática só no desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Rotação automática da imagem principal apenas em desktop (8s). Hover no card reinicia o cronômetro.
  useEffect(() => {
    if (!isDesktop || products.length === 0) return;
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const idx = products.findIndex((p) => p.id === currentId);
        const nextIdx = (idx + 1) % products.length;
        return products[nextIdx].id;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isDesktop, products, timerKey]);

  const handleProductHover = useCallback((id: string) => {
    setActiveId(id);
    setTimerKey((k) => k + 1);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
    containScroll: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    if (products[index]) {
       setActiveId(products[index].id);
    }
  }, [emblaApi, products]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // Sync initial state
    const index = products.findIndex(p => p.id === activeId);
    if (index !== -1) emblaApi.scrollTo(index, true);

    return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]); // Removed activeId from deps to avoid loop

  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeId) || products[0],
    [activeId, products],
  );

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(prev + 1, products.length - 4));
  };

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleProducts = useMemo(() => {
    // For desktop carousel logic
    return products; 
  }, [products]);

  return (
    <motion.section
      id="servicos"
      className="container-page pb-12 sm:pb-16 lg:pb-20"
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Pill testId="pill-servicos" muted={false}>
        ( serviços )
      </Pill>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
        <motion.div
          className="rounded-[28px] bg-zinc-50 p-8 ring-1 ring-zinc-100"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-110px" }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
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
              onClick={onContact}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1d0238] text-white">
                <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
              Vamos conversar
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden overflow-hidden rounded-[28px] lg:block lg:rounded-[32px]"
          initial={reduced ? undefined : { opacity: 0, scale: 0.985 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
        >
          <AnimatePresence>
            <motion.div
              key={activeProduct.id}
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <img
                data-testid="img-product"
                src={activeProduct.image}
                alt={activeProduct.title}
                className="h-full min-h-[420px] w-full object-cover lg:min-h-[540px]"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
               
               <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                      {activeProduct.tag}
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      {activeProduct.title}
                    </div>
                    <div className="mt-1 text-sm text-white/80">
                      {activeProduct.subtitle}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                         <Link href={`/servicos/${activeProduct.id}`} className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]">
                            Saiba mais
                            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" strokeWidth={2.25} />
                         </Link>
                    </div>
                  </div>
               </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-y-0 right-0 w-[15%] min-w-[60px] max-w-[120px] overflow-hidden z-20 pointer-events-none hidden" />
        </motion.div>
      </div>

      {/* Carousel Section */}
      <div className="mt-6">
          <div className="hidden lg:block">
            <div className="relative">
                <div className="overflow-hidden py-10 -my-10 px-4 -mx-4">
                    <motion.div 
                        className="flex gap-6"
                        animate={{ x: `-${scrollIndex * (25 + 1.5)}%` }} // Approx percentage based width + gap
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {products.map((p) => (
                            <Link
                                key={p.id}
                                href={`/servicos/${p.id}`}
                                onMouseEnter={() => handleProductHover(p.id)}
                                className={`group relative block w-[23%] shrink-0 text-left rounded-[26px] bg-zinc-100 transition-all duration-300 ${activeId === p.id ? 'ring-1 ring-[#1d0238] ring-inset shadow-md scale-[1.01] z-10' : 'ring-1 ring-zinc-200 hover:ring-zinc-300 hover:scale-[1.005]'}`}
                            >
                                <div className="relative overflow-hidden rounded-t-[26px] h-[200px]">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                    />
                                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition duration-300 ${activeId === p.id ? 'opacity-0' : 'opacity-80 group-hover:opacity-60'}`} />
                                </div>
                                <div className={`p-4 transition-colors duration-300 ${activeId === p.id ? 'bg-[#f8f5fa]' : ''} rounded-b-[26px]`}>
                                    <div className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                                        {p.tag}
                                    </div>
                                    <div className="mt-1 text-sm font-semibold leading-tight text-zinc-950">
                                        {p.title}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute -left-6 -right-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2 z-20">
                    <button 
                         onClick={handlePrev}
                         disabled={scrollIndex === 0}
                         className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-xl text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
                    </button>
                    <button 
                         onClick={handleNext}
                         disabled={scrollIndex >= products.length - 4}
                         className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-xl text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
                    </button>
                </div>
            </div>
            
            <div className="mt-8 flex justify-center">
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1d0238] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#30045c] active:scale-[0.98] shadow-lg shadow-[#1d0238]/20"
                >
                  Ver todos os serviços
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </Link>
            </div>
          </div>

          {/* Mobile Scroll (Cover Flow Style with Embla) */}
          <div className="lg:hidden relative pb-8">
            <div className="overflow-hidden px-4 pb-8 pt-4" ref={emblaRef}>
              <div className="flex gap-4 touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
                {products.map((p, i) => {
                  const isActive = activeId === p.id;
                  return (
                    <div
                      key={`mobile-${p.id}`}
                      className={`relative shrink-0 w-[280px] transition-all duration-500 ease-out ${isActive ? 'scale-100 z-10' : 'scale-90 opacity-60 z-0'}`}
                      style={{ backfaceVisibility: 'hidden' }}
                      onClick={() => {
                        setActiveId(p.id);
                        emblaApi?.scrollTo(i);
                      }}
                    >
                     <div className={`flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 shadow-sm transition-all duration-500 ${isActive ? 'ring-zinc-300 shadow-xl' : 'ring-zinc-200'}`}>
                      <div className="relative h-[180px]">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-100'}`} />
                        <div className="absolute left-4 top-4">
                          <div className={`glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white transition-transform duration-500 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                            {p.tag}
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                          <div className={`text-lg font-bold text-zinc-950 transition-colors duration-300 ${isActive ? 'text-[#1d0238]' : ''}`}>
                            {p.title}
                          </div>
                          <div className="mt-2 text-sm text-zinc-600 line-clamp-2">
                            {p.subtitle}
                          </div>
                          
                          <motion.div 
                            className="mt-4 overflow-hidden"
                            initial={false}
                            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link href={`/servicos/${p.id}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#1d0238]">
                                Ver detalhes
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
      </div>
    </motion.section>
  );
}

// Process component removed

function Testimonials({ onContact }: { onContact: () => void }) {
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
    <section id="depoimentos" className="container-page pb-12 sm:pb-16 lg:pb-20">
      <div className="flex items-start justify-between gap-6">
        <Pill testId="pill-testimonials">( depoimentos )</Pill>

        <div className="hidden" />

        <div className="hidden" />
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

          {/* Vertical Margin Image (Background) */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-full max-w-[400px] overflow-visible opacity-15 mix-blend-luminosity">
            <img
              src={marginTrack}
              alt=""
              className="absolute left-0 top-1/2 h-auto w-[160vh] max-w-none -translate-x-[45%] -translate-y-1/2 rotate-90 object-cover grayscale invert brightness-75"
            />
          </div>

          <div className="relative p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div data-testid="text-testimonials-title" className="text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white">
                  O que nossos clientes
                  <br />
                  <span className="subtle-grad-dark">falam sobre a Track</span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p data-testid="text-testimonials-sub" className="max-w-[520px] text-sm leading-6 text-white/70">
                    Experiências reais de quem implementou soluções com a Track, do diagnóstico à operação, com acompanhamento e foco em resultado.
                  </p>

                  <div className="hidden" />
                </div>
              </div>

              <div className="hidden sm:grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                <Quote className="h-5 w-5 text-white" strokeWidth={2.25} />
              </div>
            </div>

            <div className="relative mt-7 rounded-[22px] bg-white/10 p-6 pb-20 ring-1 ring-white/12 backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/12">
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
                    <div
                      data-testid="text-testimonial-active-role"
                      className="mt-0.5 text-[12px] text-white/65 sm:whitespace-nowrap"
                    >
                      <span className="hidden sm:inline">{activeItem.role} · {activeItem.city}</span>
                      <span className="sm:hidden">{activeItem.role}</span>
                      <br className="sm:hidden" />
                      <span className="sm:hidden">{activeItem.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:justify-end" aria-label="Avaliação">
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

              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  data-testid="button-testimonials-prev-inside"
                  onClick={() => {
                    const idx = items.findIndex((i) => i.id === activeItem.id);
                    const next = (idx - 1 + items.length) % items.length;
                    setActive(items[next].id);
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/16 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <button
                  data-testid="button-testimonials-next-inside"
                  onClick={() => {
                    const idx = items.findIndex((i) => i.id === activeItem.id);
                    const next = (idx + 1) % items.length;
                    setActive(items[next].id);
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/16 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                data-testid="button-testimonials-cta"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
                onClick={onContact}
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

        <div className="hidden lg:grid gap-4">
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
                        "h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 " +
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
                    "mt-3 text-sm leading-6 " + (selected ? "text-white/75" : "text-zinc-500")
                  }
                >
                  “{t.quote}”
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer({ onPlay, onContact }: { onPlay: () => void; onContact: () => void }) {
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
                    onClick={onContact}
                  >
                    Vamos conversar
                  </PrimaryButton>
                  <GhostButton
                    testId="button-footer-services"
                    onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
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
            <a data-testid="link-footer-home" href="/#inicio" className="transition hover:text-zinc-950">
              Início
            </a>
            <a data-testid="link-footer-product" href="/#servicos" className="transition hover:text-zinc-950">
              Serviços
            </a>
            <a data-testid="link-footer-process" href="/#processo" className="transition hover:text-zinc-950">
              Processo
            </a>
            <a data-testid="link-footer-testimonials" href="/#depoimentos" className="transition hover:text-zinc-950">
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
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          onContact={() => setLocation("/contato")}
        />
      </section>

      <About />
      <Editorial />
      <ProductFeature product={primaryProduct} products={products} onContact={() => setLocation("/contato")} />
      <Testimonials onContact={() => setLocation("/contato")} />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
