import React from "react";
import { Link } from "wouter";
import { ArrowLeft, Globe, Instagram, Mail, MessageCircle, Phone } from "lucide-react";

function ContactCard({
  icon,
  title,
  value,
  href,
  hint,
  testId,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  hint?: string;
  testId: string;
}) {
  return (
    <a
      data-testid={testId}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group relative overflow-hidden rounded-[22px] bg-white/10 p-5 ring-1 ring-white/16 backdrop-blur transition hover:bg-white/12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full bg-[#30045c]/25 blur-2xl" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/14">
          {icon}
        </div>
        <div className="min-w-0">
          <div data-testid={`${testId}-title`} className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            {title}
          </div>
          <div data-testid={`${testId}-value`} className="mt-1 truncate text-sm font-semibold text-white">
            {value}
          </div>
          {hint ? (
            <div data-testid={`${testId}-hint`} className="mt-1 text-[12px] leading-5 text-white/60">
              {hint}
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <main data-testid="page-contact" className="min-h-screen bg-black">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hero-overlay noise" />
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#30045c]/30 blur-3xl" />
          <div className="absolute -bottom-28 left-8 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="container-page relative pt-6">
          <div className="flex items-center justify-between gap-3">
            <Link data-testid="link-back-home" href="/" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/16 backdrop-blur transition hover:bg-white/12">
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
              Voltar
            </Link>

            <div className="flex items-center gap-3">
              <img
                data-testid="img-contact-logo"
                src="/attached_assets/official-logo.png"
                alt="Track"
                className="h-9 w-9 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)]"
              />
              <div>
                <div data-testid="text-contact-title" className="text-sm font-semibold text-white">
                  Contato
                </div>
                <div data-testid="text-contact-subtitle" className="text-[12px] text-white/60">
                  Resposta rápida. Conversa direta.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <h1 data-testid="text-contact-hero" className="text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-[54px]">
                Vamos conversar
              </h1>
              <p data-testid="text-contact-desc" className="mt-4 max-w-[560px] text-sm leading-6 text-white/72">
                Quer um diagnóstico rápido ou uma proposta sob medida? Chame no WhatsApp e seguimos por lá. Se preferir, use e-mail, telefone ou redes.
              </p>

              <a
                data-testid="button-whatsapp"
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-between gap-4 rounded-[26px] bg-white px-6 py-5 text-sm font-semibold text-zinc-950 shadow-[0_20px_60px_-34px_rgba(0,0,0,.75)] ring-1 ring-black/5 transition hover:bg-zinc-50 active:scale-[0.99] sm:max-w-[520px]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1d0238] text-white">
                    <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  Entrar em contato agora pelo WhatsApp
                </span>
                <span className="text-xs font-semibold text-zinc-700">Resposta rápida</span>
              </a>

              <div data-testid="text-contact-note" className="mt-3 text-[12px] leading-5 text-white/55">
                Horário comercial: 8h–18h · Se você preferir, podemos agendar uma chamada.
              </div>
            </div>

            <div>
              <div data-testid="panel-contact-options" className="rounded-[28px] bg-white/10 p-4 ring-1 ring-white/16 backdrop-blur">
                <div data-testid="text-contact-options-title" className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  Outras formas
                </div>

                <div className="grid gap-3">
                  <ContactCard
                    testId="card-contact-email"
                    icon={<Mail className="h-5 w-5 text-white" strokeWidth={2.25} />}
                    title="E-mail"
                    value="contato@trackenergia.com"
                    href="mailto:contato@trackenergia.com"
                    hint="Envie detalhes do projeto e retornamos com próximos passos."
                  />

                  <ContactCard
                    testId="card-contact-phone"
                    icon={<Phone className="h-5 w-5 text-white" strokeWidth={2.25} />}
                    title="Celular"
                    value="(00) 00000-0000"
                    href="tel:+5500000000000"
                    hint="Prefere ligar? A gente atende e direciona." 
                  />

                  <ContactCard
                    testId="card-contact-instagram"
                    icon={<Instagram className="h-5 w-5 text-white" strokeWidth={2.25} />}
                    title="Instagram"
                    value="@track"
                    href="https://instagram.com/"
                    hint="Bastidores, projetos e novidades." 
                  />

                  <ContactCard
                    testId="card-contact-site"
                    icon={<Globe className="h-5 w-5 text-white" strokeWidth={2.25} />}
                    title="Redes"
                    value="LinkedIn / YouTube"
                    href="https://www.linkedin.com/"
                    hint="Conecte com o time e veja conteúdo." 
                  />
                </div>
              </div>

              <div data-testid="text-contact-footer" className="mt-4 px-2 text-[11px] leading-5 text-white/55">
                Dica: quanto mais contexto (consumo, endereço, objetivo), mais rápido conseguimos estimar o melhor caminho.
              </div>
            </div>
          </div>

          <div className="mt-16 pb-12">
            <div data-testid="divider-contact" className="h-px w-full bg-white/12" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/55">
              <div data-testid="text-contact-copyright">©2026 Track. Todos os direitos reservados</div>
              <div data-testid="text-contact-location">Brasil</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
