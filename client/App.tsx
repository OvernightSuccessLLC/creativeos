import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Playbook from "./pages/Playbook";
import AIToolkit from "./pages/AIToolkit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Global Creative Director OS Context
const CreativeDirectorOSContext = {
  version: "1.0.0",
  features: {
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
let root = (container as any)._reactRoot;

if (!root) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
}

root.render(<App />);
