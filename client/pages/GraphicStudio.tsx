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
  Type,
  Layout,
  Layers,
  Brush,
  Grid,
  Image,
} from "lucide-react";

export default function GraphicStudio() {
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
      "Brochure design",
      "Social media post",
      "Web banner",
      "Infographic",
      "Presentation slide",
      "Book cover",
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
      title: "Visual Elements",
      description: "Add colors, shapes, and graphic elements",
      icon: <Layers className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Top Navigation Bar */}
      <nav className="bg-black px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-brand-red font-bold text-lg">LOGO</div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigate("/")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              PRODUCT STUDIO
            </button>
            <button
              onClick={() => navigate("/lifestyle-studio")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              LIFESTYLE STUDIO
            </button>
            <button className="bg-black text-white px-4 py-2 rounded text-sm font-bold">
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
            GRAPHIC STUDIO
          </h1>
          <p
            className="text-black text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Design compelling graphics and professional visual content
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
              <Card key={step.id} className="border-black">
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
                      <div>
                        <CardTitle className="text-lg text-white">
                          {step.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
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
                        <div>
                          <Label htmlFor="design-type" className="text-white">
                            Design Type
                          </Label>
                          <select
                            id="design-type"
                            value={designType}
                            onChange={(e) => setDesignType(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          >
                            <option value="">Select design type...</option>
                            <option value="Logo design">Logo design</option>
                            <option value="Brand identity">
                              Brand identity
                            </option>
                            <option value="Marketing materials">
                              Marketing materials
                            </option>
                            <option value="Social media graphics">
                              Social media graphics
                            </option>
                            <option value="Web graphics">Web graphics</option>
                            <option value="Print design">Print design</option>
                            <option value="Illustration">Illustration</option>
                            <option value="Typography design">
                              Typography design
                            </option>
                          </select>
                        </div>
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
                        <div>
                          <Label htmlFor="brand-tone" className="text-white">
                            Brand Tone
                          </Label>
                          <select
                            id="brand-tone"
                            value={brandTone}
                            onChange={(e) => setBrandTone(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          >
                            <option value="">Select brand tone...</option>
                            <option value="Professional and corporate">
                              Professional and corporate
                            </option>
                            <option value="Creative and artistic">
                              Creative and artistic
                            </option>
                            <option value="Fun and playful">
                              Fun and playful
                            </option>
                            <option value="Luxury and premium">
                              Luxury and premium
                            </option>
                            <option value="Modern and tech-forward">
                              Modern and tech-forward
                            </option>
                            <option value="Traditional and classic">
                              Traditional and classic
                            </option>
                            <option value="Friendly and approachable">
                              Friendly and approachable
                            </option>
                            <option value="Bold and edgy">Bold and edgy</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="color-scheme" className="text-white">
                            Color Scheme
                          </Label>
                          <select
                            id="color-scheme"
                            value={colorScheme}
                            onChange={(e) => setColorScheme(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          >
                            <option value="">Select color scheme...</option>
                            <option value="Monochromatic">Monochromatic</option>
                            <option value="Vibrant and colorful">
                              Vibrant and colorful
                            </option>
                            <option value="Minimal and neutral">
                              Minimal and neutral
                            </option>
                            <option value="Black and white">
                              Black and white
                            </option>
                            <option value="Pastel colors">Pastel colors</option>
                            <option value="Bold and high contrast">
                              Bold and high contrast
                            </option>
                            <option value="Earth tones">Earth tones</option>
                            <option value="Gradient colors">
                              Gradient colors
                            </option>
                          </select>
                        </div>
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
                        <Label htmlFor="typography" className="text-white">
                          Typography Style
                        </Label>
                        <select
                          id="typography"
                          value={typographyStyle}
                          onChange={(e) => setTypographyStyle(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select typography...</option>
                          <option value="Modern sans serif">
                            Modern sans serif
                          </option>
                          <option value="Classic serif">Classic serif</option>
                          <option value="Bold and impactful">
                            Bold and impactful
                          </option>
                          <option value="Elegant script">Elegant script</option>
                          <option value="Handwritten style">
                            Handwritten style
                          </option>
                          <option value="Tech and futuristic">
                            Tech and futuristic
                          </option>
                          <option value="Vintage and retro">
                            Vintage and retro
                          </option>
                          <option value="Minimalist text">
                            Minimalist text
                          </option>
                        </select>
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
                        <Label htmlFor="layout" className="text-white">
                          Layout Style
                        </Label>
                        <select
                          id="layout"
                          value={layoutStyle}
                          onChange={(e) => setLayoutStyle(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select layout...</option>
                          <option value="Clean and minimal">
                            Clean and minimal
                          </option>
                          <option value="Complex and detailed">
                            Complex and detailed
                          </option>
                          <option value="Grid-based structure">
                            Grid-based structure
                          </option>
                          <option value="Asymmetrical design">
                            Asymmetrical design
                          </option>
                          <option value="Centered composition">
                            Centered composition
                          </option>
                          <option value="Layered elements">
                            Layered elements
                          </option>
                          <option value="Geometric arrangement">
                            Geometric arrangement
                          </option>
                          <option value="Organic flow">Organic flow</option>
                        </select>
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
                          <Label className="text-white">Color & Style</Label>
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
                        <div>
                          <Label className="text-white">Visual Elements</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {keywordCategories["Visual Elements"].map(
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
                          <Label htmlFor="file-upload" className="text-white">
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
              <CardHeader className="bg-black py-3 px-6 pb-5">
                <CardTitle className="text-xl text-white py-5">
                  AI Prompt Formula
                </CardTitle>
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
              <CardContent className="space-y-4 bg-black px-6 pb-6">
                <div>
                  <Label className="text-white">Generated Prompt</Label>
                  <div className="bg-gray-50 p-3 rounded border text-sm min-h-[100px] mt-1">
                    {generatePrompt() ||
                      "Start building your prompt by filling out the steps..."}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
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
                    <li>• Specify brand guidelines for consistency</li>
                    <li>• Add color codes for exact matching</li>
                    <li>• Include dimensions for proper scaling</li>
                    <li>• Consider file format requirements</li>
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
