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
      "Soft diffused",
      "Dramatic",
      "Neon",
      "Candlelight",
      "Studio lighting",
      "Natural light",
      "Cinematic",
      "Backlit",
      "Side lighting",
      "Rim lighting",
      "Hard shadows",
      "Moody",
      "Bright",
      "Sunset",
    ],
    Framing: [
      "Close-up",
      "Wide shot",
      "Medium shot",
      "Bird's eye",
      "Low angle",
      "Eye level",
      "Dutch angle",
      "Over shoulder",
      "Full body",
      "Three-quarter",
      "Profile",
      "Aerial view",
      "Centered",
      "Rule of thirds",
      "Symmetrical",
    ],
    Locations: [
      "Studio",
      "Urban",
      "Nature",
      "Interior",
      "Minimalist",
      "Industrial",
      "Vintage",
      "Modern",
      "Rooftop",
      "Beach",
      "Forest",
      "Desert",
      "Office",
      "Street",
      "Gallery",
    ],
  };

  const enhancedKeywordCategories = {
    Modifiers: [
      "4K resolution",
      "cinematic quality",
      "professional grade",
      "award-winning",
      "ultra-high resolution",
      "masterpiece",
      "commercial ready",
      "studio quality",
      "optimized for SORA AI",
      "magazine cover quality",
      "social media optimized",
      "HDR color grading",
      "commercial advertisement grade",
      "floating dust particles",
      "lens flare streak",
    ],
    Style: [
      "Natural",
      "Clean",
      "Cinematic",
      "Saturated",
      "Minimal",
      "Hyperrealistic",
      "Replica",
      "editorial sharp",
      "dreamy glow",
      "high-polish",
      "raw & real",
      "tech aesthetic",
      "commercial polished",
      "soft focus",
      "90s VHS grain",
    ],
    "Creative Direction": [
      "Wes Anderson meets Balenciaga",
      "Apple ad directed by Kubrick",
      "Old Money vibes",
      "Virgil Abloh x Eames visual tension",
      "Yeezy drop in a NASA lab",
      "Warhol meets Warhol",
      "Quiet luxury meets pitchfork",
      "High fashion in a war zone",
      "Edward Hopper moodboard",
      "Gucci in a cyber slum",
      "Tarantino aesthetic violence",
      "Hitchcock suspense tension",
      "Lynch surreal dreamscape",
      "Scorsese gritty realism",
      "Nolan temporal complexity",
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
    <div className="min-h-screen bg-brand-red text-black">
      {/* Header */}
      <div className="bg-black px-6 py-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Database className="w-8 h-8 text-brand-red" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            PROMPT VAULT
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced formula builder that combines custom vision, professional
          keywords, and image references into perfectly structured SORA prompts
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 space-y-3">
        {/* Top Row: Step 1 (Left) and Step 2 (Right) - Same width as Step 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Step 1 - Top Left */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle
                className="text-brand-red text-xs font-black tracking-wide border-b border-brand-red pb-1"
                style={{ fontWeight: 900 }}
              >
                STEP 1: CREATIVE VISION
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div>
                <Label htmlFor="instructions" className="text-white text-xs">
                  Describe your subject, scene, or concept
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="e.g., Professional portrait of a confident businesswoman..."
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
                  className="bg-gray-900 border-gray-700 text-white mt-1 focus:border-brand-red focus:ring-brand-red text-xs"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 2 - Top Right */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle
                className="text-brand-red text-xs font-black tracking-wide border-b border-brand-red pb-1"
                style={{ fontWeight: 900 }}
              >
                STEP 2: REFERENCE IMAGE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-3">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-3 text-center">
                <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-gray-400 mb-2 text-xs">
                  Upload reference image
                </p>
                {uploadedFile ? (
                  <div className="mb-2">
                    <p className="text-brand-red font-black text-xs">
                      ✓ {uploadedFile.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-black mt-1 text-xs h-5"
                      style={{ fontWeight: 900 }}
                    >
                      REMOVE
                    </Button>
                  </div>
                ) : null}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  <Button
                    variant="outline"
                    className="bg-brand-red text-black hover:bg-brand-red-hover font-black border-0 text-xs h-5"
                    style={{ fontWeight: 900 }}
                    asChild
                  >
                    <label htmlFor="file-upload" className="cursor-pointer">
                      CHOOSE FILE
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 3 - Full Width Keywords */}
        <Card className="bg-black border border-gray-900 shadow-xl">
          <CardHeader>
            <CardTitle
              className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
              style={{ fontWeight: 900 }}
            >
              STEP 3: SELECT KEYWORDS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* 2x2 Grid for first 4 categories */}
            <div className="grid grid-cols-2 gap-3">
              {/* Top Left - Style (Theme) */}
              <div
                style={{ backgroundColor: "#000000", minHeight: "160px" }}
                className="rounded-lg p-3 border border-gray-700 flex flex-col"
              >
                <h4 className="text-white font-black mb-2 text-sm uppercase tracking-wide">
                  STYLE
                </h4>
                <div className="grid grid-cols-6 gap-1 flex-1">
                  {enhancedKeywordCategories.Style.slice(0, 24).map(
                    (keyword) => (
                      <Button
                        key={keyword}
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyword(keyword)}
                        className={`text-xs h-6 px-1 font-black border rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                          selectedKeywords.includes(keyword)
                            ? "text-white border-brand-red hover:shadow-brand-red/50"
                            : "text-white border-brand-red hover:text-white hover:border-brand-red hover:shadow-brand-red/50"
                        }`}
                        style={{
                          fontWeight: 900,
                          backgroundColor: selectedKeywords.includes(keyword)
                            ? "#FF4E33"
                            : "#000000",
                        }}
                      >
                        <span className="text-[7px] truncate uppercase font-black">
                          {keyword.toUpperCase()}
                          {selectedKeywords.includes(keyword) && (
                            <span className="ml-1">×</span>
                          )}
                        </span>
                      </Button>
                    ),
                  )}
                </div>
              </div>

              {/* Top Right - Framing */}
              <div
                style={{ backgroundColor: "#000000", minHeight: "160px" }}
                className="rounded-lg p-3 border border-gray-700 flex flex-col"
              >
                <h4 className="text-white font-black mb-2 text-sm uppercase tracking-wide">
                  FRAMING
                </h4>
                <div className="grid grid-cols-6 gap-1 flex-1">
                  {keywordCategories.Framing.slice(0, 24).map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-xs h-6 px-1 font-black border rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        selectedKeywords.includes(keyword)
                          ? "text-white border-brand-red hover:shadow-brand-red/50"
                          : "text-white border-brand-red hover:text-white hover:border-brand-red hover:shadow-brand-red/50"
                      }`}
                      style={{
                        fontWeight: 900,
                        backgroundColor: selectedKeywords.includes(keyword)
                          ? "#FF4E33"
                          : "#000000",
                      }}
                    >
                      <span className="text-[7px] truncate uppercase font-black">
                        {keyword.toUpperCase()}
                        {selectedKeywords.includes(keyword) && (
                          <span className="ml-1">×</span>
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Middle Left - Lighting */}
              <div
                style={{ backgroundColor: "#000000", minHeight: "160px" }}
                className="rounded-lg p-3 border border-gray-700 flex flex-col"
              >
                <h4 className="text-white font-black mb-2 text-sm uppercase tracking-wide">
                  LIGHTING
                </h4>
                <div className="grid grid-cols-6 gap-1 flex-1">
                  {keywordCategories.Lighting.slice(0, 24).map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-xs h-6 px-1 font-black border rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        selectedKeywords.includes(keyword)
                          ? "text-white border-brand-red hover:shadow-brand-red/50"
                          : "text-white border-brand-red hover:text-white hover:border-brand-red hover:shadow-brand-red/50"
                      }`}
                      style={{
                        fontWeight: 900,
                        backgroundColor: selectedKeywords.includes(keyword)
                          ? "#FF4E33"
                          : "#000000",
                      }}
                    >
                      <span className="text-[7px] truncate uppercase font-black">
                        {keyword.toUpperCase()}
                        {selectedKeywords.includes(keyword) && (
                          <span className="ml-1">×</span>
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Middle Right - Locations */}
              <div
                style={{ backgroundColor: "#000000", minHeight: "160px" }}
                className="rounded-lg p-3 border border-gray-700 flex flex-col"
              >
                <h4 className="text-white font-black mb-2 text-sm uppercase tracking-wide">
                  LOCATIONS
                </h4>
                <div className="grid grid-cols-6 gap-1 flex-1">
                  {keywordCategories.Locations.slice(0, 24).map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-xs h-6 px-1 font-black border rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        selectedKeywords.includes(keyword)
                          ? "text-white border-brand-red hover:shadow-brand-red/50"
                          : "text-white border-brand-red hover:text-white hover:border-brand-red hover:shadow-brand-red/50"
                      }`}
                      style={{
                        fontWeight: 900,
                        backgroundColor: selectedKeywords.includes(keyword)
                          ? "#FF4E33"
                          : "#000000",
                      }}
                    >
                      <span className="text-[7px] truncate uppercase font-black">
                        {keyword.toUpperCase()}
                        {selectedKeywords.includes(keyword) && (
                          <span className="ml-1">×</span>
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Creative Direction - Full Width Container */}
            <div
              style={{ backgroundColor: "#000000", minHeight: "160px" }}
              className="rounded-lg p-3 border border-gray-700 flex flex-col"
            >
              <h4 className="text-white font-black mb-2 text-sm uppercase tracking-wide text-center">
                CREATIVE DIRECTION
              </h4>
              <div className="grid grid-cols-8 gap-1 flex-1">
                {enhancedKeywordCategories["Creative Direction"]
                  .slice(0, 32)
                  .map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-xs h-6 px-1 font-black border rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        selectedKeywords.includes(keyword)
                          ? "text-white border-brand-red hover:shadow-brand-red/50"
                          : "text-white border-brand-red hover:text-white hover:border-brand-red hover:shadow-brand-red/50"
                      }`}
                      style={{
                        fontWeight: 900,
                        backgroundColor: selectedKeywords.includes(keyword)
                          ? "#FF4E33"
                          : "#000000",
                      }}
                    >
                      <span className="text-[7px] truncate uppercase font-black">
                        {keyword.toUpperCase()}
                        {selectedKeywords.includes(keyword) && (
                          <span className="ml-1">×</span>
                        )}
                      </span>
                    </Button>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Prompt - Full Width Single Column */}
        <Card className="bg-black border border-gray-900 shadow-xl">
          <CardHeader>
            <CardTitle
              className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
              style={{ fontWeight: 900 }}
            >
              GENERATED SORA PROMPT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gray-900 border border-gray-700 rounded p-3 min-h-[80px]">
              <p className="text-white text-sm">
                {generatePrompt() ||
                  "Start by adding your creative vision and selecting keywords..."}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={copyPrompt}
                disabled={!customInstructions && selectedKeywords.length === 0}
                className="bg-brand-red hover:bg-brand-red-hover text-black font-black flex-1"
                style={{ fontWeight: 900 }}
                data-copy-button
              >
                <Copy className="w-4 h-4 mr-2" />
                COPY FOR SORA
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const prompt = generatePrompt();
                  if (prompt) {
                    alert("Prompt saved to favorites! ⭐");
                  }
                }}
                className="border-brand-red text-brand-red hover:bg-brand-red hover:text-black font-black"
                style={{ fontWeight: 900 }}
              >
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quality Meter - Full Width */}
        <Card className="bg-black border border-gray-900 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-brand-red text-sm font-black tracking-wide"
                style={{ fontWeight: 900 }}
              >
                PROMPT QUALITY
              </CardTitle>
              <Badge
                className={`${
                  qualityScore >= 80
                    ? "bg-green-500"
                    : qualityScore >= 50
                      ? "bg-yellow-500"
                      : "bg-brand-red"
                } text-white font-bold`}
              >
                {qualityScore}% QUALITY
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-900 rounded-full h-3 mb-4 border border-gray-800">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  qualityScore >= 80
                    ? "bg-green-500"
                    : qualityScore >= 50
                      ? "bg-yellow-500"
                      : "bg-brand-red"
                }`}
                style={{ width: `${qualityScore}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center justify-between text-white">
                <span>Instructions</span>
                <span
                  className={
                    customInstructions ? "text-green-500" : "text-gray-500"
                  }
                >
                  {customInstructions ? "✓" : "○"}
                </span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Reference Image</span>
                <span
                  className={uploadedFile ? "text-green-500" : "text-gray-500"}
                >
                  {uploadedFile ? "✓" : "○"}
                </span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Keywords Selected</span>
                <span className="text-brand-red font-black">
                  {selectedKeywords.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Categories Covered</span>
                <span className="text-brand-red font-black">
                  {
                    new Set(
                      selectedKeywords.map((keyword) => {
                        const allCategories = {
                          ...keywordCategories,
                          ...enhancedKeywordCategories,
                        };
                        return Object.entries(allCategories).find(
                          ([_, words]) => words.includes(keyword),
                        )?.[0];
                      }),
                    ).size
                  }
                  /6
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pro Tips Footer */}
      <div className="bg-black/20 border-t border-black/30 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-3 h-3 text-brand-red mt-0.5 flex-shrink-0" />
              <p className="text-white">
                <strong>Structure:</strong> Auto-organizes keywords for optimal
                SORA understanding
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Camera className="w-3 h-3 text-brand-red mt-0.5 flex-shrink-0" />
              <p className="text-white">
                <strong>Images:</strong> Uploaded images become "--reference
                image" parameters
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-3 h-3 text-brand-red mt-0.5 flex-shrink-0" />
              <p className="text-white">
                <strong>Keywords:</strong> Click to add, click × to remove
                selected keywords
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Palette className="w-3 h-3 text-brand-red mt-0.5 flex-shrink-0" />
              <p className="text-white">
                <strong>Quality:</strong> Use the quality meter to optimize
                prompt completeness
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
