import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  Zap,
  ExternalLink,
  Filter,
  Code,
  Palette,
  Bot,
  Video,
  Briefcase,
  Layers,
  Sparkles,
  Globe,
  Image,
  FileText,
} from "lucide-react";
export default function AIToolkit() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const toolsData = [
    // AI Assistants
    {
      id: 1,
      name: "ChatGPT",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "The industry-standard LLM chatbot known for its conversational fluency and versatility across a wide range of prompts and tasks.",
      keyFeatures: [
        "Conversational AI",
        "Versatile prompts",
        "Industry standard",
      ],
      link: "https://chat.openai.com",
      rating: 5,
    },
    {
      id: 2,
      name: "Claude 3.7 Sonnet",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Anthropic's advanced language model focused on accuracy and reasoning.",
      keyFeatures: ["Advanced reasoning", "High accuracy", "Safety focused"],
      link: "https://claude.ai",
      rating: 5,
    },
    {
      id: 3,
      name: "Perplexity AI",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "An AI-infused search engine and chatbot with web citations, multimodal inputs, and Pro-tier API access. Valued at $14B as of June 2025.",
      keyFeatures: ["Search engine", "Citations", "Multilingual"],
      link: "https://www.perplexity.ai",
      rating: 5,
    },
    {
      id: 4,
      name: "Gemini",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Google's LLM for text, image, and code understanding.",
      keyFeatures: ["Multimodal", "Code understanding", "Text generation"],
      link: "https://gemini.google.com",
      rating: 4,
    },
    {
      id: 5,
      name: "Grok (X by Elon Musk)",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "A fast-evolving chatbot with image understanding, PDF parsing, and the new Grok‑3 reasoning model.",
      keyFeatures: ["Image understanding", "PDF parsing", "Fast evolution"],
      link: "https://x.com/i/grok",
      rating: 4,
    },
    {
      id: 6,
      name: "DeepSeek",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "A rising chatbot based on DeepSeek‑R1; top‑downloaded in Jan 2025 with advanced GRM/SPCT tuning.",
      keyFeatures: ["Advanced tuning", "Rising platform", "High performance"],
      link: "https://www.deepseek.com",
      rating: 4,
    },
    {
      id: 7,
      name: "Manus",
      category: "AI Assistant",
      categoryColor: "bg-green-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Multimodal autonomous agent for complex web tasks like coding and planning.",
      keyFeatures: ["Autonomous agent", "Web tasks", "Coding & planning"],
      link: "https://en.wikipedia.org/wiki/Manus_%28AI_agent%29",
      rating: 3,
    },
    // Art Generation
    {
      id: 8,
      name: "DALL·E 3 / ChatGPT images",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Top-tier for creative image generation integrated into ChatGPT's workspace.",
      keyFeatures: [
        "Creative generation",
        "ChatGPT integration",
        "Top-tier quality",
      ],
      link: "https://chat.openai.com",
      rating: 5,
    },
    {
      id: 9,
      name: "Midjourney",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Primary alternative art-generation platform.",
      keyFeatures: ["Art generation", "High quality", "Community platform"],
      link: "https://www.midjourney.com",
      rating: 5,
    },
    {
      id: 10,
      name: "Adobe Firefly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Adobe's AI image generation and editing tool.",
      keyFeatures: [
        "Image generation",
        "Adobe integration",
        "Professional editing",
      ],
      link: "https://firefly.adobe.com",
      rating: 4,
    },
    {
      id: 11,
      name: "Stable Diffusion",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "Open-source AI model for high-quality image generation.",
      keyFeatures: ["Open-source", "High-quality images", "Community driven"],
      link: "https://stability.ai",
      rating: 4,
    },
    {
      id: 12,
      name: "Leonardo AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI platform for generating detailed visual artwork and game assets.",
      keyFeatures: ["Visual artwork", "Game assets", "Detailed generation"],
      link: "https://leonardo.ai",
      rating: 4,
    },
    {
      id: 13,
      name: "Imagen & Veo (Google DeepMind)",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Imagen generates visuals, Veo 3 supports coherent video with audio.",
      keyFeatures: ["Visual generation", "Video creation", "Audio support"],
      link: "https://en.wikipedia.org/wiki/Google_DeepMind",
      rating: 4,
    },
    {
      id: 14,
      name: "Flux",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "Next-gen text-to-image model with in-context editing.",
      keyFeatures: ["Text-to-image", "In-context editing", "Next-gen model"],
      link: "https://en.wikipedia.org/wiki/Flux_%28text-to-image_model%29",
      rating: 4,
    },
    {
      id: 15,
      name: "Freepik AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-based graphic and design generation tools.",
      keyFeatures: ["Graphic design", "AI generation", "Design tools"],
      link: "https://www.freepik.com",
      rating: 4,
    },
    {
      id: 16,
      name: "NightCafe",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI art generator using various algorithms including VQGAN+CLIP.",
      keyFeatures: ["Multiple algorithms", "VQGAN+CLIP", "Art generation"],
      link: "https://creator.nightcafe.studio",
      rating: 4,
    },
    {
      id: 17,
      name: "Artbreeder",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Collaborative platform for blending and evolving art via AI.",
      keyFeatures: ["Collaborative art", "Blending features", "Art evolution"],
      link: "https://www.artbreeder.com",
      rating: 3,
    },
    {
      id: 18,
      name: "BlueWillow",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "Alternative AI art generation platform like Midjourney.",
      keyFeatures: ["Art generation", "Midjourney alternative", "Free access"],
      link: "https://www.bluewillow.ai",
      rating: 3,
    },
    {
      id: 19,
      name: "Playground AI",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Free AI image generator and editor with collaboration tools.",
      keyFeatures: ["Image generation", "Editor tools", "Collaboration"],
      link: "https://playgroundai.com",
      rating: 3,
    },
    {
      id: 20,
      name: "Dream by Wombo",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "AI app for creating vibrant artwork from text prompts.",
      keyFeatures: ["Vibrant artwork", "Text prompts", "Mobile app"],
      link: "https://www.wombo.art",
      rating: 3,
    },
    {
      id: 21,
      name: "Deep Dream",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "Transforms images using deep learning for dreamlike results.",
      keyFeatures: [
        "Deep learning",
        "Image transformation",
        "Dreamlike effects",
      ],
      link: "https://deepdreamgenerator.com",
      rating: 3,
    },
    {
      id: 22,
      name: "DeepArt",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Turn your photos into artworks using neural networks.",
      keyFeatures: [
        "Photo transformation",
        "Neural networks",
        "Artistic styles",
      ],
      link: "https://deepart.io",
      rating: 3,
    },
    {
      id: 23,
      name: "Hotpot.ai",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI tools for image editing, enhancement, and background removal.",
      keyFeatures: ["Image editing", "Enhancement", "Background removal"],
      link: "https://hotpot.ai",
      rating: 3,
    },
    {
      id: 24,
      name: "Fotor AI Art",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Photo editing and AI image generation suite.",
      keyFeatures: ["Photo editing", "Image generation", "Suite of tools"],
      link: "https://www.fotor.com/features/ai-image-generator",
      rating: 3,
    },
    {
      id: 25,
      name: "Exactly",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI for generating commercial-quality artwork.",
      keyFeatures: [
        "Commercial quality",
        "Professional artwork",
        "Business focus",
      ],
      link: "https://www.exactly.ai",
      rating: 3,
    },
    {
      id: 26,
      name: "Visual Electric",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Generative design tool for creatives and agencies.",
      keyFeatures: ["Generative design", "Creative focus", "Agency tools"],
      link: "https://visualelectric.com",
      rating: 3,
    },
    {
      id: 27,
      name: "OpenArt",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-powered art generation and prompt platform.",
      keyFeatures: ["Art generation", "Prompt platform", "Community features"],
      link: "https://openart.ai",
      rating: 3,
    },
    {
      id: 28,
      name: "Prompt Hunt",
      category: "Art Generation",
      categoryColor: "bg-orange-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Prompt library and AI art generator platform.",
      keyFeatures: ["Prompt library", "Art generation", "Platform features"],
      link: "https://prompthunt.com",
      rating: 3,
    },
    // Video Creation
    {
      id: 29,
      name: "Kling 2",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Awarded Best AI video generator for quality and affordability in recent AI awards.",
      keyFeatures: ["Video generation", "High quality", "Affordable pricing"],
      link: "https://kling.tv",
      rating: 5,
    },
    {
      id: 30,
      name: "Runway",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Creative video tools used in professional-grade content.",
      keyFeatures: [
        "Professional tools",
        "Creative video",
        "Industry standard",
      ],
      link: "https://runwayml.com",
      rating: 5,
    },
    {
      id: 31,
      name: "Synthesia",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI video avatars, voice cloning & screen-record capabilities.",
      keyFeatures: ["Video avatars", "Voice cloning", "Screen recording"],
      link: "https://www.synthesia.io",
      rating: 4,
    },
    {
      id: 32,
      name: "Descript",
      category: "Video Creation",
      categoryColor: "bg-red-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI-enhanced video and audio editor with transcription tools.",
      keyFeatures: ["Video editing", "Audio editing", "Transcription"],
      link: "https://www.descript.com",
      rating: 4,
    },
    // Design
    {
      id: 33,
      name: "Figma AI",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI-powered design assistant inside Figma.",
      keyFeatures: ["Design assistance", "Figma integration", "AI-powered"],
      link: "https://www.figma.com/blog/introducing-ai-in-figma",
      rating: 4,
    },
    {
      id: 34,
      name: "Framer",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Build and instantly publish AI-generated websites with a visual editor.",
      keyFeatures: ["Website builder", "Visual editor", "AI generation"],
      link: "https://framer.com/",
      rating: 4,
    },
    {
      id: 35,
      name: "Microsoft Designer",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "AI graphic design tool by Microsoft for creating social posts and marketing visuals.",
      keyFeatures: ["Graphic design", "Social posts", "Marketing visuals"],
      link: "https://designer.microsoft.com",
      rating: 4,
    },
    {
      id: 36,
      name: "Canva Visual Suite",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Suite of design tools with AI enhancements from Canva.",
      keyFeatures: ["Design tools", "AI enhancements", "Visual creation"],
      link: "https://www.canva.com",
      rating: 4,
    },
    {
      id: 37,
      name: "Magic Design",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Canva's AI design assistant that creates layouts from text input.",
      keyFeatures: ["Layout creation", "Text input", "AI assistant"],
      link: "https://www.canva.com/magic-design",
      rating: 4,
    },
    {
      id: 38,
      name: "Adobe Express",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Simplified Adobe suite with AI features for quick content creation.",
      keyFeatures: ["Quick creation", "Adobe suite", "AI features"],
      link: "https://express.adobe.com",
      rating: 4,
    },
    {
      id: 39,
      name: "Relume",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI tool to generate website designs and components.",
      keyFeatures: ["Website design", "Component generation", "AI-powered"],
      link: "https://relume.io",
      rating: 3,
    },
    {
      id: 40,
      name: "Kittl",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI-powered graphic design tool with templates and vector support.",
      keyFeatures: ["Graphic design", "Templates", "Vector support"],
      link: "https://www.kittl.com",
      rating: 3,
    },
    {
      id: 41,
      name: "Lummi AI",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI platform for creatives to generate branded content and marketing assets.",
      keyFeatures: ["Branded content", "Marketing assets", "Creative platform"],
      link: "https://lummi.ai",
      rating: 3,
    },
    {
      id: 42,
      name: "Headlime",
      category: "Design",
      categoryColor: "bg-pink-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Copywriting assistant powered by GPT for landing pages and ads.",
      keyFeatures: ["Copywriting", "Landing pages", "Ad creation"],
      link: "https://headlime.com",
      rating: 3,
    },
    // Development
    {
      id: 43,
      name: "GitHub Copilot",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI pair programmer that autocompletes code in real time.",
      keyFeatures: [
        "Code completion",
        "Real-time suggestions",
        "Multi-language",
      ],
      link: "https://github.com/features/copilot",
      rating: 5,
    },
    {
      id: 44,
      name: "Cursor",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-native code editor with contextual suggestions.",
      keyFeatures: [
        "AI-native editor",
        "Contextual suggestions",
        "Code completion",
      ],
      link: "https://www.cursor.so",
      rating: 5,
    },
    {
      id: 45,
      name: "Codeium",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "Free AI code completion tool for all major IDEs.",
      keyFeatures: ["Free access", "IDE integration", "Code completion"],
      link: "https://codeium.com",
      rating: 4,
    },
    {
      id: 46,
      name: "Replit Ghostwriter",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI tool that helps you write and understand code on Replit.",
      keyFeatures: ["Code writing", "Code understanding", "Replit integration"],
      link: "https://replit.com/site/ghostwriter",
      rating: 4,
    },
    {
      id: 47,
      name: "Tabnine",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI code assistant with team collaboration features.",
      keyFeatures: ["Code assistance", "Team collaboration", "AI-powered"],
      link: "https://www.tabnine.com",
      rating: 4,
    },
    {
      id: 48,
      name: "CodeWhisperer",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Amazon's coding assistant integrated into IDEs.",
      keyFeatures: ["IDE integration", "Amazon platform", "Coding assistance"],
      link: "https://aws.amazon.com/codewhisperer",
      rating: 4,
    },
    {
      id: 49,
      name: "Phind",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "AI-powered search engine for developers and engineers.",
      keyFeatures: ["Developer search", "AI-powered", "Engineering focus"],
      link: "https://www.phind.com",
      rating: 4,
    },
    {
      id: 50,
      name: "Ask Codi",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description: "Natural language to code generation and query platform.",
      keyFeatures: ["Natural language", "Code generation", "Query platform"],
      link: "https://www.askcodi.com",
      rating: 3,
    },
    {
      id: 51,
      name: "Mutable AI",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Helps refactor, document, and write code faster with AI.",
      keyFeatures: ["Code refactoring", "Documentation", "Fast coding"],
      link: "https://mutable.ai",
      rating: 3,
    },
    {
      id: 52,
      name: "Codium AI",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI that auto-generates tests and suggests improvements.",
      keyFeatures: ["Test generation", "Code improvements", "Auto-generation"],
      link: "https://www.codium.ai",
      rating: 3,
    },
    {
      id: 53,
      name: "Sweep AI",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "AI tool that helps maintain and improve your codebase.",
      keyFeatures: [
        "Codebase maintenance",
        "Code improvement",
        "AI assistance",
      ],
      link: "https://sweep.dev",
      rating: 3,
    },
    {
      id: 54,
      name: "Bito AI",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Copilot for engineers with auto-suggestions and doc generation.",
      keyFeatures: ["Auto-suggestions", "Doc generation", "Engineering focus"],
      link: "https://bito.ai",
      rating: 3,
    },
    {
      id: 55,
      name: "CodePal",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Helps you write and troubleshoot code with natural language.",
      keyFeatures: ["Code writing", "Troubleshooting", "Natural language"],
      link: "https://codepal.ai",
      rating: 3,
    },
    {
      id: 56,
      name: "Askthecode",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description: "AI assistant for code explanations and debugging.",
      keyFeatures: ["Code explanations", "Debugging", "AI assistant"],
      link: "https://askthecode.ai",
      rating: 3,
    },
    {
      id: 57,
      name: "Fronty",
      category: "Development",
      categoryColor: "bg-blue-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Converts uploaded images or drawings into HTML and CSS code using AI.",
      keyFeatures: ["Image to code", "HTML/CSS generation", "AI conversion"],
      link: "https://fronty.com/",
      rating: 3,
    },
    // Productivity
    {
      id: 58,
      name: "NotebooksLM (Google)",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "A research & note-taking assistant for analyzing data and generating summaries.",
      keyFeatures: [
        "Research assistant",
        "Data analysis",
        "Summary generation",
      ],
      link: "https://notebooklm.google",
      rating: 5,
    },
    {
      id: 59,
      name: "Zapier AI",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description: "Collections of tested AI automations for workflows.",
      keyFeatures: [
        "Workflow automation",
        "AI integration",
        "Tested collections",
      ],
      link: "https://zapier.com/blog/best-ai-productivity-tools",
      rating: 4,
    },
    {
      id: 60,
      name: "Taskade",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Visualize your tasks and notes with AI-powered productivity tools.",
      keyFeatures: ["Task visualization", "Note-taking", "AI-powered"],
      link: "https://taskade.com/",
      rating: 4,
    },
    {
      id: 61,
      name: "Tome.app",
      category: "Productivity",
      categoryColor: "bg-indigo-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "AI-powered storytelling and presentation creation platform.",
      keyFeatures: ["Storytelling", "Presentations", "AI-powered"],
      link: "https://tome.app/",
      rating: 4,
    },
    // Browser & Web Tools
    {
      id: 62,
      name: "Dia Browser",
      category: "Web Tools",
      categoryColor: "bg-teal-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "AI-integrated browser with built-in assistants for web automation.",
      keyFeatures: ["AI integration", "Web automation", "Built-in assistants"],
      link: "https://www.theverge.com/web/685232/dia-browser-ai-arc",
      rating: 3,
    },
    // Image Tools
    {
      id: 63,
      name: "Bing Image Creator",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "Generate images from natural text descriptions, powered by DALL-E.",
      keyFeatures: ["Text to image", "DALL-E powered", "Free access"],
      link: "https://www.bing.com/create",
      rating: 4,
    },
    {
      id: 64,
      name: "AutoDraw",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Free",
      premiumBadgeColor: "bg-green-500",
      description:
        "Turns freehand sketches into refined icons and illustrations.",
      keyFeatures: ["Sketch refinement", "Icon creation", "Illustrations"],
      link: "https://www.autodraw.com/",
      rating: 3,
    },
    {
      id: 65,
      name: "LetsEnhance",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Uses AI to enhance the resolution of images and photographs.",
      keyFeatures: [
        "Image enhancement",
        "Resolution improvement",
        "AI-powered",
      ],
      link: "https://letsenhance.io/",
      rating: 4,
    },
    {
      id: 66,
      name: "Remove.bg",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Free/Premium",
      premiumBadgeColor: "bg-purple-500",
      description:
        "Recognizes and removes image backgrounds effectively without requiring signup.",
      keyFeatures: ["Background removal", "No signup", "Effective recognition"],
      link: "http://remove.bg/",
      rating: 4,
    },
    {
      id: 67,
      name: "Pebblely",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "AI image generator for product images in various styles and settings.",
      keyFeatures: ["Product images", "Various styles", "Settings variety"],
      link: "https://pebblely.com/",
      rating: 3,
    },
    {
      id: 68,
      name: "Booth.ai",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Generates professional-quality product photos using AI, focused on furniture, fashion, and packaged goods.",
      keyFeatures: [
        "Product photos",
        "Professional quality",
        "Furniture & fashion",
      ],
      link: "http://booth.ai/",
      rating: 3,
    },
    {
      id: 69,
      name: "Stylized.ai",
      category: "Image Tools",
      categoryColor: "bg-cyan-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Generates product photos integrated into ecommerce platforms like Shopify.",
      keyFeatures: [
        "Product photos",
        "Ecommerce integration",
        "Shopify support",
      ],
      link: "http://stylized.ai/",
      rating: 3,
    },
    // Special Tools
    {
      id: 70,
      name: "Booking-Agent.io",
      category: "Business Tools",
      categoryColor: "bg-yellow-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Map-based event booking tool to find promoters, events, and artist schedules by location.",
      keyFeatures: ["Event booking", "Map-based", "Location search"],
      link: "https://booking-agent.io",
      rating: 3,
    },
    {
      id: 71,
      name: "V7 Labs",
      category: "Business Tools",
      categoryColor: "bg-yellow-500",
      premiumBadge: "Premium",
      premiumBadgeColor: "bg-blue-500",
      description:
        "Categorized list of 35+ best AI tools for writing, coding, image/video.",
      keyFeatures: ["Tool directory", "Categorized list", "Multiple domains"],
      link: "https://www.v7labs.com/blog/best-ai-tools-listed",
      rating: 3,
    },
  ];
  const categories = [
    "All",
    "AI Assistant",
    "Art Generation",
    "Video Creation",
    "Design",
    "Development",
    "Productivity",
    "Image Tools",
    "Web Tools",
    "Business Tools",
  ];
  const categoryIcons = {
    All: Sparkles,
    "AI Assistant": Bot,
    "Art Generation": Palette,
    "Video Creation": Video,
    Design: Layers,
    Development: Code,
    Productivity: Briefcase,
    "Image Tools": Image,
    "Web Tools": Globe,
    "Business Tools": Zap,
  };
  const filteredTools = useMemo(() => {
    let filtered = toolsData.filter((tool) => {
      return selectedCategory === "All" || tool.category === selectedCategory;
    });
    // Sort by rating (highest first), then by name
    filtered.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name);
    });
    return filtered;
  }, [selectedCategory]);
  const handleVisitTool = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-3">
        <div className="text-center mb-8 pb-4">
          <h1 className="font-display text-4xl md:text-5xl">AI Toolkit</h1>
        </div>
        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-black rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-heading">
                BROWSE BY CATEGORY
              </h3>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-brand-red text-black font-bold h-12 border-none">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Select Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-800">
                {categories.map((category) => {
                  const IconComponent =
                    categoryIcons[category as keyof typeof categoryIcons];
                  return (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-brand-red hover:text-black focus:bg-brand-red focus:text-black"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {category}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Results Count */}
        <div className="mb-6 text-center">
        </div>
        {/* Tools Grid - Enhanced mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="bg-black border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col h-full group hover:scale-105"
            >
              <CardHeader className="p-4 md:p-5 pb-3 md:pb-4 flex-shrink-0">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    className={`${tool.categoryColor} text-white text-xs font-medium px-2 py-1 rounded flex-shrink-0`}
                  >
                    {tool.category}
                  </Badge>
                  {tool.premiumBadge && (
                    <Badge
                      className={`${tool.premiumBadgeColor} text-white text-xs font-medium px-2 py-1 rounded flex-shrink-0`}
                    >
                      {tool.premiumBadge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">
                  {tool.name}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {tool.description}
                </p>
              </CardHeader>
              <CardContent className="p-4 md:p-5 pt-0 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h4 className="text-orange-400 text-xs md:text-sm font-semibold mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1 mb-3 md:mb-4">
                    {tool.keyFeatures.slice(0, 2).map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-xs md:text-sm flex items-start"
                      >
                        <span className="text-orange-400 mr-1 md:mr-2">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => handleVisitTool(tool.link)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-4 md:px-4 rounded transition-colors duration-200 mt-auto text-sm md:text-sm min-h-[44px] touch-manipulation"
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
          <div className="bg-black rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-heading text-white mb-4">
              MISSING A TOOL?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-body">
              Know of an amazing AI tool that should be in our collection? Let
              us know and we'll add it for everyone to discover.
            </p>
            <Button className="bg-brand-red text-black hover:bg-brand-red-hover font-button px-6 py-3">
              <Sparkles className="w-4 h-4 mr-2" />
              SUGGEST A TOOL
            </Button>
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
