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
          name: "SORA",
          link: "https://openai.com/sora",
          status: "recommended",
        },
        {
          name: "Midjourney",
          link: "https://midjourney.com",
          status: "popular",
        },
        {
          name: "DALL-E 3",
          link: "https://openai.com/dall-e-3",
          status: "featured",
        },
        {
          name: "Stable Diffusion",
          link: "https://stability.ai",
          status: "free",
        },
        {
          name: "Adobe Firefly",
          link: "https://firefly.adobe.com",
          status: "pro",
        },
        { name: "Leonardo AI", link: "https://leonardo.ai", status: "new" },
        { name: "Ideogram", link: "https://ideogram.ai", status: "popular" },
        { name: "Flux", link: "https://flux.1.ai", status: "new" },
        {
          name: "Playground AI",
          link: "https://playgroundai.com",
          status: "free",
        },
        {
          name: "NightCafe",
          link: "https://nightcafe.studio",
          status: "popular",
        },
        { name: "Artbreeder", link: "https://artbreeder.com", status: "free" },
        { name: "DeepAI", link: "https://deepai.org", status: "free" },
        { name: "Dream by WOMBO", link: "https://dream.ai", status: "free" },
        { name: "Craiyon", link: "https://craiyon.com", status: "free" },
        { name: "BlueWillow", link: "https://bluewillow.ai", status: "free" },
        { name: "Lexica", link: "https://lexica.art", status: "popular" },
        { name: "Dezgo", link: "https://dezgo.com", status: "free" },
        { name: "Mage", link: "https://mage.space", status: "free" },
        { name: "PixAI", link: "https://pixai.art", status: "new" },
        { name: "Tensor Art", link: "https://tensor.art", status: "new" },
        { name: "SeaArt", link: "https://seaart.ai", status: "popular" },
        { name: "Civitai", link: "https://civitai.com", status: "popular" },
      ],
    },
    {
      title: "Video Creation",
      icon: Video,
      tools: [
        { name: "RunwayML", link: "https://runwayml.com", status: "pro" },
        { name: "Pika Labs", link: "https://pikalabs.ai", status: "new" },
        { name: "Luma AI", link: "https://lumalabs.ai", status: "new" },
        {
          name: "Stable Video",
          link: "https://stability.ai/video",
          status: "new",
        },
        { name: "Synthesia", link: "https://synthesia.io", status: "pro" },
        { name: "D-ID", link: "https://d-id.com", status: "popular" },
        { name: "HeyGen", link: "https://heygen.com", status: "pro" },
        { name: "Pictory", link: "https://pictory.ai", status: "popular" },
        { name: "InVideo", link: "https://invideo.io", status: "popular" },
        { name: "Lumen5", link: "https://lumen5.com", status: "popular" },
        { name: "Fliki", link: "https://fliki.ai", status: "new" },
        { name: "Steve AI", link: "https://steve.ai", status: "popular" },
        { name: "Kapwing", link: "https://kapwing.com", status: "free" },
        { name: "Hour One", link: "https://hourone.ai", status: "pro" },
        { name: "Elai", link: "https://elai.io", status: "pro" },
        { name: "Colossyan", link: "https://colossyan.com", status: "pro" },
        {
          name: "Raw Shorts",
          link: "https://rawshorts.com",
          status: "popular",
        },
        { name: "Rephrase AI", link: "https://rephrase.ai", status: "pro" },
        { name: "Vyond", link: "https://vyond.com", status: "pro" },
        { name: "Moovly", link: "https://moovly.com", status: "popular" },
        { name: "Clipchamp", link: "https://clipchamp.com", status: "free" },
        { name: "Flexclip", link: "https://flexclip.com", status: "popular" },
      ],
    },
    {
      title: "Audio & Music",
      icon: Mic,
      tools: [
        {
          name: "ElevenLabs",
          link: "https://elevenlabs.io",
          status: "recommended",
        },
        { name: "Mubert", link: "https://mubert.com", status: "popular" },
        { name: "Speechify", link: "https://speechify.com", status: "popular" },
        { name: "Resemble AI", link: "https://resemble.ai", status: "pro" },
        { name: "Descript", link: "https://descript.com", status: "pro" },
        { name: "AIVA", link: "https://aiva.ai", status: "popular" },
        { name: "Amper Music", link: "https://ampermusic.com", status: "pro" },
        { name: "Boomy", link: "https://boomy.com", status: "free" },
        { name: "Soundful", link: "https://soundful.com", status: "popular" },
        { name: "LALAL.AI", link: "https://lalal.ai", status: "popular" },
        { name: "VoiceMod", link: "https://voicemod.net", status: "free" },
        {
          name: "Replica Studios",
          link: "https://replicastudios.com",
          status: "pro",
        },
        { name: "Podcastle", link: "https://podcastle.ai", status: "popular" },
        { name: "Krisp", link: "https://krisp.ai", status: "popular" },
        {
          name: "Adobe Podcast",
          link: "https://podcast.adobe.com",
          status: "free",
        },
        {
          name: "Cleanvoice",
          link: "https://cleanvoice.ai",
          status: "popular",
        },
        { name: "Beatoven", link: "https://beatoven.ai", status: "new" },
        { name: "Endel", link: "https://endel.io", status: "popular" },
        { name: "Brain.fm", link: "https://brain.fm", status: "popular" },
        { name: "Melodie", link: "https://melodie.ai", status: "new" },
        { name: "Sonantic", link: "https://sonantic.io", status: "pro" },
        {
          name: "WellSaid Labs",
          link: "https://wellsaidlabs.com",
          status: "pro",
        },
      ],
    },
    {
      title: "Design & Graphics",
      icon: Palette,
      tools: [
        { name: "Canva AI", link: "https://canva.com", status: "featured" },
        { name: "Figma AI", link: "https://figma.com", status: "pro" },
        {
          name: "Adobe Sensei",
          link: "https://adobe.com/sensei",
          status: "pro",
        },
        { name: "Looka", link: "https://looka.com", status: "popular" },
        { name: "Logomaker", link: "https://logomaker.com", status: "popular" },
        { name: "Brandmark", link: "https://brandmark.io", status: "popular" },
        {
          name: "Tailor Brands",
          link: "https://tailorbrands.com",
          status: "popular",
        },
        {
          name: "Hatchful",
          link: "https://hatchful.shopify.com",
          status: "free",
        },
        { name: "Designs AI", link: "https://designs.ai", status: "popular" },
        {
          name: "Beautiful AI",
          link: "https://beautiful.ai",
          status: "popular",
        },
        { name: "Gamma", link: "https://gamma.app", status: "new" },
        { name: "Tome", link: "https://tome.app", status: "new" },
        {
          name: "Simplified",
          link: "https://simplified.com",
          status: "popular",
        },
        { name: "Clipdrop", link: "https://clipdrop.co", status: "popular" },
        { name: "Remove.bg", link: "https://remove.bg", status: "popular" },
        { name: "Vectorize", link: "https://vectorize.io", status: "popular" },
        { name: "Upscaler", link: "https://upscaler.ai", status: "popular" },
        { name: "Photor", link: "https://photor.io", status: "new" },
        {
          name: "Let's Enhance",
          link: "https://letsenhance.io",
          status: "popular",
        },
        { name: "Palette", link: "https://palette.fm", status: "popular" },
        { name: "ColorMind", link: "https://colormind.io", status: "free" },
        { name: "Khroma", link: "https://khroma.co", status: "free" },
      ],
    },
    {
      title: "Writing & Content",
      icon: FileText,
      tools: [
        {
          name: "GPT-4",
          link: "https://openai.com/gpt-4",
          status: "recommended",
        },
        { name: "Claude", link: "https://claude.ai", status: "popular" },
        { name: "Jasper", link: "https://jasper.ai", status: "pro" },
        { name: "Copy.ai", link: "https://copy.ai", status: "popular" },
        {
          name: "Writesonic",
          link: "https://writesonic.com",
          status: "popular",
        },
        { name: "Grammarly", link: "https://grammarly.com", status: "popular" },
        { name: "Notion AI", link: "https://notion.so/ai", status: "popular" },
        { name: "Rytr", link: "https://rytr.me", status: "free" },
        { name: "ShortlyAI", link: "https://shortlyai.com", status: "popular" },
        { name: "Anyword", link: "https://anyword.com", status: "pro" },
        { name: "Sudowrite", link: "https://sudowrite.com", status: "popular" },
        {
          name: "ContentBot",
          link: "https://contentbot.ai",
          status: "popular",
        },
        {
          name: "Article Forge",
          link: "https://articleforge.com",
          status: "pro",
        },
        { name: "WordAI", link: "https://wordai.com", status: "pro" },
        { name: "Quillbot", link: "https://quillbot.com", status: "free" },
        { name: "Hemingway", link: "https://hemingwayapp.com", status: "free" },
        {
          name: "ProWritingAid",
          link: "https://prowritingaid.com",
          status: "popular",
        },
        { name: "Frase", link: "https://frase.io", status: "pro" },
        { name: "MarketMuse", link: "https://marketmuse.com", status: "pro" },
        { name: "Surfer SEO", link: "https://surferseo.com", status: "pro" },
        { name: "Clearscope", link: "https://clearscope.io", status: "pro" },
        { name: "Textio", link: "https://textio.com", status: "pro" },
      ],
    },
    {
      title: "Enhancement Tools",
      icon: Wand2,
      tools: [
        { name: "Upscayl", link: "https://upscayl.github.io", status: "free" },
        {
          name: "Real-ESRGAN",
          link: "https://github.com/xinntao/Real-ESRGAN",
          status: "free",
        },
        { name: "Waifu2x", link: "https://waifu2x.udp.jp", status: "free" },
        {
          name: "AI Image Enlarger",
          link: "https://imglarger.com",
          status: "free",
        },
        { name: "Bigjpg", link: "https://bigjpg.com", status: "free" },
        { name: "VanceAI", link: "https://vanceai.com", status: "popular" },
        { name: "Topaz Labs", link: "https://topazlabs.com", status: "pro" },
        {
          name: "DVDFab",
          link: "https://dvdfab.cn/enlarger-ai",
          status: "pro",
        },
        { name: "Neural Love", link: "https://neural.love", status: "popular" },
        {
          name: "Deep Image",
          link: "https://deep-image.ai",
          status: "popular",
        },
        { name: "Icons8", link: "https://icons8.com/upscaler", status: "free" },
        {
          name: "Adobe Camera Raw",
          link: "https://adobe.com/products/camera-raw",
          status: "pro",
        },
        {
          name: "ON1 Resize",
          link: "https://on1.com/products/resize",
          status: "pro",
        },
        { name: "PhotoZoom", link: "https://photozoom.com", status: "pro" },
        { name: "Reshade", link: "https://reshade.me", status: "free" },
        {
          name: "Noise Reduction",
          link: "https://denoise.io",
          status: "popular",
        },
        {
          name: "Clipping Magic",
          link: "https://clippingmagic.com",
          status: "popular",
        },
        {
          name: "PhotoScissors",
          link: "https://photoscissors.com",
          status: "popular",
        },
        { name: "InPixio", link: "https://inpixio.com", status: "popular" },
        { name: "Luminar AI", link: "https://luminar.ai", status: "pro" },
        {
          name: "DxO PureRAW",
          link: "https://dxo.com/dxo-pureraw",
          status: "pro",
        },
        { name: "Perfectly Clear", link: "https://eyeq.photos", status: "pro" },
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

  const getToolDescription = (toolName: string) => {
    const descriptions: { [key: string]: string } = {
      SORA: "Advanced AI video generation with text-to-video capabilities",
      RunwayML: "Creative AI video tools for filmmakers and content creators",
      "Pika Labs": "AI video creation platform with text and image inputs",
      "Stable Video Diffusion":
        "Open source video generation model by Stability AI",
      Synthesia: "AI video generation with virtual avatars and voiceovers",
      "InVideo AI": "AI-powered video creation and editing platform",
      "DALL-E 3": "Advanced AI image generation from OpenAI",
      Midjourney: "High-quality AI art and image generation",
      "Stable Diffusion": "Open-source AI image generation",
      "Leonardo AI": "Professional AI image generation platform",
      Ideogram: "AI image generation with text rendering",
      "Adobe Firefly": "Creative AI tools from Adobe",
      ChatGPT: "Advanced AI language model for text generation",
      Claude: "AI assistant for analysis and creative work",
      Gemini: "Google's advanced AI language model",
      Copilot: "Microsoft's AI assistant and creative companion",
      Perplexity: "AI-powered research and answer engine",
      Writesonic: "AI writing and content creation platform",
      ElevenLabs: "Ultra-realistic voice synthesis and cloning technology",
      Mubert: "AI-generated music and soundtracks",
      Speechify: "AI voice generation and text-to-speech",
      "Resemble AI": "AI voice cloning and synthesis platform",
      Descript: "AI-powered audio and video editing",
      AIVA: "AI composer for original music creation",
      "Canva AI": "AI-powered design assistance for graphics and layouts",
      "Figma AI": "AI plugins and features for design workflows",
      "Adobe Sensei": "AI tools integrated across Adobe Creative Suite",
      Looka: "AI logo and brand design platform",
      Upscayl: "AI image upscaling for higher resolution and quality",
      "Remove.bg": "AI-powered background removal for images",
    };
    return (
      descriptions[toolName] || "AI-powered creative tool for professionals"
    );
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

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {toolCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            {/* Category Header */}
            <div className="bg-black rounded-lg px-6 py-4 border-2 border-gray-800">
              <div className="flex items-center space-x-3">
                <category.icon className="w-5 h-5 text-brand-red" />
                <h2
                  className="text-xl font-black text-brand-red"
                  style={{ fontWeight: 900 }}
                >
                  {category.title}
                </h2>
              </div>
            </div>

            {/* Tools Container */}
            <div className="bg-black rounded-lg p-4 border-2 border-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-brand-red rounded border-2 border-transparent hover:border-brand-red hover:shadow-lg transition-all duration-200 p-4 h-32 flex flex-col justify-between"
                  >
                    <div className="flex-1 flex flex-col justify-center text-center">
                      <h3
                        className="text-black font-black text-xl leading-tight mb-1"
                        style={{
                          fontWeight: 900,
                          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        {tool.name.toUpperCase()}
                      </h3>
                      <p className="text-black text-xs leading-tight line-clamp-1 mb-3 opacity-80">
                        {getToolDescription(tool.name)}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="bg-black text-brand-red hover:bg-brand-red hover:text-black font-black text-xs py-1.5 px-4 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                        style={{ fontWeight: 900 }}
                        onClick={() => window.open(tool.link, "_blank")}
                      >
                        CLICK HERE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
