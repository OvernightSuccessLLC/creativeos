import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Camera,
  Palette,
  Wand2,
  Image,
  Video,
  Mic,
  FileText,
  ExternalLink,
  Play,
  Download,
  Settings,
} from "lucide-react";

export default function AIToolkit() {
  const toolCategories = [
    {
      title: "Image Generation",
      icon: Image,
      tools: [
        {
          name: "SORA by OpenAI",
          description:
            "Advanced text-to-image generation with incredible detail and accuracy",
          status: "recommended",
          link: "https://openai.com/sora",
          features: [
            "Text to image",
            "High resolution",
            "Style control",
            "Prompt following",
          ],
        },
        {
          name: "Midjourney",
          description: "Artistic image creation with unique aesthetic styles",
          status: "popular",
          link: "https://midjourney.com",
          features: [
            "Artistic styles",
            "Discord bot",
            "Community gallery",
            "Style variations",
          ],
        },
        {
          name: "DALL-E 3",
          description:
            "OpenAI's flagship image generator with excellent prompt understanding",
          status: "featured",
          link: "https://openai.com/dall-e-3",
          features: [
            "Prompt accuracy",
            "Safe generation",
            "Integration ready",
            "Commercial use",
          ],
        },
      ],
    },
    {
      title: "Video Creation",
      icon: Video,
      tools: [
        {
          name: "RunwayML",
          description:
            "Professional video generation and editing with AI assistance",
          status: "pro",
          link: "https://runwayml.com",
          features: [
            "Text to video",
            "Video editing",
            "Green screen",
            "Motion tracking",
          ],
        },
        {
          name: "Pika Labs",
          description: "Simple video generation from text prompts and images",
          status: "new",
          link: "https://pikalabs.ai",
          features: [
            "Text to video",
            "Image animation",
            "Style transfer",
            "Community driven",
          ],
        },
      ],
    },
    {
      title: "Audio & Music",
      icon: Mic,
      tools: [
        {
          name: "ElevenLabs",
          description: "Ultra-realistic voice synthesis and cloning technology",
          status: "recommended",
          link: "https://elevenlabs.io",
          features: [
            "Voice cloning",
            "Text to speech",
            "Multi-language",
            "API access",
          ],
        },
        {
          name: "Mubert",
          description:
            "AI-generated music and soundtracks for any mood or setting",
          status: "popular",
          link: "https://mubert.com",
          features: [
            "Royalty-free music",
            "Real-time generation",
            "Mood-based",
            "Commercial license",
          ],
        },
      ],
    },
    {
      title: "Design & Graphics",
      icon: Palette,
      tools: [
        {
          name: "Canva AI",
          description: "AI-powered design assistance for graphics and layouts",
          status: "featured",
          link: "https://canva.com",
          features: [
            "Template generation",
            "Brand kit AI",
            "Background remover",
            "Magic resize",
          ],
        },
        {
          name: "Figma AI",
          description:
            "AI plugins and features for professional design workflows",
          status: "pro",
          link: "https://figma.com",
          features: [
            "Auto-layout",
            "Component generation",
            "Design systems",
            "Collaboration",
          ],
        },
      ],
    },
    {
      title: "Writing & Content",
      icon: FileText,
      tools: [
        {
          name: "GPT-4",
          description:
            "Advanced language model for content creation and editing",
          status: "recommended",
          link: "https://openai.com/gpt-4",
          features: [
            "Content writing",
            "Code generation",
            "Analysis",
            "Creative writing",
          ],
        },
        {
          name: "Claude",
          description:
            "Anthropic's AI assistant for thoughtful content creation",
          status: "popular",
          link: "https://claude.ai",
          features: [
            "Long-form content",
            "Research assistance",
            "Ethical AI",
            "Document analysis",
          ],
        },
      ],
    },
    {
      title: "Enhancement Tools",
      icon: Wand2,
      tools: [
        {
          name: "Upscayl",
          description: "AI image upscaling for higher resolution and quality",
          status: "free",
          link: "https://upscayl.github.io",
          features: [
            "Image upscaling",
            "Batch processing",
            "Open source",
            "No cloud needed",
          ],
        },
        {
          name: "Remove.bg",
          description: "AI-powered background removal for images",
          status: "popular",
          link: "https://remove.bg",
          features: [
            "Background removal",
            "Batch processing",
            "API access",
            "High quality",
          ],
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recommended":
        return "bg-green-500";
      case "featured":
        return "bg-brand-red";
      case "popular":
        return "bg-blue-500";
      case "pro":
        return "bg-purple-500";
      case "new":
        return "bg-yellow-500";
      case "free":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Header */}
      <div className="bg-black px-6 py-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Zap className="w-8 h-8 text-brand-red" />
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            AI TOOLKIT
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Curated collection of the best AI tools for creators. From image
          generation to video editing, find the perfect tools for your creative
          workflow.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-black/10 px-6 py-8 border-b border-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-black">25+</div>
            <div className="text-black/80 text-sm">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">6</div>
            <div className="text-black/80 text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">100%</div>
            <div className="text-black/80 text-sm">Tested</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">Weekly</div>
            <div className="text-black/80 text-sm">Updates</div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {toolCategories.map((category) => (
          <div key={category.title}>
            <div className="flex items-center space-x-3 mb-6">
              <category.icon className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-bold text-black">
                {category.title}
              </h2>
              <Badge className="bg-black text-brand-red">
                {category.tools.length} tools
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <Card
                  key={tool.name}
                  className="bg-black border border-gray-800 hover:border-brand-red transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-white text-lg">
                            {tool.name}
                          </CardTitle>
                          <Badge
                            className={`${getStatusColor(tool.status)} text-white text-xs`}
                          >
                            {tool.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {tool.features.map((feature) => (
                          <div
                            key={feature}
                            className="text-gray-400 text-xs flex items-center"
                          >
                            <div className="w-1 h-1 bg-brand-red rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-brand-red hover:bg-brand-red-hover text-black font-bold flex-1"
                        onClick={() => window.open(tool.link, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        VISIT
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-black px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Missing a Tool?</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Know an amazing AI tool that should be in our toolkit? We're always
          looking to expand our collection with the latest and greatest creative
          AI tools.
        </p>
        <Button className="bg-brand-red hover:bg-brand-red-hover text-black font-bold px-8 py-3">
          <Download className="w-5 h-5 mr-2" />
          SUGGEST A TOOL
        </Button>
      </div>
    </div>
  );
}
