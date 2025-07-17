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
} from "lucide-react";

const FONT_STYLE = {
  fontFamily: "Poppins, sans-serif",
};

const TYPOGRAPHY = {
  title: { ...FONT_STYLE, fontWeight: "700" },
  subtitle: { ...FONT_STYLE, fontWeight: "600" },
  heading: { ...FONT_STYLE, fontWeight: "500" },
  body: { ...FONT_STYLE, fontWeight: "400" },
  button: { ...FONT_STYLE, fontWeight: "600" },
};

export default function Playbook() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);

  const sections = [
    {
      id: 1,
      title: "Introduction to Sora Image Generation",
      icon: BookOpen,
      content: {
        overview:
          "Sora is OpenAI's advanced platform that extends ChatGPT into a visual creator – allowing you to generate images simply by describing them. It leverages the latest GPT-4o image generation model, which is natively multimodal and built into ChatGPT.",
        howItWorks:
          "You simply describe the image you want in natural language, and the AI produces a picture matching your description. For example, 'A young woman in a red coat walking through a snowy forest, photorealistic style.' The AI interprets every detail and creates accordingly.",
        whySpecial:
          "GPT-4o is a significant leap over previous image generators. It offers much better accuracy in complex scenes and text rendering. It can correctly handle 15–20 distinct elements with the right attributes in one image – a big improvement in reliability. It also produces readable text (signs, logos, labels) far more consistently than before.",
        whoFor:
          "Everyone! From beginners who have never used an image generator, to intermediate users looking to fine-tune prompts, to experts wanting to automate image generation. Whether you're a marketer needing quick visuals, a designer prototyping ideas, or just exploring AI art.",
      },
    },
    {
      id: 2,
      title: "Basics of Prompting (Prompting 101)",
      icon: Lightbulb,
      content: {
        principles: [
          {
            title: "Be Specific and Clear",
            description:
              "Provide concrete details about what you want. The more specific the prompt, the better the image quality. 'A young man in a blue suit waiting at a New York City bus stop on a rainy night' vs 'a person in a city'. Include key attributes like colors, setting, and distinctive features.",
          },
          {
            title: "Mention the Style or Mood",
            description:
              "The same scene can look very different as a realistic photo versus a cartoon. Include style descriptors to guide the AI's artistic approach. For example: 'photorealistic style with 4K detail' or 'vintage comic book style' or 'with a serene, warm mood.'",
          },
          {
            title: "Start Simple (Then Iterate)",
            description:
              "Begin with a fairly simple prompt focusing on one subject or scene. Using one sentence with basic structure is a good start. Once you see the first result, you can add more details or clarify anything that wasn't right. Treat the first image as a draft.",
          },
          {
            title: "Use Natural Language",
            description:
              "Write in plain, descriptive sentences instead of disjointed keyword lists. 'A curious red fox exploring a misty autumn forest at dawn, golden sunlight filtering through the trees' works better than 'fox, forest, misty, sunlight, 8k'.",
          },
          {
            title: "Check Output and Refine",
            description:
              "After the image is generated, evaluate it critically. Does it match your mental image? Use this insight to refine your next prompt. You can also ask ChatGPT for help improving prompts between generations.",
          },
        ],
        progression: {
          beginner: "Photo of a cat sitting on a windowsill.",
          advanced:
            "A tabby cat lounging on a sunny windowsill with soft morning light filtering through lace curtains, looking outside at birds.",
          expert:
            "Candid pet photography, close-up shot of a green-eyed tabby cat lounging on a sunlit Victorian bay window, rays of golden morning light patterning its fur through ornate lace curtains. Shot with shallow depth of field (85mm f/1.8).",
        },
      },
    },
    {
      id: 3,
      title: "Key Prompt Components & Variables",
      icon: Database,
      content: {
        formula:
          "[Subject] + [Action/Pose] + [Environment/Setting] + [Lighting] + [Camera Details] + [Style/Mood] + [Quality Parameters]",
        description:
          "Not every prompt needs all components, but this formula reminds you of available options.",
        components: [
          {
            name: "Subject Description",
            description:
              "The main focus of your image. Be specific about physical attributes, clothing, species, size, color, material, etc. If it's a person, mention age, gender, clothing, distinctive features. For objects, describe color, texture, size.",
            example: "'a small fluffy brown dog' vs 'a dog'",
          },
          {
            name: "Action/Pose",
            description:
              "What is the subject doing? This gives the image dynamism and context. For people: running, smiling, reading, dancing. For static subjects, describe pose or expression like 'standing triumphantly' or 'sitting cross-legged while meditating'.",
            example:
              "'a woman reading a book' vs 'a woman dancing in the rain'",
          },
          {
            name: "Environment/Setting",
            description:
              "Where is the image taking place? Include details like weather, time of day, era if relevant. The setting often dictates the overall color palette and atmosphere.",
            example:
              "'in a busy market street in Tokyo' vs 'on the surface of the moon'",
          },
          {
            name: "Lighting",
            description:
              "One of the most powerful tools to set mood. Describe quality, source, and direction of light. Is it day or night? Sunny or cloudy? Soft and diffused or harsh and direct?",
            example:
              "'soft morning sunlight' vs 'dramatic studio spotlight' vs 'neon purple lighting'",
          },
          {
            name: "Camera Details/Composition",
            description:
              "Camera angle, lens choice, depth of field. This is useful for photography-like results. Include angle (high, low, eye-level), lens type (85mm portrait, fisheye), and composition (rule of thirds, centered).",
            example:
              "'close-up shot (85mm lens)' vs 'wide-angle shot' vs 'bird's-eye view'",
          },
          {
            name: "Style/Mood",
            description:
              "The artistic style, genre, or emotional tone. Art movements (impressionist, pop art), time periods (Victorian-era, 1980s film), or emotional atmosphere (peaceful, eerie, luxurious).",
            example:
              "'in the style of Studio Ghibli' vs 'photorealistic' vs 'oil painting'",
          },
          {
            name: "Quality Parameters",
            description:
              "Additional terms to push for higher fidelity. While GPT-4o is high-quality by default, you can still mention resolution emphasis or specific detail requirements.",
            example:
              "'high resolution, 4K detail, ultra-realistic, sharp focus'",
          },
        ],
      },
    },
    {
      id: 4,
      title: "Lifestyle Photography Prompts",
      icon: Camera,
      content: {
        description:
          "Lifestyle images depict people in everyday situations in a candid, relatable way. The goal is to tell a story or convey authenticity – as if the photo is a slice of life, not a posed studio shot.",
        characteristics: [
          {
            title: "Everyday Scenarios",
            description:
              "Focus on common activities or moments that people can relate to. Think activities like reading on a sofa, playing with kids, walking a dog, shopping at a farmer's market. The scenario should feel unscripted and real.",
            example:
              "'friends laughing at a café' or 'a family cooking together in a home kitchen'",
          },
          {
            title: "Natural, Candid Vibe",
            description:
              "Use descriptors like 'candid,' 'unposed,' 'in the moment,' 'photojournalistic style' to get that spontaneous look. Include authentic expressions or interactions.",
            example:
              "'a candid shot of a couple dancing in the living room' or 'a mother and daughter sharing a genuine laugh over ice cream'",
          },
          {
            title: "Environmental Context",
            description:
              "Don't neglect the background – include props and context that create a sense of realism and story. These elements make the scene heartwarming and believable.",
            example:
              "'sunlight coming through the window over the sink' or 'surrounded by open books and a sleeping cat'",
          },
          {
            title: "Natural Lighting",
            description:
              "Typically use available light rather than dramatic studio lighting. Specify 'soft morning light,' 'warm late-afternoon sun,' or 'cozy lamp light.' Keep lighting realistic for the scenario.",
            example:
              "'soft warm lamp light with shadows on the wall' for an indoor evening scene",
          },
        ],
        fullExample:
          "Candid street photography of a bustling Bangkok night market, with a young couple smiling while trying street food at a vendor stall. Warm overhead lantern light and neon signs illuminate the crowded alley. The atmosphere is lively and authentic, with people and food carts in the background.",
      },
    },
    {
      id: 5,
      title: "Product & Studio Photography",
      icon: Package,
      content: {
        description:
          "Product photography focuses on showcasing an item in the best possible light – usually literally! These images highlight features, design, and appeal of a product.",
        techniques: [
          {
            title: "Isolate the Product",
            description:
              "A classic product photo has the product clearly visible, often centered against a clean background. White is standard for catalogs, but you might use black or solid colors for dramatic effect.",
            example:
              "'A studio photo of a single wristwatch, centered on a white background with a slight reflection beneath it'",
          },
          {
            title: "Lighting & Reflections",
            description:
              "Lighting is everything in studio photography. For shiny objects (electronics, jewelry, glassware), specify soft diffuse light or two-point lighting setup to avoid harsh glare.",
            example:
              "'Product shot of a smartphone with soft diffused lighting to minimize harsh reflections' or 'two-point studio lighting (key light and fill light)'",
          },
          {
            title: "Camera and Focus",
            description:
              "Generally want sharp focus on the product. Specify 'ultra-sharp focus on the product' and consider angles: 'front angle,' 'top-down view,' '45-degree angle,' depending on what best presents the item.",
            example:
              "'close-up shot of the smartphone from a 45-degree angle, showing its screen and side buttons in detail'",
          },
          {
            title: "Contextual vs. Isolated",
            description:
              "Decide if you want props or context. A purely isolated shot is common for catalogs. Sometimes context can make the image more appealing while still highlighting the product.",
            example:
              "'a luxury watch on a marble surface with soft reflection' vs '{Product} against plain background'",
          },
        ],
        expertExample:
          "Hero shot of new smartphone levitating above a matte black pedestal, against a dimly lit studio with two-point lighting (cool blue fill from left, soft white key from right). Minimal reflections on the screen display a faint home screen glow. Detailed highlights on the phone's metallic edges. Background in deep shadow with a subtle bokeh of city lights. Ultra-sharp, 4K detail.",
      },
    },
    {
      id: 6,
      title: "Custom Graphics & Design",
      icon: Palette,
      content: {
        description:
          "Sora can create graphic designs, illustrations, logos, icons, posters, and images that include text elements. Here's how to harness it for design-oriented outputs.",
        categories: [
          {
            title: "Logo Creation",
            description:
              "Logos need to be simple, distinct, and scalable. Emphasize simplicity and style. Because GPT-4o can render text better than previous models, you can include words in logos.",
            tips: [
              "Specify simplicity: 'minimalist,' 'flat design,' 'simple icon,' 'emblem-style'",
              "Mention style: 'modern,' 'vintage,' 'playful,' 'corporate'",
              "Include colors: 'Uses teal and gold colors' or 'black and white only'",
              "For text: Keep short and use quotes. 'logo with the word \"SIP\" below the cup illustration'",
              "Background: 'on transparent background' or 'on solid white background'",
            ],
            example:
              "A modern minimalist logo for a coffee shop: features a simple line art of a coffee cup and a bean, with warm brown and cream colors, on a plain white background.",
          },
          {
            title: "Text Rendering in Images",
            description:
              "GPT-4o can render readable text in images much better than past models. This means you can create posters, flyers, social media graphics, or diagrams with labels.",
            tips: [
              "Be concise with text: Short phrases or titles work best",
              "Use quotes for desired text: 'A movie poster with the title \"Into the Unknown\" at the top'",
              "Describe typography: 'handwritten-style text,' '3D metallic letters,' 'large gold font centered'",
              "Combine with imagery: Describe the graphic part along with where text goes",
            ],
            example:
              "A concert poster for a rock band. At the top, bold graffiti-style text says 'Live Tonight'. In the center, an electric guitar with wings illustration. At the bottom, the band name 'The Ravens' in big silver letters, and below that in smaller text the date 'July 4, 2025'. Dark background, grunge art style.",
          },
          {
            title: "Graphic Illustrations & Icons",
            description:
              "For custom illustrations or icons (websites, presentations, etc.), describe them with style cues and specify the artistic approach.",
            tips: [
              "Mention art style: 'flat vector illustration,' '3D isometric icon,' 'chalk sketch,' 'pixel art'",
              "For icons: specify shape or medium: 'app icon style,' 'material design style'",
              "For complex graphics: ask for infographics or diagrams with labels",
              "Use terms like 'vector,' 'flat design,' 'cartoon,' 'symbol' for graphic style",
            ],
            example:
              "An illustration of a business growth chart: a simple graphic of an upward arrow on a bar chart, in flat design style, vector-like, blue and white colors.",
          },
        ],
      },
    },
    {
      id: 7,
      title: "Scene Regeneration & Image Editing",
      icon: RefreshCw,
      content: {
        description:
          "One of Sora's most powerful features is iteratively editing or building on images through conversation. This is like having an intelligent Photoshop that responds to simple language commands.",
        howItWorks:
          "Because Sora's image generation is part of GPT-4o, it maintains context of previous images in the chat. You can say 'Now make it nighttime in the image' or 'Please add a tree to the left side' and it will attempt to comply in the next image.",
        techniques: [
          {
            title: "Identify Elements Clearly",
            description:
              "When referring to parts of the image, use descriptors that make sense from the image's perspective. The more clearly you can point out what you want changed, the less confusion.",
            example:
              "'the red car in the background,' 'the text on the sign,' 'the woman on the left'",
          },
          {
            title: "Spatial and Positional Language",
            description:
              "Use words like left, right, center, top, bottom, foreground, background. This helps the model know where to make the change.",
            example:
              "'Add a full moon in the top-right corner of the sky' or 'Place a vase of flowers on the table in the foreground'",
          },
          {
            title: "One Change at a Time",
            description:
              "It's usually best to make one significant edit per turn. If you ask for too many alterations at once, some might be missed or done incorrectly.",
            example:
              "Instead of changing lighting AND adding objects AND removing elements all at once, do step-by-step: 1) 'Make it evening with lamps on' 2) 'Add a cat on the sofa' 3) 'Remove the painting on the wall'",
          },
          {
            title: "Maintain Consistency",
            description:
              "When adding new elements, try to match the style of the existing image. Mention 'in the same art style' or 'with the same lighting' for seamless additions.",
            example:
              "'Add a realistic oak tree in the same photorealistic style and lighting as the rest of the image'",
          },
          {
            title: "Object Removal",
            description:
              "You can instruct Sora to remove or erase something by telling it so. The AI will attempt to fill in the area naturally.",
            example:
              "'Remove the second plate from the table,' 'erase the text on the sign,' 'completely erase any trace of the person in the background'",
          },
        ],
        exampleSequence: [
          "Initial: 'A group of friends having a picnic on a sunny day in the park'",
          "Edit 1: 'Make it look like early evening, with a vibrant sunset sky'",
          "Edit 2: 'Add string lights hanging between the trees to create a cozy atmosphere'",
          "Edit 3: 'Everyone's clothing should be a bit warmer (light jackets), since it's evening now'",
        ],
      },
    },
    {
      id: 8,
      title: "Using the Prompt Vault",
      icon: Settings,
      content: {
        description:
          "The Prompt Vault is an advanced feature designed to help you construct high-quality prompts using a guided formula. Think of it as a prompt builder that combines your creative vision with curated professional keywords and reference images.",
        steps: [
          {
            title: "Start with Your Vision",
            description:
              "In the Prompt Vault interface, write your creative vision in natural language. Don't worry about formatting or keywords yet, just express your idea.",
            example:
              "'a portrait of an astronaut in a surreal neon city' or 'an illustration of a panda eating noodles, in 3D cartoon style'",
          },
          {
            title: "Upload a Reference Image (Optional)",
            description:
              "If you have an image for inspiration or context, upload it. This image will be incorporated as a reference for Sora, ensuring it uses it as guidance for style transfer or maintaining character looks.",
            example:
              "Upload a color palette image, style reference, or sketch you drew",
          },
          {
            title: "Select Keywords from Categories",
            description:
              "Browse curated keywords organized by categories (lighting, camera, style, mood, etc.) and click ones that fit your vision. These are professionally chosen terms that Sora understands well.",
            example:
              "Under 'Lighting': 'golden hour', 'dramatic shadows'. Under 'Style': 'Baroque painting', 'Studio Ghibli style'",
          },
          {
            title: "Review the Complete Formula",
            description:
              "The vault compiles everything into a structured prompt, automatically sorted for optimal understanding by Sora. Review this output and tweak if needed.",
            example:
              "The vault might produce: 'Digital painting concept art of a female pirate captain... dramatic lightning, moonlit... portrait framing... --reference (image)'",
          },
          {
            title: "Copy and Paste into Sora",
            description:
              "Once happy with the prompt formula, copy it and paste into the ChatGPT/Sora chat to execute.",
            example:
              "The polished prompt is ready to use as you would any prompt in ChatGPT's image mode",
          },
        ],
        proTips: [
          "Structured approach: The vault ensures you don't forget a variable, especially useful if you're not comfortable juggling all prompt components",
          "Reference images are powerful: Upload sketches, color palettes, or style references for guidance",
          "Quality meter guidance: Shows how comprehensive your prompt is - try to fill in major components",
          "Pre-vetted keywords: Uses terms known to work well like '4K', 'bokeh', 'dramatic lighting', 'concept art'",
          "Continue iterating: After generating with vault prompt, you can still edit further or try variations",
        ],
      },
    },
    {
      id: 9,
      title: "Tips, Best Practices & Warnings",
      icon: AlertTriangle,
      content: {
        bestPractices: [
          {
            title: "Avoid Ambiguity",
            description:
              "If a word could mean multiple things, clarify it. 'Jaguar' could be animal or car. 'Bank' could be river bank or financial bank. Add context to resolve ambiguity.",
            example:
              "'a jaguar cat resting on a tree branch' vs 'a Jaguar sports car on a racetrack'",
          },
          {
            title: "Be Specific, Avoid Redundancy",
            description:
              "While details are good, don't pile on adjectives that repeat the same idea. Each word should add new information. One or two strong adjectives are better than a chain of similar ones.",
            example:
              "'a stunning sunset with vibrant orange and pink hues' vs 'a nice beautiful pretty sunset with lovely gorgeous colors'",
          },
          {
            title: "Test Complex Ideas in Chunks",
            description:
              "If you have a very elaborate scene, build it piece by piece. Test simple concepts first, then gradually add complexity through iterations or edits.",
            example:
              "Start with 'steampunk city with flying cars', then add 'distant medieval castle', then 'vintage robots on streets'",
          },
          {
            title: "Leverage ChatGPT's Help",
            description:
              "Since Sora is within ChatGPT, you can have a dialogue about the prompt itself. Ask ChatGPT to help improve prompts or generate variations before making images.",
            example:
              "'I want to create an image of X, how should I phrase the prompt?' or 'Give me three variations of a prompt for a fantasy landscape'",
          },
          {
            title: "Use Remix (Variations)",
            description:
              "If you generate an image that's close but not perfect, try re-running the same prompt. There's randomness in generation, so often the second or third try gives better results.",
            example:
              "Copy the prompt and send again, or make tiny tweaks for variations",
          },
        ],
        warnings: [
          {
            title: "Disallowed Content",
            description:
              "Sora will refuse to generate images that violate OpenAI's content guidelines: violent gore, sexual explicit content, hate symbols, etc. Keep prompts PG-13 at worst.",
            consequence:
              "System detects and blocks, often giving you a warning",
          },
          {
            title: "No Real Person Likeness",
            description:
              "Don't create images of real individuals, especially private figures or without consent. Instead, describe generic types or roles.",
            example:
              "'an elderly man' or 'a businesswoman in her 30s' vs 'Tom Cruise' or 'my neighbor'",
          },
          {
            title: "No Trademark or Infringement",
            description:
              "Don't prompt for specific trademarked logos or characters. The model might refuse or create distorted versions. Use generic descriptions instead.",
            example:
              "'a cartoon mouse in red shorts' vs 'Mickey Mouse', or 'a soda can with red and white label' vs 'Coca-Cola logo'",
          },
          {
            title: "Realism and Sensitive Subjects",
            description:
              "Be careful with photo-real images of public figures or scenarios that could be misinformation. Use AI images responsibly and ethically.",
            consequence:
              "Could be misinformation or defamatory, even though OpenAI includes metadata marking images as AI-generated",
          },
        ],
        troubleshooting: [
          {
            title: "Conflicting Instructions",
            description:
              "Check if your prompt has contradictions like 'bright night scene' or 'empty crowded room'. Make sure everything aligns logically.",
            solution:
              "Clarify: 'a night scene illuminated by bright neon signs' if you meant bright lighting at night",
          },
          {
            title: "Too Complex or Long",
            description:
              "If your prompt is extremely long, the model might lose focus on some parts. There's a point where more text can confuse rather than help.",
            solution:
              "Simplify to core elements. You can always add more in edits. Sometimes 30 words works better than 100 words",
          },
          {
            title: "Obscure Terms or Styles",
            description:
              "If you use very niche references, the AI might not get it accurate. Very specific regional slang or made-up terms might be ignored.",
            solution:
              "Use commonly understood synonyms or explain the term in simpler language",
          },
          {
            title: "When to Start Fresh",
            description:
              "If after many edits or tries the image still isn't right, it might be faster to start a new prompt with lessons learned.",
            solution:
              "Re-write a cleaner prompt with your now clearer vision, then edit that if needed",
          },
        ],
      },
    },
  ];

  return (
    <div
      className="min-h-screen bg-brand-red text-black"
      style={{ ...FONT_STYLE, width: "100%" }}
    >
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div
        className="bg-brand-red px-6 text-center"
        style={{
          backgroundColor: "rgb(249, 56, 34)",
          fontSize: "48px",
          fontWeight: "400",
          lineHeight: "60px",
          marginTop: "12px",
          textAlign: "center",
          pointerEvents: "auto",
          padding: "20px 24px 32px",
        }}
      />

      {/* Content Sections */}
      <div
        className="max-w-7xl mx-auto px-8 space-y-4"
        style={{ padding: "0 32px 24px" }}
      >
        {sections.map((section) => (
          <Card key={section.id} className="bg-black border-none">
            <CardHeader className="bg-black p-4">
              <CardTitle
                className="text-white text-lg flex items-center space-x-2"
                style={TYPOGRAPHY.subtitle}
              >
                <span
                  className="bg-brand-red text-black rounded px-2 py-1 text-sm font-semibold"
                  style={TYPOGRAPHY.heading}
                >
                  {section.id}.
                </span>
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-black p-5">
              {/* Section 1: Introduction */}
              {section.id === 1 && (
                <div className="space-y-4">
                  <p
                    className="text-white leading-relaxed"
                    style={TYPOGRAPHY.body}
                  >
                    {section.content.overview}
                  </p>
                  <div className="space-y-2">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      How It Works
                    </h4>
                    <p
                      className="text-white leading-relaxed"
                      style={TYPOGRAPHY.body}
                    >
                      {section.content.howItWorks}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      Why Special
                    </h4>
                    <p
                      className="text-white leading-relaxed"
                      style={TYPOGRAPHY.body}
                    >
                      {section.content.whySpecial}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      Who This Is For
                    </h4>
                    <p
                      className="text-white leading-relaxed"
                      style={TYPOGRAPHY.body}
                    >
                      {section.content.whoFor}
                    </p>
                  </div>
                </div>
              )}

              {/* Section 2: Basics of Prompting */}
              {section.id === 2 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {section.content.principles.map((principle, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {principle.title}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {principle.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-900 rounded p-4 space-y-2">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      Example Progression
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-brand-red font-semibold text-sm">
                          Beginner:
                        </span>
                        <p className="text-white italic text-sm">
                          "{section.content.progression.beginner}"
                        </p>
                      </div>
                      <div>
                        <span className="text-brand-red font-semibold text-sm">
                          Advanced:
                        </span>
                        <p className="text-white italic text-sm">
                          "{section.content.progression.advanced}"
                        </p>
                      </div>
                      <div>
                        <span className="text-brand-red font-semibold text-sm">
                          Expert:
                        </span>
                        <p className="text-white italic text-sm">
                          "{section.content.progression.expert}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Key Components */}
              {section.id === 3 && (
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded p-4">
                    <h4
                      className="text-brand-red font-semibold mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Formula
                    </h4>
                    <code className="text-white block text-xs bg-black p-3 rounded font-mono">
                      {section.content.formula}
                    </code>
                  </div>
                  <div className="space-y-3">
                    {section.content.components.map((component, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {component.name}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {component.description}
                        </p>
                        <div className="bg-gray-900 rounded p-2">
                          <p className="text-gray-300 text-xs italic">
                            {component.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Lifestyle Photography */}
              {section.id === 4 && (
                <div className="space-y-3">
                  <p
                    className="text-white leading-relaxed text-sm"
                    style={TYPOGRAPHY.body}
                  >
                    {section.content.description}
                  </p>
                  <div className="space-y-3">
                    {section.content.characteristics.map((char, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {char.title}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {char.description}
                        </p>
                        <div className="bg-gray-900 rounded p-2">
                          <p className="text-gray-300 text-xs italic">
                            {char.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-900 rounded p-4">
                    <h4
                      className="text-brand-red font-semibold mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Complete Example
                    </h4>
                    <p
                      className="text-white italic text-sm"
                      style={TYPOGRAPHY.body}
                    >
                      "{section.content.fullExample}"
                    </p>
                  </div>
                </div>
              )}

              {/* Section 5: Product Photography */}
              {section.id === 5 && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    {section.content.techniques.map((technique, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {technique.title}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {technique.description}
                        </p>
                        <div className="bg-gray-900 rounded p-2">
                          <p className="text-gray-300 text-xs italic">
                            {technique.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-900 rounded p-4">
                    <h4
                      className="text-brand-red font-semibold mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Expert Example
                    </h4>
                    <p
                      className="text-white italic text-sm"
                      style={TYPOGRAPHY.body}
                    >
                      "{section.content.expertExample}"
                    </p>
                  </div>
                </div>
              )}

              {/* Section 6: Graphics & Design */}
              {section.id === 6 && (
                <div className="space-y-3">
                  <div className="space-y-4">
                    {section.content.categories.map((category, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {category.title}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {category.description}
                        </p>
                        <div className="space-y-1">
                          {category.tips.map((tip, tipIdx) => (
                            <p
                              key={tipIdx}
                              className="text-white text-xs"
                              style={TYPOGRAPHY.body}
                            >
                              • {tip}
                            </p>
                          ))}
                        </div>
                        <div className="bg-gray-900 rounded p-2">
                          <p
                            className="text-white italic text-xs"
                            style={TYPOGRAPHY.body}
                          >
                            "{category.example}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 7: Scene Regeneration */}
              {section.id === 7 && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    {section.content.techniques.map((technique, idx) => (
                      <div key={idx} className="space-y-1">
                        <h4
                          className="text-brand-red font-semibold"
                          style={TYPOGRAPHY.heading}
                        >
                          {technique.title}
                        </h4>
                        <p
                          className="text-white leading-relaxed text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {technique.description}
                        </p>
                        <div className="bg-gray-900 rounded p-2">
                          <p className="text-gray-300 text-xs italic">
                            {technique.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-900 rounded p-4">
                    <h4
                      className="text-brand-red font-semibold mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Edit Sequence Example
                    </h4>
                    <div className="space-y-1">
                      {section.content.exampleSequence.map((step, idx) => (
                        <p
                          key={idx}
                          className="text-white text-xs"
                          style={TYPOGRAPHY.body}
                        >
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Section 8: Prompt Vault */}
              {section.id === 8 && (
                <div className="space-y-3">
                  <div className="space-y-3">
                    {section.content.steps.map((step, idx) => (
                      <div key={idx} className="bg-gray-900 rounded p-3">
                        <div className="flex items-start space-x-2">
                          <span className="bg-brand-red text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <div className="space-y-1">
                            <h4
                              className="text-brand-red font-semibold text-sm"
                              style={TYPOGRAPHY.heading}
                            >
                              {step.title}
                            </h4>
                            <p
                              className="text-white text-xs"
                              style={TYPOGRAPHY.body}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-900 rounded p-4">
                    <h4
                      className="text-brand-red font-semibold mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Pro Tips
                    </h4>
                    <div className="space-y-1">
                      {section.content.proTips.map((tip, idx) => (
                        <p
                          key={idx}
                          className="text-white text-xs"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Section 9: Tips & Warnings */}
              {section.id === 9 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      ✅ Best Practices
                    </h4>
                    {section.content.bestPractices.map((practice, idx) => (
                      <div key={idx} className="space-y-1">
                        <h5
                          className="text-brand-red font-semibold text-sm"
                          style={TYPOGRAPHY.heading}
                        >
                          {practice.title}
                        </h5>
                        <p
                          className="text-white text-xs"
                          style={TYPOGRAPHY.body}
                        >
                          {practice.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      ⚠️ Warnings
                    </h4>
                    {section.content.warnings.map((warning, idx) => (
                      <div key={idx} className="space-y-1">
                        <h5
                          className="text-brand-red font-semibold text-sm"
                          style={TYPOGRAPHY.heading}
                        >
                          {warning.title}
                        </h5>
                        <p
                          className="text-white text-xs"
                          style={TYPOGRAPHY.body}
                        >
                          {warning.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4
                      className="text-brand-red font-semibold"
                      style={TYPOGRAPHY.heading}
                    >
                      🔧 Troubleshooting
                    </h4>
                    {section.content.troubleshooting.map((issue, idx) => (
                      <div key={idx} className="space-y-1">
                        <h5
                          className="text-brand-red font-semibold text-sm"
                          style={TYPOGRAPHY.heading}
                        >
                          {issue.title}
                        </h5>
                        <p
                          className="text-white text-xs"
                          style={TYPOGRAPHY.body}
                        >
                          {issue.description}
                        </p>
                        <div className="bg-gray-900 rounded p-2">
                          <p className="text-green-400 text-xs">
                            <span className="font-semibold">Solution: </span>
                            {issue.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
