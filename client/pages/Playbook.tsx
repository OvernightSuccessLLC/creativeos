import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  BookOpen,
  Lightbulb,
  Camera,
  Package,
  Palette,
  RefreshCw,
  Database,
  AlertTriangle,
  Settings,
  Eye,
  Zap,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";
export default function Playbook() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const sections = [
    {
      id: 1,
      title: "Basics of Prompting (Prompting 101)",
      icon: Lightbulb,
      content: {
        principles: [
          {
            title: "Be Specific and Clear",
            description:
              "Avoid vague language. Instead of 'a nice photo,' use 'a professional headshot with soft lighting and neutral background.'",
            tip: "The more specific you are, the better the AI understands your vision.",
          },
          {
            title: "Use Descriptive Language",
            description:
              "Include details about mood, style, lighting, colors, and composition to guide the AI effectively.",
            tip: "Think like you're directing a photographer - what would you tell them?",
          },
          {
            title: "Structure Your Prompts",
            description:
              "Organize your prompts logically: Subject + Style + Details + Technical specs.",
            tip: "A well-structured prompt is easier for AI to interpret and execute.",
          },
        ],
        progression: {
          beginner: "Create a product photo of a coffee mug",
          advanced:
            "Professional product photography of a ceramic coffee mug, clean minimalist style, soft natural lighting, white background, 45-degree angle, shallow depth of field",
          expert:
            "Commercial product photography: handcrafted ceramic coffee mug with matte finish, Scandinavian minimalist aesthetic, soft diffused natural lighting from left side, seamless white background, shot at 45-degree angle, shallow depth of field (f/2.8), macro lens perspective, subtle drop shadow, color grading: warm whites and earth tones",
        },
      },
    },
    {
      id: 2,
      title: "Product Photography Prompts",
      icon: Camera,
      content: {
        principles: [
          {
            title: "Focus on the Product",
            description:
              "Make the product the star. Remove distractions and ensure clear visibility of key features.",
            tip: "Every element should support showcasing the product.",
          },
          {
            title: "Lighting is Everything",
            description:
              "Specify lighting type, direction, and quality. This affects mood and product appeal significantly.",
            tip: "Soft, even lighting generally works best for most products.",
          },
          {
            title: "Context and Scale",
            description:
              "Show the product in use or provide scale references to help viewers understand size and application.",
            tip: "Lifestyle context can increase emotional connection and purchase intent.",
          },
        ],
        progression: {
          beginner: "Take a photo of a smartphone",
          advanced:
            "Professional product shot of latest smartphone, clean studio lighting, reflecting surface, 3/4 angle view",
          expert:
            "Premium smartphone product photography: flagship device on reflective black acrylic surface, professional studio lighting setup with key light at 45 degrees and fill light for shadow detail, shot from slightly elevated 3/4 angle, clean gradient background from dark gray to black, shallow depth of field isolating device, subtle rim lighting highlighting edges, color-accurate display showing vibrant interface",
        },
      },
    },
    {
      id: 3,
      title: "Lifestyle Photography",
      icon: Package,
      content: {
        principles: [
          {
            title: "Tell a Story",
            description:
              "Create scenes that show products in real-life situations that your audience can relate to.",
            tip: "Think about the lifestyle your customers aspire to have.",
          },
          {
            title: "Natural Interactions",
            description:
              "People should interact naturally with products. Avoid stiff, posed shots.",
            tip: "Candid moments often feel more authentic and engaging.",
          },
          {
            title: "Environment Matters",
            description:
              "Choose locations and settings that complement your brand and product positioning.",
            tip: "The environment should enhance, not compete with, your product.",
          },
        ],
        progression: {
          beginner: "Person using a laptop in a coffee shop",
          advanced:
            "Lifestyle shot of young professional working on laptop in modern coffee shop, natural lighting, warm atmosphere",
          expert:
            "Authentic lifestyle photography: millennial professional in stylish coffee shop setting, working on premium laptop, natural window lighting creating soft shadows, warm color palette with earth tones, shallow depth of field focusing on subject while maintaining environmental context, candid moment of concentration, modern minimalist interior design complementing tech product positioning",
        },
      },
    },
  ];
  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="text-center mb-8 pb-4">
          <h1 className="font-display text-4xl md:text-5xl">THE PLAYBOOK</h1>
        </div>
        {/* Section Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                setActiveSection(
                  activeSection === section.id ? null : section.id,
                )
              }
              className={`p-4 sm:p-5 rounded-lg border-2 transition-all text-left min-h-[120px] touch-manipulation ${
                activeSection === section.id
                  ? "border-black bg-black text-white"
                  : "border-black/20 bg-white/10 text-black hover:border-black/40"
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <section.icon className="w-6 h-6" />
                <h3 className="font-heading text-sm md:text-base">
                  {section.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm opacity-80">
                {section.id === 1 &&
                  "Learn the fundamentals of effective prompting"}
                {section.id === 2 && "Master product photography techniques"}
                {section.id === 3 && "Create authentic lifestyle scenes"}
              </p>
            </button>
          ))}
        </div>
        {/* Content Sections */}
        {activeSection && (
          <div className="bg-black rounded-xl p-6 md:p-8">
            {sections
              .filter((section) => section.id === activeSection)
              .map((section) => (
                <div key={section.id} className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <section.icon className="w-8 h-8 text-brand-red" />
                    <h2
                      className="text-xl md:text-2xl font-heading text-white font-body"
                    >
                      {section.title}
                    </h2>
                  </div>
                  {/* Principles */}
                  <div className="space-y-6">
                    <h3
                      className="text-lg md:text-xl font-heading text-white font-body"
                    >
                      Core Principles
                    </h3>
                    <div className="space-y-4">
                      {section.content.principles.map((principle, index) => (
                        <div
                          key={index}
                          className="bg-gray-900 rounded-lg p-4 md:p-6"
                        >
                          <h4
                            className="text-brand-red text-sm md:text-lg font-heading mb-3"
                          >
                            {principle.title}
                          </h4>
                          <p
                            className="text-white leading-relaxed text-xs md:text-sm mb-3 font-body"
                          >
                            {principle.description}
                          </p>
                          <div className="bg-black rounded p-3 border-l-2 border-brand-red">
                            <p className="text-gray-300 text-xs italic">
                              💡 {principle.tip}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Skill Progression */}
                  <div className="space-y-4">
                    <h3
                      className="text-lg md:text-xl font-heading text-white font-body"
                    >
                      Skill Progression Examples
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold font-body">
                          BEGINNER
                        </span>
                        <p className="text-white italic text-xs md:text-sm bg-gray-900 p-3 rounded font-body">
                          "{section.content.progression.beginner}"
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold font-body">
                          ADVANCED
                        </span>
                        <p className="text-white italic text-xs md:text-sm bg-gray-900 p-3 rounded font-body">
                          "{section.content.progression.advanced}"
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold font-body">
                          EXPERT
                        </span>
                        <p className="text-white italic text-xs md:text-sm bg-gray-900 p-3 rounded font-body">
                          "{section.content.progression.expert}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-black rounded-xl p-6 md:p-8">
            <h3
              className="text-xl md:text-2xl font-heading text-white mb-4 font-body"
            >
              Ready to Put This into Practice?
            </h3>
            <p
              className="text-gray-300 mb-6 max-w-2xl mx-auto"
            >
              Take your new prompting skills to our studio tools and start
              creating professional-quality prompts right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="bg-brand-red text-black hover:bg-brand-red-hover font-heading px-6 py-4 min-h-[48px] touch-manipulation"
              >
                <Camera className="w-4 h-4 mr-2" />
                Try Product Studio
              </Button>
              <Button
                onClick={() => navigate("/lifestyle-studio")}
                className="bg-white text-black hover:bg-gray-100 font-heading px-6 py-4 min-h-[48px] touch-manipulation"
              >
                <Package className="w-4 h-4 mr-2" />
                Try Lifestyle Studio
              </Button>
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
