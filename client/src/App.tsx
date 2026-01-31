import { Switch, Route, useLocation } from "wouter";
import React, { useEffect, useMemo, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "./pages/landing";
import Contact from "./pages/contact";
import { Skeleton } from "@/components/ui/skeleton";

function ScrollbarLoader() {
  return (
    <div
      data-testid="loading-scrollbar"
      className="relative h-28 w-[14px] overflow-hidden rounded-full bg-white/60 ring-1 ring-black/10"
      aria-hidden
    >
      <div className="absolute inset-[2px] overflow-hidden rounded-full bg-gradient-to-b from-zinc-100 to-white">
        <div className="absolute inset-x-0 top-0 h-10 animate-[scrollbarSweep_900ms_ease-in-out_infinite] rounded-full bg-gradient-to-b from-[#30045c]/35 via-[#1d0238]/18 to-transparent" />
      </div>
    </div>
  );
}

function LoadingShell() {
  return (
    <div data-testid="loading-shell" className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-10 2xl:px-12">
      <div className="pt-10 sm:pt-12 lg:pt-14">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Skeleton data-testid="skeleton-pill" className="h-6 w-28 rounded-full" />
            </div>
            <Skeleton data-testid="skeleton-title" className="mt-5 h-12 w-[min(560px,92%)] rounded-2xl" />
            <Skeleton data-testid="skeleton-subtitle" className="mt-4 h-5 w-[min(680px,96%)] rounded-xl" />
          </div>

          <div className="mt-1 hidden sm:block">
            <ScrollbarLoader />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-black via-[#12001f] to-[#1d0238] p-7 ring-1 ring-black/10 sm:p-8">
            <div className="absolute inset-0 hero-overlay opacity-65" />
            <div className="absolute inset-0 noise opacity-[0.20]" />
            <div className="relative">
              <Skeleton data-testid="skeleton-card-title" className="h-10 w-[min(420px,90%)] rounded-2xl bg-white/15" />
              <Skeleton data-testid="skeleton-card-sub" className="mt-4 h-5 w-[min(520px,95%)] rounded-xl bg-white/10" />
              <Skeleton data-testid="skeleton-card-button" className="mt-7 h-16 w-full rounded-[22px] bg-white/10" />
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {new Array(3).fill(0).map((_, i) => (
                  <div key={i} className="rounded-[20px] bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur">
                    <Skeleton data-testid={`skeleton-benefit-${i}`} className="h-10 w-full rounded-xl bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-6 ring-1 ring-zinc-200 sm:p-7">
            <Skeleton data-testid="skeleton-options-title" className="h-6 w-40 rounded-xl" />
            <Skeleton data-testid="skeleton-options-sub" className="mt-2 h-4 w-[min(360px,90%)] rounded-xl" />
            <div className="mt-6 grid gap-3">
              {new Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} data-testid={`skeleton-option-${i}`} className="h-14 w-full rounded-[18px]" />
              ))}
            </div>
            <Skeleton data-testid="skeleton-social" className="mt-8 h-20 w-full rounded-[22px]" />
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <ScrollbarLoader />
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();

  const header = useMemo(
    () => (
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-40">
        <div className="container-page pointer-events-auto">
          <div
            data-testid="header-shell"
            className="relative mt-4 flex items-center justify-between overflow-hidden rounded-full bg-white/22 px-4 py-3 ring-1 ring-white/18 backdrop-blur"
          >
            <a data-testid="link-logo" href="/#top" className="relative flex items-center gap-3">
              <span data-testid="logo-mark" className="grid h-10 w-10 place-items-center">
                <img
                  data-testid="img-logo-final"
                  src="/attached_assets/official-logo.png"
                  alt="Track"
                  className="h-10 w-10 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)]"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                />
              </span>
              <span data-testid="text-logo" className="text-sm font-semibold text-white">
                Track
              </span>
            </a>

            <div data-testid="nav-desktop" className="hidden items-center gap-7 text-xs font-medium text-white/78 md:flex">
              <a data-testid="link-nav-home" href="/#top" className="transition hover:text-white">
                Início
              </a>
              <a data-testid="link-nav-product" href="/#product" className="transition hover:text-white">
                Serviços
              </a>
              <a data-testid="link-nav-process" href="/#process" className="transition hover:text-white">
                Abordagem
              </a>
              <a data-testid="link-nav-testimonials" href="/#testimonials" className="transition hover:text-white">
                Depoimentos
              </a>
            </div>

            <button
              data-testid="button-contact"
              onClick={() => setLocation("/contato")}
              className="relative rounded-full bg-[#1d0238] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#30045c] active:scale-[0.98]"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    ),
    [setLocation],
  );

  const footer = useMemo(
    () => (
      <footer data-testid="footer-shell" className="w-full bg-white">
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
                    <button
                      data-testid="button-footer-explore"
                      onClick={() => setLocation("/contato")}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-100 active:scale-[0.98]"
                    >
                      Vamos conversar
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1d0238] text-white">
                        <span className="h-3 w-3 rounded-sm bg-white" />
                      </span>
                    </button>
                    <button
                      data-testid="button-footer-services"
                      onClick={() => setLocation("/")}
                      className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-xs font-semibold text-white ring-1 ring-white/12 transition hover:bg-white/14 active:scale-[0.98]"
                    >
                      Nossos Serviços
                    </button>
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
              <a data-testid="link-footer-home" href="/#top" className="transition hover:text-zinc-950">
                Início
              </a>
              <a data-testid="link-footer-product" href="/#product" className="transition hover:text-zinc-950">
                Serviços
              </a>
              <a data-testid="link-footer-process" href="/#process" className="transition hover:text-zinc-950">
                Processo
              </a>
              <a data-testid="link-footer-testimonials" href="/#testimonials" className="transition hover:text-zinc-950">
                Depoimentos
              </a>
            </div>
          </div>
        </div>
      </footer>
    ),
    [setLocation],
  );

  return (
    <div data-testid="layout-root" className="min-h-screen bg-white">
      {header}
      <div className="pt-[92px]">{children}</div>
      {footer}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/contato" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(t);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>{loading ? <LoadingShell /> : <Router />}</Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
