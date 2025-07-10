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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Step 1 - Top Left */}
          <Card
            className="bg-black border border-gray-900 shadow-xl"
            style={{ flexGrow: "1", height: "auto" }}
          >
            <CardContent style={{ marginTop: "8px", padding: "8px 24px" }}>
              <h3
                className="text-brand-red text-xs font-black tracking-wide"
                style={{
                  fontWeight: 900,
                  fontSize: "15px",
                  margin: "8px 0 6px",
                  padding: "8px 0 6px",
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
                style={{ marginTop: "4px", padding: "4px 12px" }}
                rows={2}
              />
            </CardContent>
          </Card>

          {/* Step 2 - Top Right */}
          <Card className="bg-black border border-gray-900 shadow-xl">
            <CardContent
              className="pt-2 pb-3"
              style={{ marginTop: "8px", padding: "8px 24px 12px" }}
            >
              <h3
                className="text-brand-red text-xs font-black tracking-wide"
                style={{
                  fontWeight: 900,
                  fontSize: "15px",
                  marginBottom: "6px",
                  padding: "8px 0 6px",
                }}
              >
                STEP 2: REFERENCE IMAGE
              </h3>
              <div
                className="border-2 border-dashed border-gray-700 rounded-lg text-center"
                style={{ marginBottom: "8px", padding: "8px 12px" }}
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
          style={{ margin: "18px 0 12px", padding: "12px 0" }}
        >
          <h3
            className="text-brand-red text-lg font-black tracking-wide text-left mb-4 ml-6"
            style={{
              fontWeight: 900,
              paddingTop: "8px",
            }}
          >
            STEP 3: SELECT KEYWORDS
          </h3>
          <CardContent style={{ padding: "0 24px" }}>
            {/* Lighting Section */}
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
      </div>
    </div>
  );
}
