import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Playbook from "./pages/Playbook";
import PromptVault from "./pages/PromptVault";
import Templates from "./pages/Templates";
import AIToolkit from "./pages/AIToolkit";
import PaywallLanding from "./pages/PaywallLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Global Creative Director OS Context
const CreativeDirectorOSContext = {
  version: "1.0.0",
  features: {
    promptVault: true,
    playbook: true,
    templates: true,
    aiToolkit: true,
    studios: {
      product: true,
      lifestyle: true,
      graphic: true,
    },
  },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/prompt-vault" element={<PromptVault />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/ai-toolkit" element={<AIToolkit />} />
          <Route path="/join" element={<PaywallLanding />} />
          <Route path="/upgrade" element={<PaywallLanding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
