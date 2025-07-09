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
    ],
    Texture: [
      "Smooth",
      "Rough",
      "Metallic",
      "Wooden",
      "Glass",
      "Fabric",
      "Stone",
      "Plastic",
    ],
    "Creative Direction": [
      "Professional",
      "Artistic",
      "Commercial",
      "Editorial",
      "Lifestyle",
      "Fashion",
      "Product",
      "Portrait",
    ],
    Quality: [
      "4K",
      "Ultra-sharp",
      "High resolution",
      "Professional",
      "Award-winning",
      "Magazine quality",
      "Commercial grade",
      "Studio quality",
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
      texture: [] as string[],
      creative: [] as string[],
      quality: [] as string[],
    };

    selectedKeywords.forEach((keyword) => {
      const category = Object.entries(keywordCategories)
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
        case "texture":
          organizedKeywords.texture.push(keyword.toLowerCase());
          break;
        case "creative direction":
          organizedKeywords.creative.push(keyword.toLowerCase());
          break;
        case "quality":
          organizedKeywords.quality.push(keyword.toLowerCase());
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

    // Add texture details
    if (organizedKeywords.texture.length > 0) {
      prompt += `, ${organizedKeywords.texture.join(", ")}`;
    }

    // Add creative direction
    if (organizedKeywords.creative.length > 0) {
      prompt += `, ${organizedKeywords.creative.join(", ")}`;
    }

    // Add quality parameters last
    if (organizedKeywords.quality.length > 0) {
      prompt += `, ${organizedKeywords.quality.join(", ")}`;
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
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Top Row: Step 1 (Left) and Step 2 (Right) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Step 1 - Top Left */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardHeader>
              <CardTitle
                className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
                style={{ fontWeight: 900 }}
              >
                STEP 1: CREATIVE VISION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="instructions" className="text-white">
                  Describe your subject, scene, or concept
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="e.g., Professional portrait of a confident businesswoman in modern office setting..."
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
                  className="bg-gray-900 border-gray-700 text-white mt-2 focus:border-brand-red focus:ring-brand-red"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 2 - Top Right */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardHeader>
              <CardTitle
                className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
                style={{ fontWeight: 900 }}
              >
                STEP 2: REFERENCE IMAGE (OPTIONAL)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">
                  Upload reference image for visual context
                </p>
                {uploadedFile ? (
                  <div className="mb-4">
                    <p className="text-brand-red font-black text-sm">
                      ✓ {uploadedFile.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-black mt-2"
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
                    className="bg-brand-red text-black hover:bg-brand-red-hover font-black border-0"
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

        {/* Step 3 - Full Width */}
        <Card className="bg-black border border-gray-900 shadow-xl">
          <CardHeader>
            <CardTitle
              className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
              style={{ fontWeight: 900 }}
            >
              STEP 3: SELECT KEYWORDS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(keywordCategories).map(([category, keywords]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-3">{category}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {keywords.map((keyword) => (
                    <Button
                      key={keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-xs h-8 px-3 font-black border-2 transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black border-brand-red hover:bg-brand-red-hover"
                          : "bg-transparent text-brand-red border-brand-red hover:bg-brand-red hover:text-black"
                      }`}
                      style={{ fontWeight: 900, minWidth: "80px" }}
                    >
                      <span className="truncate">
                        {keyword}
                        {selectedKeywords.includes(keyword) && (
                          <span className="ml-1">×</span>
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quality Meter and Output - Full Width */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quality Meter */}
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
              <div className="space-y-2 text-sm">
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
                    className={
                      uploadedFile ? "text-green-500" : "text-gray-500"
                    }
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
                        selectedKeywords.map(
                          (keyword) =>
                            Object.entries(keywordCategories).find(
                              ([_, words]) => words.includes(keyword),
                            )?.[0],
                        ),
                      ).size
                    }
                    /6
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Prompt */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardHeader>
              <CardTitle
                className="text-brand-red text-sm font-black tracking-wide border-b border-brand-red pb-2"
                style={{ fontWeight: 900 }}
              >
                GENERATED SORA PROMPT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-900 border border-gray-700 rounded p-4 min-h-[120px]">
                <p className="text-white text-sm">
                  {generatePrompt() ||
                    "Start by adding your creative vision and selecting keywords..."}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={copyPrompt}
                  disabled={
                    !customInstructions && selectedKeywords.length === 0
                  }
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
        </div>
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
