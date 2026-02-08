import React, { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

import blog1 from "@/assets/images/blog-tech_1.jpg";
import blog2 from "@/assets/images/blog-tech_2.jpg";
import blog3 from "@/assets/images/blog-tech_3.jpg";
import blog4 from "@/assets/images/blog-tech_4.jpg";
import authorAvatar from "@/assets/images/testimonial-1.png";

// Mock data (duplicated from landing.tsx for independence)
const posts = [
  {
    id: "1",
    category: "Tendências",
    title: "O futuro da energia solar no Brasil: o que esperar para 2026",
    excerpt: "Com novas regulamentações e avanços tecnológicos, o cenário para geração distribuída promete grandes oportunidades.",
    date: "05 Fev 2026",
    readTime: "5 min",
    image: blog1,
    content: `
      <p class="lead">O setor de energia solar no Brasil vive um momento de transformação acelerada. Com a consolidação da geração distribuída e a abertura do mercado livre, 2026 promete ser um ano divisor de águas para consumidores e empresas.</p>
      
      <h3>Novas fronteiras tecnológicas</h3>
      <p>A evolução dos painéis fotovoltaicos tem permitido uma eficiência cada vez maior, mesmo em áreas com menor incidência solar. Tecnologias como células de perovskita e módulos bifaciais estão se tornando mais acessíveis, aumentando o ROI (Retorno sobre Investimento) dos projetos.</p>
      
      <p>Além disso, a integração com sistemas de armazenamento (baterias) está permitindo que empresas se tornem praticamente independentes da rede elétrica tradicional durante horários de pico, quando a tarifa é mais cara.</p>

      <h3>O papel da regulação</h3>
      <p>As recentes atualizações no marco legal da geração distribuída trouxeram mais segurança jurídica para investidores. Embora algumas taxas tenham sido implementadas, a transparência nas regras do jogo atraiu capital estrangeiro e fomentou a profissionalização do setor.</p>

      <blockquote>
        "A energia solar não é mais apenas uma alternativa sustentável, é uma estratégia financeira indispensável para a competitividade industrial."
      </blockquote>

      <h3>Mercado Livre de Energia</h3>
      <p>A migração para o Mercado Livre de Energia continua sendo uma tendência forte. Para 2026, espera-se que consumidores de média tensão tenham acesso facilitado a esse ambiente, permitindo a negociação direta com geradores e a escolha de fontes renováveis com certificação.</p>

      <h3>Conclusão</h3>
      <p>Preparar-se para esse novo cenário exige planejamento e parceiros estratégicos. A transição energética não é apenas sobre trocar a fonte de energia, mas sobre inteligência no consumo e gestão eficiente de recursos.</p>
    `
  },
  {
    id: "2",
    category: "Tecnologia",
    title: "Armazenamento inteligente: a revolução das baterias",
    excerpt: "Como sistemas de storage estão mudando a forma como indústrias consomem energia.",
    date: "02 Fev 2026",
    readTime: "4 min",
    image: blog2,
    content: "Conteúdo do artigo..."
  },
  {
    id: "3",
    category: "Sustentabilidade",
    title: "ESG na prática: reduzindo a pegada de carbono",
    excerpt: "Estratégias reais para empresas que buscam impacto ambiental positivo e economia.",
    date: "28 Jan 2026",
    readTime: "6 min",
    image: blog3,
    content: "Conteúdo do artigo..."
  },
  {
    id: "4",
    category: "Mercado",
    title: "Mercado Livre de Energia: vale a pena migrar?",
    excerpt: "Uma análise detalhada sobre custos, benefícios e o momento certo para a transição.",
    date: "20 Jan 2026",
    readTime: "7 min",
    image: blog4,
    content: "Conteúdo do artigo..."
  },
  {
    id: "5",
    category: "Inovação",
    title: "Hidrogênio Verde: o combustível do futuro",
    excerpt: "Entenda o potencial do H2V e como o Brasil pode liderar essa transformação global.",
    date: "15 Jan 2026",
    readTime: "5 min",
    image: blog2,
    content: "Conteúdo do artigo..."
  },
  {
    id: "6",
    category: "Eficiência",
    title: "Gestão energética industrial 4.0",
    excerpt: "Sensores, IoT e IA aplicados para otimização de consumo em tempo real.",
    date: "10 Jan 2026",
    readTime: "4 min",
    image: blog3,
    content: "Conteúdo do artigo..."
  },
  {
    id: "7",
    category: "Regulação",
    title: "Novas tarifas de energia e impacto no setor",
    excerpt: "O que muda com as bandeiras tarifárias e como se proteger da volatilidade.",
    date: "05 Jan 2026",
    readTime: "6 min",
    image: blog1,
    content: "Conteúdo do artigo..."
  },
];

function Pill({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
        muted ? "bg-zinc-100 text-zinc-500 font-bold uppercase" : "bg-[#1d0238]/7 text-zinc-700 ring-1 ring-[#1d0238]/18"
      }`}
    >
      {!muted && <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#30045c]" />}
      {children}
    </div>
  );
}

export default function PostPage() {
  const [match, params] = useRoute("/editorial/:id");
  const id = params?.id;
  
  // Find post or fallback
  const post = posts.find(p => p.id === id) || posts[0];
  
  // Suggested posts (exclude current)
  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 3);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!match) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation - Removed */}
      
      <main>
        {/* Article Header */}
        <article className="container-page max-w-[960px] mx-auto pb-16 lg:pb-24 pt-24 sm:pt-32 lg:pt-36">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 transition hover:text-zinc-950">
               <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
               Voltar para a página inicial
          </Link>
          
          <header className="flex flex-col gap-6 mb-12 lg:mb-16 mt-8 sm:mt-12">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500">
               <div className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                  {post.category}
               </div>
               <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-zinc-400" />
                 <span>{post.date}</span>
               </div>
               <div className="h-1 w-1 rounded-full bg-zinc-300" />
               <div className="flex items-center gap-2">
                 <Clock className="h-4 w-4 text-zinc-400" />
                 <span>{post.readTime} leitura</span>
               </div>
            </div>

            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-zinc-950 sm:text-4xl md:text-5xl lg:text-[56px] text-balance">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                    <img src={authorAvatar} alt="Roberto Mendes" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900">Roberto Mendes</span>
                    <span className="text-xs text-zinc-500">Engenheiro Especialista em Renováveis</span>
                </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12 lg:mb-16 aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-[32px] ring-1 ring-zinc-100 shadow-lg">
             <img 
               src={post.image} 
               alt={post.title}
               className="h-full w-full object-cover"
             />
          </div>

          {/* Content Layout */}
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
            {/* Main Content */}
            <div className="prose prose-lg prose-zinc max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
            </div>

            {/* Sidebar / Share */}
            <div className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-4">Compartilhar</h4>
                        <div className="flex gap-2">
                             <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1d0238] hover:text-white">
                                <Linkedin className="h-4 w-4" />
                             </button>
                             <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1d0238] hover:text-white">
                                <Twitter className="h-4 w-4" />
                             </button>
                             <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1d0238] hover:text-white">
                                <Facebook className="h-4 w-4" />
                             </button>
                             <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1d0238] hover:text-white">
                                <Share2 className="h-4 w-4" />
                             </button>
                        </div>
                    </div>
                    
                    <div className="h-px w-full bg-zinc-100" />
                    
                    <div>
                         <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-4">Tags</h4>
                         <div className="flex flex-wrap gap-2">
                            {['Energia', 'Inovação', 'Futuro', 'Brasil'].map(tag => (
                                <span key={tag} className="inline-block rounded-lg bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600">
                                    #{tag}
                                </span>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
          </div>
        </article>
        
        {/* Read Next Section */}
        <section className="bg-zinc-50/50 border-t border-zinc-100 py-16 lg:py-24">
            <div className="container-page">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-bold text-zinc-950 md:text-3xl">Leia também</h2>
                    <Link href="/#editorial" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1d0238] hover:underline">
                        Ver todos
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map(post => (
                        <Link key={post.id} href={`/editorial/${post.id}`}>
                            <article className="group flex flex-col gap-4 cursor-pointer">
                                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-100/50">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                                        <span className="text-[#1d0238]">{post.category}</span>
                                        <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-snug text-zinc-950 group-hover:text-[#1d0238] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
