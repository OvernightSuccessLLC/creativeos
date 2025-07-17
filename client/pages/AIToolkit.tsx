import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import { Zap, ExternalLink } from "lucide-react";

export default function AIToolkit() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);

  const toolsData = [
    {
      id: 1,
      name: "GitHub Copilot",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI pair programmer that autocompletes code in real time",
      keyFeatures: [
        "Code completion",
        "Real-time suggestions",
        "Multi-language",
      ],
      link: "https://github.com/features/copilot",
    },
    {
      id: 2,
      name: "Gemini",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Google's LLM for text, image, and code understanding",
      keyFeatures: ["Multimodal", "Code understanding", "Text generation"],
      link: "https://gemini.google.com",
    },
    {
      id: 3,
      name: "Framer",
      category: "Web Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI-powered website builder that creates and publishes sites with ease",
      keyFeatures: ["Website builder", "AI design", "No-code"],
      link: "https://framer.com",
    },
    {
      id: 4,
      name: "Figma AI",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Intelligent design assistant inside Figma",
      keyFeatures: ["Design assistance", "Auto-layout", "Content generation"],
      link: "https://www.figma.com/blog/introducing-ai-figma",
    },
    {
      id: 5,
      name: "Exactly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI for generating commercial-quality artwork",
      keyFeatures: [
        "Commercial quality",
        "Custom training",
        "Brand consistency",
      ],
      link: "https://www.exactly.ai",
    },
    {
      id: 6,
      name: "Dream by Wombo",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI app for creating vibrant artwork from text prompts",
      keyFeatures: ["Text-to-art", "Multiple styles", "Mobile app"],
      link: "https://www.wombo.art",
    },
    {
      id: 7,
      name: "Deepscript",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI-enhanced video and audio editor with transcription tools",
      keyFeatures: ["Video editing", "Transcription", "Audio enhancement"],
      link: "https://www.deepscript.com",
    },
    {
      id: 8,
      name: "DenseSpeak",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI writing assistant based on GPT-4 with top downloads in Jan 2025 with advanced GRM/SPCT tuning",
      keyFeatures: ["GPT-4 based", "Advanced tuning", "Writing assistant"],
      link: "https://www.densespeak.com",
    },
    {
      id: 9,
      name: "Deep Dream",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Transforms images using deep learning for dreamlike results",
      keyFeatures: [
        "Image transformation",
        "Deep learning",
        "Artistic effects",
      ],
      link: "https://deepdreamgenerator.com",
    },
    {
      id: 10,
      name: "Cursor",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI-native code editor with contextual suggestions",
      keyFeatures: [
        "AI-native editor",
        "Contextual suggestions",
        "Code completion",
      ],
      link: "https://www.cursor.so",
    },
    {
      id: 11,
      name: "Codeinal",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Helps you write and troubleshoot code with natural language",
      keyFeatures: [
        "Natural language",
        "Code troubleshooting",
        "Writing assistance",
      ],
      link: "https://codeinal.ai",
    },
    {
      id: 12,
      name: "Codium",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "Free AI code completion tool for all major IDEs",
      keyFeatures: ["Code completion", "IDE support", "Free tool"],
      link: "https://codium.ai",
    },
    {
      id: 13,
      name: "Claude 3.7 Sonnet",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Anthropic's advanced language model focused on accuracy and reasoning",
      keyFeatures: ["Advanced reasoning", "High accuracy", "Safety focused"],
      link: "https://claude.ai",
    },
    {
      id: 14,
      name: "ChatGPT",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "The industry-standard LLM chatbot known for its conversational fluency and versatility across a wide range of prompts and tasks",
      keyFeatures: [
        "Conversational AI",
        "Versatile prompts",
        "Industry standard",
      ],
      link: "https://chat.openai.com",
    },
    {
      id: 15,
      name: "Canva Visual Suite",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Suite of design tools with AI enhancements from Canva",
      keyFeatures: ["Design tools", "AI enhancements", "Visual creation"],
      link: "https://www.canva.com",
    },
    {
      id: 16,
      name: "Booth.ai",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Generates professional-quality product photos using AI, focused on furniture, fashion, and packaged goods",
      keyFeatures: [
        "Product photos",
        "Professional quality",
        "E-commerce focused",
      ],
      link: "https://booth.ai",
    },
    {
      id: 17,
      name: "Booking-Agent.io",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description:
        "Map-based event booking tool to find promoters, events, and artist schedules by location",
      keyFeatures: ["Event booking", "Location-based", "Artist schedules"],
      link: "https://booking-agent.io",
    },
    {
      id: 18,
      name: "Bito AI",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Copilot for engineers with auto-suggestions and doc generation",
      keyFeatures: ["Engineering copilot", "Auto-suggestions", "Documentation"],
      link: "https://bito.ai",
    },
    {
      id: 19,
      name: "AutoDraw",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Turns freehand sketches into refined icons and illustrations",
      keyFeatures: [
        "Sketch to icon",
        "Refined illustrations",
        "Drawing assistant",
      ],
      link: "https://www.autodraw.com",
    },
    {
      id: 20,
      name: "Asktheecode",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI assistant for code explanations and debugging",
      keyFeatures: [
        "Code explanations",
        "Debugging help",
        "Programming assistant",
      ],
      link: "https://asktheecode.ai",
    },
    {
      id: 21,
      name: "Ask Codi",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "Natural language to code generation and query platform",
      keyFeatures: ["Natural language", "Code generation", "Query platform"],
      link: "https://www.askcodn.com",
    },
    {
      id: 22,
      name: "Artbreeder",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Collaborative platform for blending and evolving art via AI",
      keyFeatures: [
        "Art blending",
        "Collaborative platform",
        "Evolution tools",
      ],
      link: "https://www.artbreeder.com",
    },
    {
      id: 23,
      name: "Adobe Firefly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Adobe's AI image generation and editing tool",
      keyFeatures: [
        "Image generation",
        "Adobe integration",
        "Professional editing",
      ],
      link: "https://firefly.adobe.com",
    },
    {
      id: 24,
      name: "Adobe Express",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Simplified Adobe suite with AI features for quick content creation",
      keyFeatures: ["Quick creation", "AI features", "Content templates"],
      link: "https://express.adobe.com",
    },
    {
      id: 25,
      name: "Zapier AI",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Collections of tested AI automations for workflows",
      keyFeatures: [
        "Workflow automation",
        "AI integration",
        "Tested collections",
      ],
      link: "https://zapier.com/blog/best-ai-productivity-tools",
    },
    {
      id: 26,
      name: "V7 Labs",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Categorized list of 35+ best AI tools for writing, coding, image/video",
      keyFeatures: ["Tool categorization", "AI development", "Multi-purpose"],
      link: "https://www.v7labs.com/blog/best-ai-tools-listed",
    },
    {
      id: 27,
      name: "Tome.app",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description: "Automated storytelling and presentation creation platform",
      keyFeatures: [
        "Automated storytelling",
        "Presentations",
        "Content creation",
      ],
      link: "https://tome.app",
    },
    {
      id: 28,
      name: "Taskade",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description:
        "Visualize your tasks and notes with AI-powered productivity tools",
      keyFeatures: ["Task visualization", "AI productivity", "Note taking"],
      link: "https://taskade.com",
    },
    {
      id: 29,
      name: "Synthesia",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI video avatars, voice cloning & screen-record capabilities",
      keyFeatures: ["Video avatars", "Voice cloning", "Screen recording"],
      link: "https://www.synthesia.io",
    },
    {
      id: 30,
      name: "Sweep AI",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI tool that helps maintain and improve your codebase",
      keyFeatures: [
        "Code maintenance",
        "Codebase improvement",
        "Automated fixes",
      ],
      link: "https://sweep.dev",
    },
    {
      id: 31,
      name: "Stylized.ai",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Generate product photos integrated into ecommerce platforms like Shopify",
      keyFeatures: [
        "Product photos",
        "E-commerce integration",
        "Shopify compatible",
      ],
      link: "http://stylized.ai",
    },
    {
      id: 32,
      name: "Stable Diffusion",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "Open-source AI model for high-quality image generation",
      keyFeatures: ["Open-source", "High-quality images", "Community driven"],
      link: "https://stability.ai",
    },
    {
      id: 33,
      name: "Runway ML",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Creative AI platform for video, image, and text generation",
      keyFeatures: ["Video generation", "Creative AI", "Multi-modal"],
      link: "https://runwayml.com",
    },
    {
      id: 34,
      name: "Replit Ghostwriter",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI tool that helps you write and understand code on Replit",
      keyFeatures: ["Code writing", "Code understanding", "Replit integration"],
      link: "https://replit.com/site/ghostwriter",
    },
    {
      id: 35,
      name: "Resume",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description: "AI tool to generate website designs and components",
      keyFeatures: [
        "Website design",
        "Component generation",
        "Design automation",
      ],
      link: "https://reume.ai",
    },
    {
      id: 36,
      name: "Prompt Hunt",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "Prompt library and AI art generator platform",
      keyFeatures: ["Prompt library", "Art generation", "Community platform"],
      link: "https://www.prompthunt.com",
    },
    {
      id: 37,
      name: "Playground AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Free AI image generator and editor with collaboration tools",
      keyFeatures: ["Image generation", "Collaboration tools", "Free editor"],
      link: "https://playgroundai.com",
    },
    {
      id: 38,
      name: "Phind",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI-powered search engine for developers and engineers",
      keyFeatures: ["Developer search", "AI-powered", "Engineering focus"],
      link: "https://www.phind.com",
    },
    {
      id: 39,
      name: "Perplexity AI",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "An AI-trained search engine and chatbot with citations, multilingual inputs, and Pro-tier API access. Valued at $1B as of June 2024",
      keyFeatures: ["Search engine", "Citations", "Multilingual"],
      link: "https://www.perplexity.ai",
    },
    {
      id: 40,
      name: "Pebblely",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI generator for product images in various styles and settings",
      keyFeatures: ["Product images", "Style variety", "Setting options"],
      link: "https://pebblely.com",
    },
    {
      id: 41,
      name: "OpenArt",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "AI-powered art generation and prompt platform",
      keyFeatures: ["Art generation", "Prompt platform", "Community driven"],
      link: "https://openart.ai",
    },
    {
      id: 42,
      name: "NotebookLM",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description:
        "A research & note-taking assistant for analyzing data and generating summaries",
      keyFeatures: [
        "Research assistant",
        "Data analysis",
        "Summary generation",
      ],
      link: "https://notebooklm.google",
    },
    {
      id: 43,
      name: "NightCafe",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI art generator using various algorithms including VQGAN+CLIP",
      keyFeatures: [
        "Multiple algorithms",
        "Art generation",
        "Community platform",
      ],
      link: "https://creator.nightcafe.studio",
    },
    {
      id: 44,
      name: "Mutable AI",
      category: "Development",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description: "Code refactor, document, and write code faster with AI",
      keyFeatures: ["Code refactoring", "Documentation", "Fast coding"],
      link: "https://mutable.ai",
    },
    {
      id: 45,
      name: "Midjourney",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Primary alternative art-generation platform",
      keyFeatures: ["Art generation", "High quality", "Community platform"],
      link: "https://www.midjourney.com",
    },
    {
      id: 46,
      name: "Microsoft Designer",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "AI graphic design tool by Microsoft for creating social posts and marketing visuals",
      keyFeatures: ["Graphic design", "Social posts", "Marketing visuals"],
      link: "https://designer.microsoft.com",
    },
    {
      id: 47,
      name: "Menu",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Multimodal autonomous agent for complex web tasks like coding and planning",
      keyFeatures: ["Autonomous agent", "Web tasks", "Coding assistant"],
      link: "https://en.wikipedia.org/wiki/Autonomous_agent",
    },
    {
      id: 48,
      name: "Magic Design",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "Canva's AI design assistant that creates layouts from text input",
      keyFeatures: ["Layout creation", "Text input", "Design automation"],
      link: "https://www.canva.com/magic-design",
    },
    {
      id: 49,
      name: "Lummi AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "AI platform for creatives to generate branded content and marketing assets",
      keyFeatures: ["Branded content", "Marketing assets", "Creative platform"],
      link: "https://lummi.ai",
    },
    {
      id: 50,
      name: "LetsEnhance",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Uses AI to enhance the resolution of images and photographs",
      keyFeatures: [
        "Image enhancement",
        "Resolution upscaling",
        "Photo improvement",
      ],
      link: "https://letsenhance.io",
    },
    {
      id: 51,
      name: "Leonardo AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI platform for generating detailed visual artwork and game assets",
      keyFeatures: ["Visual artwork", "Game assets", "Detailed generation"],
      link: "https://leonardo.ai",
    },
    {
      id: 52,
      name: "Kling AI",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Awarded best AI video generator for quality and affordability in recent AI awards",
      keyFeatures: ["Video generation", "High quality", "Affordable pricing"],
      link: "https://kling.ai",
    },
    {
      id: 53,
      name: "Kittl",
      category: "Design",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "AI-powered graphic design tool with templates and vector support",
      keyFeatures: ["Graphic design", "Templates", "Vector support"],
      link: "https://www.kittl.com",
    },
    {
      id: 54,
      name: "Imagen 3 Veo",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Image generates visuals, Veo 3 supports coherent video with audio",
      keyFeatures: ["Image generation", "Video creation", "Audio support"],
      link: "https://en.wikipedia.org/wiki/Google_DeepMind",
    },
    {
      id: 55,
      name: "Hotpot.ai",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: null,
      description:
        "AI tools for image editing, enhancement, and background removal",
      keyFeatures: ["Image editing", "Enhancement", "Background removal"],
      link: "https://hotpot.ai",
    },
    {
      id: 56,
      name: "Headlines",
      category: "Productivity",
      categoryColor: "bg-green-500",
      premiumBadge: null,
      description:
        "Copywriting assistant powered by GPT for landing pages and ads",
      keyFeatures: ["Copywriting", "Landing pages", "Ad creation"],
      link: "https://headlines.com",
    },
    {
      id: 57,
      name: "Grok",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "A fast-evolving chatbot with image understanding, PDF parsing, and the new Grok-3 reasoning model",
      keyFeatures: ["Image understanding", "PDF parsing", "Advanced reasoning"],
      link: "https://x.com/grok",
    },
    {
      id: 58,
      name: "GlennAI",
      category: "AI Assistant",
      categoryColor: "bg-blue-500",
      premiumBadge: null,
      description: "AI assistant for various productivity and creative tasks",
      keyFeatures: ["Productivity", "Creative tasks", "General assistant"],
      link: "https://glennai.com",
    },
  ];

  const handleVisitTool = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool) => (
            <Card
              key={tool.id}
              className="bg-black border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col h-full"
            >
              <CardHeader className="pb-4 flex-shrink-0">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    className={`${tool.categoryColor} text-white text-xs font-medium px-2 py-1 rounded`}
                  >
                    {tool.category}
                  </Badge>
                  {tool.premiumBadge && (
                    <Badge
                      className={`${tool.premiumBadgeColor} text-white text-xs font-medium px-2 py-1 rounded`}
                    >
                      {tool.premiumBadge}
                    </Badge>
                  )}
                </div>
                <h3
                  className="text-white text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    minHeight: "28px",
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  style={{
                    minHeight: "40px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {tool.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h4
                    className="text-orange-400 text-sm font-semibold mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Key Features:
                  </h4>
                  <ul className="space-y-1 mb-4" style={{ minHeight: "72px" }}>
                    {tool.keyFeatures.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm flex items-start"
                      >
                        <span className="text-orange-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleVisitTool(tool.link)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded transition-colors duration-200 mt-auto"
                  style={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-black/80 mb-4">
            Missing a tool? Let us know and we'll add it to the collection.
          </p>
          <Button
            className="bg-black text-brand-red hover:bg-gray-900 font-bold px-6 py-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700" }}
          >
            SUGGEST A TOOL
          </Button>
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
