import React from "react";
import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  MoveUpRight,
  Quote,
  Star,
} from "lucide-react";

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
              : "relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white px-4 py-3 ring-1 ring-zinc-200"
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
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-white to-zinc-100" />
                <div
                  data-testid="bg-header-badge-center-lift"
                  className="absolute inset-x-10 top-1/2 h-10 -translate-y-1/2 rounded-full blur-xl"
                  style={{ background: "rgba(255,255,255,0.80)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0.00) 22%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.00) 78%, rgba(0,0,0,0.08) 100%)",
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

          <a
            data-testid="link-logo"
            href={onHome ? "#top" : "/"}
            className="relative z-10 flex items-center gap-3"
            onClick={(e) => {
              if (!onHome) {
                e.preventDefault();
                window.location.href = "/";
              }
            }}
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
            <span data-testid="text-logo" className={onHome ? "text-sm font-semibold text-white" : "text-sm font-semibold text-zinc-700"}>
              Track
            </span>
          </a>

          <div
            data-testid="nav-desktop"
            className={
              onHome
                ? "relative z-10 hidden items-center gap-7 text-xs font-medium text-white/85 md:flex"
                : "relative z-10 hidden items-center gap-7 text-xs font-medium text-zinc-700 md:flex"
            }
          >
            <a
              data-testid="link-nav-home"
              href="#top"
              className={onHome ? "transition hover:text-white" : "transition hover:text-zinc-900"}
              style={{ pointerEvents: showHome ? "auto" : "none", visibility: showHome ? "visible" : "hidden" }}
            >
              Início
            </a>
            <a
              data-testid="link-nav-product"
              href="#product"
              className={onHome ? "transition hover:text-white" : "transition hover:text-zinc-900"}
              style={{ pointerEvents: showProduct ? "auto" : "none", visibility: showProduct ? "visible" : "hidden" }}
            >
              Serviços
            </a>
            <a
              data-testid="link-nav-process"
              href="#process"
              className={onHome ? "transition hover:text-white" : "transition hover:text-zinc-900"}
              style={{ pointerEvents: showProcess ? "auto" : "none", visibility: showProcess ? "visible" : "hidden" }}
            >
              Abordagem
            </a>
            <a
              data-testid="link-nav-testimonials"
              href="#testimonials"
              className={onHome ? "transition hover:text-white" : "transition hover:text-zinc-900"}
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
              onHome
                ? "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
                : "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/70 backdrop-blur-xl transition hover:bg-white/80 hover:text-zinc-800 active:scale-[0.98]"
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
                    : "absolute -inset-x-2 -inset-y-1 rounded-full bg-black/5 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                }
              />
              <span className="relative">Fale Conosco</span>
            </span>
            <span
              className={
                onHome
                  ? "relative grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/14 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-white/14 group-active:translate-x-0"
                  : "relative grid h-7 w-7 place-items-center rounded-full bg-black/5 ring-1 ring-black/5 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-black/8 group-active:translate-x-0"
              }
            >
              <ArrowRight
                className={
                  onHome
                    ? "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-[1px]"
                    : "h-3.5 w-3.5 text-zinc-700 transition duration-300 group-hover:translate-x-[1px]"
                }
                strokeWidth={2.25}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter({ onContact }: { onContact: () => void }) {
  return (
    <footer id="footer" className="w-full bg-white">
      <div className="w-full bg-gradient-to-r from-black via-[#12001f] to-[#1d0238]">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="grid gap-10 py-10 md:grid-cols-4 md:items-start md:gap-10 md:py-12">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <span className="h-4 w-4 rotate-12 rounded-sm bg-white" />
                </span>
                <span data-testid="text-footer-brand" className="text-sm font-semibold text-white">
                  Track
                </span>
              </div>

              <div data-testid="text-footer-address" className="mt-5 text-xs leading-5 text-white/60">
                Track, Soluções em energia · Brasil
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-white/75">
                <a
                  data-testid="icon-whatsapp"
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
                </a>
                <a
                  data-testid="icon-email"
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14"
                  aria-label="E-mail"
                >
                  <Mail className="h-5 w-5" strokeWidth={2.25} />
                </a>
                <a
                  data-testid="icon-instagram"
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" strokeWidth={2.25} />
                </a>
                <a
                  data-testid="icon-facebook"
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" strokeWidth={2.25} />
                </a>
                <a
                  data-testid="icon-linkedin"
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/12 transition hover:bg-white/14"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" strokeWidth={2.25} />
                </a>

              </div>
            </div>

            <div className="contents">
              <div>
                <div data-testid="text-footer-content-title" className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  Conteúdo
                </div>
                <div className="mt-3 grid gap-2 text-xs font-medium text-white/65">
                  <a data-testid="link-footer-home" href="/" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Início</span>
                    <span className="text-white/35">/</span>
                  </a>
                  <a data-testid="link-footer-services" href="/servicos" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Serviços</span>
                    <span className="text-white/35">/</span>
                  </a>
                  <a data-testid="link-footer-contact" href="/contato" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Contato</span>
                    <span className="text-white/35">/</span>
                  </a>
                </div>
              </div>

              <div>
                <div data-testid="text-footer-solutions-title" className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  Soluções
                </div>
                <div className="mt-3 grid gap-2 text-xs font-medium text-white/65">
                  <a data-testid="link-footer-efficiency" href="/servicos/eficiencia" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Eficiência</span>
                    <span className="text-white/35">/</span>
                  </a>
                  <a data-testid="link-footer-generation" href="/servicos/geracao" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Geração</span>
                    <span className="text-white/35">/</span>
                  </a>
                  <a data-testid="link-footer-storage" href="/servicos/armazenamento" className="inline-flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/8 hover:text-white">
                    <span>Armazenamento</span>
                    <span className="text-white/35">/</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <div data-testid="text-footer-instagram-title" className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                    Instagram
                  </div>
                  <a data-testid="link-footer-instagram" href="#" className="text-xs font-medium text-white/70 transition hover:text-white">
                    Ver mais
                  </a>
                </div>

                <div className="mt-3 rounded-2xl bg-white/6 p-2 ring-1 ring-white/10">
                  <div className="grid grid-cols-3 gap-1.5">
                    {new Array(3).fill(0).map((_, i) => (
                      <a
                        data-testid={`card-footer-ig-${i}`}
                        key={i}
                        href="#"
                        className="group relative aspect-square overflow-hidden rounded-lg bg-white/7 ring-1 ring-white/10 transition hover:bg-white/10"
                        aria-label={`Post do Instagram ${i + 1}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="h-7 w-7 rounded-xl bg-white/10 ring-1 ring-white/12" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition group-hover:opacity-100" />
                      </a>
                    ))}
                  </div>
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

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const onContact = () => {
    const path = String(location);
    if (path === "/") {
      const el = document.getElementById("footer");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = "/contato";
  };

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
