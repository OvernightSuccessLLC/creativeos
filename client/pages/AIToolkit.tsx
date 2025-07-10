import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import { Zap, ExternalLink } from "lucide-react";

export default function AIToolkit() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);

  const toolsData = [
    {
      id: 1,
      name: "GitHub Copilot",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI pair programmer that autocompletes code in real time",
      keyFeatures: [
        "Code completion",
        "Real-time suggestions",
        "Multi-language",
      ],
      link: "https://github.com/features/copilot",
    },
    {
      id: 2,
      name: "Gemini",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Google's LLM for text, image, and code understanding",
      keyFeatures: ["Multimodal", "Code understanding", "Text generation"],
      link: "https://gemini.google.com",
    },
    {
      id: 3,
      name: "Framer",
      category: "Web Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI-powered website builder that creates and publishes sites with ease",
      keyFeatures: ["Website builder", "AI design", "No-code"],
      link: "https://framer.com",
    },
    {
      id: 4,
      name: "Figma AI",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Intelligent design assistant inside Figma",
      keyFeatures: ["Design assistance", "Auto-layout", "Content generation"],
      link: "https://figma.com",
    },
    {
      id: 5,
      name: "Exactly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI for generating commercial-quality artwork",
      keyFeatures: [
        "Commercial quality",
        "Custom training",
        "Brand consistency",
      ],
      link: "https://exactly.ai",
    },
    {
      id: 6,
      name: "Dream by Wombo",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI app for creating vibrant artwork from text prompts",
      keyFeatures: ["Text-to-art", "Multiple styles", "Mobile app"],
      link: "https://dream.ai",
    },
  ];

  const handleVisitTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div className="bg-black px-6 py-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Zap className="w-8 h-8 text-brand-red" />
          <h1
            className="text-4xl md:text-6xl font-brand-black text-white brand-heading"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "900",
              paddingTop: "6px",
              margin: "6px 0 0 12px",
            }}
          >
            AI TOOLKIT
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Curated collection of the best AI tools for creative professionals and
          developers
        </p>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool) => (
            <Card
              key={tool.id}
              className="bg-black border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    className={`${tool.categoryColor} text-white text-xs font-medium px-2 py-1 rounded`}
                  >
                    {tool.category}
                  </Badge>
                  {tool.premiumBadge && (
                    <Badge
                      className={`${tool.premiumBadgeColor} text-white text-xs font-medium px-2 py-1 rounded`}
                    >
                      {tool.premiumBadge}
                    </Badge>
                  )}
                </div>
                <h3
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {tool.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4
                      className="text-orange-400 text-sm font-semibold mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {tool.keyFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="text-gray-300 text-sm flex items-start"
                        >
                          <span className="text-orange-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleVisitTool(tool.link)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded transition-colors duration-200"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-black/80 mb-4">
            Missing a tool? Let us know and we'll add it to the collection.
          </p>
          <Button
            className="bg-black text-brand-red hover:bg-gray-900 font-bold px-6 py-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
          >
            SUGGEST A TOOL
          </Button>
        </div>
      </div>

      {/* Briefcase Modal */}
      <BriefcaseModal
        isOpen={showBriefcase}
        onClose={() => setShowBriefcase(false)}
        onNavigate={(path) => navigate(path)}
      />
    </div>
  );
}
