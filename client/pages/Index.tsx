import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BriefcaseModal from "@/components/BriefcaseModal";
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
  Upload,
  Copy,
  Users,
  BarChart3,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [selectedStudio, setSelectedStudio] = useState<string>("lifestyle");
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Prompt Builder State
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFile2, setUploadedFile2] = useState<File | null>(null);
  const [uploadedFile3, setUploadedFile3] = useState<File | null>(null);
  const [qualityScore, setQualityScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const studios = [
    {
      id: "lifestyle",
      name: "LIFESTYLE STUDIO",
      description: "Generate authentic lifestyle and candid photography",
      icon: Camera,
    },
    {
      id: "product",
      name: "PRODUCT STUDIO",
      description: "Create stunning product photography and commercial shots",
      icon: Package,
    },
    {
      id: "graphic",
      name: "GRAPHIC STUDIO",
      description: "Design compelling graphics and visual elements",
      icon: Palette,
    },
  ];

  const navigationItems = [
    { name: "THE PLAYBOOK", icon: BookOpen, active: false },
    { name: "PROMPT VAULT", icon: Database, active: false },
    { name: "TEMPLATES", icon: LayoutTemplate, active: false },
    { name: "AI TOOLKIT", icon: Zap, active: false },
    { name: "UPGRADE", icon: Crown, highlight: true },
  ];

  const keywordCategories = {
    "Product Style": [
      "Professional",
      "Commercial",
      "E-commerce",
      "Catalog",
      "Marketing",
      "Advertising",
      "Premium",
      "Luxury",
      "Minimal",
      "Clean",
      "Modern",
      "Elegant",
      "Sophisticated",
      "High-end",
      "Boutique",
      "Artisanal",
      "Tech",
      "Fashion",
      "Beauty",
      "Lifestyle",
      "Industrial",
      "Organic",
      "Natural",
      "Vintage",
      "Retro",
      "Contemporary",
      "Sleek",
      "Bold",
      "Subtle",
      "Dramatic",
    ],
    "Background Setting": [
      "White background",
      "Black background",
      "Gray background",
      "Colored backdrop",
      "Gradient background",
      "Textured surface",
      "Wood surface",
      "Marble surface",
      "Concrete surface",
      "Metal surface",
      "Glass surface",
      "Fabric background",
      "Paper backdrop",
      "Studio setup",
      "Infinity curve",
      "Seamless paper",
      "Natural environment",
      "Outdoor setting",
      "Lifestyle context",
      "In-use scenario",
      "Kitchen counter",
      "Office desk",
      "Bathroom vanity",
      "Bedroom nightstand",
      "Living room table",
      "Retail display",
      "Store shelf",
      "Warehouse setting",
      "Factory floor",
      "Workshop bench",
    ],
    "Lighting Setup": [
      "Studio lighting",
      "Professional setup",
      "Softbox lighting",
      "Key light",
      "Fill light",
      "Rim lighting",
      "Product lighting",
      "Even illumination",
      "Diffused light",
      "Hard light",
      "Soft light",
      "Backlight",
      "Side lighting",
      "Top lighting",
      "Beauty lighting",
      "Three-point lighting",
      "High key",
      "Low key",
      "Natural window light",
      "LED panels",
      "Ring light",
      "Strip lights",
      "Bounce lighting",
      "Gradient lighting",
      "Color temperature",
      "Warm lighting",
      "Cool lighting",
      "Neutral lighting",
      "Dramatic shadows",
      "Shadow-free",
    ],
    "Camera Angle": [
      "Front view",
      "Side angle",
      "Three-quarter view",
      "Top down",
      "Bottom up",
      "45 degree angle",
      "Straight on",
      "Diagonal composition",
      "Close-up detail",
      "Wide product shot",
      "Macro photography",
      "Full product view",
      "Partial view",
      "Cross-section",
      "Exploded view",
      "In-use angle",
      "Lifestyle context",
      "Hero shot",
      "Detail shot",
      "Group arrangement",
      "Single product",
      "Product family",
      "Comparison shot",
      "Before and after",
      "Process view",
      "Tilt shift lens",
      "Macro lens",
      "Standard lens",
      "Wide angle lens",
    ],
    "Product Categories": [
      "Electronics",
      "Fashion accessories",
      "Beauty products",
      "Home goods",
      "Kitchen items",
      "Tech gadgets",
      "Jewelry",
      "Watches",
      "Shoes",
      "Bags",
      "Clothing",
      "Furniture",
      "Art supplies",
      "Sports equipment",
      "Tools",
      "Books",
      "Food items",
      "Beverages",
      "Skincare",
      "Makeup",
      "Fragrances",
      "Office supplies",
      "Stationery",
      "Toys",
      "Games",
      "Musical instruments",
      "Camera gear",
      "Automotive",
      "Garden tools",
      "Health products",
    ],
  };

  // Calculate quality score based on inputs
  const calculateQuality = () => {
    let score = 0;
    if (customInstructions.length > 20) score += 30;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 3;
    if (uploadedFile) score += 10;
    if (uploadedFile2) score += 10;
    if (uploadedFile3) score += 10;
    return Math.min(100, score);
  };

  // Generate the final prompt
  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Product photography, commercial quality, professional lighting, clean composition, high resolution, detailed, realistic, SORA video generation optimized.";
    return prompt;
  };

  // Copy to clipboard with fallback
  const copyPrompt = async () => {
    const text = generatePrompt();

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
        return;
      }
    } catch (err) {
      console.warn("Clipboard API failed, using fallback:", err);
    }

    // Fallback method using temporary textarea
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      } else {
        console.error("Fallback copy method failed");
      }
    } catch (err) {
      console.error("All copy methods failed:", err);
    }
  };

  // Toggle keyword selection
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    );
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle file upload 2
  const handleFileUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile2(file);
    }
  };

  // Handle file upload 3
  const handleFileUpload3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile3(file);
    }
  };

  // Update quality score when inputs change
  useEffect(() => {
    setQualityScore(calculateQuality());
  }, [
    customInstructions,
    selectedKeywords,
    uploadedFile,
    uploadedFile2,
    uploadedFile3,
  ]);

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Top Navigation Bar */}
      <nav className="bg-black px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-brand-red font-bold text-lg">LOGO</div>

          {/* Studio Tabs */}
          <div className="flex items-center space-x-1">
            <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold">
              PRODUCT STUDIO
            </button>
            <button
              onClick={() => navigate("/lifestyle-studio")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              LIFESTYLE STUDIO
            </button>
            <button
              onClick={() => navigate("/graphic-studio")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              GRAPHIC STUDIO
            </button>
            <button
              onClick={() => setShowBriefcase(true)}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              THE BRIEFCASE
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ?
            </div>
            <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ♀
            </div>
            <button className="text-white text-sm font-medium hover:bg-white/10 px-3 py-1 rounded">
              RESET
            </button>
          </div>
        </div>
      </nav>

      {/* Studio Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-5xl font-bold text-black mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            PRODUCT STUDIO
          </h1>
          <p
            className="text-black text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Create stunning product visuals and e-commerce content
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-black text-white p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">MENU</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
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
                    if (item.name === "THE PLAYBOOK") {
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
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS Section */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-sm font-bold">HOW IT WORKS</h2>
              <span className="text-brand-red text-sm font-bold">STEP 1/5</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    Add Custom Instructions
                  </div>
                  <div className="text-white/60 text-xs">
                    Start with your specific requirements
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    Select Categories
                  </div>
                  <div className="text-white/60 text-xs">
                    Choose options from each category
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    Upload Reference Files
                  </div>
                  <div className="text-white/60 text-xs">
                    Add images (optional)
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    Review Quality
                  </div>
                  <div className="text-white/60 text-xs">
                    Check AI analysis and suggestions
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">
                    Copy for SORA
                  </div>
                  <div className="text-white/60 text-xs">
                    Copy your optimized prompt ready for SORA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pt-6 pb-0">
        {/* Left Column - Steps */}
        <div className="lg:col-span-2 space-y-3">
          {/* Step 1: Custom Instructions */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-white font-medium">
                  Custom Instructions
                </span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 1 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 1 && (
              <div className="px-4 pb-4">
                <Textarea
                  placeholder="Describe your lifestyle photography vision..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full bg-gray-900 text-white border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-brand-red"
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Step 2: Product Style */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-white font-medium">Product Style</span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 2 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 2 && (
              <div className="px-4 pb-4">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center bg-gray-900">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 text-sm mb-4">
                    Upload reference images, mood boards, or style examples
                  </p>
                  <Input
                    type="file"
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileUpload2}
                    className="bg-gray-800 border-gray-600 text-white file:bg-brand-red file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
                  />
                  {uploadedFile2 && (
                    <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                      <p className="text-brand-red text-sm font-medium">
                        ✓ {uploadedFile2.name} uploaded successfully
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        File size: {Math.round(uploadedFile2.size / 1024)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Background Setting */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-white font-medium">
                  Background Setting
                </span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 3 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 3 && (
              <div className="px-4 pb-4">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center bg-gray-900">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 text-sm mb-4">
                    Upload additional reference images, mood boards, or style
                    examples
                  </p>
                  <Input
                    type="file"
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileUpload3}
                    className="bg-gray-800 border-gray-600 text-white file:bg-brand-red file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
                  />
                  {uploadedFile3 && (
                    <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                      <p className="text-brand-red text-sm font-medium">
                        ✓ {uploadedFile3.name} uploaded successfully
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        File size: {Math.round(uploadedFile3.size / 1024)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Lighting Setup */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 4 ? null : 4)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <span className="text-white font-medium">Lighting Setup</span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 4 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 4 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {keywordCategories["Lighting & Quality"].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-white"
                          : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                      } hover:scale-105`}
                    >
                      {keyword.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 5: Camera Angle */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 5 ? null : 5)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <span className="text-white font-medium">Camera Angle</span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 5 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 5 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {keywordCategories["Camera & Technical"].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-white"
                          : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                      } hover:scale-105`}
                    >
                      {keyword.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - AI Prompt Formula */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg p-6 sticky top-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-brand-red text-sm font-bold tracking-wide">
                AI PROMPT FORMULA
              </h3>
              <Badge className="bg-brand-red text-white text-xs font-bold">
                {calculateQuality()}% QUALITY
              </Badge>
            </div>

            <div className="mb-6">
              <div className="bg-black rounded p-4 min-h-[120px] border border-white/10">
                <p className="text-white/70 text-sm">
                  {generatePrompt() ||
                    "Add custom instructions and select lifestyle photography keywords to build your optimized prompt..."}
                </p>
              </div>
            </div>

            {/* Quality Optimization Meters */}
            <div className="mb-6">
              <h4 className="text-brand-red text-xs font-bold mb-3">
                QUALITY OPTIMIZATION
              </h4>

              {/* Instructions Quality */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-medium">
                  Instructions
                </span>
                <span className="text-brand-red text-xs font-bold">
                  {customInstructions.length > 20
                    ? 100
                    : Math.round((customInstructions.length / 20) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1 mb-3">
                <div
                  className="bg-brand-red h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${customInstructions.length > 20 ? 100 : (customInstructions.length / 20) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Keywords Quality */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-medium">Keywords</span>
                <span className="text-brand-red text-xs font-bold">
                  {Math.min((selectedKeywords.length / 10) * 100, 100)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1 mb-3">
                <div
                  className="bg-brand-red h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((selectedKeywords.length / 10) * 100, 100)}%`,
                  }}
                ></div>
              </div>

              {/* File Upload 1 Quality */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs font-medium">
                  File Upload 1
                </span>
                <span className="text-brand-red text-xs font-bold">
                  {uploadedFile ? 100 : 0}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1 mb-3">
                <div
                  className="bg-brand-red h-1 rounded-full transition-all duration-300"
                  style={{ width: `${uploadedFile ? 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Select mood and atmosphere keywords</li>
                <li>• Choose specific lighting and camera angles</li>
                <li>• Upload reference images for style matching</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={copyPrompt}
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copiedPrompt ? "COPIED!" : "COPY"}
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                FAVORITE
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Briefcase Modal */}
      <BriefcaseModal
        isOpen={showBriefcase}
        onClose={() => setShowBriefcase(false)}
        onNavigate={(path) => navigate(path)}
      />
    </div>
  );
}
