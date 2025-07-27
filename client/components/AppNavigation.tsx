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
      name: "Product Studio",
      icon: Camera,
      path: "/",
      description: "Professional product photography prompts",
    },
    {
      name: "Lifestyle Studio",
      icon: Users,
      path: "/lifestyle-studio",
      description: "Authentic lifestyle photography",
    },
    {
      name: "Graphic Studio",
      icon: Palette,
      path: "/graphic-studio",
      description: "Custom graphics and design",
    },
    {
      name: "The Playbook",
      icon: BookOpen,
      path: "/playbook",
      description: "Complete guide to AI prompting",
    },
    {
      name: "Templates",
      icon: LayoutTemplate,
      path: "/templates",
      description: "Pre-built prompt templates",
    },
    {
      name: "AI Toolkit",
      icon: Zap,
      path: "/ai-toolkit",
      description: "Curated AI tools collection",
    },
    {
      name: "Updates",
      icon: Bell,
      path: "/updates",
      description: "Latest news and features",
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

            {/* Desktop Navigation - All Pages as Individual Buttons */}
            <div className="hidden md:flex items-center space-x-1 flex-1">
              {allPages.map((page) => {
                const isActive = isCurrentPage(page.path);
                return (
                  <button
                    key={page.path}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-brand-red text-black"
                        : "text-white hover:bg-white/10"
                    }`}
                    style={{
                      ...FONT_STYLE,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                    onClick={() => navigate(page.path)}
                  >
                    {page.name}
                  </button>
                );
              })}
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
              ) : null}
            </div>

            {/* Mobile Menu Dropdown */}
            <div className="md:hidden relative">
              <button
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-black border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-3">
                    <div className="space-y-1">
                      {allPages.map((page) => {
                        const isActive = isCurrentPage(page.path);
                        return (
                          <button
                            key={page.path}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                              isActive
                                ? "bg-brand-red text-black"
                                : "text-white hover:bg-white/10"
                            }`}
                            style={{
                              ...FONT_STYLE,
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                            onClick={() => {
                              navigate(page.path);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {page.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
