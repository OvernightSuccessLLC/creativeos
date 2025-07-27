import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import ProtectedFeature from "@/components/ProtectedFeature";
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
  UtensilsCrossed,
} from "lucide-react";

export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<number | null>(null);

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
      premium: true,
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
      premium: true,
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
    // New templates from the images
    {
      id: 7,
      title: "AI Product Creation",
      category: "product",
      description: "Generate entirely new product concepts",
      prompt:
        "Generate an innovative smart home device that doesn't exist yet, sleek futuristic design with organic minimalist premium materials like brushed aluminum and glass, compact form factor, modern product photography style, studio lighting, clean background, concept product visualization, industrial design perfection",
      tags: ["product design", "innovation", "futuristic", "concept"],
      rating: 4.9,
      uses: 892,
      featured: true,
    },
    {
      id: 8,
      title: "AI Model Creation",
      category: "portraits",
      description: "Generate realistic human models for campaigns",
      prompt:
        "Generate a diverse group of professional models for fashion campaigns, varied ethnicities and ages, confident posing, smart casual wear, studio photography with professional lighting, clean white background, high fashion aesthetic, commercial photography style, suitable for brand campaigns, photorealistic quality, editorial fashion photography",
      tags: ["models", "fashion", "diversity", "commercial"],
      rating: 4.8,
      uses: 745,
      featured: true,
    },
    {
      id: 9,
      title: "Authentic Lifestyle Moment",
      category: "lifestyle",
      description: "Genuine lifestyle photography capturing real moments",
      prompt:
        "Authentic lifestyle scene of a young family having breakfast together in a bright kitchen overlooking window, light streaming through window with parents and children laughing around wooden dining table, casual clothing, unposed and candid moments, warm color palette, shot with 35mm lens, documentary style photography, genuine emotions and connections",
      tags: ["lifestyle", "family", "authentic", "candid"],
      rating: 4.9,
      uses: 663,
      featured: true,
    },
    {
      id: 10,
      title: "Social Media Advertisement",
      category: "graphics",
      description: "Eye-catching graphic design for digital advertising",
      prompt:
        "Bold graphic advertisement for fitness app, vibrant gradient background from electric blue to magenta, dynamic typography with strong call-to-action, smartphone mockup showing app interface, energetic design elements, modern sans-serif fonts, high contrast colors, optimized for Instagram and Facebook ads, 1080x1080 square format",
      tags: ["advertising", "social media", "graphic design", "mobile"],
      rating: 4.7,
      uses: 534,
      featured: false,
    },
    {
      id: 11,
      title: "Website Header Banner",
      category: "graphics",
      description: "Professional web banner for website headers",
      prompt:
        "Professional website banner design for SaaS company, clean geometric background with subtle gradients, confident business professional using laptop in modern office environment, corporate blue and white color scheme, space for headline text overlay, 1920x600 resolution, web-optimized design, professional and trustworthy aesthetic",
      tags: ["web design", "banner", "corporate", "SaaS"],
      rating: 4.6,
      uses: 421,
      featured: false,
    },
    {
      id: 12,
      title: "E-commerce Product Photo",
      category: "product",
      description: "Clean product photography for online stores",
      prompt:
        "E-commerce product photography of luxury watch on clean white background, professional studio lighting with softbox setup, detailed close-up showing watch face and metal bracelet, crisp focus, no shadows, commercial photography style, optimized for online retail, high resolution for zoom functionality, Amazon/Shopify ready format",
      tags: ["e-commerce", "product", "white background", "retail"],
      rating: 4.8,
      uses: 789,
      featured: false,
    },
    {
      id: 13,
      title: "Gourmet Food Styling",
      category: "creative",
      description: "Restaurant-quality food photography",
      prompt:
        "Gourmet food photography of artisanal pasta dish on rustic wooden table, garnished with fresh herbs and parmesan, warm overhead lighting, shallow depth of field focusing on the pasta, rustic table setting with linen napkin and vintage cutlery, food styling magazine quality, appetizing and mouth-watering presentation",
      tags: ["food", "styling", "restaurant", "gourmet"],
      rating: 4.9,
      uses: 567,
      featured: true,
    },
    {
      id: 14,
      title: "Modern Building",
      category: "architecture",
      description: "Contemporary architectural photography",
      prompt:
        "Modern architectural photography of sleek glass skyscraper, clean geometric lines and reflective surfaces, shot during blue hour with building lights creating warm glow against cool sky, low angle perspective emphasizing height and grandeur, minimal composition, urban photography style, sharp details throughout",
      tags: ["architecture", "modern", "urban", "geometric"],
      rating: 4.7,
      uses: 445,
      featured: false,
    },
    {
      id: 15,
      title: "Product Mockup Scene",
      category: "product",
      description: "Professional product mockup with contextual environment",
      prompt:
        "Product mockup of sleek wireless headphones displayed on a minimalist white desk setup, MacBook Pro open in background, succulent plant in ceramic pot, natural daylight from window creating soft shadows, clean modern aesthetic, styled product photography for e-commerce, shot with 50mm lens, shallow depth of field highlighting the product",
      tags: ["mockup", "product", "minimalist", "e-commerce"],
      rating: 4.8,
      uses: 623,
      featured: false,
    },
    {
      id: 16,
      title: "Modern Logo Creation",
      category: "graphics",
      description: "Clean, professional logo design concepts",
      prompt:
        "Modern minimalist logo design for tech startup, geometric shapes with clean lines, monochrome color scheme, simple icon combined with elegant sans-serif typography, scalable vector style, professional brand identity, suitable for digital and print applications, white background, PNG format with transparency",
      tags: ["logo", "branding", "minimalist", "tech"],
      rating: 4.8,
      uses: 712,
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

  const copyPrompt = async (prompt: string, templateId: number) => {
    // Enhanced legacy copy method with better mobile support
    const legacyCopy = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = prompt;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        textArea.setAttribute("readonly", "");

        document.body.appendChild(textArea);

        // Focus and select for different devices
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          textArea.setSelectionRange(0, 9999);
        } else {
          textArea.focus();
          textArea.select();
        }

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          setCopiedTemplate(templateId);
          setTimeout(() => setCopiedTemplate(null), 2000);
          return true;
        }
        return false;
      } catch (err) {
        console.warn("Legacy copy failed:", err);
        return false;
      }
    };

    // Try modern Clipboard API first, with specific error handling
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt);
        setCopiedTemplate(templateId);
        setTimeout(() => setCopiedTemplate(null), 2000);
        return;
      }
    } catch (err) {
      // Handle specific clipboard permission errors
      if (
        err instanceof DOMException &&
        (err.name === "NotAllowedError" ||
          err.name === "SecurityError" ||
          err.message.includes("permissions policy"))
      ) {
        console.warn(
          "Clipboard API blocked by permissions policy, using fallback",
        );
      } else {
        console.warn("Clipboard API failed:", err);
      }

      // Try legacy method immediately
      if (legacyCopy()) return;
    }

    // If clipboard API not available, try legacy method
    if (legacyCopy()) return;

    // Final fallback - create a user-friendly copy interface
    try {
      // Create modal-like interface for manual copying
      const modal = document.createElement("div");
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      `;

      const content = document.createElement("div");
      content.style.cssText = `
        background: white;
        color: black;
        padding: 30px;
        border-radius: 8px;
        max-width: 600px;
        max-height: 80vh;
        overflow: auto;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      `;

      content.innerHTML = `
        <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #f93921;">Copy This Prompt</h3>
        <textarea
          id="copyTextarea"
          style="width: 100%; height: 200px; font-size: 14px; padding: 10px; border: 2px solid #ddd; border-radius: 4px; font-family: monospace;"
          readonly
        >${prompt}</textarea>
        <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: flex-end;">
          <button
            id="selectAllBtn"
            style="padding: 10px 20px; background: #f93921; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
          >Select All</button>
          <button
            id="closeModalBtn"
            style="padding: 10px 20px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >Close</button>
        </div>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
          Tap "Select All" then copy with Ctrl+C (Cmd+C on Mac)
        </p>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      // Add event listeners
      const textarea = content.querySelector(
        "#copyTextarea",
      ) as HTMLTextAreaElement;
      const selectBtn = content.querySelector("#selectAllBtn");
      const closeBtn = content.querySelector("#closeModalBtn");

      selectBtn?.addEventListener("click", () => {
        textarea.select();
        textarea.setSelectionRange(0, 99999);
      });

      closeBtn?.addEventListener("click", () => {
        document.body.removeChild(modal);
      });

      // Auto-select on mobile
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
          textarea.select();
          textarea.setSelectionRange(0, 99999);
        }, 100);
      }

      // Click outside to close
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    } catch (finalErr) {
      console.error("All copy methods failed:", finalErr);
      // Final fallback - simple alert
      alert(`COPY THIS PROMPT:\n\n${prompt}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Templates Grid */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
        style={{ backgroundColor: "#f93921" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredTemplates.map((template) => {
            const TemplateCard = (
              <Card
                key={template.id}
                className="bg-black border border-gray-800 hover:border-brand-red transition-colors"
              >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2 flex-wrap">
                      <CardTitle className="text-white text-base sm:text-lg truncate">
                        {template.title}
                      </CardTitle>
                      {template.featured && (
                        <Badge className="bg-brand-red text-black text-xs flex-shrink-0">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {/* Prompt Preview */}
                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3">
                    {template.prompt}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => copyPrompt(template.prompt, template.id)}
                    className="bg-brand-red hover:opacity-90 text-white font-bold flex-1 text-xs sm:text-sm py-2.5 sm:py-3 touch-manipulation"
                    style={{
                      backgroundColor:
                        copiedTemplate === template.id ? "#22C55E" : "#F93822",
                      border: "none",
                      minHeight: "44px",
                    }}
                  >
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {copiedTemplate === template.id ? "COPIED!" : "COPY PROMPT"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            );

            // Wrap premium templates with protection
            if (template.premium) {
              return (
                <ProtectedFeature
                  key={template.id}
                  feature="exclusiveTemplates"
                  featureName="Premium Template"
                  requiredPlan="pro"
                >
                  {TemplateCard}
                </ProtectedFeature>
              );
            }

            return TemplateCard;
          })}
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
