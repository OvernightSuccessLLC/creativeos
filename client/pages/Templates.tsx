import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Header */}
      <div className="bg-black px-6 py-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <LayoutTemplate className="w-8 h-8 text-brand-red" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            TEMPLATES
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto text-xs">
          Pre-built prompt templates for every creative need. Copy, customize,
          and create professional content instantly.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-black/10 px-6 py-6 border-b border-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/60" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-black text-brand-red hover:bg-gray-900 whitespace-nowrap"
                      : "border-black text-black hover:bg-black hover:text-brand-red whitespace-nowrap"
                  }
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-brand-red"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prompt Preview */}
                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {template.prompt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-gray-700 text-gray-400 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-400">{template.rating}</span>
                    </div>
                    <div className="text-gray-400">
                      {template.uses.toLocaleString()} uses
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => copyPrompt(template.prompt)}
                    className="bg-brand-red hover:bg-brand-red-hover text-black font-bold flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    COPY
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    EDIT
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
    </div>
  );
}
