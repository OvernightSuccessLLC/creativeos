import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

interface AppNavigationProps {
  onUpdatesClick?: () => void;
}

const FONT_STYLE = { fontFamily: "Poppins, sans-serif" };

export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "THE PLAYBOOK", icon: BookOpen, path: "/playbook", simple: true },
    { name: "AI TOOLKIT", icon: Zap, path: "/ai-toolkit" },
  ];

  const handleNavigation = (item: (typeof navigationItems)[0]) => {
    if ("action" in item && item.action === "updates" && onUpdatesClick) {
      onUpdatesClick();
    } else if ("path" in item && item.path) {
      navigate(item.path);
    }
    setIsMobileMenuOpen(false);
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
        padding: "12px 16px",
        marginBottom: "8px",
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
            alt="Overnight Success Logo"
            className="h-8 md:h-10 w-auto"
            style={{ maxWidth: "120px" }}
          />
        </div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 z-50">
          <div className="flex flex-col space-y-1 p-4">
            {navigationItems.map((item) => {
              const isActive = isCurrentPage(item.path);
              return (
                <button
                  key={item.name}
                  className={`${item.simple ? "" : "flex items-center space-x-3"} rounded-lg text-sm font-bold transition-colors w-full text-left ${
                    isActive
                      ? "bg-brand-red text-black border border-brand-red"
                      : "text-white hover:bg-white/10 border border-transparent"
                  }`}
                  style={{
                    ...FONT_STYLE,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.75px",
                    padding: "10px 12px",
                  }}
                  onClick={() => handleNavigation(item)}
                >
                  {item.simple ? (
                    item.name
                  ) : (
                    <>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
