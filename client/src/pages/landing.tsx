import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  MoveUpRight,
  Pause,
  Play,
} from "lucide-react";
import heroImg from "@/assets/images/hero-solar.jpg";
import processImg from "@/assets/images/process-installation.jpg";
import productImg from "@/assets/images/product-solarfield.jpg";

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
          : "bg-white/14 text-white/90 ring-1 ring-white/20")
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
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
      className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_10px_30px_-20px_rgba(0,0,0,.65)] transition active:scale-[0.98]"
    >
      <span>{children}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-zinc-950 text-white transition group-hover:translate-x-0.5">
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
      className="group inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/18 backdrop-blur transition hover:bg-white/16 active:scale-[0.98]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/14 ring-1 ring-white/14 transition group-hover:bg-white/16">
        {icon}
      </span>
      <span>{children}</span>
    </button>
  );
}

function Nav({
  onContact,
}: {
  onContact: () => void;
}) {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-20">
      <div className="container-page pointer-events-auto">
        <div className="mt-4 flex items-center justify-between rounded-full bg-white/22 px-4 py-3 ring-1 ring-white/18 backdrop-blur">
          <a
            data-testid="link-logo"
            href="#top"
            className="flex items-center gap-2"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/18 ring-1 ring-white/15">
              <span className="h-4 w-4 rotate-12 rounded-sm bg-white" />
            </span>
            <span className="text-sm font-semibold text-white">Solars</span>
          </a>

          <div className="hidden items-center gap-7 text-xs font-medium text-white/78 md:flex">
            <a data-testid="link-nav-home" href="#top" className="hover:text-white transition">Início</a>
            <a data-testid="link-nav-product" href="#product" className="hover:text-white transition">Produto</a>
            <a data-testid="link-nav-process" href="#process" className="hover:text-white transition">Processo</a>
            <a data-testid="link-nav-testimonials" href="#footer" className="hover:text-white transition">Depoimentos</a>
          </div>

          <button
            data-testid="button-contact"
            onClick={onContact}
            className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-900 active:scale-[0.98]"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
            className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] bg-zinc-950 shadow-2xl ring-1 ring-white/10"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="text-sm font-semibold text-white">Visão geral solar</div>
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
                title="Vídeo solar"
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

