import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Playbook from "./pages/Playbook";
import AIToolkit from "./pages/AIToolkit";
import CharacterSpec from "./pages/CharacterSpec";
import NotFound from "./pages/NotFound";

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
            <Route path="/" element={<Landing />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="/character-spec" element={<CharacterSpec />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const container = document.getElementById("root");
if (container) {
  // Check if root already exists to prevent duplicate createRoot calls
  let root = (container as any)._reactRoot;
  if (!root) {
    root = ReactDOM.createRoot(container);
    (container as any)._reactRoot = root;
  }
  root.render(<App />);
}
