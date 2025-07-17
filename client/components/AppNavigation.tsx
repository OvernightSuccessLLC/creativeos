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

  const isCurrentPage = (itemPath: string) => {
    return location.pathname === itemPath;
  };

  return (
    <nav
      className="border-0"
      style={{
        backgroundColor: "#000000",
        ...FONT_STYLE,
        padding: "20px 24px",
        marginBottom: "20px",
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center mr-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-10 w-auto"
              style={{ maxWidth: "140px" }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {navigationItems.map((item) => {
              const isActive = isCurrentPage(item.path);
              return (
                <button
                  key={item.name}
                  className={`${item.simple ? "" : "flex items-center space-x-2"} rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-brand-red text-black border border-brand-red"
                      : "text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                  }`}
                  style={{
                    ...FONT_STYLE,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.75px",
                    padding: item.simple ? "8px 12px" : "8px 16px",
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
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