function Hero({
  onPlay,
}: {
  onPlay: () => void;
}) {
  return (
    <section id="top" className="relative overflow-hidden rounded-[34px] bg-black">
      <img
        data-testid="img-hero"
        src={heroImg}
        alt="Painéis solares"
        className="h-[520px] w-full object-cover sm:h-[560px] md:h-[620px]"
      />
      <div className="absolute inset-0 hero-overlay noise" />

      <div className="absolute inset-0">
        <Nav onContact={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })} />

        <div className="container-page">
          <div className="pt-[104px] sm:pt-[112px]">
            <div className="max-w-[520px]">
              <h1
                data-testid="text-hero-title"
                className="text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-white sm:text-[56px]"
              >
                Energia solar
                <br />
                para impulsionar
                <br />
                o seu futuro
              </h1>

              <p
                data-testid="text-hero-subtitle"
                className="mt-4 max-w-[420px] text-xs leading-5 text-white/72"
              >
                Energia limpa, acessível e renovável — assuma o controle da sua conta de luz com uma solução inteligente.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryButton testId="button-explore-now" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}>
                  Explorar agora
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

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div />

              <div className="flex w-full max-w-[360px] items-center justify-between gap-3 rounded-[22px] bg-white/10 p-3 ring-1 ring-white/16 backdrop-blur md:max-w-[420px]">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/12">
                    <img
                      data-testid="img-hero-card"
                      src={productImg}
                      alt="Panel"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div data-testid="text-hero-card-title" className="text-xs font-semibold text-white">
                      Suncryst EdgeTech 500...
                    </div>
                    <div data-testid="text-hero-card-desc" className="mt-0.5 text-[11px] leading-4 text-white/65">
                      Nossos painéis mais vendidos unem durabilidade e performance de alto nível.
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
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="grid gap-10 md:grid-cols-[360px_1fr] md:items-center">
        <div>
          <Pill testId="pill-about" muted={false}>
            ( sobre nós )
          </Pill>
          <div className="mt-5 flex items-end gap-4">
            <div className="flex -space-x-2">
              {new Array(4).fill(0).map((_, i) => (
                <div
                  data-testid={`img-team-${i}`}
                  key={i}
                  className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,.06), rgba(0,0,0,.15))",
                  }}
                />
              ))}
            </div>
            <div>
              <div data-testid="text-team-count" className="text-[28px] font-medium tracking-[-0.02em]">
                52 especialistas
              </div>
              <div data-testid="text-team-sub" className="text-sm text-zinc-500">
                prontos para te ajudar
              </div>
            </div>
          </div>
        </div>

        <div className="md:pl-10">
          <h2
            data-testid="text-about-title"
            className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-[46px]"
          >
            Somos um time
            <br />
            dedicado de especialistas
            <br />
            <span className="text-zinc-400">apaixonados</span> por
            <br />
            <span className="text-zinc-400">acelerar</span> a energia solar
          </h2>
          <p data-testid="text-about-desc" className="mt-4 max-w-[520px] text-sm leading-6 text-zinc-500">
            Com um compromisso real com a sustentabilidade, ajudamos pessoas, famílias e empresas
            a migrarem para uma energia mais limpa com soluções solares inteligentes, confiáveis e acessíveis\n            feitas para durar.
          </p>

          <div className="mt-6">
            <button
              data-testid="button-our-story"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-900 active:scale-[0.98]"
            >
              Nossa história
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductFeature({ product }: { product: Product }) {
  return (
    <section id="product" className="container-page pb-12 sm:pb-16">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-zinc-50 p-8 ring-1 ring-zinc-100">
          <Pill testId="pill-popular-product" muted={false}>
            ( produto popular )
          </Pill>
          <h3
            data-testid="text-product-title"
            className="mt-6 text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em]"
          >
            {product.title}
            <br />
            <span className="text-zinc-400">{product.subtitle}</span>
          </h3>
          <p data-testid="text-product-desc" className="mt-3 max-w-[520px] text-sm leading-6 text-zinc-500">
            {product.desc}
          </p>

          <div className="mt-8 grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-zinc-100">
            <div className="text-sm font-semibold text-zinc-900" data-testid="text-spec-title">
              Especificações do produto
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {product.specLeft.map((s, idx) => (
                  <li data-testid={`text-spec-left-${idx}`} key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                {product.specRight.map((s, idx) => (
                  <li data-testid={`text-spec-right-${idx}`} key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
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
              <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-950 text-white">
                <MoveUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
              Vamos conversar
            </button>
            <button
              data-testid="button-explore-product"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-900 active:scale-[0.98]"
            >
              Explorar produto
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px]">
          <img
            data-testid="img-product"
            src={product.image}
            alt="Produto"
            className="h-full min-h-[420px] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Process() {
  const reduced = usePrefersReducedMotion();
  const slides = useMemo(
    () => [
      {
        k: "01",
        title: "Avaliação do local e planejamento",
        desc: "Analisamos seu consumo de energia e as condições do telhado para desenhar a melhor solução solar.",
        img: processImg,
      },
      {
        k: "02",
        title: "Engenharia do sistema e preparação",
        desc: "Selecionamos painéis, inversores e estrutura ideais para o seu clima e objetivos.",
        img: processImg,
      },
      {
        k: "03",
        title: "Instalação sem complicação, feita por profissionais",
        desc: "Da vistoria no local à configuração final, nosso time garante uma instalação segura, ágil e sob medida. Cada painel é testado para desempenho máximo e instalado com precisão.",
        img: processImg,
      },
      {
        k: "04",
        title: "Monitoramento e suporte contínuo",
        desc: "Acompanhe a geração em tempo real e conte com suporte sempre que precisar.",
        img: processImg,
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(2);

  return (
    <section id="process" className="container-page pb-12 sm:pb-16">
      <div className="relative overflow-hidden rounded-[32px] bg-black">
        <img
          data-testid="img-process"
          src={slides[idx].img}
          alt="Process"
          className="h-[480px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute inset-0 p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <Pill testId="pill-process" muted>
              ( seu processo )
            </Pill>
            <div data-testid="text-process-counter" className="text-sm font-semibold text-white/85">
              ({slides[idx].k}/04)
            </div>
          </div>

          <div className="mt-24 grid gap-8 md:mt-28 md:grid-cols-[1fr_420px] md:items-start">
            <div />
            <div>
              <h3
                data-testid="text-process-title"
                className="text-balance text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white"
              >
                {slides[idx].title}
              </h3>
              <p data-testid="text-process-desc" className="mt-3 text-sm leading-6 text-white/70">
                {slides[idx].desc}
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 right-5 flex items-center gap-2">
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

            {!reduced ? (
              <motion.div
                className="ml-3 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/12 backdrop-blur sm:flex"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/65 opacity-30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white/65" />
                </span>
                Live
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="container-page pb-12 sm:pb-16">
      <div className="grid gap-4 md:grid-cols-[240px_1fr] md:items-start">
        <div className="pt-2">
          <Pill testId="pill-our-product">( nosso produto )</Pill>
        </div>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 data-testid="text-grid-title" className="text-balance text-[38px] font-medium leading-[1.06] tracking-[-0.03em]">
              Explore nossa tecnologia
              <br />
              <span className="text-zinc-400">e pacotes de sistema</span>
            </h3>
            <button
              data-testid="button-grid-explore"
              className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 active:scale-[0.98]"
            >
              Explorar produto
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.button
                data-testid={`card-product-${p.id}`}
                key={p.id}
                onHoverStart={() => setActive(p.id)}
                onHoverEnd={() => setActive((cur) => (cur === p.id ? null : cur))}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive((cur) => (cur === p.id ? null : cur))}
                className="group text-left"
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              >
                <div className="relative overflow-hidden rounded-[26px] bg-zinc-100 ring-1 ring-zinc-200">
                  <img
                    data-testid={`img-product-grid-${p.id}`}
                    src={p.image}
                    alt={p.title}
                    className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-80" />

                  <AnimatePresence>
                    {active === p.id ? (
                      <motion.div
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="glass rounded-full px-4 py-2 text-xs font-semibold text-white"
                          initial={{ scale: 0.95, y: 10, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0.95, y: 10, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
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
                  <div data-testid={`text-product-grid-tag-${p.id}`} className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
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
      </div>
    </section>
  );
}

function Footer({ onPlay }: { onPlay: () => void }) {
  return (
    <footer id="footer" className="container-page pb-14">
      <div className="overflow-hidden rounded-[30px] bg-zinc-950">
        <div className="grid gap-10 p-8 md:grid-cols-[280px_1fr] md:items-center md:gap-12 md:p-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                <span className="h-4 w-4 rotate-12 rounded-sm bg-white" />
              </span>
              <span data-testid="text-footer-brand" className="text-sm font-semibold text-white">Solars</span>
            </div>
            <div data-testid="text-footer-address" className="mt-5 text-xs leading-5 text-white/60">
              1234 Solar Innovation Parkway,
              <br />
              Suite 560, Palo Alto, California 94301,
              <br />
              United States of America (USA)
            </div>

            <div className="mt-6 flex items-center gap-3 text-white/65">
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

          <div>
            <h3 data-testid="text-footer-title" className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              Mude para a energia
              <br />
              solar e ilumine o futuro,
              <br />
              <span className="text-white/65">Energia limpa e confiável</span> feita
              <br />
              <span className="text-white/65">para</span> a vida moderna
            </h3>
            <p data-testid="text-footer-desc" className="mt-4 max-w-[520px] text-sm leading-6 text-white/60">
              Energize sua casa ou empresa com soluções solares eficientes e acessíveis, feitas para gerar impacto real.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PrimaryButton testId="button-footer-explore" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}>
                Explorar agora
              </PrimaryButton>
              <GhostButton
                testId="button-footer-play"
                onClick={onPlay}
                icon={<CirclePlay className="h-4 w-4" strokeWidth={2.25} />}
              >
                Ver vídeo
              </GhostButton>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-[11px] text-white/55 md:px-10">
          <div data-testid="text-footer-copyright">©2025 Solars. Todos os direitos reservados</div>
          <div className="flex items-center gap-4">
            <a data-testid="link-footer-terms" href="#" className="hover:text-white transition">Termos de uso</a>
            <a data-testid="link-footer-home" href="#top" className="hover:text-white transition">Início</a>
            <a data-testid="link-footer-product" href="#product" className="hover:text-white transition">Produto</a>
            <a data-testid="link-footer-process" href="#process" className="hover:text-white transition">Processo</a>
            <a data-testid="link-footer-testimonials" href="#footer" className="hover:text-white transition">Depoimentos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const reduced = usePrefersReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);

  const primaryProduct: Product = useMemo(
    () => ({
      id: "edge-500",
      tag: "PRODUTO POPULAR",
      title: "Suncryst EdgeTech 500W",
      subtitle: "Módulo PERC de dupla camada",
      desc: "Nossos painéis mais vendidos combinam durabilidade e alta performance — ideais para residências e uso comercial.",
      specLeft: ["Acessórios", "Potência de saída do inversor", "Módulo de painel solar"],
      specRight: ["Cabo DC / aterramento", "800 VA / 1000 VA", "Painel solar mono 550W"],
      image: productImg,
    }),
    [],
  );

  const products: Product[] = useMemo(
    () => [
      {
        id: "solnova-550",
        tag: "TELHADO RESIDENCIAL",
        title: "Solnova UltraCell 550W",
        subtitle: "Série Mono SmartGrid Boost para todos os climas",
        desc: "",
        specLeft: [],
        specRight: [],
        image: productImg,
      },
      {
        id: "edge-500",
        tag: "SISTEMAS OFF-GRID",
        title: "Suncryst EdgeTech 500W",
        subtitle: "Módulo PERC de dupla camada com controle por IA",
        desc: "",
        specLeft: [],
        specRight: [],
        image: productImg,
      },
      {
        id: "heliomax-530",
        tag: "COMERCIAL E INDUSTRIAL",
        title: "HelioMax TitanGlass 530W",
        subtitle: "Painel de alta precisão para eficiência solar",
        desc: "",
        specLeft: [],
        specRight: [],
        image: productImg,
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="container-page py-5 sm:py-6">
        <Hero onPlay={() => setVideoOpen(true)} />
      </main>

      <About />
      <ProductFeature product={primaryProduct} />
      <Process />
      <ProductGrid products={products} />
      <Footer onPlay={() => setVideoOpen(true)} />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

    </div>
  );
}
