import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OvernightSuccessSignup from "@/components/OvernightSuccessSignup";
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
  Template,
  Zap,
  Crown,
  X,
  ChevronRight,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [selectedStudio, setSelectedStudio] = useState<string>("product");
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
    { name: "TEMPLATES", icon: Template, active: false },
    { name: "AI TOOLKIT", icon: Zap, active: false },
    { name: "UPGRADE", icon: Crown, active: false, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-brand-red">
              Creative Director OS
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.highlight
                      ? "bg-brand-red text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    if (item.name === "UPDATES") {
                      setShowBriefcase(true);
                    } else if (item.name === "THE PLAYBOOK") {
                      navigate("/playbook");
                    }
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
            onClick={() => setShowBriefcase(true)}
          >
            <Bell className="w-4 h-4 mr-2" />
            THE BRIEFCASE
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Studio Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Creative Studios</h1>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">1.2k</span>
              <BarChart3 className="w-5 h-5 text-gray-400 ml-4" />
              <Button variant="outline" size="sm" className="border-gray-700">
                RESET
              </Button>
            </div>
          </div>

          <Tabs
            value={selectedStudio}
            onValueChange={setSelectedStudio}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-gray-800">
              {studios.map((studio) => (
                <TabsTrigger
                  key={studio.id}
                  value={studio.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-brand-red data-[state=active]:text-white"
                >
                  <studio.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{studio.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {studios.map((studio) => (
              <TabsContent key={studio.id} value={studio.id} className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-white flex items-center space-x-3">
                          <studio.icon className="w-8 h-8 text-brand-red" />
                          <span>{studio.name}</span>
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-2">
                          {studio.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-brand-red text-white"
                      >
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* HOW IT WORKS Section */}
                      <Card className="bg-black border border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-brand-red text-sm font-bold tracking-wide">
                            HOW IT WORKS
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-4 gap-4 text-xs">
                            <div className="text-center">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mb-2 mx-auto">
                                1
                              </div>
                              <p className="text-gray-400">
                                Add Custom Instructions
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mb-2 mx-auto">
                                2
                              </div>
                              <p className="text-gray-400">Select Categories</p>
                            </div>
                            <div className="text-center">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mb-2 mx-auto">
                                3
                              </div>
                              <p className="text-gray-400">
                                Upload Reference Files
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mb-2 mx-auto">
                                4
                              </div>
                              <p className="text-gray-400">Copy for SORA</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* AI PROMPT FORMULA Section */}
                      <Card className="bg-gray-900 border border-gray-700">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-brand-red text-sm font-bold tracking-wide">
                              AI PROMPT FORMULA
                            </CardTitle>
                            <Badge className="bg-brand-red text-white text-xs">
                              0% QUALITY
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-black border border-gray-800 rounded p-4 text-sm text-gray-400">
                            Add custom instructions and select from categorized
                            keywords to build your SORA AI formula...
                          </div>
                          <div className="space-y-3">
                            <div className="text-white font-medium text-sm">
                              AI RECOMMENDATIONS
                            </div>
                            <ul className="space-y-1 text-sm text-gray-400">
                              <li>
                                • Add more selections for richer SORA output
                              </li>
                              <li>
                                • Custom instructions help SORA understand your
                                vision
                              </li>
                              <li>
                                • Logo files help SORA incorporate brand
                                elements
                              </li>
                            </ul>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-brand-red hover:bg-brand-red-hover"
                            >
                              COPY
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700"
                            >
                              FAVORITE
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Action Steps */}
                    <div className="mt-6 space-y-3">
                      {[
                        "Custom Instructions",
                        "Product Style",
                        "Background Setting",
                        "Lighting Setup",
                        "Camera Angle",
                        "Visual Elements",
                      ].map((step, index) => (
                        <Card
                          key={step}
                          className="bg-black border border-gray-800 hover:border-brand-red transition-colors cursor-pointer"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{step}</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* The Briefcase Modal */}
      {showBriefcase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-black border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    THE BRIEFCASE
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBriefcase(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex space-x-6 mt-4">
                {navigationItems.slice(0, 5).map((item) => (
                  <button
                    key={item.name}
                    className="flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Latest Updates
                  </h2>
                  <p className="text-gray-400">
                    Stay up to date with new features, content, and improvements
                  </p>
                </div>

                <div className="space-y-4">
                  {updates.map((update, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-sm text-gray-400 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {update.date}
                              </span>
                              <Badge
                                className={`${update.badgeColor} text-white text-xs`}
                              >
                                {update.badge}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {update.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {update.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-brand-red text-sm font-medium">
                              {update.type}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overnight Success Signup Modal */}
      <OvernightSuccessSignup
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </div>
  );
}
