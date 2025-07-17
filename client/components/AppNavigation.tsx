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
  Camera,
  Users,
  Palette,
} from "lucide-react";

interface AppNavigationProps {
  onUpdatesClick?: () => void;
}

const FONT_STYLE = { fontFamily: "Poppins, sans-serif" };

export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "PRODUCT STUDIO", icon: Camera, path: "/" },
    { name: "LIFESTYLE STUDIO", icon: Users, path: "/lifestyle-studio" },
    { name: "GRAPHIC STUDIO", icon: Palette, path: "/graphic-studio" },
    { name: "THE PLAYBOOK", icon: BookOpen, path: "/playbook", simple: true },
    { name: "TEMPLATES", icon: LayoutTemplate, path: "/templates" },
    { name: "AI TOOLKIT", icon: Zap, path: "/ai-toolkit" },
  ];

  const handleNavigation = (item: (typeof navigationItems)[0]) => {
    if ("action" in item && item.action === "updates" && onUpdatesClick) {
      onUpdatesClick();
    } else if ("path" in item && item.path) {
      navigate(item.path);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className="border-0 px-6 py-4 flex flex-col"
      style={{ backgroundColor: "#000000", ...FONT_STYLE }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-3">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`${item.simple ? "" : "flex items-center space-x-2"} rounded-lg text-sm font-bold transition-colors ${
                  item.highlight
                    ? "bg-black text-white border-2 border-white"
                    : "text-white hover:bg-black/20 border border-transparent"
                }`}
                style={{
                  ...FONT_STYLE,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.75px",
                  padding:
                    item.name === "PRODUCT STUDIO"
                      ? "8px"
                      : item.simple
                        ? "8px 12px"
                        : "8px 16px",
                  marginLeft: item.name === "GRAPHIC STUDIO" ? "12px" : "16px",
                }}
                onClick={() => handleNavigation(item)}
              >
                {item.simple ? (
                  item.name
                ) : (
                  <>
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
