import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Database,
  Upload,
  Copy,
  Star,
  Lightbulb,
  Camera,
  Palette,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function PromptVault() {
  const navigate = useNavigate();
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [qualityScore, setQualityScore] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({
    lighting: false,
    framing: true,
    locations: true,
    style: true,
    creativeDirection: true,
    modifiers: true,
  });

  const keywordCategories = {
    Lighting: [
      "Golden hour",
      "Dramatic",
      "Neon",
      "Studio lighting",
      "Natural light",
      "Backlit",
      "Rim lighting",
      "Hard shadows",
      "Moody",
      "Soft light",
      "Harsh light",
      "Volumetric",
      "Cinematic",
      "Ambient",
      "Directional",
      "Diffused",
      "Spotlight",
      "Candlelight",
      "Firelight",
      "Moonlight",
      "Sunrise",
      "Sunset",
      "Overcast",
      "Bright",
      "Low light",
      "High contrast",
      "Even lighting",
      "Side lighting",
      "Top lighting",
      "Bottom lighting",
    ],
    Framing: [
      "Close-up",
      "Wide shot",
      "Bird's eye",
      "Eye level",
      "Over shoulder",
      "Full body",
      "Centered",
      "Rule of thirds",
      "Symmetrical",
      "Medium shot",
      "Long shot",
      "Extreme close-up",
      "Macro",
      "Portrait",
      "Landscape",
      "Panoramic",
      "Dutch angle",
      "Low angle",
      "High angle",
      "Worm's eye",
      "Profile shot",
      "Three quarter",
      "Front facing",
      "Back view",
      "Side view",
      "Dynamic angle",
      "Static composition",
      "Candid",
      "Posed",
      "Group shot",
    ],
    Locations: [
      "Studio",
      "Urban",
      "Interior",
      "Minimalist",
      "Vintage",
      "Rooftop",
      "Beach",
      "Forest",
      "Desert",
      "Street",
      "Gallery",
      "Coffee shop",
      "Office",
      "Home",
      "Restaurant",
      "Hotel",
      "Airport",
      "Train station",
      "Park",
      "Garden",
      "Mountains",
      "City skyline",
      "Countryside",
      "Warehouse",
      "Factory",
      "Library",
      "Museum",
      "Shopping mall",
      "Gym",
      "Spa",
    ],
  };

  const enhancedKeywordCategories = {
    Modifiers: [
      "professional grade",
      "award-winning",
      "ultra-high resolution",
      "commercial ready",
      "studio quality",
      "magazine cover quality",
      "premium",
      "luxury",
      "elegant",
      "sophisticated",
      "polished",
      "refined",
      "high-end",
      "exclusive",
      "pristine",
      "flawless",
      "immaculate",
      "impeccable",
      "exceptional",
      "outstanding",
      "remarkable",
      "stunning",
      "breathtaking",
      "captivating",
      "mesmerizing",
      "compelling",
      "striking",
      "powerful",
      "dynamic",
      "vibrant",
    ],
    Style: [
      "Natural",
      "Minimal",
      "Hyperrealistic",
      "Replica",
      "editorial sharp",
      "raw & real",
      "tech aesthetic",
      "soft focus",
      "90s VHS grain",
      "Film photography",
      "Digital",
      "Analog",
      "Vintage",
      "Modern",
      "Contemporary",
      "Classic",
      "Timeless",
      "Retro",
      "Futuristic",
      "Artistic",
      "Documentary",
      "Fashion",
      "Lifestyle",
      "Commercial",
      "Portrait",
      "Street style",
      "Fine art",
      "Abstract",
      "Conceptual",
      "Minimalist",
    ],
    "Creative Direction": [
      "Edward Hopper moodboard",
      "Gucci in a cyber slum",
      "Tarantino aesthetic violence",
      "Old Money vibes",
      "Virgil Abloh x Eames visual tension",
      "Wes Anderson symmetry",
      "Blade Runner atmosphere",
      "David Lynch surreal",
      "Stanley Kubrick precision",
      "Christopher Nolan time",
      "Sofia Coppola dreamy",
      "Terrence Malick nature",
      "Denis Villeneuve scale",
      "Ridley Scott epic",
      "Paul Thomas Anderson character",
      "Coen Brothers quirky",
      "Jordan Peele tension",
      "Ari Aster unsettling",
      "Greta Gerwig warmth",
      "Barry Jenkins intimacy",
      "Chloé Zhao landscapes",
      "Lulu Wang family",
      "Bong Joon-ho class",
      "Yorgos Lanthimos absurd",
      "Robert Eggers period",
      "Chazelle rhythm",
      "Scorsese energy",
      "Fincher dark",
      "Spielberg wonder",
      "Cameron technical",
    ],
  };

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const toggleKeyword = (keyword: string) => {
    const newKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((k) => k !== keyword)
      : [...selectedKeywords, keyword];

    setSelectedKeywords(newKeywords);

    // Calculate quality score
    let score = 0;
    if (customInstructions.length > 0) score += 30;
    if (uploadedFile) score += 20;
    score += Math.min(50, newKeywords.length * 5);
    setQualityScore(Math.min(100, score));
  };

  const generatePrompt = () => {
    if (!customInstructions && selectedKeywords.length === 0) {
      return "";
    }

    // Organize keywords by category for optimal SORA structure
    const organizedKeywords = {
      lighting: [] as string[],
      framing: [] as string[],
      locations: [] as string[],
      modifiers: [] as string[],
      style: [] as string[],
      creativeDirection: [] as string[],
    };

    selectedKeywords.forEach((keyword) => {
      const allCategories = {
        ...keywordCategories,
        ...enhancedKeywordCategories,
      };
      const category = Object.entries(allCategories)
        .find(([_, words]) => words.includes(keyword))?.[0]
        ?.toLowerCase();

      switch (category) {
        case "lighting":
          organizedKeywords.lighting.push(keyword.toLowerCase());
          break;
        case "framing":
          organizedKeywords.framing.push(keyword.toLowerCase());
          break;
        case "locations":
          organizedKeywords.locations.push(keyword.toLowerCase());
          break;
        case "modifiers":
          organizedKeywords.modifiers.push(keyword.toLowerCase());
          break;
        case "style":
          organizedKeywords.style.push(keyword.toLowerCase());
          break;
        case "creative direction":
          organizedKeywords.creativeDirection.push(keyword.toLowerCase());
          break;
      }
    });

    // Build structured prompt for SORA
    let prompt = customInstructions || "";

    // Add location/setting context
    if (organizedKeywords.locations.length > 0) {
      prompt += `, ${organizedKeywords.locations.join(", ")}`;
    }

    // Add framing/camera details
    if (organizedKeywords.framing.length > 0) {
      prompt += `, ${organizedKeywords.framing.join(", ")}`;
    }

    // Add lighting information
    if (organizedKeywords.lighting.length > 0) {
      prompt += `, ${organizedKeywords.lighting.join(", ")}`;
    }

    // Add style elements
    if (organizedKeywords.style.length > 0) {
      prompt += `, ${organizedKeywords.style.join(", ")}`;
    }

    // Add creative direction elements
    if (organizedKeywords.creativeDirection.length > 0) {
      prompt += `, ${organizedKeywords.creativeDirection.join(", ")}`;
    }

    // Add modifier elements
    if (organizedKeywords.modifiers.length > 0) {
      prompt += `, ${organizedKeywords.modifiers.join(", ")}`;
    }

    // Add reference image notation if file uploaded
    if (uploadedFile) {
      prompt += ` --reference ${uploadedFile.name}`;
    }

    return prompt;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
    }
  };

  const copyPrompt = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
    // Show visual feedback that copy was successful
    const button = document.querySelector("[data-copy-button]");
    if (button) {
      const originalText = button.textContent;
      button.textContent = "COPIED!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#F93822" }}
    >
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div
        className="px-6 text-center py-6"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Database className="w-10 h-10 text-white" />
          <h1
            className="text-white font-black"
            style={{
              fontSize: "36px",
              lineHeight: "36px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            prompt vault
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="max-w-7xl mx-auto space-y-6"
        style={{ padding: "0 24px 40px" }}
      >
        {/* Top Row: Custom Instructions with Upload on the Right */}
        <Card className="bg-black border-0 shadow-xl rounded-xl">
          <CardContent style={{ padding: "24px" }}>
            <div className="flex items-center mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: "#F93822" }}
              >
                <span className="text-white font-black text-sm">1</span>
              </div>
              <h3
                className="text-white text-2xl font-black"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                describe your vision
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Custom Instructions - Left Side (2/3 width) */}
              <div className="lg:col-span-2">
                <Textarea
                  id="instructions"
                  placeholder="Describe exactly what you want to create..."
                  value={customInstructions}
                  onChange={(e) => {
                    setCustomInstructions(e.target.value);
                    // Recalculate quality score
                    let score = 0;
                    if (e.target.value.length > 0) score += 30;
                    if (uploadedFile) score += 20;
                    score += Math.min(50, selectedKeywords.length * 5);
                    setQualityScore(Math.min(100, score));
                  }}
                  className="bg-gray-900 border-0 text-white resize-none rounded-lg"
                  style={{
                    minHeight: "140px",
                    padding: "20px",
                    fontSize: "16px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  rows={6}
                />
                <p className="text-gray-400 text-sm mt-3 font-medium">
                  Be specific about subjects, actions, and the overall scene.
                </p>
              </div>

              {/* Upload Module - Right Side (1/3 width) */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: "#F93822" }}
                  >
                    <span className="text-white font-black text-xs">2</span>
                  </div>
                  <h4
                    className="text-white text-sm font-black"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    upload reference
                  </h4>
                </div>
                <div
                  className="border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors bg-gray-900"
                  style={{
                    padding: "24px 12px",
                    minHeight: "140px",
                    borderColor: "#555",
                  }}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#F93822")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#555")
                  }
                >
                  {uploadedFile ? (
                    <div>
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <p className="text-green-400 font-bold mb-2 text-xs">
                        {uploadedFile.name}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-10 h-10 border-2 border-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-white font-bold mb-1 text-xs">
                        Click to upload
                      </p>
                      <p className="text-gray-400 text-xs font-medium">
                        JPG, PNG up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 - Full Width Keywords */}
        <Card
          className="bg-black border-0 shadow-xl rounded-xl"
          style={{ padding: "24px" }}
        >
          <div className="flex items-center mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: "#F93822" }}
            >
              <span className="text-white font-black text-sm">2</span>
            </div>
            <h3
              className="text-white text-2xl font-black"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              select keywords
            </h3>
          </div>
          <CardContent style={{ padding: "0" }}>
            {/* Lighting Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("lighting")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>lighting</span>
                {collapsedSections.lighting ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.lighting && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {keywordCategories.Lighting.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                          selectedKeywords.includes(keyword)
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          minHeight: "24px",
                          lineHeight: "1.2",
                        }}
                      >
                        {keyword.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Framing Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("framing")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>framing</span>
                {collapsedSections.framing ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.framing && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {keywordCategories.Framing.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                          selectedKeywords.includes(keyword)
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          minHeight: "24px",
                          lineHeight: "1.2",
                        }}
                      >
                        {keyword.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Locations Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("locations")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>locations</span>
                {collapsedSections.locations ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.locations && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {keywordCategories.Locations.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                          selectedKeywords.includes(keyword)
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          minHeight: "24px",
                          lineHeight: "1.2",
                        }}
                      >
                        {keyword.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Style Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("style")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>style</span>
                {collapsedSections.style ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.style && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {enhancedKeywordCategories.Style.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                          selectedKeywords.includes(keyword)
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          minHeight: "24px",
                          lineHeight: "1.2",
                        }}
                      >
                        {keyword.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Creative Direction Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("creativeDirection")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>creative direction</span>
                {collapsedSections.creativeDirection ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.creativeDirection && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {enhancedKeywordCategories["Creative Direction"].map(
                      (keyword) => (
                        <button
                          key={keyword}
                          onClick={() => toggleKeyword(keyword)}
                          className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                            selectedKeywords.includes(keyword)
                              ? "bg-white text-black"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 700,
                            minHeight: "24px",
                            lineHeight: "1.2",
                          }}
                        >
                          {keyword.toLowerCase()}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modifiers Section */}
            <div className="mb-4">
              <button
                className="w-full bg-black text-white rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-900 border-0"
                onClick={() => toggleSection("modifiers")}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>modifiers</span>
                {collapsedSections.modifiers ? (
                  <ChevronDown className="w-5 h-5 text-white" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white" />
                )}
              </button>
              {!collapsedSections.modifiers && (
                <div className="mt-3 p-4 bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                    {enhancedKeywordCategories.Modifiers.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs px-1 py-0.5 rounded font-bold transition-all duration-200 ${
                          selectedKeywords.includes(keyword)
                            ? "bg-white text-black"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          minHeight: "24px",
                          lineHeight: "1.2",
                        }}
                      >
                        {keyword.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Optimized Prompt Section - Moved Below Keywords */}
        <Card className="bg-black border-0 shadow-xl rounded-xl">
          <CardContent style={{ padding: "24px" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#F93822" }}
                >
                  <span className="text-white font-black text-sm">3</span>
                </div>
                <h3
                  className="text-white text-2xl font-black"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  your optimized prompt
                </h3>
              </div>

              {/* Quality Score */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={
                      customInstructions ? "text-green-400" : "text-gray-400"
                    }
                  >
                    {customInstructions ? "✓" : "○"}
                  </span>
                  <span className="text-white font-medium">Vision</span>

                  <span
                    className={
                      selectedKeywords.length > 0
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    {selectedKeywords.length > 0 ? "✓" : "○"}
                  </span>
                  <span className="text-white font-medium">Keywords</span>

                  <span
                    className={
                      uploadedFile ? "text-green-400" : "text-gray-400"
                    }
                  >
                    {uploadedFile ? "✓" : "○"}
                  </span>
                  <span className="text-white font-medium">Reference</span>
                </div>
                <div
                  className={`text-lg font-black px-4 py-2 rounded-lg ${qualityScore >= 80 ? "bg-green-600" : qualityScore >= 50 ? "bg-yellow-600" : "bg-red-600"} text-white`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {qualityScore}%
                </div>
              </div>
            </div>

            <div
              className="bg-gray-900 rounded-xl mb-4"
              style={{ padding: "20px" }}
            >
              <textarea
                value={generatePrompt()}
                readOnly
                className="w-full bg-transparent text-white text-base leading-relaxed resize-none border-0 outline-0"
                rows={5}
                placeholder="Enter your vision above and select keywords to build your optimized prompt..."
                style={{
                  minHeight: "120px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "500",
                }}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={copyPrompt}
                disabled={!customInstructions && selectedKeywords.length === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-6 rounded-lg transition-all duration-200 border-0"
                style={{
                  backgroundColor: "#F93822",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "900",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                data-copy-button
              >
                <Copy className="w-4 h-4 mr-2" />
                copy prompt
              </Button>

              <Button
                onClick={() => {
                  setCustomInstructions("");
                  setSelectedKeywords([]);
                  setUploadedFile(null);
                  setQualityScore(0);
                }}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-black py-3 px-6 rounded-lg transition-all duration-200"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  backgroundColor: "transparent",
                }}
              >
                clear all
              </Button>
            </div>
          </CardContent>
        </Card>
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
