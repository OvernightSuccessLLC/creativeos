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
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    );
    setQualityScore(Math.min(100, selectedKeywords.length * 8 + 20));
  };

  const generatePrompt = () => {
    const basePrompt = customInstructions || "Professional photograph";
    const keywords = selectedKeywords.join(", ");
    return `${basePrompt}${keywords ? `, ${keywords}` : ""}`;
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatePrompt());
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="bg-black border border-gray-800">
              <CardHeader>
                <CardTitle className="text-brand-red text-sm font-bold tracking-wide border-b border-brand-red pb-2">
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
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white mt-2"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-black border border-gray-800">
              <CardHeader>
                <CardTitle className="text-brand-red text-sm font-bold tracking-wide border-b border-brand-red pb-2">
                  STEP 2: REFERENCE IMAGE (OPTIONAL)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 mb-2">
                    Upload reference image for visual context
                  </p>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-black border border-gray-800">
              <CardHeader>
                <CardTitle className="text-brand-red text-sm font-bold tracking-wide border-b border-brand-red pb-2">
                  STEP 3: SELECT KEYWORDS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(keywordCategories).map(
                  ([category, keywords]) => (
                    <div key={category}>
                      <h4 className="text-white font-semibold mb-3">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword) => (
                          <Button
                            key={keyword}
                            variant={
                              selectedKeywords.includes(keyword)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => toggleKeyword(keyword)}
                            className={
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black hover:bg-brand-red-hover"
                                : "border-gray-700 text-white hover:bg-gray-800"
                            }
                          >
                            {keyword}
                            {selectedKeywords.includes(keyword) && (
                              <span className="ml-1">×</span>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            {/* Quality Meter */}
            <Card className="bg-gray-900 border border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-brand-red text-sm font-bold tracking-wide">
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
                <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
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
                    <span>{customInstructions ? "✓" : "○"}</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>Keywords Selected</span>
                    <span>{selectedKeywords.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>Categories Covered</span>
                    <span>
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
            <Card className="bg-black border border-gray-800">
              <CardHeader>
                <CardTitle className="text-brand-red text-sm font-bold tracking-wide border-b border-brand-red pb-2">
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
                    className="bg-brand-red hover:bg-brand-red-hover text-black font-bold flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    COPY FOR SORA
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card className="bg-gray-900 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-brand-red text-sm font-bold tracking-wide">
                  PRO TIPS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    <strong>Structure:</strong> The vault auto-organizes
                    keywords for optimal SORA understanding
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Camera className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    <strong>Images:</strong> Uploaded images become "--reference
                    image" parameters
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    <strong>Keywords:</strong> Click to add, click × to remove
                    selected keywords
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Palette className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    <strong>Quality:</strong> Use the quality meter to optimize
                    your prompt completeness
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
