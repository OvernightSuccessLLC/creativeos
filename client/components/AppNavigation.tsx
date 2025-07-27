import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
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
  ChevronDown,
  Globe,
  FileText,
  Settings,
  RotateCcw,
} from "lucide-react";

interface AppNavigationProps {
  onUpdatesClick?: () => void;
}

const FONT_STYLE = { fontFamily: "Poppins, sans-serif" };

export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close mobile menu and dropdown when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: "THE PLAYBOOK", icon: BookOpen, path: "/playbook", simple: true },
    { name: "AI TOOLKIT", icon: Zap, path: "/ai-toolkit" },
  ];

  const allPages = [
    {
      name: "Landing",
      icon: Home,
      path: "/",
      description: "Get started with AI tools",
    },
    {
      name: "The Playbook",
      icon: BookOpen,
      path: "/playbook",
      description: "Complete guide to AI prompting",
    },
    {
      name: "AI Toolkit",
      icon: Zap,
      path: "/ai-toolkit",
      description: "Curated AI tools collection",
    },
  ];

  const handleNavigation = (item: (typeof navigationItems)[0]) => {
    if ("action" in item && item.action === "updates" && onUpdatesClick) {
      onUpdatesClick();
    } else if ("path" in item && item.path) {
      navigate(item.path);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest(".pages-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const isCurrentPage = (itemPath: string) => {
    return location.pathname === itemPath;
  };

  return (
    <>
      <nav
        className="border-0 relative z-50"
        style={{
          backgroundColor: "#000000",
          ...FONT_STYLE,
          padding: "16px 20px",
          marginBottom: "20px",
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center w-full">
            {/* Logo */}
            <div className="flex items-center flex-1 md:flex-none md:mr-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
                alt="Overnight Success Logo"
                className="h-8 md:h-10 w-auto"
                style={{ maxWidth: "120px" }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 flex-1">
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
                        <span className="hidden lg:inline">{item.name}</span>
                      </>
                    )}
                  </button>
                );
              })}

              <div className="relative pages-dropdown" />
            </div>

            {/* User Status - Desktop */}
            <div className="hidden md:flex items-center space-x-3 ml-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Badge
                    className={`${
                      user.plan === "enterprise"
                        ? "bg-purple-600"
                        : user.plan === "pro"
                          ? "bg-brand-red"
                          : "bg-gray-600"
                    } text-white font-bold`}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {user.plan.toUpperCase()}
                  </Badge>
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/join")}
                  className="bg-brand-red hover:bg-red-600 text-white font-bold text-sm"
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Get Access
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
              alt="Overnight Success Logo"
              className="h-8 w-auto"
              style={{ maxWidth: "120px" }}
            />
            <button
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-6">
            {navigationItems.map((item) => {
              const isActive = isCurrentPage(item.path);
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center space-x-4 px-6 py-4 text-left font-bold transition-colors ${
                    isActive
                      ? "bg-brand-red text-black border-r-4 border-red-600"
                      : "text-white hover:bg-white/10"
                  }`}
                  style={{
                    ...FONT_STYLE,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.75px",
                  }}
                  onClick={() => handleNavigation(item)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}

            {/* User Status - Mobile */}
            <div className="px-6 py-4 border-t border-gray-800 mt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`${
                        user.plan === "enterprise"
                          ? "bg-purple-600"
                          : user.plan === "pro"
                            ? "bg-brand-red"
                            : "bg-gray-600"
                      } text-white font-bold`}
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {user.plan.toUpperCase()}
                    </Badge>
                    <span className="text-gray-400 text-sm">Plan</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/join")}
                  className="w-full bg-brand-red hover:bg-red-600 text-white font-bold"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Get Access
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
