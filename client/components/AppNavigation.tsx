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
  FileText,
  Settings,
  RotateCcw,
} from "lucide-react";
interface AppNavigationProps {
  onUpdatesClick?: () => void;
}
export default function AppNavigation({ onUpdatesClick }: AppNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
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
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const isCurrentPage = (itemPath: string) => {
    return location.pathname === itemPath;
  };
  return (
    <>
      <nav
        className="border-0 relative z-50"
        style={{
          backgroundColor: "#000000",
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
                className="w-auto h-8 sm:h-10 md:h-12"
                style={{
                  maxWidth: "100px",
                  marginRight: "16px",
                }}
              />
            </div>
            {/* Desktop Navigation - All Pages as Individual Buttons */}
            <div className="hidden md:flex items-center space-x-1 flex-1">
              {allPages.map((page) => {
                const isActive = isCurrentPage(page.path);
                return (
                  <button
                    key={page.path}
                    className={`px-3 py-2 rounded-lg text-sm font-button transition-colors ${
                      isActive
                        ? "bg-brand-red text-black"
                        : "text-white hover:bg-white/10"
                    }`}
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
                    } text-white font-heading`}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {user.plan.toUpperCase()}
                  </Badge>
                  <button
                    onClick={logout}
                    className="text-white hover:text-white text-sm transition-colors font-body"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
            {/* Mobile Menu Dropdown */}
            <div className="md:hidden relative">
              <button
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors font-body"
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
                <div className="absolute top-full right-0 mt-2 w-72 bg-black border border-gray-700 rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
                  <div className="p-4">
                    <div className="space-y-2">
                      {allPages.map((page) => {
                        const isActive = isCurrentPage(page.path);
                        return (
                          <button
                            key={page.path}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-button transition-colors min-h-[44px] ${
                              isActive
                                ? "bg-brand-red text-black"
                                : "text-white hover:bg-white/10"
                            }`}
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
