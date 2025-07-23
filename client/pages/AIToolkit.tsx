import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  Zap,
  ExternalLink,
  Filter,
  Code,
  Palette,
  Bot,
  Video,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";

const FONT_STYLE = { fontFamily: "Poppins, sans-serif" };

export default function AIToolkit() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toolsData = [
    {
      id: 1,
      name: "GitHub Copilot",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI pair programmer that autocompletes code in real time",
      keyFeatures: ["Code completion", "Real-time suggestions", "Multi-language"],
      link: "https://github.com/features/copilot",
      rating: 5,
    },
    {
      id: 2,
      name: "ChatGPT",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "The industry-standard LLM chatbot known for its conversational fluency and versatility",
      keyFeatures: ["Conversational AI", "Versatile prompts", "Industry standard"],
      link: "https://chat.openai.com",
      rating: 5,
    },
    {
      id: 3,
      name: "Midjourney",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Primary alternative art-generation platform",
      keyFeatures: ["Art generation", "High quality", "Community platform"],
      link: "https://www.midjourney.com",
      rating: 5,
    },
    {
      id: 4,
      name: "Runway ML",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Creative AI platform for video, image, and text generation",
      keyFeatures: ["Video generation", "Creative AI", "Multi-modal"],
      link: "https://runwayml.com",
      rating: 4,
    },
    {
      id: 5,
      name: "Figma AI",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Intelligent design assistant inside Figma",
      keyFeatures: ["Design assistance", "Auto-layout", "Content generation"],
      link: "https://www.figma.com/blog/introducing-ai-figma",
      rating: 4,
    },
    {
      id: 6,
      name: "Notion AI",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI writing assistant integrated into Notion workspace",
      keyFeatures: ["Writing assistance", "Workspace integration", "Content generation"],
      link: "https://www.notion.so/product/ai",
      rating: 4,
    },
    {
      id: 7,
      name: "Claude 3.5 Sonnet",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Anthropic's advanced language model focused on accuracy and reasoning",
      keyFeatures: ["Advanced reasoning", "High accuracy", "Safety focused"],
      link: "https://claude.ai",
      rating: 5,
    },
    {
      id: 8,
      name: "Stable Diffusion",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "Open-source AI model for high-quality image generation",
      keyFeatures: ["Open-source", "High-quality images", "Community driven"],
      link: "https://stability.ai",
      rating: 4,
    },
    {
      id: 9,
      name: "Cursor",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-native code editor with contextual suggestions",
      keyFeatures: ["AI-native editor", "Contextual suggestions", "Code completion"],
      link: "https://www.cursor.so",
      rating: 4,
    },
    {
      id: 10,
      name: "Synthesia",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI video avatars, voice cloning & screen-record capabilities",
      keyFeatures: ["Video avatars", "Voice cloning", "Screen recording"],
      link: "https://www.synthesia.io",
      rating: 4,
    },
    {
      id: 11,
      name: "Canva AI",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Suite of design tools with AI enhancements from Canva",
      keyFeatures: ["Design tools", "AI enhancements", "Visual creation"],
      link: "https://www.canva.com",
      rating: 4,
    },
    {
      id: 12,
      name: "Perplexity AI",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-trained search engine and chatbot with citations and multilingual inputs",
      keyFeatures: ["Search engine", "Citations", "Multilingual"],
      link: "https://www.perplexity.ai",
      rating: 4,
    },
    {
      id: 13,
      name: "Adobe Firefly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Adobe's AI image generation and editing tool",
      keyFeatures: ["Image generation", "Adobe integration", "Professional editing"],
      link: "https://firefly.adobe.com",
      rating: 4,
    },
    {
      id: 14,
      name: "Zapier AI",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Collections of tested AI automations for workflows",
      keyFeatures: ["Workflow automation", "AI integration", "Tested collections"],
      link: "https://zapier.com/ai",
      rating: 4,
    },
    {
      id: 15,
      name: "Kling AI",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Awarded best AI video generator for quality and affordability",
      keyFeatures: ["Video generation", "High quality", "Affordable pricing"],
      link: "https://kling.ai",
      rating: 5,
    },
    {
      id: 16,
      name: "Replit Ghostwriter",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI tool that helps you write and understand code on Replit",
      keyFeatures: ["Code writing", "Code understanding", "Replit integration"],
      link: "https://replit.com/site/ghostwriter",
      rating: 4,
    },
    {
      id: 17,
      name: "Leonardo AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI platform for generating detailed visual artwork and game assets",
      keyFeatures: ["Visual artwork", "Game assets", "Detailed generation"],
      link: "https://leonardo.ai",
      rating: 4,
    },
    {
      id: 18,
      name: "Microsoft Designer",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "AI graphic design tool by Microsoft for creating social posts and marketing visuals",
      keyFeatures: ["Graphic design", "Social posts", "Marketing visuals"],
      link: "https://designer.microsoft.com",
      rating: 3,
    },
    {
      id: 19,
      name: "Gemini",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Google's LLM for text, image, and code understanding",
      keyFeatures: ["Multimodal", "Code understanding", "Text generation"],
      link: "https://gemini.google.com",
      rating: 4,
    },
    {
      id: 20,
      name: "NotebookLM",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "A research & note-taking assistant for analyzing data and generating summaries",
      keyFeatures: ["Research assistant", "Data analysis", "Summary generation"],
      link: "https://notebooklm.google",
      rating: 4,
    },
  ];

  const categories = ["All", "Development", "AI Assistant", "Art Generation", "Video Creation", "Design", "Productivity"];

  const categoryIcons = {
    "All": Sparkles,
    "Development": Code,
    "AI Assistant": Bot,
    "Art Generation": Palette,
    "Video Creation": Video,
    "Design": Layers,
    "Productivity": Briefcase,
  };

  const filteredTools = useMemo(() => {
    let filtered = toolsData.filter(tool => {
      return selectedCategory === "All" || tool.category === selectedCategory;
    });

    // Sort by rating (highest first), then by name
    filtered.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [selectedCategory]);

  const handleVisitTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-red text-black" style={FONT_STYLE}>
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            AI Toolkit
          </h1>
          <p className="text-lg md:text-xl text-black/80 max-w-3xl mx-auto">
            Discover the best AI tools to accelerate your creative and technical workflow
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-black rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-bold" style={FONT_STYLE}>
                BROWSE BY CATEGORY
              </h3>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-brand-red text-black font-bold h-12 border-none">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Select Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-800">
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                  return (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-brand-red hover:text-black focus:bg-brand-red focus:text-black"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {category}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-black/80 text-lg font-semibold" style={FONT_STYLE}>
            {selectedCategory === "All"
              ? `Showing all ${filteredTools.length} tools`
              : `${filteredTools.length} ${selectedCategory} tools`}
          </p>
        </div>

        {/* Tools Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="bg-black border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col h-full group hover:scale-105"
            >
              <CardHeader className="p-3 md:p-4 pb-2 md:pb-3 flex-shrink-0">
                <div className="flex items-start justify-between mb-2">
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
                <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                  {tool.name}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {tool.description}
                </p>
              </CardHeader>

              <CardContent className="p-3 md:p-4 pt-0 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h4 className="text-orange-400 text-xs md:text-sm font-semibold mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1 mb-3 md:mb-4">
                    {tool.keyFeatures.slice(0, 2).map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-xs md:text-sm flex items-start"
                      >
                        <span className="text-orange-400 mr-1 md:mr-2">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleVisitTool(tool.link)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-2 md:px-4 rounded transition-colors duration-200 mt-auto text-xs md:text-sm"
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Visit Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-black rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4" style={FONT_STYLE}>
              MISSING A TOOL?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto" style={FONT_STYLE}>
              Know of an amazing AI tool that should be in our collection? Let us know and we'll add it for everyone to discover.
            </p>
            <Button
              className="bg-brand-red text-black hover:bg-brand-red-hover font-bold px-6 py-3"
              style={FONT_STYLE}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              SUGGEST A TOOL
            </Button>
          </div>
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
