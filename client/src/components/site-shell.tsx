import React, { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Quote,
  Star,
  X,
} from "lucide-react";

import footerLogoMark from "@/assets/images/footer-logo-mark.png";
import footerLogoText from "@/assets/images/footer-logo-text.png";

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

export function PrimaryButton({
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

export function GhostButton({
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

export function SiteHeader({ onContact }: { onContact: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [travelPx, setTravelPx] = React.useState(0);
  const [arrowScale, setArrowScale] = React.useState(1);
  const [arrowGone, setArrowGone] = React.useState(false);
  const [logoSwap, setLogoSwap] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const swappedRef = React.useRef(false);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const arrowRef = React.useRef<HTMLImageElement | null>(null);
  const logoRef = React.useRef<HTMLSpanElement | null>(null);

  const [location] = useLocation();
  const onHome = String(location) === "/";

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const arrowImg = new Image();
    arrowImg.src = "/attached_assets/arrow.png";

    const startWhenReady = () => {
      const done = () => setReady(true);
      if (arrowImg.complete) return done();
      arrowImg.addEventListener("load", done, { once: true });
      arrowImg.addEventListener("error", done, { once: true });
    };

    // Não esperar pelo "load" completo: no mobile pode demorar 10+ segundos.
    // Iniciar quando o DOM estiver pronto (interactive) e a seta carregada,
    // ou após timeout máximo para não travar em redes lentas.
    const canStartFromDOM = document.readyState === "complete" || document.readyState === "interactive";
    if (canStartFromDOM) {
      startWhenReady();
      return;
    }

    const onDOMReady = () => {
      startWhenReady();
      window.removeEventListener("DOMContentLoaded", onDOMReady);
    };
    window.addEventListener("DOMContentLoaded", onDOMReady, { once: true });

    const MAX_WAIT_MS = 2500;
    const fallbackTimer = setTimeout(() => setReady(true), MAX_WAIT_MS);

    return () => {
      window.removeEventListener("DOMContentLoaded", onDOMReady);
      clearTimeout(fallbackTimer);
    };
  }, []);

  React.useEffect(() => {
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
          className={
            onHome
              ? "relative mt-4 flex items-center justify-between overflow-hidden rounded-full px-4 py-3 ring-1 ring-white/20 backdrop-blur-xl"
              : "relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-[#1d0238] px-4 py-3 ring-1 ring-[#30045c]"
          }
          style={
            onHome
              ? {
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 35%, rgba(29,2,56,0.10) 68%, rgba(255,255,255,0.18) 100%)",
                }
              : undefined
          }
        >
          {onHome ? (
            <>
              <div
                data-testid="bg-header-glass-sheen"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 78%, rgba(255,255,255,0.34) 100%)",
                  opacity: 0.9,
                  zIndex: 0,
                }}
              />
              <div
                data-testid="bg-header-glass-vignette"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 58%), radial-gradient(120% 160% at 50% 120%, rgba(29,2,56,0.14) 0%, rgba(29,2,56,0) 55%)",
                  zIndex: 0,
                }}
              />
              <div data-testid="bg-header-glass-noise" className="pointer-events-none absolute inset-0 noise opacity-[0.10]" />
              <div
                data-testid="bg-header-glass-highlight"
                className="pointer-events-none absolute -left-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[-12deg] rounded-full blur-md"
                style={{ background: "rgba(255,255,255,0.34)" }}
              />
              <div
                data-testid="bg-header-glass-highlight-2"
                className="pointer-events-none absolute -right-14 top-1/2 h-10 w-[220px] -translate-y-1/2 rotate-[12deg] rounded-full blur-md"
                style={{ background: "rgba(255,255,255,0.22)" }}
              />
            </>
          ) : (
            <>
              <div data-testid="bg-header-badge-sheen" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1d0238] via-[#30045c] to-[#1d0238]" />
                <div
                  data-testid="bg-header-badge-center-lift"
                  className="absolute inset-x-10 top-1/2 h-10 -translate-y-1/2 rounded-full blur-xl opacity-30"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0.00) 22%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.00) 78%, rgba(0,0,0,0.2) 100%)",
                    opacity: 1,
                  }}
                />
                <div className="absolute inset-0 noise opacity-[0.05]" />
              </div>
            </>
          )}

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
                    className={`h-[46px] w-auto origin-left opacity-[0.98] md:h-[52px] ${!onHome ? "brightness-0 invert" : ""}`}
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

          <a
            data-testid="link-logo"
            href="/#inicio"
            className="relative z-10 flex items-center gap-3"
          >
            <span data-testid="text-header-tagline" className="sr-only">
              Da análise à operação: eficiência, geração, armazenamento e gestão de energia com acompanhamento.
            </span>
            <span ref={logoRef} data-testid="logo-mark" className="grid h-10 w-10 place-items-center">
              {!logoSwap ? (
                <img
                  data-testid="img-logo"
                  src="/attached_assets/logo.png"
                  alt="Track"
                  className={`h-10 w-10 object-contain ${!onHome ? "brightness-0 invert" : ""}`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              ) : (
                <img
                  data-testid="img-logo-final"
                  src="/attached_assets/official-logo.png"
                  alt="Track"
                  className={`h-10 w-10 object-contain animate-[logoBoop_520ms_cubic-bezier(0.22,1,0.36,1)_both] ${!onHome ? "brightness-0 invert" : ""}`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              )}
            </span>
            <span data-testid="text-logo" className={onHome ? "text-sm font-semibold text-white" : "text-sm font-semibold text-white"}>
              <img
                src={footerLogoText}
                alt="Track"
                className="h-[14px] w-auto object-contain brightness-0 invert"
              />
            </span>
          </a>

          <div
            data-testid="nav-desktop"
            className={
              onHome
                ? "relative z-10 hidden items-center gap-7 text-xs font-medium text-white/85 md:flex"
                : "relative z-10 hidden items-center gap-7 text-xs font-medium text-white/85 md:flex"
            }
          >
            <a
              data-testid="link-nav-home"
              href="/#inicio"
              className={onHome ? "transition hover:text-white" : "transition hover:text-white"}
              style={{ pointerEvents: showHome ? "auto" : "none", visibility: showHome ? "visible" : "hidden" }}
            >
              Início
            </a>
            <a
              data-testid="link-nav-editorial"
              href="/#editorial"
              className={onHome ? "transition hover:text-white" : "transition hover:text-white"}
              style={{ pointerEvents: showProduct ? "auto" : "none", visibility: showProduct ? "visible" : "hidden" }}
            >
              Editorial
            </a>
            <a
              data-testid="link-nav-product"
              href="/#servicos"
              className={onHome ? "transition hover:text-white" : "transition hover:text-white"}
              style={{ pointerEvents: showProduct ? "auto" : "none", visibility: showProduct ? "visible" : "hidden" }}
            >
              Serviços
            </a>
            <a
              data-testid="link-nav-testimonials"
              href="/#depoimentos"
              className={onHome ? "transition hover:text-white" : "transition hover:text-white"}
              style={{ pointerEvents: showTestimonials ? "auto" : "none", visibility: showTestimonials ? "visible" : "hidden" }}
            >
              Depoimentos
            </a>
          </div>

          <button
            data-testid="button-contact"
            style={{ zIndex: 10 }}
            onClick={onContact}
            className={
              (onHome
                ? "group relative hidden md:inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
                : "group relative hidden md:inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]")
            }
          >
            {!onHome ? (
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.00) 52%, rgba(0,0,0,0.05) 78%, rgba(0,0,0,0.00) 100%)",
                  }}
                />
              </span>
            ) : null}
            <span className="relative">
              <span
                className={
                  onHome
                    ? "absolute -inset-x-2 -inset-y-1 rounded-full bg-white/18 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                    : "absolute -inset-x-2 -inset-y-1 rounded-full bg-white/18 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                }
              />
              <span className="relative">Fale Conosco</span>
            </span>
            <span
              className={
                onHome
                  ? "relative grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/14 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-white/14 group-active:translate-x-0"
                  : "relative grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/14 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-white/14 group-active:translate-x-0"
              }
            >
              <ArrowRight
                className={
                  onHome
                    ? "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-[1px]"
                    : "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-[1px]"
                }
                strokeWidth={2.25}
              />
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

      {/* Mobile Sidebar */}
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
      </AnimatePresence>
    </div>
  );
}

