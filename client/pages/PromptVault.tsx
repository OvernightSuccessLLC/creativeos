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
      "Studio lighting",
      "Natural light",
      "Cinematic",
      "Backlit",
      "Rim lighting",
      "Hard shadows",
      "Moody",
    ],
    Framing: [
      "Close-up",
      "Wide shot",
      "Bird's eye",
      "Low angle",
      "Eye level",
      "Over shoulder",
      "Full body",
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
      "optimized for SORA AI",
      "magazine cover quality",
    ],
    Style: [
      "Natural",
      "Clean",
      "Cinematic",
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
      "Wes Anderson meets Balenciaga",
      "Edward Hopper moodboard",
      "Gucci in a cyber slum",
      "Tarantino aesthetic violence",
      "Old Money vibes",
      "Virgil Abloh x Eames visual tension",
      "Yeezy drop in a NASA lab",
      "Scorsese gritty realism",
      "Warhol meets Warhol",
      "High fashion in a war zone",
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
      <div
        className="bg-black px-6 text-center"
        style={{ margin: "12px 0 18px", padding: "24px 24px 18px" }}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Database className="w-8 h-8 text-brand-red" />
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontSize: "30px", lineHeight: "30px" }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Step 1 - Top Left */}
          <Card
            className="bg-black border border-gray-900 shadow-xl"
            style={{ flexGrow: "0", height: "auto" }}
          >
            <CardContent style={{ padding: "8px 24px" }}>
              <h3
                className="text-brand-red text-xs font-black tracking-wide"
                style={{
                  fontWeight: 900,
                  fontSize: "15px",
                  margin: "6px 0",
                  padding: "6px 0",
                }}
              >
                STEP 1: CREATIVE VISION
              </h3>

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
                className="bg-gray-900 border-gray-700 text-white focus:border-brand-red focus:ring-brand-red text-xs"
                style={{ marginTop: "12px", padding: "8px 12px" }}
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Step 2 - Top Right */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardContent
              className="pt-2 pb-3"
              style={{ padding: "8px 24px 12px" }}
            >
              <h3
                className="text-brand-red text-xs font-black tracking-wide"
                style={{
                  fontWeight: 900,
                  fontSize: "15px",
                  margin: "6px 0",
                  padding: "6px 0",
                }}
              >
                STEP 2: REFERENCE IMAGE
              </h3>
              <div
                className="border-2 border-dashed border-gray-700 rounded-lg text-center"
                style={{ margin: "24px 0 8px", padding: "12px" }}
              >
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
        <Card
          className="bg-black border border-gray-900 shadow-xl"
          style={{ margin: "12px 6px", padding: "12px 0" }}
        >
          <h3
            className="text-brand-red text-sm font-black tracking-wide"
            style={{
              fontWeight: 900,
              alignSelf: "start",
              textAlign: "left",
              margin: "12px 18px 0",
              padding: "6px 24px 5px",
            }}
          >
            STEP 3: SELECT KEYWORDS
          </h3>
          <CardContent style={{ padding: "4px 24px 0" }} />
          <CardContent style={{ margin: "0 12px", padding: "0 12px 12px" }}>
            {/* Lighting Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "12px 18px 18px", padding: "10px 12px 12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px" }}
              >
                Lighting
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywordCategories.Lighting.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? "bg-brand-red text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Framing Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "12px 16px 18px", padding: "10px 12px 12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px" }}
              >
                Framing
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywordCategories.Framing.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? "bg-brand-red text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "10px 16px 20px", padding: "10px 12px 12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px", marginBottom: "8px" }}
              >
                Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywordCategories.Locations.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? "bg-brand-red text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "12px 16px 20px", padding: "10px 12px 12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px" }}
              >
                Style
              </h3>
              <div className="flex flex-wrap gap-2">
                {enhancedKeywordCategories.Style.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? "bg-brand-red text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Creative Direction Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "16px", padding: "10px 12px 12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px", marginBottom: "10px" }}
              >
                Creative Direction
              </h3>
              <div className="flex flex-wrap gap-2">
                {enhancedKeywordCategories["Creative Direction"].map(
                  (keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      {keyword}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Modifiers Section */}
            <div
              className="bg-black border border-gray-600 rounded-lg"
              style={{ margin: "16px 16px 22px", padding: "12px" }}
            >
              <h3
                className="text-white text-base font-bold mb-3"
                style={{ fontSize: "14px", marginBottom: "8px" }}
              >
                Modifiers
              </h3>
              <div className="flex flex-wrap gap-2">
                {enhancedKeywordCategories.Modifiers.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? "bg-brand-red text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Prompt - Full Width Single Column */}
        <Card
          className="bg-black border border-gray-900 shadow-xl"
          style={{ margin: "12px 0", padding: "20px 0" }}
        >
          <CardContent style={{ padding: "0 24px 20px" }}>
            <div className="text-center mb-6">
              <h3
                className="text-brand-red text-lg font-black tracking-wide mb-4"
                style={{ fontWeight: 900 }}
              >
                PROMPT QUALITY METER
              </h3>

              {/* Quality Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgb(31, 41, 55)"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={
                      qualityScore >= 80
                        ? "#10b981"
                        : qualityScore >= 50
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(qualityScore / 100) * 314} 314`}
                    className="transition-all duration-500 ease-out"
                    style={{
                      filter:
                        qualityScore >= 80
                          ? "drop-shadow(0 0 8px #10b981)"
                          : qualityScore >= 50
                            ? "drop-shadow(0 0 8px #f59e0b)"
                            : "drop-shadow(0 0 8px #ef4444)",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">
                      {qualityScore}%
                    </div>
                    <div className="text-xs text-gray-400">QUALITY</div>
                  </div>
                </div>
              </div>

              {/* Quality Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm max-w-md mx-auto">
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-gray-400 text-xs mb-1">INSTRUCTIONS</div>
                  <div
                    className={`font-bold ${customInstructions ? "text-green-400" : "text-red-400"}`}
                  >
                    {customInstructions ? "✓ ADDED" : "✗ MISSING"}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-gray-400 text-xs mb-1">
                    REFERENCE IMAGE
                  </div>
                  <div
                    className={`font-bold ${uploadedFile ? "text-green-400" : "text-red-400"}`}
                  >
                    {uploadedFile ? "✓ UPLOADED" : "✗ MISSING"}
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-gray-400 text-xs mb-1">KEYWORDS</div>
                  <div className="font-bold text-brand-red">
                    {selectedKeywords.length} SELECTED
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-gray-400 text-xs mb-1">CATEGORIES</div>
                  <div className="font-bold text-brand-red">
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
                    /6 COVERED
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent style={{ padding: "0 24px" }}>
            {/* Generated Prompt Output */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
              <div className="text-gray-400 text-xs mb-2 font-semibold">
                GENERATED SORA PROMPT
              </div>
              <p className="text-white text-sm leading-relaxed">
                {generatePrompt() ||
                  "Start by adding your creative vision and selecting keywords to generate your optimized SORA prompt..."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <Button
                onClick={copyPrompt}
                disabled={!customInstructions && selectedKeywords.length === 0}
                className="flex-1 text-black font-black text-lg py-4 relative overflow-hidden group"
                style={{
                  fontWeight: 900,
                  background: "linear-gradient(45deg, #ff6b35, #ff8f00)",
                  boxShadow:
                    "0 0 20px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255, 107, 53, 0.8)",
                }}
                data-copy-button
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></div>
                <Copy className="w-5 h-5 mr-3" />
                COPY FOR SORA
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const prompt = generatePrompt();
                  if (prompt) {
                    alert("Prompt saved to favorites! ��");
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
  );
}
