import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from "./contexts/AuthContext";
import ProductStudio from "./pages/ProductStudio";
=======
import Landing from "./pages/Landing";
>>>>>>> e2e9c72a36e51a0b681d98fbfd99bde2493d0fb8
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

<<<<<<< HEAD
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
=======
function App() {
  return (
    <QueryClientProvider client={queryClient}>
>>>>>>> e2e9c72a36e51a0b681d98fbfd99bde2493d0fb8
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<ProductStudio />} />
            <Route path="/lifestyle-studio" element={<LifestyleStudio />} />
            <Route path="/graphic-studio" element={<GraphicStudio />} />
            <Route path="/playbook" element={<Playbook />} />

            <Route path="/templates" element={<Templates />} />
            <Route path="/ai-toolkit" element={<AIToolkit />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/join" element={<PaywallLanding />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
=======
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
>>>>>>> e2e9c72a36e51a0b681d98fbfd99bde2493d0fb8
