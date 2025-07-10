import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  Database,
  LayoutTemplate,
  Zap,
  Crown,
  Home,
} from "lucide-react";

interface AppNavigationProps {
  onUpdatesClick?: () => void;
}

export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "UPDATES", icon: Bell, path: "/", action: "updates" },
    { name: "THE PLAYBOOK", icon: BookOpen, path: "/playbook" },
    { name: "PROMPT VAULT", icon: Database, path: "/prompt-vault" },
    { name: "TEMPLATES", icon: LayoutTemplate, path: "/templates" },
    { name: "AI TOOLKIT", icon: Zap, path: "/ai-toolkit" },
    { name: "UPGRADE", icon: Crown, path: "/upgrade", highlight: true },
  ];

  const handleNavigation = (item: (typeof navigationItems)[0]) => {
    if (item.action === "updates" && onUpdatesClick) {
      onUpdatesClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`border-b px-6 py-4 ${
        isHomePage
          ? "border-black/20 bg-transparent"
          : "border-gray-800 bg-black"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className={`text-xl font-brand-bold hover:bg-transparent ${
              isHomePage ? "text-black" : "text-brand-red"
            }`}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
          >
            CREATIVE DIRECTOR OS
          </Button>
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-brand-medium transition-colors ${
                  item.highlight
                    ? isHomePage
                      ? "bg-black text-brand-red"
                      : "bg-brand-red text-white"
                    : isHomePage
                      ? "text-black/80 hover:text-black hover:bg-black/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: item.highlight ? "700" : "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                onClick={() => handleNavigation(item)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          className={`font-brand-medium ${
            isHomePage
              ? "border-black text-black hover:bg-black hover:text-brand-red"
              : "border-gray-700 text-white hover:bg-gray-800"
          }`}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
          onClick={() => {
            if (onUpdatesClick) {
              onUpdatesClick();
            } else {
              navigate("/");
            }
          }}
        >
          {isHomePage ? (
            <>
              <Bell className="w-4 h-4 mr-2" />
              THE BRIEFCASE
            </>
          ) : (
            <>
              <Home className="w-4 h-4 mr-2" />
              HOME
            </>
          )}
        </Button>
      </div>
    </nav>
  );
}
