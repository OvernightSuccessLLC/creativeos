import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Type,
  Layout,
  Layers,
  Brush,
  Grid,
  Image,
} from "lucide-react";

export default function GraphicStudio() {
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Prompt Builder State
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [qualityScore, setQualityScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [designType, setDesignType] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [layoutStyle, setLayoutStyle] = useState("");
  const [typographyStyle, setTypographyStyle] = useState("");
  const [brandTone, setBrandTone] = useState("");

  const keywordCategories = {
    "Design Type": [
      "Logo design",
      "Business card",
      "Poster design",
      "Flyer layout",
      "Social media post",
      "Web banner",
      "Infographic",
      "Presentation slide",
      "Album artwork",
      "Packaging design",
      "T-shirt design",
      "Sticker design",
      "Icon set",
      "Illustration",
      "Digital art",
      "Typography poster",
      "Brand identity",
      "Marketing material",
      "Event poster",
      "Magazine layout",
    ],
    "Typography & Text": [
      "Bold typography",
      "Script font",
      "Sans serif",
      "Serif typeface",
      "Handwritten style",
      "Modern typography",
      "Vintage lettering",
      "Minimalist text",
      "Decorative font",
      "Tech font",
      "Elegant typography",
      "Playful lettering",
      "Industrial font",
      "Organic typography",
      "Geometric letters",
      "Brush script",
      "Stencil font",
      "Outline text",
      "Shadow text",
      "Gradient text",
      "3D typography",
      "Neon text effect",
    ],
    "Color & Style": [
      "Monochromatic",
      "Vibrant colors",
      "Pastel palette",
      "Dark theme",
      "Light theme",
      "High contrast",
      "Gradient colors",
      "Neon colors",
      "Earth tones",
      "Jewel tones",
      "Metallic accents",
      "Black and white",
      "Sepia tone",
      "Color blocking",
      "Analogous colors",
      "Complementary colors",
      "Triadic scheme",
      "Split complementary",
      "Warm colors",
      "Cool colors",
      "Neutral palette",
      "Brand colors",
    ],
    "Layout & Composition": [
      "Grid layout",
      "Asymmetrical design",
      "Symmetrical balance",
      "Minimalist layout",
      "Busy composition",
      "Centered design",
      "Off-center layout",
      "Vertical orientation",
      "Horizontal layout",
      "Square format",
      "Golden ratio",
      "Rule of thirds",
      "Negative space",
      "Layered design",
      "Flat design",
      "Overlapping elements",
      "Floating elements",
      "Border design",
      "Frame layout",
      "Modular grid",
      "Organic layout",
      "Geometric composition",
    ],
    "Visual Elements": [
      "Geometric shapes",
      "Abstract patterns",
      "Line art",
      "Vector graphics",
      "Illustrations",
      "Photography",
      "Texture overlay",
      "Pattern background",
      "Gradient effects",
      "Shadow effects",
      "Glow effects",
      "Blur effects",
      "Transparency",
      "Opacity layers",
      "Masking effects",
      "Clipping paths",
      "3D elements",
      "Isometric design",
      "Flat icons",
      "Detailed icons",
      "Custom graphics",
      "Decorative elements",
    ],
    "Style & Mood": [
      "Professional",
      "Creative",
      "Playful",
      "Sophisticated",
      "Modern",
      "Vintage",
      "Retro",
      "Futuristic",
      "Organic",
      "Industrial",
      "Minimalist",
      "Maximalist",
      "Elegant",
      "Bold",
      "Subtle",
      "Dynamic",
      "Static",
      "Energetic",
      "Calm",
      "Luxurious",
      "Casual",
      "Corporate",
    ],
  };

  // Calculate quality score based on inputs
  const calculateQuality = () => {
    let score = 0;
    if (customInstructions.length > 20) score += 25;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 2;
    if (uploadedFile) score += 15;
    if (designType) score += 10;
    if (colorScheme) score += 10;
    if (layoutStyle) score += 10;
    if (typographyStyle) score += 10;
    if (brandTone) score += 10;
    return Math.min(100, score);
  };

  // Generate the final prompt
  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }
    if (designType) prompt += `${designType} design. `;
    if (brandTone) prompt += `${brandTone} brand tone. `;
    if (colorScheme) prompt += `${colorScheme} color scheme. `;
    if (layoutStyle) prompt += `${layoutStyle} layout. `;
    if (typographyStyle) prompt += `${typographyStyle} typography. `;
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Professional graphic design, high quality, clean composition, modern aesthetics, vector graphics, scalable design, print-ready, SORA video generation optimized.";
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
    designType,
    colorScheme,
    layoutStyle,
    typographyStyle,
    brandTone,
  ]);

  const steps = [
    {
      id: 1,
      title: "Custom Instructions",
      description: "Define your graphic design vision and requirements",
      icon: <Brush className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Design Type & Purpose",
      description: "Select the type of graphic design project",
      icon: <LayoutTemplate className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Brand & Tone",
      description: "Define the brand personality and mood",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Typography & Text",
      description: "Choose font styles and text treatment",
      icon: <Type className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Layout & Composition",
      description: "Structure and arrange visual elements",
      icon: <Layout className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Color & Style",
      description: "Add colors, shapes, and graphic elements",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 7,
      title: "File Upload",
      description: "Upload reference images for your design",
      icon: <Upload className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      <AppNavigation />

      {/* HOW IT WORKS Section */}
      <div className="px-6 mb-8 pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg py-[18px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                "Add Custom Instructions",
                "Choose Design Type",
                "Define Brand & Style",
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
              <Card key={step.id} className="border-black bg-black">
                <CardHeader
                  className="cursor-pointer bg-black"
                  onClick={() =>
                    setActiveStep(activeStep === step.id ? null : step.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-brand-red text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {step.id}
                      </div>
                      <div className="ml-3 text-white text-lg leading-7 -tracking-wide">
                        {step.title}
                      </div>
                    </div>
                    {activeStep === step.id ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </div>
                </CardHeader>

                {activeStep === step.id && (
                  <CardContent className="space-y-4 bg-black">
                    {step.id === 1 && (
                      <div>
                        <Label htmlFor="instructions" className="text-white">
                          Describe your graphic design project
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="A modern logo design for a tech startup, incorporating clean lines and innovative typography with a professional yet approachable feel..."
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
                        <div></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {keywordCategories["Design Type"].map((keyword) => (
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
                      <div className="space-y-4">
                        <div></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {keywordCategories["Style & Mood"].map((keyword) => (
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

                    {step.id === 4 && (
                      <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Typography & Text"].map(
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Layout & Composition"].map(
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

                    {step.id === 6 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-white"></Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {keywordCategories["Color & Style"].map(
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
                      </div>
                    )}

                    {step.id === 7 && (
                      <div>
                        <Label htmlFor="file-upload" className="text-white">
                          Upload Reference Image
                        </Label>
                        <label
                          htmlFor="file-upload"
                          className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2 cursor-pointer hover:border-brand-red transition-colors"
                        >
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-4">
                            <span className="mt-2 block text-sm font-medium text-white">
                              {uploadedFile
                                ? `Replace: ${uploadedFile.name}`
                                : "Click to upload or drag and drop"}
                            </span>
                            <span className="text-xs text-gray-400 mt-1 block">
                              PNG, JPG, GIF up to 10MB
                            </span>
                          </div>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept="image/*"
                          />
                          {uploadedFile && (
                            <div className="mt-4 text-sm text-green-400">
                              ✓ Uploaded: {uploadedFile.name} (
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          )}
                        </label>
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
                      • Specify brand guidelines for consistency
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Add color codes for exact matching
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Include dimensions for proper scaling
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
