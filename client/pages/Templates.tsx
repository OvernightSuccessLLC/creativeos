import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  LayoutTemplate,
  Search,
  Copy,
  Star,
  Camera,
  Package,
  Palette,
  Users,
  Building,
  Heart,
  Zap,
  Filter,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBriefcase, setShowBriefcase] = useState(false);

  const categories = [
    { id: "all", name: "All Templates", icon: LayoutTemplate },
    { id: "product", name: "Product", icon: Package },
    { id: "lifestyle", name: "Lifestyle", icon: Camera },
    { id: "graphics", name: "Graphics", icon: Palette },
    { id: "portraits", name: "Portraits", icon: Users },
    { id: "architecture", name: "Architecture", icon: Building },
    { id: "fashion", name: "Fashion", icon: Heart },
    { id: "creative", name: "Creative", icon: Zap },
  ];

  const templates = [
    {
      id: 1,
      title: "Product Shot",
      category: "product",
      description: "Clean, minimalist product photography with studio lighting",
      prompt:
        "Professional product photography, clean white background, studio lighting setup with softbox, high resolution, commercial quality, centered composition",
      tags: ["studio", "product", "clean", "professional"],
      rating: 4.9,
      uses: 1234,
      featured: true,
    },
    {
      id: 2,
      title: "Lifestyle Portrait",
      category: "lifestyle",
      description: "Natural, candid portrait in everyday setting",
      prompt:
        "Candid lifestyle portrait, natural lighting, everyday setting, authentic expression, documentary style, warm tones, shallow depth of field",
      tags: ["portrait", "natural", "lifestyle", "candid"],
      rating: 4.8,
      uses: 987,
      featured: false,
    },
    {
      id: 3,
      title: "Modern Logo",
      category: "graphics",
      description: "Clean, minimalist logo with modern typography",
      prompt:
        "Modern minimalist logo design, clean typography, simple geometric shapes, professional branding, scalable vector style, monochrome color scheme",
      tags: ["logo", "minimalist", "modern", "branding"],
      rating: 4.7,
      uses: 756,
      featured: true,
    },
    {
      id: 4,
      title: "Corporate Headshot",
      category: "portraits",
      description: "Professional business portrait with clean background",
      prompt:
        "Professional corporate headshot, clean background, confident expression, business attire, studio lighting, high resolution, professional quality",
      tags: ["corporate", "professional", "headshot", "business"],
      rating: 4.9,
      uses: 543,
      featured: false,
    },
    {
      id: 5,
      title: "Architectural Interior",
      category: "architecture",
      description: "Modern interior space with natural lighting",
      prompt:
        "Modern architectural interior, clean lines, natural lighting, minimalist design, high-end finishes, professional real estate photography style",
      tags: ["interior", "modern", "architecture", "clean"],
      rating: 4.6,
      uses: 432,
      featured: false,
    },
    {
      id: 6,
      title: "Fashion Editorial",
      category: "fashion",
      description: "High-fashion editorial style photography",
      prompt:
        "High-fashion editorial photography, dramatic lighting, professional model, designer clothing, magazine quality, artistic composition",
      tags: ["fashion", "editorial", "dramatic", "professional"],
      rating: 4.8,
      uses: 321,
      featured: true,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyPrompt = (prompt: string) => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        // Show visual feedback that copy was successful
        console.log("Prompt copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy prompt: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div className="bg-black px-6 py-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <LayoutTemplate className="w-8 h-8 text-brand-red" />
          <h1
            className="text-4xl md:text-6xl font-brand-black text-white brand-heading"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
          >
            TEMPLATES
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-xs">
          Pre-built prompt templates for every creative need. Copy, customize,
          and create professional content instantly.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="bg-black border border-gray-800 hover:border-brand-red transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-white text-lg">
                        {template.title}
                      </CardTitle>
                      {template.featured && (
                        <Badge className="bg-brand-red text-black text-xs">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prompt Preview */}
                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {template.prompt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => copyPrompt(template.prompt)}
                    className="bg-brand-red hover:opacity-90 text-white font-bold flex-1"
                    style={{ backgroundColor: "#F93822", border: "none" }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    COPY PROMPT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <LayoutTemplate className="w-12 h-12 text-black/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              No templates found
            </h3>
            <p className="text-black/80">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
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
