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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [qualityScore, setQualityScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const studios = [
    {
      id: "lifestyle",
      name: "LIFESTYLE STUDIO",
      description: "Generate authentic lifestyle and candid photography",
      icon: Camera,
      color: "bg-brand-red",
    },
    {
      id: "product",
      name: "PRODUCT STUDIO",
      description: "Create stunning product visuals and e-commerce content",
      icon: Package,
      color: "bg-black",
    },
    {
      id: "graphic",
      name: "GRAPHIC STUDIO",
      description: "Design logos, banners, and brand visual content",
      icon: Palette,
      color: "bg-black",
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

  const keywordCategories = {
    "Mood & Atmosphere": [
      "Candid",
      "Spontaneous",
      "Relaxed",
      "Joyful",
      "Serene",
      "Energetic",
      "Intimate",
      "Contemplative",
      "Playful",
      "Nostalgic",
      "Peaceful",
      "Vibrant",
      "Dreamy",
      "Cozy",
      "Romantic",
      "Adventurous",
      "Cheerful",
      "Melancholic",
      "Mysterious",
      "Uplifting",
      "Tranquil",
      "Dynamic",
      "Whimsical",
      "Elegant",
      "Rustic",
      "Modern",
      "Vintage",
      "Fresh",
      "Warm",
      "Cool",
    ],
    "Setting & Location": [
      "Home interior",
      "Outdoor cafe",
      "Park setting",
      "Beach scene",
      "Urban street",
      "Cozy bedroom",
      "Kitchen space",
      "Garden area",
      "Rooftop terrace",
      "Living room",
      "Coffee shop",
      "Library",
      "Art studio",
      "Balcony",
      "Backyard",
      "Office space",
      "Restaurant",
      "Bookstore",
      "Museum",
      "Gallery",
      "Loft apartment",
      "Farmhouse",
      "Cabin",
      "Hotel room",
      "Workspace",
      "Courtyard",
      "Patio",
      "Conservatory",
      "Workshop",
      "Greenhouse",
    ],
    "Lighting Style": [
      "Natural window light",
      "Golden hour",
      "Soft diffused",
      "Warm ambient",
      "Morning sunlight",
      "Evening glow",
      "Backlit silhouette",
      "Side lighting",
      "Overcast sky",
      "Harsh shadows",
      "Rim lighting",
      "Studio lighting",
      "Candlelight",
      "Neon glow",
      "Firelight",
      "Dramatic contrast",
      "High key",
      "Low key",
      "Chiaroscuro",
      "Blue hour",
      "Magic hour",
      "Dappled light",
      "Reflected light",
      "Hard light",
      "Bounce light",
      "Available light",
      "Mixed lighting",
      "Color temperature",
      "Mood lighting",
    ],
    "Camera Angle": [
      "Eye level",
      "Slightly above",
      "Low angle",
      "Close-up portrait",
      "Medium shot",
      "Wide environmental",
      "Over shoulder",
      "Profile view",
      "Three-quarter angle",
      "Bird's eye view",
      "Worm's eye view",
      "Dutch angle",
      "Straight on",
      "From behind",
      "Extreme close-up",
      "Full body",
      "Waist up",
      "Head and shoulders",
      "Aerial view",
      "Ground level",
      "High angle",
      "Tilted frame",
      "Symmetrical",
      "Off-center",
      "Rule of thirds",
      "Leading lines",
      "Depth of field",
      "Foreground focus",
      "Background blur",
    ],
    "Lifestyle Activities": [
      "Reading a book",
      "Drinking coffee",
      "Cooking together",
      "Walking outdoors",
      "Working on laptop",
      "Playing with pets",
      "Exercising",
      "Gardening",
      "Listening to music",
      "Writing in journal",
      "Painting",
      "Yoga practice",
      "Meditation",
      "Stretching",
      "Dancing",
      "Singing",
      "Playing instrument",
      "Board games",
      "Crafting",
      "Knitting",
      "Photography",
      "Sketching",
      "Cleaning",
      "Organizing",
      "Decorating",
      "Shopping",
      "Traveling",
      "Hiking",
      "Cycling",
      "Studying",
    ],
    "Visual Style": [
      "Film photography",
      "Documentary style",
      "Editorial fashion",
      "Street photography",
      "Minimalist aesthetic",
      "Bohemian vibe",
      "Modern clean",
      "Rustic charm",
      "Artistic mood",
      "Cinematic",
      "Vintage filter",
      "Black and white",
      "High contrast",
      "Soft focus",
      "Sharp details",
      "Grain texture",
      "Color grading",
      "Desaturated",
      "Vibrant colors",
      "Matte finish",
      "Glossy",
      "Natural tones",
      "Warm palette",
      "Cool palette",
      "Monochromatic",
      "Analogous colors",
      "Complementary",
      "Neutral tones",
      "Earth tones",
    ],
  };

  const stepCards = [
    {
      id: 1,
      title: "Custom Instructions",
      description: "Describe your vision in detail",
    },
    {
      id: 2,
      title: "Mood & Atmosphere",
      description: "Set the emotional tone",
    },
    {
      id: 3,
      title: "Setting & Location",
      description: "Choose the environment",
    },
    { id: 4, title: "Lighting Style", description: "Define the lighting mood" },
    {
      id: 5,
      title: "Camera & Composition",
      description: "Select camera angles",
    },
    { id: 6, title: "Upload Reference", description: "Add visual references" },
  ];

  // Calculate quality score
  const calculateQuality = () => {
    let score = 0;
    if (customInstructions.length > 20) score += 30;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 5;
    if (uploadedFile) score += 20;
    return Math.min(score, 100);
  };

  // Generate prompt
  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions) {
      prompt += customInstructions + ". ";
    }
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Lifestyle photography, authentic moment, natural lighting, high quality, detailed, realistic.";
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

  // Update quality score when dependencies change
  useEffect(() => {
    setQualityScore(calculateQuality());
  }, [customInstructions, selectedKeywords, uploadedFile]);

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-4">
            <Label className="text-white">Describe your lifestyle scene:</Label>
            <Textarea
              placeholder="e.g., A young woman in her 20s sitting by a large window, reading a book with a cup of coffee, wearing a cozy sweater, natural morning light streaming in..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="bg-black border-white/20 text-white placeholder-white/60"
              rows={4}
            />
          </div>
        );

      case 2:
      case 3:
      case 4:
      case 5:
        const categoryKey = Object.keys(keywordCategories)[stepId - 2];
        const keywords =
          keywordCategories[categoryKey as keyof typeof keywordCategories];
        return (
          <div className="space-y-4">
            <Label className="text-white">{categoryKey}:</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {keywords.map((keyword) => (
                <Button
                  key={keyword}
                  size="sm"
                  onClick={() => toggleKeyword(keyword)}
                  className={`text-xs px-2 py-1 h-8 ${
                    selectedKeywords.includes(keyword)
                      ? "bg-brand-red text-black hover:bg-black hover:text-brand-red transition-colors"
                      : "bg-brand-red text-black hover:bg-black hover:text-brand-red border-white/20 transition-colors"
                  }`}
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <Label className="text-white">Upload Reference Image:</Label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="bg-black border-white/20 text-white"
              />
              {uploadedFile && (
                <p className="text-brand-red mt-2">
                  ✓ {uploadedFile.name} uploaded
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation Header */}
      <nav className="border-b border-black/20 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div
              className="text-lg sm:text-xl text-black"
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
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
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
              className="hidden sm:flex border-black text-black hover:bg-black hover:text-brand-red"
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
              className="lg:hidden text-black"
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
                className="text-xl text-white"
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
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-5">
        {/* Current Studio Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <h1
              className="text-2xl sm:text-3xl text-black"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
            >
              {studios.find((s) => s.id === selectedStudio)?.name ||
                "LIFESTYLE STUDIO"}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
              <span className="text-black/60">1.2k</span>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black/60 ml-2 sm:ml-4" />
              <Button
                size="sm"
                className="bg-brand-red text-black hover:bg-black hover:text-brand-red ml-2 sm:ml-4 transition-colors"
                style={{ fontWeight: 900 }}
                onClick={() => {
                  setCustomInstructions("");
                  setSelectedKeywords([]);
                  setUploadedFile(null);
                  setActiveStep(null);
                }}
              >
                RESET
              </Button>
            </div>
          </div>

          {/* Main Studio Content */}
          <div className="space-y-6">
            {/* Top Row - Custom Instructions (Left) and Upload (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 - Custom Instructions */}
              <div>
                <Card
                  className="bg-black border border-white/20 hover:border-brand-red transition-colors cursor-pointer"
                  onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
                >
                  <CardContent className="p-3 sm:p-4 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-xs sm:text-sm font-bold">
                          1
                        </div>
                        <div>
                          <span className="font-medium text-white text-sm sm:text-base">
                            Custom Instructions
                          </span>
                          <p className="text-white/60 text-xs">
                            Describe your vision in detail
                          </p>
                        </div>
                      </div>
                      {activeStep === 1 ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Expandable Content */}
                {activeStep === 1 && (
                  <Card className="bg-black border border-white/20 mt-2">
                    <CardContent className="p-4">
                      {renderStepContent(1)}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Upload Reference - Integrated */}
              <Card className="bg-black border border-white/20 h-fit">
                <CardHeader className="py-5 px-6 sm:py-5 sm:px-6">
                  <div className="flex items-center">
                    <Upload className="w-4 h-4 mr-2 text-brand-red" />
                    <span className="font-medium text-white">
                      Upload Reference
                    </span>
                  </div>
                  <p className="text-white/60 text-xs">Add visual references</p>
                </CardHeader>
                <CardContent className="p-0 px-6 pb-6">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="bg-black border-white/20 text-white"
                    />
                    {uploadedFile && (
                      <p className="text-brand-red mt-2">
                        ✓ {uploadedFile.name} uploaded
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row - Mood and Other Steps */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col line-height-normal w-full ml-0 max-md:w-full max-md:ml-0">
                  {/* Left Column - Step Cards (Steps 2-5) */}
                  <div className="space-y-2 sm:space-y-3">
                    {stepCards.slice(1, 5).map((step) => (
                      <div key={step.id}>
                        <Card
                          className="bg-black border border-white/20 hover:border-brand-red transition-colors cursor-pointer"
                          onClick={() =>
                            setActiveStep(
                              activeStep === step.id ? null : step.id,
                            )
                          }
                        >
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-xs sm:text-sm font-bold">
                                  {step.id}
                                </div>
                                <div>
                                  <span className="font-medium text-white text-sm sm:text-base">
                                    {step.title}
                                  </span>
                                  <p className="text-white/60 text-xs">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                              {activeStep === step.id ? (
                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                              ) : (
                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Expandable Content */}
                        {activeStep === step.id && (
                          <Card className="bg-black border border-white/20 mt-2">
                            <CardContent className="p-4">
                              {renderStepContent(step.id)}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Output Section */}
            <Card className="bg-black border border-white/20 mt-6">
              <CardHeader className="p-4 sm:py-5 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                  <CardTitle className="text-brand-red text-xs sm:text-sm font-bold tracking-wide">
                    AI PROMPT FORMULA
                  </CardTitle>
                  <Badge className="bg-brand-red text-black text-xs font-bold self-start">
                    {calculateQuality()}% QUALITY
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="bg-black border border-white/20 rounded p-3 sm:p-4 text-xs sm:text-sm text-white">
                  {generatePrompt() ||
                    "Build your prompt by adding custom instructions and selecting keywords from the categories..."}
                </div>

                {/* AI Optimized Quality Meter with Visual Graph */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-xs">
                      AI QUALITY OPTIMIZER
                    </span>
                    <span className="text-brand-red font-bold text-xs">
                      {calculateQuality()}%
                    </span>
                  </div>

                  {/* Circular Progress Indicator */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <svg
                        className="w-16 h-16 transform -rotate-90"
                        viewBox="0 0 64 64"
                      >
                        {/* Background circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="4"
                          fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#F93822"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - calculateQuality() / 100)}`}
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-brand-red font-bold text-sm">
                          {calculateQuality()}
                        </span>
                      </div>
                    </div>

                    {/* Quality Breakdown Bars */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-semibold">
                          Instructions
                        </span>
                        <div className="w-20 bg-white/20 rounded-full h-1">
                          <div
                            className="bg-brand-red h-1 rounded-full transition-all duration-300"
                            style={{
                              width: `${customInstructions.length > 20 ? 100 : (customInstructions.length / 20) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-semibold">
                          Keywords
                        </span>
                        <div className="w-20 bg-white/20 rounded-full h-1">
                          <div
                            className="bg-brand-red h-1 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((selectedKeywords.length / 10) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-semibold">
                          Reference
                        </span>
                        <div className="w-20 bg-white/20 rounded-full h-1">
                          <div
                            className="bg-brand-red h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadedFile ? 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Quality Bar */}
                  <div className="w-full bg-white/20 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-red to-brand-red/80 h-3 rounded-full transition-all duration-500 relative"
                      style={{ width: `${calculateQuality()}%` }}
                    >
                      {/* Animated pulse effect */}
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse opacity-50"></div>
                    </div>
                    {/* Quality threshold markers */}
                    <div className="absolute top-0 left-1/3 w-0.5 h-3 bg-white/40"></div>
                    <div className="absolute top-0 left-2/3 w-0.5 h-3 bg-white/40"></div>
                  </div>

                  {/* Quality Status with Visual Indicators */}
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        calculateQuality() < 30
                          ? "bg-red-500"
                          : calculateQuality() < 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      } animate-pulse`}
                    ></div>
                    <div className="text-white text-xs font-semibold">
                      {calculateQuality() < 30 &&
                        "Add more details to improve quality"}
                      {calculateQuality() >= 30 &&
                        calculateQuality() < 70 &&
                        "Good start! Add more keywords for better results"}
                      {calculateQuality() >= 70 && "Excellent prompt quality!"}
                    </div>
                  </div>

                  {/* Live Analytics Mini Chart */}
                  <div className="flex items-center space-x-1 pt-2 border-t border-white/10">
                    <span className="text-white text-xs font-semibold mr-2">
                      Analysis:
                    </span>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-brand-red/60 rounded-full transition-all duration-300"
                        style={{
                          height: `${Math.max(2, Math.min(12, (calculateQuality() / 100) * 12 + Math.random() * 4))}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <ul className="space-y-1 text-xs sm:text-sm text-white/60"></ul>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={copyPrompt}
                    className="bg-brand-red hover:bg-black hover:text-brand-red text-black font-bold text-xs sm:text-sm transition-colors"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    {copiedPrompt ? "COPIED!" : "COPY"}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-brand-red hover:bg-black hover:text-brand-red text-black font-bold text-xs sm:text-sm transition-colors"
                  >
                    FAVORITE
                  </Button>
                </div>
              </CardContent>
            </Card>
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
