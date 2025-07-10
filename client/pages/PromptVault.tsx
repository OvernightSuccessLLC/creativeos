import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";

export default function PromptVault() {
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [qualityScore, setQualityScore] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    ],
    "Creative Direction": [
      "Edward Hopper moodboard",
      "Gucci in a cyber slum",
      "Tarantino aesthetic violence",
      "Old Money vibes",
      "Virgil Abloh x Eames visual tension",
    ],
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
      className="min-h-screen text-black"
      style={{ backgroundColor: "#EE1C25" }}
    >
      {/* Header */}
      <div
        className="bg-black px-6 text-center"
        style={{ margin: "12px 0 18px", padding: "24px 24px 18px" }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Database className="w-8 h-8" style={{ color: "#EE1C25" }} />
          <h1
            className="text-white font-bold"
            style={{
              fontSize: "30px",
              lineHeight: "30px",
              fontFamily: "Poppins, Helvetica Neue, sans-serif",
              fontWeight: "700",
            }}
          >
            PROMPT VAULT
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="max-w-7xl mx-auto space-y-4"
        style={{ padding: "0 24px 10px" }}
      >
        {/* Top Row: Step 1 (Left) and Step 2 (Right) - Same width as Step 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Step 1 - Top Left */}
          <Card
            className="bg-black border border-gray-900 shadow-xl"
            style={{ flexGrow: "1", height: "auto" }}
          >
            <CardContent style={{ padding: "20px" }}>
              <div className="flex items-center mb-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#EE1C25" }}
                >
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h3
                  className="text-white text-lg font-bold"
                  style={{
                    fontFamily: "Poppins, Helvetica Neue, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Step 1: Describe Your Vision
                </h3>
              </div>

              <Textarea
                id="instructions"
                placeholder="Describe exactly what you want to create... (e.g., 'A modern entrepreneur working on a laptop in a minimalist coffee shop')"
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
                className="bg-gray-900 border-gray-700 text-white focus:border-brand-red focus:ring-brand-red resize-none"
                style={{
                  minHeight: "120px",
                  padding: "16px",
                  fontSize: "14px",
                }}
                rows={6}
              />

              <p className="text-gray-400 text-sm mt-3">
                Be specific about subjects, actions, and the overall scene you
                envision.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 - Top Right */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardContent style={{ padding: "20px" }}>
              <div className="flex items-center mb-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#EE1C25" }}
                >
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3
                  className="text-white text-lg font-bold"
                  style={{
                    fontFamily: "Poppins, Helvetica Neue, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Step 2: Upload Reference Image (Optional)
                </h3>
              </div>

              <div
                className="border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-gray-500 transition-colors"
                style={{ padding: "40px 20px", minHeight: "120px" }}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {uploadedFile ? (
                  <div>
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <p className="text-green-400 font-medium mb-2">
                      {uploadedFile.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="w-12 h-12 border-2 border-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-white font-medium mb-1">
                      Click to upload reference image
                    </p>
                    <p className="text-gray-400 text-sm">JPG, PNG up to 10MB</p>
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
            </CardContent>
          </Card>
        </div>

        {/* Step 3 - Full Width Keywords */}
        <Card
          className="bg-black border border-gray-900 shadow-xl"
          style={{ margin: "18px 0 12px", padding: "12px 0" }}
        >
          <h3
            className="text-lg font-black tracking-wide text-left mb-4 ml-6"
            style={{
              fontWeight: "900",
              paddingTop: "8px",
              color: "#EE1C25",
              fontFamily: "Poppins, Helvetica Neue, sans-serif",
            }}
          >
            STEP 3: SELECT KEYWORDS
          </h3>
          <CardContent style={{ padding: "0 24px" }}>
            {/* Lighting Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#EE1C25",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(238, 28, 37, 0.3)",
                border: "1px solid rgba(238, 28, 37, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                LIGHTING
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {keywordCategories.Lighting.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedKeywords.includes(keyword)
                        ? "bg-black text-white shadow-lg"
                        : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    style={{
                      fontWeight: 700,
                      border: selectedKeywords.includes(keyword)
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Framing Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#EE1C25",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(238, 28, 37, 0.3)",
                border: "1px solid rgba(238, 28, 37, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                FRAMING
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {keywordCategories.Framing.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedKeywords.includes(keyword)
                        ? "bg-black text-white shadow-lg"
                        : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    style={{
                      fontWeight: 700,
                      border: selectedKeywords.includes(keyword)
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#EE1C25",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(238, 28, 37, 0.3)",
                border: "1px solid rgba(238, 28, 37, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                LOCATIONS
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {keywordCategories.Locations.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedKeywords.includes(keyword)
                        ? "bg-black text-white shadow-lg"
                        : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    style={{
                      fontWeight: 700,
                      border: selectedKeywords.includes(keyword)
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#EE1C25",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(238, 28, 37, 0.3)",
                border: "1px solid rgba(238, 28, 37, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                STYLE
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {enhancedKeywordCategories.Style.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedKeywords.includes(keyword)
                        ? "bg-black text-white shadow-lg"
                        : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    style={{
                      fontWeight: 700,
                      border: selectedKeywords.includes(keyword)
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Creative Direction Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#EE1C25",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(238, 28, 37, 0.3)",
                border: "1px solid rgba(238, 28, 37, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                CREATIVE DIRECTION
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {enhancedKeywordCategories["Creative Direction"].map(
                  (keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-black text-white shadow-lg"
                          : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                      }`}
                      style={{
                        fontWeight: 700,
                        border: selectedKeywords.includes(keyword)
                          ? "2px solid #fff"
                          : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {keyword}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Modifiers Section */}
            <div
              className="rounded-lg mb-4"
              style={{
                background: "#ff4e33",
                padding: "8px 12px 12px",
                boxShadow: "0 0 20px rgba(255, 107, 53, 0.3)",
                border: "1px solid rgba(255, 107, 53, 0.8)",
              }}
            >
              <h3
                className="text-black text-sm font-black mb-2 text-left"
                style={{
                  fontWeight: 900,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                MODIFIERS
              </h3>
              <div className="flex flex-wrap gap-2 justify-start text-left mr-auto items-start">
                {enhancedKeywordCategories.Modifiers.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedKeywords.includes(keyword)
                        ? "bg-black text-white shadow-lg"
                        : "bg-black text-white opacity-80 hover:opacity-100 hover:shadow-md"
                    }`}
                    style={{
                      fontWeight: 700,
                      border: selectedKeywords.includes(keyword)
                        ? "2px solid #fff"
                        : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row: Quality Meter and Step 4 Prompt Output */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Quality Meter - Takes 1/3 width */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardContent style={{ padding: "20px" }}>
              <h3 className="text-brand-red text-lg font-bold mb-4 tracking-wide">
                AI PROMPT OPTIMIZER
              </h3>

              {/* Circular Quality Score */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-red border-r-brand-red transition-all duration-500"
                      style={{
                        transform: `rotate(${(qualityScore / 100) * 360}deg)`,
                        borderRightColor:
                          qualityScore > 25 ? "#ff4e33" : "transparent",
                        borderBottomColor:
                          qualityScore > 50 ? "#ff4e33" : "transparent",
                        borderLeftColor:
                          qualityScore > 75 ? "#ff4e33" : "transparent",
                      }}
                    />
                    <span className="text-white text-xl font-bold relative z-10">
                      {qualityScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Checklist */}
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-3 ${customInstructions ? "text-green-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${customInstructions ? "border-green-400 bg-green-400" : "border-gray-500"}`}
                  >
                    {customInstructions ? (
                      <span className="text-black text-xs font-bold">✓</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">
                    Vision Description
                  </span>
                </div>

                <div
                  className={`flex items-center gap-3 ${uploadedFile ? "text-green-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${uploadedFile ? "border-green-400 bg-green-400" : "border-gray-500"}`}
                  >
                    {uploadedFile ? (
                      <span className="text-black text-xs font-bold">✓</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">Reference Image</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${selectedKeywords.some((k) => keywordCategories.Lighting.includes(k)) ? "text-green-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedKeywords.some((k) => keywordCategories.Lighting.includes(k)) ? "border-green-400 bg-green-400" : "border-gray-500"}`}
                  >
                    {selectedKeywords.some((k) =>
                      keywordCategories.Lighting.includes(k),
                    ) ? (
                      <span className="text-black text-xs font-bold">✓</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">Lighting Setup</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${selectedKeywords.some((k) => keywordCategories.Framing.includes(k)) ? "text-green-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedKeywords.some((k) => keywordCategories.Framing.includes(k)) ? "border-green-400 bg-green-400" : "border-gray-500"}`}
                  >
                    {selectedKeywords.some((k) =>
                      keywordCategories.Framing.includes(k),
                    ) ? (
                      <span className="text-black text-xs font-bold">✓</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">Camera Framing</span>
                </div>

                <div
                  className={`flex items-center gap-3 ${selectedKeywords.some((k) => enhancedKeywordCategories["Creative Direction"].includes(k)) ? "text-green-400" : "text-gray-500"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedKeywords.some((k) => enhancedKeywordCategories["Creative Direction"].includes(k)) ? "border-green-400 bg-green-400" : "border-gray-500"}`}
                  >
                    {selectedKeywords.some((k) =>
                      enhancedKeywordCategories["Creative Direction"].includes(
                        k,
                      ),
                    ) ? (
                      <span className="text-black text-xs font-bold">✓</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-medium">
                    Creative Direction
                  </span>
                </div>
              </div>

              {/* Quality Tips */}
              <div className="mt-6 p-3 bg-gray-900 rounded-lg border border-gray-700">
                <h4 className="text-brand-red text-xs font-bold mb-2">
                  💡 OPTIMIZATION TIPS
                </h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {qualityScore < 30 && (
                    <li>• Start with a detailed vision description</li>
                  )}
                  {qualityScore < 50 && (
                    <li>• Add lighting and framing keywords</li>
                  )}
                  {qualityScore < 80 && (
                    <li>• Include creative direction for style</li>
                  )}
                  {qualityScore >= 80 && (
                    <li>• ✨ Excellent! Your prompt is optimized</li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 Prompt Output - Takes 2/3 width */}
          <div className="md:col-span-2">
            <Card className="bg-black border-2 border-brand-red shadow-xl h-full">
              <CardContent style={{ padding: "20px" }}>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-white text-lg font-bold">
                    Your Optimized SORA Prompt
                  </h3>
                </div>

                <div
                  className="bg-gray-900 border border-gray-700 rounded-lg mb-4"
                  style={{ padding: "16px" }}
                >
                  <textarea
                    value={generatePrompt()}
                    readOnly
                    className="w-full bg-transparent text-gray-300 text-sm leading-relaxed resize-none border-0 outline-0"
                    rows={8}
                    placeholder="Enter your vision above and select keywords to build your optimized SORA prompt..."
                    style={{ minHeight: "180px", fontFamily: "monospace" }}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={copyPrompt}
                    disabled={
                      !customInstructions && selectedKeywords.length === 0
                    }
                    className="bg-brand-red hover:bg-red-600 text-black font-bold py-3 px-6 transition-all duration-200"
                    style={{ background: "#ff4e33", border: "none" }}
                    data-copy-button
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    COPY PROMPT
                  </Button>

                  <Button
                    onClick={() => {
                      setCustomInstructions("");
                      setSelectedKeywords([]);
                      setUploadedFile(null);
                      setQualityScore(0);
                    }}
                    variant="outline"
                    className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-bold transition-all duration-200"
                  >
                    CLEAR ALL
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
