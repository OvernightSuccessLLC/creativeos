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
    "Product Style": [
      "Professional",
      "Commercial",
      "E-commerce",
      "Catalog",
      "Marketing",
      "Advertising",
      "Premium",
      "Luxury",
      "Minimal",
      "Clean",
      "Modern",
      "Elegant",
      "Sophisticated",
      "High-end",
      "Boutique",
      "Artisanal",
      "Tech",
      "Fashion",
      "Beauty",
      "Lifestyle",
      "Industrial",
      "Organic",
      "Natural",
      "Vintage",
      "Retro",
      "Contemporary",
      "Sleek",
      "Bold",
      "Subtle",
      "Dramatic",
    ],
    "Background Setting": [
      "White background",
      "Black background",
      "Gray background",
      "Colored backdrop",
      "Gradient background",
      "Textured surface",
      "Wood surface",
      "Marble surface",
      "Concrete surface",
      "Metal surface",
      "Glass surface",
      "Fabric background",
      "Paper backdrop",
      "Studio setup",
      "Infinity curve",
      "Seamless paper",
      "Natural environment",
      "Outdoor setting",
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
      "Workshop bench",
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
    if (customInstructions.length > 20) score += 25;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 2;
    if (uploadedFile) score += 15;
    if (productType) score += 10;
    if (backgroundStyle) score += 10;
    if (lightingSetup) score += 10;
    if (cameraAngle) score += 10;
    return Math.min(100, score);
  };

  // Generate the final prompt
  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }
    if (productType) prompt += `${productType} product. `;
    if (backgroundStyle) prompt += `${backgroundStyle}. `;
    if (lightingSetup) prompt += `${lightingSetup}. `;
    if (cameraAngle) prompt += `${cameraAngle}. `;
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Product photography, commercial quality, professional lighting, clean composition, high resolution, detailed, realistic, SORA video generation optimized.";
    return prompt;
  };

  // Copy to clipboard with fallback
  const copyPrompt = async () => {
    const text = generatePrompt();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
        return;
      }
    } catch (err) {
      console.warn("Clipboard API failed, using fallback:", err);
    }

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
      title: "Product Style",
      description: "Select the product type and style approach",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Background Setting",
      description: "Choose the background and environment",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Lighting Setup",
      description: "Configure professional lighting approach",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Camera Angle",
      description: "Set the camera perspective and composition",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Visual Elements",
      description: "Fine-tune visual style and product categories",
      icon: <Eye className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Top Navigation Bar */}
      <nav className="bg-black px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-brand-red font-bold text-lg">LOGO</div>
          <div className="flex items-center space-x-1">
            <button className="bg-black text-white px-4 py-2 rounded text-sm font-bold">
              PRODUCT STUDIO
            </button>
            <button
              onClick={() => navigate("/lifestyle-studio")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              LIFESTYLE STUDIO
            </button>
            <button
              onClick={() => navigate("/graphic-studio")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              GRAPHIC STUDIO
            </button>
            <button
              onClick={() => setShowBriefcase(true)}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              THE BRIEFCASE
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ?
            </div>
            <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ♀
            </div>
            <button className="text-white text-sm font-medium hover:bg-white/10 px-3 py-1 rounded">
              RESET
            </button>
          </div>
        </div>
      </nav>

      {/* Studio Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-5xl font-bold text-black mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            PRODUCT STUDIO
          </h1>
          <p
            className="text-black text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Create stunning product visuals and e-commerce content
          </p>
        </div>
      </div>

      {/* HOW IT WORKS Section */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-6">HOW IT WORKS</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Steps */}
          <div className="lg:col-span-2 space-y-4">
            {steps.map((step) => (
              <Card key={step.id} className="border-black">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() =>
                    setActiveStep(activeStep === step.id ? null : step.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-brand-red text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {step.id}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        activeStep === step.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </CardHeader>

                {activeStep === step.id && (
                  <CardContent className="space-y-4">
                    {step.id === 1 && (
                      <div>
                        <Label htmlFor="instructions">
                          Describe your product photography vision
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="A sleek modern smartphone positioned at a dynamic angle on a clean white background, showcasing its premium metallic finish and elegant design..."
                          value={customInstructions}
                          onChange={(e) =>
                            setCustomInstructions(e.target.value)
                          }
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    )}

                    {step.id === 2 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="product-type">Product Type</Label>
                          <select
                            id="product-type"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          >
                            <option value="">Select product type...</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion accessories">
                              Fashion accessories
                            </option>
                            <option value="Beauty products">
                              Beauty products
                            </option>
                            <option value="Home goods">Home goods</option>
                            <option value="Kitchen items">Kitchen items</option>
                            <option value="Tech gadgets">Tech gadgets</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Watches">Watches</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {keywordCategories["Product Style"].map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                              }`}
                            >
                              {keyword}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.id === 3 && (
                      <div>
                        <Label htmlFor="background">Background Style</Label>
                        <select
                          id="background"
                          value={backgroundStyle}
                          onChange={(e) => setBackgroundStyle(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select background...</option>
                          <option value="Clean white background">
                            Clean white background
                          </option>
                          <option value="Dramatic black background">
                            Dramatic black background
                          </option>
                          <option value="Neutral gray backdrop">
                            Neutral gray backdrop
                          </option>
                          <option value="Textured surface">
                            Textured surface
                          </option>
                          <option value="Wood surface">Wood surface</option>
                          <option value="Marble surface">Marble surface</option>
                          <option value="Lifestyle context">
                            Lifestyle context
                          </option>
                          <option value="Studio setup">Studio setup</option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Background Setting"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                  selectedKeywords.includes(keyword)
                                    ? "bg-brand-red text-black"
                                    : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                                }`}
                              >
                                {keyword}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {step.id === 4 && (
                      <div>
                        <Label htmlFor="lighting">Lighting Setup</Label>
                        <select
                          id="lighting"
                          value={lightingSetup}
                          onChange={(e) => setLightingSetup(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select lighting...</option>
                          <option value="Professional studio lighting">
                            Professional studio lighting
                          </option>
                          <option value="Soft diffused lighting">
                            Soft diffused lighting
                          </option>
                          <option value="Dramatic side lighting">
                            Dramatic side lighting
                          </option>
                          <option value="Even key and fill">
                            Even key and fill
                          </option>
                          <option value="Natural window light">
                            Natural window light
                          </option>
                          <option value="High key bright">
                            High key bright
                          </option>
                          <option value="Low key moody">Low key moody</option>
                          <option value="Three-point setup">
                            Three-point setup
                          </option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Lighting Setup"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                  selectedKeywords.includes(keyword)
                                    ? "bg-brand-red text-black"
                                    : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                                }`}
                              >
                                {keyword}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {step.id === 5 && (
                      <div>
                        <Label htmlFor="camera">Camera Angle</Label>
                        <select
                          id="camera"
                          value={cameraAngle}
                          onChange={(e) => setCameraAngle(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select camera angle...</option>
                          <option value="Front hero view">
                            Front hero view
                          </option>
                          <option value="Three-quarter angle">
                            Three-quarter angle
                          </option>
                          <option value="Top down flat lay">
                            Top down flat lay
                          </option>
                          <option value="Diagonal composition">
                            Diagonal composition
                          </option>
                          <option value="Close-up detail shot">
                            Close-up detail shot
                          </option>
                          <option value="Wide product shot">
                            Wide product shot
                          </option>
                          <option value="Lifestyle in-use">
                            Lifestyle in-use
                          </option>
                          <option value="Macro detail">Macro detail</option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Camera Angle"].map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                              }`}
                            >
                              {keyword}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.id === 6 && (
                      <div className="space-y-6">
                        <div>
                          <Label>Product Categories</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {keywordCategories["Product Categories"].map(
                              (keyword) => (
                                <button
                                  key={keyword}
                                  onClick={() => toggleKeyword(keyword)}
                                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                    selectedKeywords.includes(keyword)
                                      ? "bg-brand-red text-black"
                                      : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                                  }`}
                                >
                                  {keyword}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="file-upload">
                            Upload Reference Image
                          </Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <Label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                              >
                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                  Click to upload or drag and drop
                                </span>
                              </Label>
                              <Input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileUpload}
                                accept="image/*"
                              />
                            </div>
                            {uploadedFile && (
                              <div className="mt-4 text-sm text-gray-600">
                                Uploaded: {uploadedFile.name} (
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Right Column - AI Prompt Formula */}
          <div className="space-y-6">
            <Card className="border-black sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">AI Prompt Formula</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{qualityScore}%</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-brand-red h-2 rounded-full transition-all duration-500"
                        style={{ width: `${qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Generated Prompt</Label>
                  <div className="bg-gray-50 p-3 rounded border text-sm min-h-[100px] mt-1">
                    {generatePrompt() ||
                      "Start building your prompt by filling out the steps..."}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Instructions</span>
                    <span className="font-medium">
                      {customInstructions.length > 20 ? "25%" : "0%"}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-500 h-1 rounded-full transition-all"
                      style={{
                        width: customInstructions.length > 20 ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Keywords</span>
                    <span className="font-medium">
                      {Math.min(50, selectedKeywords.length * 2)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, selectedKeywords.length * 4)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reference</span>
                    <span className="font-medium">
                      {uploadedFile ? "15%" : "0%"}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-purple-500 h-1 rounded-full transition-all"
                      style={{ width: uploadedFile ? "100%" : "0%" }}
                    ></div>
                  </div>
                </div>

                <Button
                  onClick={copyPrompt}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedPrompt ? "COPIED!" : "COPY"}
                </Button>

                <div className="text-sm">
                  <h4 className="font-semibold mb-2">AI RECOMMENDATIONS</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Consider product scale and proportions</li>
                    <li>• Ensure lighting matches brand aesthetic</li>
                    <li>• Add multiple angles for completeness</li>
                    <li>• Include brand guidelines context</li>
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
