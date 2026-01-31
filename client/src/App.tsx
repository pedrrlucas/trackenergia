import { Switch, Route, useLocation } from "wouter";
import React, { useEffect, useRef, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "./pages/landing";
import Contact from "./pages/contact";

function RouteLoadingBar({ show }: { show: boolean }) {
  return (
    <div
      data-testid="status-route-loading"
      className={
        "pointer-events-none fixed left-1/2 top-[78px] z-[60] w-[min(560px,calc(100vw-28px))] -translate-x-1/2 transition " +
        (show ? "opacity-100" : "opacity-0")
      }
    >
      <div className="relative overflow-hidden rounded-full bg-white/55 ring-1 ring-white/40 backdrop-blur">
        <div className="absolute inset-0 opacity-[0.10] noise" />
        <div className="h-1.5 w-full">
          <div className={"route-loader " + (show ? "route-loader-anim" : "")} />
        </div>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const [loading, setLoading] = useState(false);
  const prevRef = useRef(location);

  useEffect(() => {
    if (prevRef.current === location) return;
    prevRef.current = location;

    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(t);
  }, [location]);

  return (
    <>
      <RouteLoadingBar show={loading} />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/contato" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
