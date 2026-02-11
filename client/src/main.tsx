import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Hero é pré-carregado via <link rel="preload"> no index.html (imagem otimizada em /hero/)

createRoot(document.getElementById("root")!).render(<App />);
