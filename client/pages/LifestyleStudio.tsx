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
  Heart,
  Coffee,
  Home,
  MapPin,
} from "lucide-react";

export default function LifestyleStudio() {
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
  const [moodTone, setMoodTone] = useState("");
  const [subjectAge, setSubjectAge] = useState("");
  const [activityType, setActivityType] = useState("");
  const [locationSetting, setLocationSetting] = useState("");

  const keywordCategories = {
    "Scene Objective": [
      "Vacation",
      "Brunch",
      "Party",
      "Hiking",
      "Yoga",
      "Work-from-home",
      "Cafe",
      "Beach Day",
      "Poolside",
      "Road Trip",
      "Festival",
      "Concert",
    ],
    "Product/Subject Style": [
      "Streetwear",
      "Athleisure",
      "Bohemian",
      "Minimalist",
      "Modern Chic",
      "Vintage-inspired",
      "Activewear",
      "High Fashion",
      "Casual Cool",
      "Skincare",
      "Tech Accessories",
      "Home Decor",
      "Sustainable",
      "Ethical",
      "Tailored",
      "Luxury Casual",
      "Denim",
      "Footwear",
      "Sunglasses",
      "Bags",
      "Jewelry",
      "Swimwear",
      "Watches",
      "Knitwear",
      "Outerwear",
    ],
    "Background Setting": [
      "Mountains",
      "City Skyline",
      "Urban Street",
      "Garden",
      "Desert",
      "Art Gallery",
      "Pure White",
      "Black Void",
      "Gradient Colors",
      "Marble Texture",
      "Wood Grain",
      "Concrete Surface",
      "Fabric Textile",
      "Abstract Shapes",
      "Solid Colors",
      "Neon Accents",
      "Patterned Wallpaper",
      "Acrylic Platform",
      "Transparent Glass",
      "Reflective Mirror",
      "Natural Elements",
      "Velvet Drapery",
      "Ceramic Tiles",
      "Digital Grid",
      "Metallic Surface",
      "Color Block",
      "Pastel Tones",
      "Studio Canvas",
    ],
    "Lighting Setup": [
      "Golden Hour",
      "Soft Ambient",
      "Neon Glow",
      "Natural Sunlight",
      "Dramatic Shadows",
      "Indoor Warmth",
      "Studio Softbox",
      "High Contrast",
      "Nightlife Neon",
      "Window Lighting",
      "Cinematic",
      "Reflective",
      "Subtle Flare",
      "Bright Overhead",
      "Firelight",
      "Cool Evening",
      "Softbox",
      "Rim Lighting",
      "Spotlight",
      "Specular Highlight",
      "Diffused Overhead",
      "Backlighting",
      "Even Studio Light",
      "High Key",
      "Product Focused",
      "Shadow Play",
      "Direct Spotlight",
      "Minimal Shadows",
      "LED Glow",
    ],
    "Camera Angle": [
      "POV",
      "Eye-level",
      "Overhead",
      "Wide-angle",
      "Close-up",
      "Portrait",
      "Candid",
      "Low-angle Heroic",
      "Side Profile",
      "Centered",
      "Symmetrical",
      "Rule of Thirds",
      "Diagonal",
      "Elevated",
      "Drone Shot",
      "Macro Detail",
      "45-degree Angle",
      "Action Capture",
      "Depth of Field",
      "Panorama",
      "Lifestyle Observational",
      "Vertical",
      "Landscape",
      "Dynamic Motion",
      "Still-life",
    ],
    "Intended Use": [
      "Flat-lay",
      "Floating Product",
      "Web Banner",
      "Product Launch",
      "Before/After",
      "Tutorial",
      "Mock-up",
      "Social Media Post",
      "Infographic",
      "Digital Banner",
      "Web Graphic",
      "Email Header",
      "Poster",
      "Flyer",
      "Thumbnail",
      "Branding Element",
      "Icon Set",
      "Sticker Design",
      "Advertising",
      "Promotion",
      "Typography Art",
      "Logo Design",
      "Announcement",
    ],
    Finishing: [
      "Clean",
      "Cinematic",
      "Saturated",
      "Minimal",
      "Hyperdetailed",
      "High contrast",
      "Desaturated",
      "Overexposed",
      "Stylized",
      "Replica",
      "Editorial",
      "Sharp",
      "Raw & real",
      "Tech aesthetic",
      "90s ad",
      "Magazine cover",
      "80s VHS",
      "Grain",
      "Street editorial",
      "Lifestyle",
      "Polished",
      "Product-centric",
      "Minimalist",
      "Futuristic",
      "Instagram-core",
      "Disposable film",
      "Lo-fi",
      "Brand",
    ],
  };

  // Calculate quality score based on inputs
  const calculateQuality = () => {
    let score = 0;
    if (customInstructions.length > 20) score += 25;
    if (selectedKeywords.length > 0) score += selectedKeywords.length * 2;
    if (uploadedFile) score += 15;
    if (moodTone) score += 10;
    if (subjectAge) score += 10;
    if (activityType) score += 10;
    if (locationSetting) score += 10;
    return Math.min(100, score);
  };

  // Generate the final prompt
  const generatePrompt = () => {
    let prompt = "";
    if (customInstructions.trim()) {
      prompt += customInstructions.trim() + ". ";
    }
    if (moodTone) prompt += `${moodTone} mood. `;
    if (subjectAge) prompt += `${subjectAge} person. `;
    if (activityType) prompt += `${activityType}. `;
    if (locationSetting) prompt += `In ${locationSetting}. `;
    if (selectedKeywords.length > 0) {
      prompt += selectedKeywords.join(", ") + ". ";
    }
    prompt +=
      "Lifestyle photography, authentic human moment, natural expression, candid composition, emotional connection, high quality, detailed, realistic, SORA video generation optimized.";
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
    moodTone,
    subjectAge,
    activityType,
    locationSetting,
  ]);

  const steps = [
    {
      id: 1,
      title: "Custom Instructions",
      description: "Define your unique lifestyle vision and story",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "File Upload",
      description: "Upload reference images for your lifestyle scene",
      icon: <Upload className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Scene Objective",
      description:
        "Influencer setting, branded product placement, lifestyle scenario",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Product/Subject Style",
      description: "Define the style and aesthetic of products or subjects",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Background Setting",
      description: "Choose the perfect environment and location",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Lighting Setup",
      description: "Select lighting style and mood",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      id: 7,
      title: "Camera Angle",
      description: "Set camera perspective and composition",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      id: 8,
      title: "Intended Use",
      description: "Define the intended use and application type",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      id: 9,
      title: "Finishing",
      description: "Final post-processing and aesthetic treatment",
      icon: <Camera className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Top Navigation Bar */}
      <nav className="bg-black mb-1 px-6 py-6 pb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-brand-red font-bold text-lg">LOGO</div>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="bg-brand-red text-black px-3 py-2 rounded text-sm font-semibold mr-3"
            >
              <span>PRODUCT STUDIO</span>
            </button>
            <button className="bg-brand-red text-black px-3 py-2 rounded text-sm font-semibold mx-3">
              <b>LIFESTYLE STUDIO</b>
            </button>
            <button
              onClick={() => navigate("/graphic-studio")}
              className="bg-brand-red text-black px-3 py-2 rounded text-sm font-semibold mx-3"
            >
              <b>GRAPHIC STUDIO</b>
            </button>
            <button
              onClick={() => setShowBriefcase(true)}
              className="bg-brand-red text-black px-3 py-2 rounded text-sm font-semibold mx-3"
            >
              <b>THE BRIEFCASE</b>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-brand-red text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ?
            </div>
            <div className="bg-brand-red text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              ♀
            </div>
            <button className="text-white text-sm font-medium hover:bg-white/10 px-3 py-1 rounded">
              <b>RESET</b>
            </button>
          </div>
        </div>
      </nav>

      {/* Studio Header */}
      <div className="px-6 py-3">
        <div className="max-w-7xl mx-auto"></div>
      </div>

      {/* HOW IT WORKS Section */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-lg py-5 px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                "Add Custom Instructions",
                "Define Mood & Subject",
                "Select Activities",
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
                        <Textarea
                          id="instructions"
                          placeholder="A young professional woman enjoying her morning coffee routine in a sunlit kitchen, creating an authentic moment of calm before starting her day..."
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
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {step.id === 3 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Scene Objective"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 4 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Product/Subject Style"].map(
                          (keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {keyword}
                            </button>
                          ),
                        )}
                      </div>
                    )}

                    {step.id === 5 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Background Setting"].map(
                          (keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {keyword}
                            </button>
                          ),
                        )}
                      </div>
                    )}

                    {step.id === 6 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Lighting Setup"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 7 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Camera Angle"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 8 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {keywordCategories["Intended Use"].map((keyword) => (
                          <button
                            key={keyword}
                            onClick={() => toggleKeyword(keyword)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              selectedKeywords.includes(keyword)
                                ? "bg-brand-red text-black"
                                : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === 9 && (
                      <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {keywordCategories["Finishing"].map((keyword) => (
                            <button
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                selectedKeywords.includes(keyword)
                                  ? "bg-brand-red text-black"
                                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {keyword}
                            </button>
                          ))}
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
              <CardHeader className="bg-black py-5 px-6">
                <CardTitle className="text-xl text-white py-5">
                  AI Prompt Formula
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-black px-6 pb-6">
                <div>
                  <Label></Label>
                  <div className="bg-gray-50 p-3 rounded border text-sm min-h-[100px] mt-1">
                    {generatePrompt() ||
                      "Start building your prompt by filling out the steps..."}
                  </div>
                </div>

                <div className="bg-gray-200 rounded-full h-2 my-5 py-3">
                  <div
                    className="bg-brand-red h-2 rounded-full transition-all duration-500"
                    style={{ width: `${qualityScore}%` }}
                  ></div>
                </div>

                <Button
                  onClick={copyPrompt}
                  className="w-full bg-brand-red text-white hover:bg-red-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedPrompt ? "COPIED!" : "COPY"}
                </Button>

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
                  <div className="flex justify-between text-sm text-white">
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
                  <div className="flex justify-between text-sm text-white">
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

                <div className="text-sm mt-4">
                  <h4 className="font-semibold text-white my-1 py-1">
                    <span className="text-brand-red">AI RECOMMENDATIONS</span>
                  </h4>
                  <ul className="text-gray-600">
                    <li className="text-white font-semibold mt-1">
                      • Add more emotional descriptors for depth
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Include lighting details for mood
                    </li>
                    <li className="text-white font-semibold mt-1">
                      • Specify camera angle for composition
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
