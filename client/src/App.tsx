import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "./pages/landing";
import Contact from "./pages/contact";
import Services from "./pages/services";
import ServiceDetailPage from "./pages/service-detail";
import PostPage from "./pages/post";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";
import { SiteShell } from "@/components/site-shell";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/servicos" component={Services} />
      <Route path="/servicos/:id" component={ServiceDetailPage} />
      <Route path="/editorial/:id" component={PostPage} />
      <Route path="/contato" component={Contact} />
      <Route path="/termos-de-uso" component={TermsPage} />
      <Route path="/politica-de-privacidade" component={PrivacyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SiteShell>
          <Router />
        </SiteShell>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
