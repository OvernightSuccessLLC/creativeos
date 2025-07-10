import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OvernightSuccessSignup from "@/components/OvernightSuccessSignup";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Palette,
  Package,
  Bell,
  BookOpen,
  Database,
  LayoutTemplate,
  Zap,
  Crown,
  X,
  ChevronRight,
  Calendar,
  Users,
  BarChart3,
  Menu,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [selectedStudio, setSelectedStudio] = useState<string>("product");
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const studios = [
    {
      id: "product",
      name: "PRODUCT STUDIO",
      description: "Create stunning product visuals and e-commerce content",
      icon: Package,
      color: "bg-brand-red",
    },
    {
      id: "lifestyle",
      name: "LIFESTYLE STUDIO",
      description: "Generate authentic lifestyle and candid photography",
      icon: Camera,
      color: "bg-blue-600",
    },
    {
      id: "graphic",
      name: "GRAPHIC STUDIO",
      description: "Design logos, banners, and brand visual content",
      icon: Palette,
      color: "bg-purple-600",
    },
  ];

  const updates = [
    {
      date: "Jan 20, 2025",
      type: "New Launch",
      title: "O/S Creative System - Waiting List Now Open",
      description:
        "Join the waitlist for our revolutionary O/S Creative System - the next generation of AI-powered creative tools",
      badge: "NEW",
      badgeColor: "bg-green-500",
    },
    {
      date: "Jan 20, 2025",
      type: "Free Resource",
      title: "Get Our Beginners Playbook to AI Creative for Free Here",
      description:
        "Download our comprehensive beginner's guide to AI creative tools and start creating professional content today",
      badge: "NEW",
      badgeColor: "bg-green-500",
    },
    {
      date: "Jan 20, 2025",
      type: "Social Update",
      title: "Follow Us on Social @overnightsuccessllc",
      description:
        "Stay connected with the latest tips, tutorials, and creative inspiration by following us on social media",
      badge: "NEW",
      badgeColor: "bg-green-500",
    },
  ];

  const navigationItems = [
    { name: "UPDATES", icon: Bell, active: false },
    { name: "THE PLAYBOOK", icon: BookOpen, active: false },
    { name: "PROMPT VAULT", icon: Database, active: false },
    { name: "TEMPLATES", icon: LayoutTemplate, active: false },
    { name: "AI TOOLKIT", icon: Zap, active: false },
    { name: "UPGRADE", icon: Crown, active: false, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation Header */}
      <nav className="border-b border-black/20 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div
              className="text-lg sm:text-xl text-black brand-heading"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
            >
              CREATIVE DIRECTOR OS
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors font-brand-bold ${
                  item.highlight
                    ? "bg-black text-brand-red"
                    : "text-black hover:text-black hover:bg-black/10"
                }`}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
                onClick={() => {
                  console.log("Navigation clicked:", item.name);
                  if (item.name === "UPDATES") {
                    setShowBriefcase(true);
                  } else if (item.name === "THE PLAYBOOK") {
                    navigate("/playbook");
                  } else if (item.name === "PROMPT VAULT") {
                    navigate("/prompt-vault");
                  } else if (item.name === "TEMPLATES") {
                    navigate("/templates");
                  } else if (item.name === "AI TOOLKIT") {
                    navigate("/ai-toolkit");
                  }
                }}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden xl:inline">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden sm:flex border-black text-black hover:bg-black hover:text-brand-red font-brand-bold"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
              onClick={() => setShowBriefcase(true)}
            >
              <Bell className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">THE BRIEFCASE</span>
            </Button>
            <Button
              variant="ghost"
              className="lg:hidden text-black font-brand-bold"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-black p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-xl text-white brand-heading"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
              >
                MENU
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowMobileMenu(false)}
                className="text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-brand-bold transition-colors ${
                    item.highlight
                      ? "bg-brand-red text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                  onClick={() => {
                    setShowMobileMenu(false);
                    if (item.name === "UPDATES") {
                      setShowBriefcase(true);
                    } else if (item.name === "THE PLAYBOOK") {
                      navigate("/playbook");
                    } else if (item.name === "PROMPT VAULT") {
                      navigate("/prompt-vault");
                    } else if (item.name === "TEMPLATES") {
                      navigate("/templates");
                    } else if (item.name === "AI TOOLKIT") {
                      navigate("/ai-toolkit");
                    }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-black text-white hover:bg-gray-800 transition-colors border-t border-gray-700 mt-6 pt-6"
                style={{ fontWeight: 900 }}
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowBriefcase(true);
                }}
              >
                <Bell className="w-5 h-5" />
                <span>THE BRIEFCASE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Studio Selection */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <h1
              className="text-2xl sm:text-3xl text-black brand-heading"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
            >
              PRODUCT STUDIO
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
              <span className="text-black/60">1.2k</span>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black/60 ml-2 sm:ml-4" />
              <Button
                variant="outline"
                size="sm"
                className="border-black text-black hover:bg-black hover:text-brand-red font-black ml-2 sm:ml-4"
                style={{ fontWeight: 900 }}
              >
                RESET
              </Button>
            </div>
          </div>

          <p className="text-black/80 mb-6">
            Create stunning product visuals and e-commerce content
          </p>

          <Tabs
            value={selectedStudio}
            onValueChange={setSelectedStudio}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-black border border-black">
              {studios.map((studio) => (
                <TabsTrigger
                  key={studio.id}
                  value={studio.id}
                  className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-3 sm:py-2 data-[state=active]:bg-brand-red data-[state=active]:text-black text-white font-black"
                  style={{ fontWeight: 900 }}
                >
                  <studio.icon className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {studio.name.split(" ")[0]}
                  </span>
                  <span className="hidden lg:inline text-xs sm:text-sm">
                    {studio.name.split(" ").slice(1).join(" ")}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {studios.map((studio) => (
              <TabsContent key={studio.id} value={studio.id} className="mt-6">
                {/* HOW IT WORKS Section */}
                <Card className="bg-black border border-black mb-6">
                  <CardHeader>
                    <CardTitle className="text-brand-red text-sm font-bold tracking-wide border-b border-brand-red pb-2">
                      HOW IT WORKS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-white mb-2 mx-auto font-bold">
                          1
                        </div>
                        <p className="text-white text-xs">
                          Add Custom Instructions
                        </p>
                        <p className="text-white/60 text-xs">
                          Start with your specific requirements
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-white mb-2 mx-auto font-bold">
                          2
                        </div>
                        <p className="text-white text-xs">Select Categories</p>
                        <p className="text-white/60 text-xs">
                          Choose options from each category
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-white mb-2 mx-auto font-bold">
                          3
                        </div>
                        <p className="text-white text-xs">
                          Upload Reference Files
                        </p>
                        <p className="text-white/60 text-xs">
                          Add images (optional)
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-white mb-2 mx-auto font-bold">
                          4
                        </div>
                        <p className="text-white text-xs">Review Quality</p>
                        <p className="text-white/60 text-xs">
                          Check AI analysis and suggestions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-brand-red text-xs font-bold">
                        STEP 1/5
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column - Action Steps */}
                  <div className="space-y-2 sm:space-y-3 order-2 xl:order-1">
                    {[
                      { step: "Custom Instructions", icon: "1" },
                      { step: "Product Style", icon: "2" },
                      { step: "Background Setting", icon: "3" },
                      { step: "Lighting Setup", icon: "4" },
                      { step: "Camera Angle", icon: "5" },
                      { step: "Visual Elements", icon: "6" },
                    ].map((item, index) => (
                      <Card
                        key={item.step}
                        className="bg-black border border-white/20 hover:border-brand-red transition-colors cursor-pointer"
                        onClick={() => navigate("/prompt-vault")}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-xs sm:text-sm font-bold">
                                {item.icon}
                              </div>
                              <span className="font-medium text-white text-sm sm:text-base">
                                {item.step}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Right Column - AI PROMPT FORMULA Section */}
                  <Card className="bg-black border border-white/20 order-1 xl:order-2">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <CardTitle className="text-brand-red text-xs sm:text-sm font-bold tracking-wide">
                          AI PROMPT FORMULA
                        </CardTitle>
                        <Badge className="bg-brand-red text-black text-xs font-bold self-start">
                          0% QUALITY
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                      <div className="bg-black border border-white/20 rounded p-3 sm:p-4 text-xs sm:text-sm text-white/60">
                        Add custom instructions and select from categorized
                        keywords to build your SORA AI formula...
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="text-white font-medium text-xs sm:text-sm">
                          AI RECOMMENDATIONS
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-white/60">
                          <li>• Add more selections for richer SORA output</li>
                          <li>
                            • Custom instructions help SORA understand your
                            vision
                          </li>
                          <li>
                            • Logo files help SORA incorporate brand elements
                          </li>
                        </ul>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-brand-red hover:bg-brand-red-hover text-black font-bold text-xs sm:text-sm"
                        >
                          COPY
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
                        >
                          FAVORITE
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
          <Button
            size="lg"
            className="bg-black text-brand-red hover:bg-gray-900 font-brand-black px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onClick={() => navigate("/join")}
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            JOIN OVERNIGHT SUCCESS
          </Button>
          <div>
            <Button
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-brand-red font-brand-black px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
              onClick={() => navigate("/playbook")}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              READ THE PLAYBOOK
            </Button>
          </div>
        </div>
      </main>

      {/* Briefcase Modal */}
      <BriefcaseModal
        isOpen={showBriefcase}
        onClose={() => setShowBriefcase(false)}
        onNavigate={(path) => navigate(path)}
      />

      {/* Overnight Success Signup Modal */}
      <OvernightSuccessSignup
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </div>
  );
}
