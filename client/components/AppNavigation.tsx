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
                className="text-white p-3 rounded-lg hover:bg-white/10 transition-colors font-body min-h-[44px] min-w-[44px] touch-manipulation active:bg-white/20"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-72 bg-black border border-gray-700 rounded-lg shadow-2xl z-50 max-h-[calc(100vh-theme(spacing.20))] overflow-y-auto">
                  <div className="p-3 sm:p-4">
                    <div className="space-y-1 sm:space-y-2">
                      {allPages.map((page) => {
                        const isActive = isCurrentPage(page.path);
                        return (
                          <button
                            key={page.path}
                            className={`w-full text-left px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-button transition-all duration-200 min-h-[48px] touch-manipulation ${
                              isActive
                                ? "bg-brand-red text-black font-heading"
                                : "text-white hover:bg-white/10 active:bg-white/20"
                            }`}
                            onClick={() => {
                              navigate(page.path);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <page.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                              <span className="truncate font-body">
                                {page.name}
                              </span>
                            </div>
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
