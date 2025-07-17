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
  Instagram,
  Mail,
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
      className="border-0 flex flex-col"
      style={{
        backgroundColor: "#000000",
        ...FONT_STYLE,
        padding: "20px 24px 12px",
        marginBottom: "20px",
      }}
    >
      {/* Main Navigation */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-3">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center mr-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-6 w-auto"
              style={{ maxWidth: "100px" }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`${item.simple ? "" : "flex items-center space-x-1"} rounded-md text-xs font-bold transition-colors ${
                  item.highlight
                    ? "bg-black text-white border-2 border-white"
                    : "text-white hover:bg-black/20 border border-transparent"
                }`}
                style={{
                  ...FONT_STYLE,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  padding: item.simple ? "6px 10px" : "6px 12px",
                }}
                onClick={() => handleNavigation(item)}
              >
                {item.simple ? (
                  item.name
                ) : (
                  <>
                    <item.icon className="w-3 h-3" />
                    <span>{item.name}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="flex justify-center items-center space-x-6 border-t border-gray-800 pt-2 max-w-7xl mx-auto">
        <a
          href="https://instagram.com/overnightsuccess"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-xs"
          style={{
            ...FONT_STYLE,
            fontWeight: "500",
          }}
        >
          <Instagram className="w-3 h-3" />
          <span>@OvernightSuccess</span>
        </a>

        <a
          href="mailto:contact@overnightsuccess.com"
          className="flex items-center space-x-1 text-gray-400 hover:text-brand-red transition-colors text-xs"
          style={{
            ...FONT_STYLE,
            fontWeight: "500",
          }}
        >
          <Mail className="w-3 h-3" />
          <span>Contact</span>
        </a>
      </div>
    </nav>
  );
}
