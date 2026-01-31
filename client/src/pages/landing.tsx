import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import headerArrow from "../assets/images/header-arrow.png";
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

    unique.forEach((url) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;
      imgs.push(img);
    });

    return () => {
      cancelled = true;
      if (!cancelled) return;
    };
  }, [urls]);
}

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
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
          : "bg-[#100121]/7 text-zinc-700 ring-1 ring-[#100121]/18")
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
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#100121] text-white transition group-hover:translate-x-0.5">
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
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => setNavReady(true), 560);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
      <div className="container-page pointer-events-auto">
        <div
          data-testid="header-nav"
          className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white/22 px-4 py-3 ring-1 ring-white/18 backdrop-blur"
        >
          {/* sweeping arrow */}
          <motion.img
            data-testid="img-header-arrow"
            src={headerArrow}
            alt=""
            className="pointer-events-none absolute right-0 top-1/2 z-10 h-[74px] w-[74px] -translate-y-1/2 select-none"
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: navReady ? -820 : 340, opacity: navReady ? 1 : 0 }}
            transition={{ x: { duration: 0.95, ease: [0.2, 0.85, 0.2, 1] }, opacity: { duration: 0.16, ease: "easeOut" } }}
          />

          <a data-testid="link-logo" href="#top" className="relative z-20 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/18 ring-1 ring-white/15">
              <span className="h-4 w-4 rotate-12 rounded-sm bg-white" />
            </span>
            <span className="text-sm font-semibold text-white">Track</span>
          </a>

          <div className="relative hidden items-center gap-7 text-xs font-medium md:flex">
            {(
              [
                { id: "home", label: "Início", href: "#top", testId: "link-nav-home" },
                { id: "product", label: "Serviços", href: "#product", testId: "link-nav-product" },
                { id: "process", label: "Abordagem", href: "#process", testId: "link-nav-process" },
                { id: "testimonials", label: "Depoimentos", href: "#testimonials", testId: "link-nav-testimonials" },
              ] as const
            ).map((item, idx) => (
              <a
                key={item.id}
                data-testid={item.testId}
                href={item.href}
                className="relative text-white/78 transition hover:text-white"
              >
                <span
                  className="inline-block"
                  style={{
                    transitionProperty: "clip-path, opacity, transform",
                    transitionTimingFunction: "cubic-bezier(0.2, 0.85, 0.2, 1)",
                    transitionDuration: "460ms",
                    transitionDelay: navReady ? `${520 + idx * 120}ms` : "0ms",
                    clipPath: navReady ? "inset(0 0 0 0 round 8px)" : "inset(0 0 0 100% round 8px)",
                    opacity: navReady ? 1 : 0,
                    transform: navReady ? "translateX(0px)" : "translateX(10px)",
                  }}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <button
            data-testid="button-contact"
            onClick={onContact}
            className="relative z-20 rounded-full bg-[#100121] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1a0335] active:scale-[0.98]"
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
            className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] bg-[#100121] shadow-2xl ring-1 ring-white/10"
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

export default function Landing() {
  return (
    <div data-testid="page-landing" className="min-h-screen bg-white">
      <Nav onContact={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })} />
      <main className="container-page pt-28">
        <h1 data-testid="text-page-title" className="text-2xl font-semibold text-zinc-900">
          Track
        </h1>
        <p data-testid="text-page-subtitle" className="mt-2 max-w-xl text-sm text-zinc-600">
          A página estava em branco porque o componente Landing estava retornando null. Já corrigi.
        </p>
      </main>
    </div>
  );
}
