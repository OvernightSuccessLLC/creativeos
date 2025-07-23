import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BriefcaseModal from "@/components/BriefcaseModal";
import AppNavigation from "@/components/AppNavigation";
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
  Box,
  Lightbulb,
  Eye,
  Settings,
} from "lucide-react";

export default function ProductStudio() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Prompt Builder State
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [qualityScore, setQualityScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [productType, setProductType] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState("");
  const [lightingSetup, setLightingSetup] = useState("");
  const [cameraAngle, setCameraAngle] = useState("");

  const keywordCategories = {
    "Intended Use": [
      "E-commerce",
      "Product Hero Shot",
      "Social Media Ad",
      "Floating Product",
      "Web Banner",
      "Explainer",
      "Before/After",
      "Mock-up",
      "Subscription Box",
      "Unboxing",
      "Social Media Post",
      "Infographic",
      "Digital Banner",
      "Web Graphic",
      "Email Header",
      "Poster",
      "Flyer",
      "Thumbnail",
      "Branding Element",
      "Sticker Design",
      "Advertising",
      "Promotion",
      "Typography Art",
      "Logo Design",
    ],
    "Background Setting": [
      "White background",
      "Black background",
      "Gray background",
      "Colored backdrop",
      "Textured surface",
      "Wood surface",
      "Marble surface",
      "Concrete surface",
      "Metal surface",
      "Glass surface",
      "Fabric background",
      "Paper backdrop",
      "Studio setup",
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
    if (customInstructions && customInstructions.length > 20) score += 25;
    if (selectedKeywords && selectedKeywords.length > 0)
      score += Math.min(selectedKeywords.length * 2, 30);
    if (uploadedFile) score += 15;
    if (productType && productType.trim()) score += 10;
    if (backgroundStyle && backgroundStyle.trim()) score += 10;
    if (lightingSetup && lightingSetup.trim()) score += 10;
    if (cameraAngle && cameraAngle.trim()) score += 10;
    return Math.min(100, score);
  };

  // Generate the final prompt
  const generatePrompt = () => {
    let prompt = "";

    if (customInstructions && customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }

    if (productType && productType.trim()) {
      prompt += `${productType.trim()} product. `;
    }

    if (backgroundStyle && backgroundStyle.trim()) {
      prompt += `${backgroundStyle.trim()}. `;
    }

    if (lightingSetup && lightingSetup.trim()) {
      prompt += `${lightingSetup.trim()}. `;
    }

    if (cameraAngle && cameraAngle.trim()) {
      prompt += `${cameraAngle.trim()}. `;
    }

    if (selectedKeywords && selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }

    if (!prompt.trim()) {
      return "Start building your prompt by filling out the steps...";
    }

    prompt +=
      "Product photography, commercial quality, professional lighting, clean composition, high resolution, detailed, realistic, SORA video generation optimized.";

    return prompt.trim();
  };

  // Copy to clipboard with enhanced fallback
  const copyPrompt = async () => {
    const text = generatePrompt();

    // Enhanced legacy copy method
    const legacyCopy = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        textArea.setAttribute("readonly", "");

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          setCopiedPrompt(true);
          setTimeout(() => setCopiedPrompt(false), 2000);
          return true;
        }
        return false;
      } catch (err) {
        console.warn("Legacy copy failed:", err);
        return false;
      }
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
        return;
      }
    } catch (err) {
      if (
        err instanceof DOMException &&
        (err.name === "NotAllowedError" ||
          err.name === "SecurityError" ||
          err.message.includes("permissions policy"))
      ) {
        console.warn(
          "Clipboard API blocked by permissions policy, using fallback",
        );
      } else {
        console.warn("Clipboard API failed, using fallback:", err);
      }

      if (legacyCopy()) return;
    }

    // If clipboard API not available, try legacy method
    if (legacyCopy()) return;

    // Final fallback - show prompt in alert
    try {
      alert(`COPY THIS PROMPT:\n\n${text}`);
    } catch (finalErr) {
      console.error("All copy methods failed:", finalErr);
    }
  };

  // Toggle keyword selection
  const toggleKeyword = (keyword: string) => {
    if (!keyword || typeof keyword !== "string") {
      console.error("Invalid keyword:", keyword);
      return;
    }

    setSelectedKeywords((prev) => {
      const currentKeywords = Array.isArray(prev) ? prev : [];
      const isSelected = currentKeywords.includes(keyword);

      if (isSelected) {
        return currentKeywords.filter((k) => k !== keyword);
      } else {
        return [...currentKeywords, keyword];
      }
    });
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        console.error("Please select an image file");
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        console.error("File size too large. Please select a file under 10MB");
        return;
      }

      setUploadedFile(file);
      console.log("File uploaded successfully:", file.name);
    }
  };

  // Update quality score when inputs change
  useEffect(() => {
    setQualityScore(calculateQuality());
  }, [
    customInstructions,
    selectedKeywords,
    uploadedFile,
    productType,
    backgroundStyle,
    lightingSetup,
    cameraAngle,
  ]);

  const steps = [
    {
      id: 1,
      title: "Custom Instructions",
      description: "Define your product photography vision and requirements",
      icon: <Box className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "File Upload",
      description: "Upload reference images for your product",
      icon: <Upload className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Intended Use",
      description: "Select the intended use and application type",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Background Setting",
      description: "Choose the background and environment",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Lighting Setup",
      description: "Configure professional lighting approach",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Camera Angle",
      description: "Set the camera perspective and composition",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      id: 7,
      title: "Enhancers",
      description: "Fine-tune visual style and product categories",
      icon: <Eye className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      <AppNavigation />

      {/* HOW IT WORKS Section */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg py-3 px-4 sm:px-6 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {[
                "Add Custom Instructions",
                "Select Categories",
                "Upload Reference Files",
                "Review Quality",
                "Copy for SORA",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-brand-red text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mb-2">
                    {index + 1}
                  </div>
                  <p className="text-white text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Steps */}
          <div className="xl:col-span-2 space-y-3 sm:space-y-4">
            {steps.map((step) => (
              <Card key={step.id} className="border-black bg-black">
                <CardHeader
                  className="cursor-pointer bg-black p-4 sm:p-6"
                  onClick={() =>
                    setActiveStep(activeStep === step.id ? null : step.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <div className="bg-brand-red text-black rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                        {step.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-lg text-white truncate">
                          {step.title}
                        </CardTitle>
                        <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {activeStep === step.id ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>

                {activeStep === step.id && (
                  <CardContent className="space-y-3 sm:space-y-4 bg-black p-4 sm:p-6">
                    {step.id === 1 && (
                      <div>
                        <Textarea
                          id="instructions"
                          placeholder="A sleek modern smartphone positioned at a dynamic angle on a clean white background, showcasing its premium metallic finish and elegant design..."
                          value={customInstructions}
                          onChange={(e) =>
                            setCustomInstructions(e.target.value)
                          }
                          className="mt-1 text-sm sm:text-base"
                          rows={3}
                          style={{ minHeight: "100px" }}
                        />
                      </div>
                    )}

                    {step.id === 2 && (
                      <div>
                        <label
                          htmlFor="file-upload"
                          className="block border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center mt-2 cursor-pointer hover:border-brand-red transition-colors touch-manipulation"
                        >
                          <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                          <div className="mt-3 sm:mt-4">
                            <span className="mt-2 block text-sm sm:text-base font-medium text-white">
                              {uploadedFile ? `Replace: ${uploadedFile.name}` : "Click to upload or drag and drop"}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
                              PNG, JPG, GIF up to 10MB
                            </span>
                          </div>
                          <Input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                            accept="image/*"
                          />
                          {uploadedFile && (
                            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-400">
                              ✓ Uploaded: {uploadedFile.name} (
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          )}
                        </label>
                      </div>
                    )}

                    {step.id === 3 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {keywordCategories["Intended Use"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                            style={{ minHeight: "44px" }}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 4 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {keywordCategories["Background Setting"].map(
                          (keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                              }`}
                              style={{ minHeight: "44px" }}
                            >
                              {keyword}
                            </button>
                          ),
                        )}
                      </div>
                    )}

                    {step.id === 5 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {keywordCategories["Lighting Setup"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                            style={{ minHeight: "44px" }}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 6 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {keywordCategories["Camera Angle"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                            style={{ minHeight: "44px" }}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 7 && (
                      <div>
                        <Label className="text-white text-sm sm:text-base">Product Categories</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
                          {keywordCategories["Product Categories"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                                  selectedKeywords.includes(keyword)
                                    ? "bg-brand-red text-black"
                                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                                }`}
                                style={{ minHeight: "44px" }}
                              >
                                {keyword}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Right Column - AI Prompt Formula */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-black xl:sticky xl:top-6">
              <CardHeader className="bg-black py-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl text-white mb-3">
                  AI Prompt Formula
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="text-lg sm:text-xl font-bold text-white min-w-[3rem]">
                    {qualityScore}%
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2 sm:h-3">
                      <div
                        className="bg-brand-red h-2 sm:h-3 rounded-full transition-all duration-500"
                        style={{ width: `${qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 bg-black px-4 sm:px-6 pb-6">
                <div>
                  <Label className="text-white text-sm font-medium">
                    Generated Prompt
                  </Label>
                  <div className="bg-gray-50 p-3 rounded border text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] mt-2">
                    {generatePrompt() ||
                      "Start building your prompt by filling out the steps..."}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-white">
                      <span>Instructions</span>
                      <span className="font-medium">
                        {customInstructions.length > 20 ? "25%" : "0%"}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{
                          width: customInstructions.length > 20 ? "100%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-white">
                      <span>Keywords</span>
                      <span className="font-medium">
                        {Math.min(50, selectedKeywords.length * 2)}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, selectedKeywords.length * 4)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-white">
                      <span>Reference</span>
                      <span className="font-medium">
                        {uploadedFile ? "15%" : "0%"}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: uploadedFile ? "100%" : "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={copyPrompt}
                  className="w-full bg-brand-red text-white hover:bg-red-600 font-medium text-sm sm:text-base py-2.5 sm:py-3 mt-4"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedPrompt ? "COPIED!" : "COPY"}
                </Button>

                <div className="text-sm mt-4">
                  <h4 className="font-semibold text-white my-1 py-1">
                    <span className="text-brand-red">AI RECOMMENDATIONS</span>
                  </h4>
                  <ul className="text-gray-600">
                    <li className="text-white font-semibold mt-1">
                      • Ensure lighting matches brand aesthetic
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Add multiple angles for completeness
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Include brand guidelines context
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showBriefcase && (
        <BriefcaseModal
          isOpen={showBriefcase}
          onClose={() => setShowBriefcase(false)}
          onNavigate={(path) => {
            navigate(path);
            setShowBriefcase(false);
          }}
        />
      )}
    </div>
  );
}
