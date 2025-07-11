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
  ChevronRight,
} from "lucide-react";

export default function PromptVault() {
  const navigate = useNavigate();
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [qualityScore, setQualityScore] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const keywordCategories = {
    Lighting: [
      "Golden hour",
      "Soft lighting",
      "Natural light",
      "Studio lighting",
      "Dramatic lighting",
      "Backlighting",
      "Rim lighting",
      "Ambient lighting",
      "Hard shadows",
      "Diffused light",
      "Warm lighting",
      "Cool lighting",
      "Neon lighting",
      "Candlelight",
      "Sunlight",
      "Moonlight",
    ],
    Framing: [
      "Close-up",
      "Wide shot",
      "Medium shot",
      "Extreme close-up",
      "Bird's eye view",
      "Low angle",
      "High angle",
      "Eye level",
      "Dutch angle",
      "Over shoulder",
      "Point of view",
      "Establishing shot",
      "Master shot",
      "Two shot",
      "Profile shot",
      "Full body",
    ],
    Locations: [
      "Studio",
      "Outdoor",
      "Urban",
      "Nature",
      "Indoor",
      "Minimalist background",
      "Textured background",
      "Gradient background",
      "White background",
      "Black background",
      "Colored background",
      "Patterned background",
      "Blurred background",
      "Sharp background",
      "Clean background",
      "Busy background",
    ],
  };

  const enhancedKeywordCategories = {
    Style: [
      "Minimalist",
      "Modern",
      "Vintage",
      "Retro",
      "Contemporary",
      "Classic",
      "Futuristic",
      "Industrial",
      "Organic",
      "Geometric",
      "Abstract",
      "Realistic",
      "Stylized",
      "Artistic",
      "Commercial",
      "Editorial",
    ],
    "Creative Direction": [
      "Lifestyle",
      "Luxury",
      "Casual",
      "Professional",
      "Playful",
      "Serious",
      "Dynamic",
      "Static",
      "Energetic",
      "Calm",
      "Bold",
      "Subtle",
      "Colorful",
      "Monochrome",
      "High contrast",
      "Low contrast",
    ],
    Modifiers: [
      "High resolution",
      "4K",
      "8K",
      "Ultra HD",
      "Sharp focus",
      "Shallow depth",
      "Deep focus",
      "Bokeh",
      "Crisp details",
      "Soft focus",
      "Motion blur",
      "Crystal clear",
      "Professional grade",
      "Commercial quality",
      "Award winning",
      "Masterpiece",
    ],
  };

  const calculateQuality = () => {
    let score = 0;
    if (customInstructions.length > 20) score += 30;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 3;
    if (uploadedFile) score += 25;
    return Math.min(100, score);
  };

  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt += "Professional photography, high quality, detailed.";
    return prompt;
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const copyPrompt = async () => {
    const prompt = generatePrompt();

    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt);
        // Show visual feedback that copy was successful
        const button = document.querySelector("[data-copy-button]");
        if (button) {
          const originalText = button.textContent;
          button.textContent = "COPIED!";
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }
        return;
      }

      // Fallback to the older method
      const textArea = document.createElement("textarea");
      textArea.value = prompt;

      // Make the textarea invisible
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        // Show visual feedback that copy was successful
        const button = document.querySelector("[data-copy-button]");
        if (button) {
          const originalText = button.textContent;
          button.textContent = "COPIED!";
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }
      } else {
        throw new Error("Copy command was unsuccessful");
      }
    } catch (err) {
      console.error("Failed to copy prompt: ", err);

      // Last resort: show the text for manual copying
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        );

      if (isMobile) {
        alert(`Copy this prompt manually:\n\n${prompt}`);
      } else {
        alert(
          "Automatic copying failed. Please manually copy the text from the prompt area.",
        );
      }
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#F93822" }}
    >
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* HOW IT WORKS Section */}
      <div className="border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white/60 text-xs font-bold tracking-wide mb-4">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  Add Custom Instructions
                </div>
                <div className="text-white/60 text-xs">
                  Start with your specific requirements
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  Select Categories
                </div>
                <div className="text-white/60 text-xs">
                  Choose options from each category
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  Upload Reference Files
                </div>
                <div className="text-white/60 text-xs">
                  Add images (optional)
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  Review Quality
                </div>
                <div className="text-white/60 text-xs">
                  Check AI analysis and suggestions
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-4">
            <span className="text-brand-red text-xs font-bold">STEP 1/5</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Steps */}
        <div className="lg:col-span-2 space-y-3">
          {/* Step 1: Custom Instructions */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
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
                  placeholder="Describe exactly what you want to create..."
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
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
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
                <div className="flex flex-wrap gap-2">
                  {enhancedKeywordCategories.Style.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black"
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

          {/* Step 3: Background Setting */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
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
                <div className="flex flex-wrap gap-2">
                  {keywordCategories.Locations.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black"
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

          {/* Step 4: Lighting Setup */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 4 ? null : 4)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
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
                  {keywordCategories.Lighting.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black"
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
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
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
                  {keywordCategories.Framing.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black"
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

          {/* Step 6: Visual Elements */}
          <div className="bg-black rounded-lg border border-white/10">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 transition-colors"
              onClick={() => setActiveStep(activeStep === 6 ? null : 6)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-black flex items-center justify-center text-sm font-bold">
                  6
                </div>
                <span className="text-white font-medium">Visual Elements</span>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${activeStep === 6 ? "rotate-90" : ""}`}
              />
            </div>
            {activeStep === 6 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {enhancedKeywordCategories.Modifiers.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedKeywords.includes(keyword)
                          ? "bg-brand-red text-black"
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
              <Badge className="bg-brand-red text-black text-xs font-bold">
                {calculateQuality()}% QUALITY
              </Badge>
            </div>

            <div className="mb-6">
              <div className="bg-black rounded p-4 min-h-[120px] border border-white/10">
                <p className="text-white/70 text-sm">
                  {generatePrompt() ||
                    "Add custom instructions and select from categorized keywords to build your SORA AI formula."}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-brand-red text-xs font-bold mb-3">
                AI RECOMMENDATIONS
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Add more selections for better SORA output</li>
                <li>• Custom instructions help SORA understand your vision</li>
                <li>• Logo files help SORA incorporate brand elements</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={copyPrompt}
                data-copy-button
                className="w-full bg-brand-red hover:bg-brand-red/90 text-black font-bold"
              >
                <Copy className="w-4 h-4 mr-2" />
                COPY
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <Star className="w-4 h-4 mr-2" />
                FAVORITE
              </Button>
            </div>

            {/* Upload Section */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white font-medium mb-3 text-sm">
                Upload Reference
              </h4>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 text-white/40 mx-auto mb-2" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="bg-transparent border-0 text-white text-xs"
                />
                {uploadedFile && (
                  <p className="text-brand-red mt-2 text-xs">
                    ✓ {uploadedFile.name} uploaded
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
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
