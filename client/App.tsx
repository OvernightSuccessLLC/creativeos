import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductStudio from "./pages/ProductStudio";
import Playbook from "./pages/Playbook";
import Templates from "./pages/Templates";
import AIToolkit from "./pages/AIToolkit";
import Updates from "./pages/Updates";
import PaywallLanding from "./pages/PaywallLanding";
import NotFound from "./pages/NotFound";
import LifestyleStudio from "./pages/LifestyleStudio";
import GraphicStudio from "./pages/GraphicStudio";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductStudio />} />
            <Route path="/lifestyle-studio" element={<LifestyleStudio />} />
            <Route path="/graphic-studio" element={<GraphicStudio />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/join" element={<PaywallLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
