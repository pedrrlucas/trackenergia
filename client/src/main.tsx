import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import heroImg from "@/assets/images/hero-solar.jpg";

// Preload da imagem do hero (prioridade baixa para não competir com fontes do header)
if (typeof document !== "undefined" && heroImg) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = heroImg;
  link.setAttribute("fetchpriority", "low");
  document.head.appendChild(link);
}

createRoot(document.getElementById("root")!).render(<App />);
