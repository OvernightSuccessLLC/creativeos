import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Settings,
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
  const [primaryColorPantone, setPrimaryColorPantone] = useState("");
  const [typographyIntegration, setTypographyIntegration] = useState("");

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
    "Theme": [
      "80's Vintage",
      "80s VHS grain",
      "90's Photography",
      "Acrylic Inspired",
      "Black & White",
      "Black Magic Camera",
      "Disposable Film",
      "Editorial",
      "Expert Level Quality",
      "Film Shoot",
      "Futuristic",
      "Geometric Fragments",
      "Halftone Pattern",
      "Illustrated Scene",
      "Lifestyle Centric",
      "Light Gradient Theme",
      "Luxury",
      "Macro Detail",
      "Magazine Quality",
      "Metallic",
      "Minimalist",
      "Neon",
      "Pastel Gradients",
      "Polaroid Photography",
      "Premium",
      "Product-Centric",
      "Red Cam",
      "Reflective Mirro",
      "Remix Reference Image",
      "Social Media Ad",
      "Subtle Neon",
      "Tie Dye",
      "Trippy",
      "Upscale Reference Image",
      "Y2K",
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
      "Corporate",
    ],
    "Background Setting": [
      "Black Void",
      "Concrete",
      "Flannel Pattern",
      "Flash Lit Set",
      "Geometric Shapes",
      "Gold",
      "Gradient Colors",
      "Greenscreen",
      "Marble",
      "Mirrors",
      "Natural Texture",
      "Neon Glow",
      "Oil Projector",
      "Pink Gradient's",
      "Pure White",
      "Sharp Black",
      "Silver Shine",
      "Static",
      "Studio Backdrop",
      "Tie Dye",
      "Transparent Glass",
      "Vintage WallPaper",
      "Wood Grain",
    ],
    "Typography Integration": [
      "Helvetica",
      "Arial",
      "Times New Roman",
      "Georgia",
      "Futura",
      "Proxima Nova",
      "Montserrat",
      "Open Sans",
      "Roboto",
      "Lato",
      "Source Sans Pro",
      "Poppins",
      "Playfair Display",
      "Merriweather",
      "Oswald",
      "Raleway",
      "Ubuntu",
      "Nunito",
      "Inter",
      "Work Sans",
      "Cabin",
      "Crimson Text",
      "Libre Baskerville",
      "PT Sans",
      "Droid Sans",
      "Titillium Web",
      "Lora",
      "Fira Sans",
      "Source Serif Pro",
      "Rubik",
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
    if (primaryColorPantone && primaryColorPantone.trim()) score += 5;
    if (typographyIntegration && typographyIntegration.trim()) score += 5;
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
    if (primaryColorPantone && primaryColorPantone.trim()) {
      prompt += `Primary color: ${primaryColorPantone.trim()}. `;
    }
    if (typographyIntegration && typographyIntegration.trim()) {
      prompt += `Typography: ${typographyIntegration.trim()}. `;
    }
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Professional graphic design, high quality, clean composition, modern aesthetics, vector graphics, scalable design, print-ready, SORA video generation optimized.";
    return prompt;
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
    designType,
    colorScheme,
    layoutStyle,
    typographyStyle,
    brandTone,
    primaryColorPantone,
    typographyIntegration,
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
      title: "Design Purpose",
      description: "Select the type of graphic design project",
      icon: <LayoutTemplate className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Typography",
      description: "Choose font styles and text treatment",
      icon: <Type className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Layout & Composition",
      description: "Structure and arrange visual elements",
      icon: <Layout className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Color & Style",
      description: "Add colors, shapes, and graphic elements",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Background Setting",
      description: "Choose background style and texture",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: 7,
      title: "Theme",
      description: "Select visual style and aesthetic theme",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: 8,
      title: "File Upload",
      description: "Upload reference images for your design",
      icon: <Upload className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      <AppNavigation />

      {/* HOW IT WORKS Section */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8 pt-2 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg py-4 px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
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
                  <div className="bg-brand-red text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-base mb-2 sm:mb-3">
                    {index + 1}
                  </div>
                  <p className="text-white text-xs sm:text-sm leading-tight">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Left Column - Steps */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 order-2 lg:order-1">
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
                      <div className="min-w-0 flex-1 text-white text-sm sm:text-lg leading-tight sm:leading-7 -tracking-wide truncate">
                        {step.title}
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
                        <Label htmlFor="instructions" className="text-white text-sm sm:text-base">
                          Describe your graphic design project
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="A modern logo design for a tech startup, incorporating clean lines and innovative typography with a professional yet approachable feel..."
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
                      <div className="space-y-3 sm:space-y-4">
                        <div></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                          {keywordCategories["Design Type"].map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-3 py-3 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] text-center ${
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                          {keywordCategories["Typography & Text"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-3 py-3 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] text-center ${
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                          {keywordCategories["Layout & Composition"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-3 py-3 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] text-center ${
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
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <Label className="text-white text-sm sm:text-base"></Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-2">
                            {keywordCategories["Color & Style"].map(
                              (keyword) => (
                                <button
                                  key={keyword}
                                  onClick={() => toggleKeyword(keyword)}
                                  className={`px-3 py-3 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] text-center ${
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

                    {step.id === 6 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3 sm:mt-4">
                          {keywordCategories["Background Setting"].map(
                            (keyword) => (
                              <button
                                key={keyword}
                                onClick={() => toggleKeyword(keyword)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                                  selectedKeywords.includes(keyword)
                                    ? "bg-brand-red text-black"
                                    : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
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

                    {step.id === 7 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3 sm:mt-4">
                          {keywordCategories["Theme"].map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 touch-manipulation ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                              }`}
                              style={{ minHeight: "44px" }}
                            >
                              {keyword}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.id === 8 && (
                      <div>
                        <Label htmlFor="file-upload" className="text-white text-sm sm:text-base">
                          Upload Reference Image
                        </Label>
                        <label
                          htmlFor="file-upload"
                          className="block border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center mt-2 cursor-pointer hover:border-brand-red transition-colors touch-manipulation"
                        >
                          <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                          <div className="mt-3 sm:mt-4">
                            <span className="mt-2 block text-sm sm:text-base font-medium text-white">
                              {uploadedFile
                                ? `Replace: ${uploadedFile.name}`
                                : "Click to upload or drag and drop"}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
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
                            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-green-400">
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
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <Card className="border-black lg:sticky lg:top-6">
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
                      �� Add color codes for exact matching
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