const INSTAGRAM_USERNAME = "track.energia";
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

export function SiteFooter({ onContact }: { onContact: () => void }) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useQuery<{ posts: Array<{ id: string; media_url: string; thumbnail_url?: string; permalink: string }> }>({
    queryKey: ["/api/instagram/posts"],
    staleTime: 60 * 60 * 1000, // 1h - server já faz cache
  });
  const posts = data?.posts ?? [];

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const gap = 6;
    const card = el.querySelector<HTMLElement>("[data-ig-card]");
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-white">
      <div className="w-full bg-gradient-to-r from-black via-[#12001f] to-[#1d0238]">
        <div className="mx-auto w-full max-w-[1560px] px-6 sm:px-8 lg:px-10 2xl:px-12">
          <div className="flex flex-col gap-12 py-12 lg:grid lg:grid-cols-4 lg:items-start lg:gap-10 lg:py-16">
            <div className="min-w-0 max-w-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <img src={footerLogoMark} alt="" className="h-5 w-5 object-contain" />
                </span>
                <img
                  src={footerLogoText}
                  alt="Track"
                  data-testid="text-footer-brand"
                  className="h-3.5 w-auto object-contain brightness-0 invert"
                />
              </div>

              <div data-testid="text-footer-address" className="mt-6 text-sm leading-6 text-white/60">
                Track, Soluções em energia<br/>
                Uberlândia, Minas Gerais
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-white/75">
                <a
                  data-testid="icon-whatsapp"
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </a>
                <a
                  data-testid="icon-email"
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
                  aria-label="E-mail"
                >
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </a>
                <a
                  data-testid="icon-instagram"
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" strokeWidth={2} />
                </a>
                <a
                  data-testid="icon-facebook"
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" strokeWidth={2} />
                </a>
                <a
                  data-testid="icon-linkedin"
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" strokeWidth={2} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-3">
              <div>
                <div data-testid="text-footer-nav-title" className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                  Navegação
                </div>
                <div className="mt-6 flex flex-col gap-3 text-[13px] font-medium text-white/80">
                  <a
                    data-testid="link-footer-home"
                    href="/#inicio"
                    className="transition hover:text-white"
                  >
                    Início
                  </a>
                  <a
                    data-testid="link-footer-editorial"
                    href="/#editorial"
                    className="transition hover:text-white"
                  >
                    Editorial
                  </a>
                  <a
                    data-testid="link-footer-servicos"
                    href="/#servicos"
                    className="transition hover:text-white"
                  >
                    Serviços
                  </a>
                  <a
                    data-testid="link-footer-testimonials"
                    href="/#depoimentos"
                    className="transition hover:text-white"
                  >
                    Depoimentos
                  </a>
                  <Link
                    data-testid="link-footer-contact"
                    href="/contato"
                    className="transition hover:text-white"
                  >
                    Contato
                  </Link>
                </div>
              </div>

              <div>
                <div data-testid="text-footer-solutions-title" className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                  Soluções
                </div>
                <div className="mt-6 flex flex-col gap-3 text-[13px] font-medium text-white/80">
                  <Link
                    data-testid="link-footer-services"
                    href="/servicos"
                    className="flex items-center gap-2 transition hover:text-white group"
                  >
                    Ver todas
                    <ArrowRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    data-testid="link-footer-efficiency"
                    href="/servicos/eficiencia"
                    className="transition hover:text-white"
                  >
                    Eficiência
                  </Link>
                  <Link
                    data-testid="link-footer-generation"
                    href="/servicos/geracao"
                    className="transition hover:text-white"
                  >
                    Geração própria
                  </Link>
                  <Link
                    data-testid="link-footer-storage"
                    href="/servicos/armazenamento"
                    className="transition hover:text-white"
                  >
                    Armazenamento
                  </Link>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div data-testid="text-footer-instagram-title" className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                    Instagram
                  </div>
                  <a
                    data-testid="link-footer-instagram"
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-white/60 transition hover:text-white"
                  >
                    @{INSTAGRAM_USERNAME}
                  </a>
                </div>

                <div data-testid="carousel-instagram" className="group relative mt-3 rounded-2xl bg-white/6 p-2 ring-1 ring-white/10">
                  <div
                    ref={scrollRef}
                    className="scrollbar-none flex snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain"
                    style={{ scrollPaddingLeft: 8, scrollPaddingRight: 8 }}
                  >
                    {isLoading || posts.length === 0
                      ? new Array(9).fill(0).map((_, i) => (
                          <div
                            data-testid={`card-footer-ig-${i}`}
                            data-ig-card
                            key={i}
                            className="relative aspect-square w-[calc((100%-12px)/3)] shrink-0 snap-start overflow-hidden rounded-lg bg-white/7 ring-1 ring-white/10"
                            aria-hidden
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
                            <div className="absolute inset-0 grid place-items-center">
                              <div className="h-7 w-7 rounded-xl bg-white/10 ring-1 ring-white/12" />
                            </div>
                          </div>
                        ))
                      : posts.map((post, i) => (
                          <a
                            data-testid={`card-footer-ig-${i}`}
                            data-ig-card
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square w-[calc((100%-12px)/3)] shrink-0 snap-start overflow-hidden rounded-lg bg-white/7 ring-1 ring-white/10 transition hover:bg-white/10"
                            aria-label={`Post do Instagram ${i + 1}`}
                          >
                            <img
                              src={post.thumbnail_url || post.media_url}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition group-hover:opacity-100" />
                          </a>
                        ))}
                  </div>

                  <button
                    type="button"
                    data-testid="button-ig-prev"
                    onClick={() => scrollBy(-1)}
                    className="pointer-events-none absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white/80 opacity-0 ring-1 ring-white/16 backdrop-blur transition group-hover:opacity-100 md:grid md:group-hover:pointer-events-auto"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                  <button
                    type="button"
                    data-testid="button-ig-next"
                    onClick={() => scrollBy(1)}
                    className="pointer-events-none absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white/80 opacity-0 ring-1 ring-white/16 backdrop-blur transition group-hover:opacity-100 md:grid md:group-hover:pointer-events-auto"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-6 text-xs text-white/55">
            <div data-testid="text-footer-copyright">© {new Date().getFullYear()} Track. Todos os direitos reservados.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const WHATSAPP_LINK = "https://wa.me/5511999999999";
const WHATSAPP_MESSAGE = "Oi! Vim pelo site da Track e gostaria de conversar sobre soluções de energia.";
const CONTACT_EMAIL = "contato@trackenergia.com.br";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const reduced = usePrefersReducedMotion();
  const onHome = String(location) === "/" || String(location) === "";

  // Na home: ao carregar com hash (/#servicos etc), rolar até a seção após o conteúdo estar no DOM
  React.useEffect(() => {
    if (!onHome) return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const id = hash.split("?")[0];
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [onHome, reduced]);

  // Na home: links âncora (/#inicio, /#servicos, etc.) fazem scroll suave em vez de recarregar
  React.useEffect(() => {
    if (!onHome) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.startsWith("/#") ? href.slice(2).split("?")[0] : href.slice(1).split("?")[0];
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      if (href.startsWith("/#")) window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onHome, reduced]);

  const onContact = () => setLocation("/contato");

  return (
    <div data-testid="site-shell" className="min-h-screen w-full">
      <div className="relative">
        <SiteHeader onContact={onContact} />
        {children}
        <SiteFooter onContact={onContact} />
      </div>
    </div>
  );
}
