/**
 * Preload das imagens do hero (WebP em /hero/) para o navegador começar
 * a baixar assim que o JS principal carregar.
 */
const HERO_BASE = "/hero";

function preloadHeroImages() {
  if (typeof document === "undefined") return;

  const linkMobile = document.createElement("link");
  linkMobile.rel = "preload";
  linkMobile.as = "image";
  linkMobile.href = `${HERO_BASE}/hero-960.webp`;
  linkMobile.setAttribute("type", "image/webp");
  document.head.appendChild(linkMobile);

  const linkDesktop = document.createElement("link");
  linkDesktop.rel = "preload";
  linkDesktop.as = "image";
  linkDesktop.href = `${HERO_BASE}/hero-desk-1440.webp`;
  linkDesktop.setAttribute("type", "image/webp");
  linkDesktop.setAttribute("media", "(min-width: 768px)");
  document.head.appendChild(linkDesktop);
}

preloadHeroImages();
