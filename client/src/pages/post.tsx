import React, { useEffect, useCallback } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, ArrowRight, Copy, Facebook, Linkedin } from "lucide-react";

import authorAvatar from "@/assets/images/testimonial-1.png";
import editorialPosts from "@/data/editorial";
import { toast } from "@/hooks/use-toast";

const SHARE_TEXT = "Confira esse artigo que li na Track";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function PostPage() {
  const [match, params] = useRoute("/editorial/:id");
  const id = params?.id;

  const post = editorialPosts.find((p) => p.id === id) || editorialPosts[0];
  const relatedPosts = editorialPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const authorName = post.authorName ?? "Roberto Mendes";
  const authorRole = post.authorRole ?? "Engenheiro Especialista em Renováveis";
  const tags = post.tags ?? ["Energia", "Inovação", "Futuro", "Brasil"];

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/editorial/${post.id}` : "";
  const shareMessage = `${SHARE_TEXT}: ${shareUrl}`;
  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  const handleShare = useCallback(
    (fallbackUrl?: string) => async (e: React.MouseEvent) => {
      e.preventDefault();
      if (canShare) {
        try {
          await navigator.share({
            title: post.title,
            text: shareMessage,
            url: shareUrl,
          });
          toast({ title: "Compartilhado", description: "Obrigado por compartilhar!" });
        } catch (err) {
          if ((err as Error).name !== "AbortError" && fallbackUrl) {
            window.open(fallbackUrl, "_blank", "noopener,noreferrer");
          }
        }
      } else if (fallbackUrl) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
    },
    [canShare, shareUrl, shareMessage, post.title]
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copiado", description: "O link foi copiado para a área de transferência." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível copiar o link.", variant: "destructive" });
    }
  }, [shareUrl]);

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
                    <img src={authorAvatar} alt={authorName} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900">{authorName}</span>
                    <span className="text-xs text-zinc-500">{authorRole}</span>
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
                        <div className="flex flex-wrap gap-2">
                             <button
                               type="button"
                               onClick={handleShare(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`)}
                               className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#25D366] hover:text-white"
                               aria-label="Compartilhar no WhatsApp"
                             >
                                <WhatsAppIcon className="h-4 w-4" />
                             </button>
                             <button
                               type="button"
                               onClick={handleShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
                               className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#0A66C2] hover:text-white"
                               aria-label="Compartilhar no LinkedIn"
                             >
                                <Linkedin className="h-4 w-4" />
                             </button>
                             <button
                               type="button"
                               onClick={handleShare(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`)}
                               className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-black hover:text-white"
                               aria-label="Compartilhar no X"
                             >
                                <XIcon className="h-4 w-4" />
                             </button>
                             <button
                               type="button"
                               onClick={handleShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
                               className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1877F2] hover:text-white"
                               aria-label="Compartilhar no Facebook"
                             >
                                <Facebook className="h-4 w-4" />
                             </button>
                             <button
                               type="button"
                               onClick={copyLink}
                               className="grid h-10 w-10 place-items-center rounded-full bg-zinc-50 text-zinc-600 transition hover:bg-[#1d0238] hover:text-white"
                               aria-label="Copiar link de compartilhamento"
                             >
                                <Copy className="h-4 w-4" />
                             </button>
                        </div>
                    </div>
                    
                    <div className="h-px w-full bg-zinc-100" />
                    
                    <div>
                         <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-4">Tags</h4>
                         <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
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
                    {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/editorial/${relatedPost.id}`}>
                            <article className="group flex flex-col gap-4 cursor-pointer">
                                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-100/50">
                                    <img
                                        src={relatedPost.image}
                                        alt={relatedPost.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                                        <span className="text-[#1d0238]">{relatedPost.category}</span>
                                        <span className="h-0.5 w-0.5 rounded-full bg-zinc-300" />
                                        <span>{relatedPost.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-snug text-zinc-950 group-hover:text-[#1d0238] transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {relatedPost.excerpt}
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
