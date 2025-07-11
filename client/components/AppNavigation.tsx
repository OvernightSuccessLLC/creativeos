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

const FONT_STYLE = { fontFamily: "Poppins, sans-serif" };

export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "THE PLAYBOOK", icon: BookOpen, path: "/playbook", simple: true },
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
      className="border-0 px-6 py-4"
      style={{ backgroundColor: "#F93822", ...FONT_STYLE }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-xl hover:bg-transparent text-white font-black"
            style={{ ...FONT_STYLE, fontWeight: "900", letterSpacing: "1px" }}
          >
            CREATIVE DIRECTOR OS
          </Button>
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  item.highlight
                    ? "bg-black text-white border-2 border-white"
                    : "text-white hover:bg-black/20 border border-transparent"
                }`}
                style={{
                  ...FONT_STYLE,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.75px",
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
          className="border-2 border-white text-white hover:bg-white hover:text-black font-bold bg-transparent"
          style={{
            ...FONT_STYLE,
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.75px",
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
