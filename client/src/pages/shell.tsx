import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Landing from "./landing";
import Contact from "./contact";

export default function Shell() {
  const [location] = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  const page = useMemo(() => {
    if (location === "/contato") return "contato" as const;
    return "home" as const;
  }, [location]);

  useEffect(() => {
    setTransitioning(true);
    const t = window.setTimeout(() => setTransitioning(false), 520);
    return () => window.clearTimeout(t);
  }, [page]);

  return (
    <div data-testid="layout-shell" className="min-h-screen bg-white">
      <div className="relative">
        <Landing mode="shell" activePage={page} />

        <div
          data-testid="status-route-loading"
          className={
            "pointer-events-none fixed left-1/2 top-[78px] z-[80] w-[min(560px,calc(100vw-28px))] -translate-x-1/2 transition " +
            (transitioning ? "opacity-100" : "opacity-0")
          }
        >
          <div className="relative overflow-hidden rounded-full bg-white/55 ring-1 ring-white/40 backdrop-blur">
            <div className="absolute inset-0 opacity-[0.10] noise" />
            <div className="h-1.5 w-full">
              <div className={"route-loader " + (transitioning ? "route-loader-anim" : "")} />
            </div>
          </div>
        </div>

        <div
          data-testid="panel-route-content"
          className={
            "absolute left-0 right-0 top-0 transition " +
            (page === "contato" ? "opacity-100" : "opacity-0 pointer-events-none")
          }
          style={{ minHeight: "100vh" }}
        >
          <Contact />
        </div>
      </div>
    </div>
  );
}
