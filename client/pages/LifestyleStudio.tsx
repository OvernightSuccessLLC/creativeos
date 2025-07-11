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
    "Mood & Atmosphere": [
      "Candid",
      "Spontaneous",
      "Relaxed",
      "Joyful",
      "Serene",
      "Energetic",
      "Intimate",
      "Contemplative",
      "Playful",
      "Nostalgic",
      "Peaceful",
      "Vibrant",
      "Dreamy",
      "Cozy",
      "Romantic",
      "Adventurous",
      "Cheerful",
      "Melancholic",
      "Mysterious",
      "Uplifting",
      "Tranquil",
      "Dynamic",
    ],
    "Setting & Location": [
      "Urban environment",
      "Natural setting",
      "Home interior",
      "Outdoor space",
      "Coffee shop",
      "Restaurant",
      "Beach location",
      "Mountain view",
      "City street",
      "Park setting",
      "Garden area",
      "Rooftop terrace",
      "Living room",
      "Kitchen space",
      "Bedroom scene",
      "Workspace",
      "Library",
      "Art gallery",
      "Museum",
      "Market place",
      "Festival",
      "Concert venue",
    ],
    "Lighting & Quality": [
      "Golden hour",
      "Blue hour",
      "Natural light",
      "Soft lighting",
      "Dramatic lighting",
      "Backlighting",
      "Window light",
      "Ambient lighting",
      "Warm lighting",
      "Cool lighting",
      "Harsh shadows",
      "Diffused light",
      "Sunset glow",
      "Morning light",
      "Overcast day",
      "Bright daylight",
      "Evening mood",
      "Candlelight",
      "String lights",
      "Neon lighting",
      "Street lights",
      "Spotlight",
    ],
    "Camera & Technical": [
      "85mm lens",
      "50mm lens",
      "35mm lens",
      "Portrait lens",
      "Wide angle",
      "Shallow depth",
      "Deep focus",
      "Bokeh effect",
      "Film grain",
      "High contrast",
      "Low contrast",
      "Saturated colors",
      "Muted tones",
      "Black and white",
      "Vintage filter",
      "Modern processing",
      "Sharp details",
      "Soft focus",
      "Motion blur",
      "Freeze frame",
      "Long exposure",
      "Close up",
    ],
    "Subjects & People": [
      "Young adult",
      "Middle aged",
      "Senior person",
      "Child subject",
      "Teen portrait",
      "Family group",
      "Couple together",
      "Friends hanging",
      "Professional pose",
      "Casual stance",
      "Active movement",
      "Relaxed posture",
      "Laughing expression",
      "Serious look",
      "Contemplative mood",
      "Joyful smile",
      "Natural pose",
      "Staged setup",
      "Candid moment",
      "Formal attire",
      "Casual clothes",
      "Business wear",
      "Athletic gear",
      "Vintage style",
      "Modern fashion",
      "Bohemian look",
      "Minimalist style",
      "Colorful outfit",
      "Neutral tones",
      "Seasonal wear",
    ],
    "Activities & Moments": [
      "Morning routine",
      "Coffee drinking",
      "Reading book",
      "Working on laptop",
      "Cooking meal",
      "Exercising",
      "Walking dog",
      "Playing music",
      "Gardening",
      "Shopping",
      "Traveling",
      "Socializing",
      "Relaxing",
      "Celebrating",
      "Learning",
      "Creating art",
      "Playing sports",
      "Meditating",
      "Dancing",
      "Eating meal",
      "Having conversation",
      "Taking selfie",
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
      title: "Mood & Atmosphere",
      description: "Set the emotional tone and feeling",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Subject & Demographics",
      description: "Define who is in your lifestyle scene",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Activity & Moment",
      description: "Choose the action or lifestyle moment",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Setting & Location",
      description: "Select the perfect environment",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Visual Elements",
      description: "Fine-tune lighting, camera, and style",
      icon: <Camera className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-green-500 text-black">
      {/* Top Navigation Bar */}
      <nav className="bg-black px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-green-500 font-bold text-lg">LOGO</div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigate("/")}
              className="text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10"
            >
              PRODUCT STUDIO
            </button>
            <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold">
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
            LIFESTYLE STUDIO
          </h1>
          <p
            className="text-black text-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Create authentic lifestyle visuals and human-centered content
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
                "Define Mood & Subject",
                "Select Activities",
                "Review Quality",
                "Copy for SORA",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mb-2">
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
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
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
                          Describe your lifestyle scene or story
                        </Label>
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
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mood">Mood & Tone</Label>
                          <select
                            id="mood"
                            value={moodTone}
                            onChange={(e) => setMoodTone(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          >
                            <option value="">Select mood...</option>
                            <option value="Joyful and energetic">
                              Joyful and energetic
                            </option>
                            <option value="Calm and serene">
                              Calm and serene
                            </option>
                            <option value="Romantic and intimate">
                              Romantic and intimate
                            </option>
                            <option value="Adventurous and dynamic">
                              Adventurous and dynamic
                            </option>
                            <option value="Cozy and comfortable">
                              Cozy and comfortable
                            </option>
                            <option value="Professional and confident">
                              Professional and confident
                            </option>
                            <option value="Playful and spontaneous">
                              Playful and spontaneous
                            </option>
                            <option value="Contemplative and peaceful">
                              Contemplative and peaceful
                            </option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {keywordCategories["Mood & Atmosphere"].map(
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

                    {step.id === 3 && (
                      <div>
                        <Label htmlFor="subject">Subject Demographics</Label>
                        <select
                          id="subject"
                          value={subjectAge}
                          onChange={(e) => setSubjectAge(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select subject...</option>
                          <option value="Young adult (20-30)">
                            Young adult (20-30)
                          </option>
                          <option value="Middle aged (30-50)">
                            Middle aged (30-50)
                          </option>
                          <option value="Senior person (50+)">
                            Senior person (50+)
                          </option>
                          <option value="Child or teen">Child or teen</option>
                          <option value="Family group">Family group</option>
                          <option value="Couple together">
                            Couple together
                          </option>
                          <option value="Friends group">Friends group</option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Subjects & People"].map(
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
                        <Label htmlFor="activity">Activity Type</Label>
                        <select
                          id="activity"
                          value={activityType}
                          onChange={(e) => setActivityType(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select activity...</option>
                          <option value="Morning routine">
                            Morning routine
                          </option>
                          <option value="Coffee and work">
                            Coffee and work
                          </option>
                          <option value="Cooking and dining">
                            Cooking and dining
                          </option>
                          <option value="Exercise and wellness">
                            Exercise and wellness
                          </option>
                          <option value="Social gathering">
                            Social gathering
                          </option>
                          <option value="Outdoor adventure">
                            Outdoor adventure
                          </option>
                          <option value="Creative pursuits">
                            Creative pursuits
                          </option>
                          <option value="Relaxation time">
                            Relaxation time
                          </option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Activities & Moments"].map(
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
                        <Label htmlFor="location">Location Setting</Label>
                        <select
                          id="location"
                          value={locationSetting}
                          onChange={(e) => setLocationSetting(e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          <option value="">Select location...</option>
                          <option value="cozy home interior">
                            Cozy home interior
                          </option>
                          <option value="urban coffee shop">
                            Urban coffee shop
                          </option>
                          <option value="natural outdoor setting">
                            Natural outdoor setting
                          </option>
                          <option value="modern workspace">
                            Modern workspace
                          </option>
                          <option value="beach or waterfront">
                            Beach or waterfront
                          </option>
                          <option value="city street or park">
                            City street or park
                          </option>
                          <option value="restaurant or dining">
                            Restaurant or dining
                          </option>
                          <option value="fitness or wellness space">
                            Fitness or wellness space
                          </option>
                        </select>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                          {keywordCategories["Setting & Location"].map(
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
                          <Label>Lighting & Technical</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {keywordCategories["Lighting & Quality"].map(
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
                          <Label>Camera & Technical</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {keywordCategories["Camera & Technical"].map(
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
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
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
                    <li>• Add more emotional descriptors for depth</li>
                    <li>• Include lighting details for mood</li>
                    <li>• Specify camera angle for composition</li>
                    <li>• Consider adding seasonal elements</li>
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
