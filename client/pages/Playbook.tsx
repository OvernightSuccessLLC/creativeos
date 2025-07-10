import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppNavigation from "@/components/AppNavigation";
import {
  BookOpen,
  Lightbulb,
  Camera,
  Package,
  Palette,
  RefreshCw,
  Database,
  AlertTriangle,
  ArrowLeft,
  Home,
  Clock,
  Target,
  Users,
} from "lucide-react";

export default function Playbook() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);

  const sections = [
    {
      id: 1,
      title: "Introduction to Sora Image Generation",
      icon: BookOpen,
      content: {
        description:
          "Sora is OpenAI's advanced platform that extends ChatGPT's capabilities to create images from text prompts. It leverages the latest image generation model (GPT-4o) which excels at following detailed instructions and even rendering text within images.",
        howItWorks:
          "In Sora (or ChatGPT's image mode), you simply describe the image you want. The AI interprets your description and generates an image to match. You can specify visual details like style, lighting, composition, and more.",
        whoFor:
          "Anyone looking to create images – from beginners who have never written an image prompt, to advanced users seeking to fine-tune their results, up to experts who want to automate prompt generation.",
      },
    },
    {
      id: 2,
      title: "Basics of Prompting (Prompting 101)",
      icon: Lightbulb,
      content: {
        principles: [
          'Be Specific and Clear: Provide concrete details about the subject and scene. "A young woman in a red coat walking through a snowy forest" vs "a person in a city"',
          'Mention the Style or Mood: "Shot in natural, casual style" or "photorealistic, 4K detail, ultra-realistic"',
          "Keep It Simple (at first): Start with single sentences focusing on one scene",
          "Use Natural Language: Write as if describing an image to a person",
          "Check Output and Iterate: Treat first image as a draft and refine",
        ],
        progression:
          'Beginner: "Photo of a cat sitting on a windowsill." | Advanced: "A tabby cat lounging on a sunny windowsill with soft morning light filtering through lace curtains, looking outside at birds." | Expert: "Candid pet photography, close-up shot of a green-eyed tabby cat lounging on a sunlit Victorian bay window, rays of golden morning light patterning its fur through ornate lace curtains. Shot with shallow depth of field (85mm f/1.8)."',
      },
    },
    {
      id: 3,
      title: "Key Prompt Components & Variables",
      icon: Database,
      content: {
        formula:
          "[Subject] + [Action/Pose] + [Environment/Setting] + [Lighting] + [Camera Details] + [Style/Mood] + [Quality Parameters]",
        components: {
          "Subject Description":
            "Who or what is the focus. Be specific about color, size, distinctive features.",
          "Action/Pose":
            "What the subject is doing. Adds dynamism and context.",
          "Environment/Setting":
            "Surroundings, background. Include time of day or weather if relevant.",
          Lighting:
            "Quality and direction of light. Most powerful mood setter.",
          "Camera Details":
            "Angle, framing, lens type, depth of field, composition terms.",
          "Style/Mood": "Artistic style, genre, overall vibe, color palette.",
        },
      },
    },
    {
      id: 4,
      title: "Lifestyle Photography Prompts",
      icon: Camera,
      content: {
        description:
          "Lifestyle images capture people in everyday, real-life contexts. They feel candid, authentic, and relatable.",
        characteristics: [
          "Everyday Scenarios: Focus on common activities – friends at cafe, family cooking, person jogging",
          'Natural Styling: Use "candid", "unposed", "in the moment" descriptors',
          "Environmental Context: Include background details, props, decor for realism",
          "Lighting for Mood: Daylight and ambient lighting are common",
        ],
      },
    },
    {
      id: 5,
      title: "Product & Studio Photography Prompts",
      icon: Package,
      content: {
        description:
          "Product photography focuses on highlighting item features in a clear, visually appealing way.",
        keyElements: [
          "Isolate the Product: Clean background, good lighting, product centered",
          "Lighting & Reflections: Match lighting to material - softbox for shiny objects",
          "Camera and Focus: Sharp focus, high resolution, consider angle",
          "Contextual vs. Isolated: Decide on props or plain background",
        ],
        expertExample:
          '"Hero shot of new smartphone levitating above matte black pedestal, against dimly lit studio with two-point lighting (cool blue fill from left, soft white key from right). Minimal reflections on screen displays faint home screen glow. Detailed reflections on phone edges highlight metallic frame. Background in deep shadow with bokeh city lights. Shot in 4K, ultra-sharp."',
      },
    },
    {
      id: 6,
      title: "Custom Graphics & Design Prompts",
      icon: Palette,
      content: {
        description:
          "Sora can generate graphic designs: logos, icons, banners with text, illustrations for branding.",
        logoTips: [
          'Keep It Simple: "Minimalist logo" or "bold emblem-style logo"',
          'Specify Style: "Modern flat design", "vintage retro style"',
          "Colors and Fonts: Include color schemes and font style descriptions",
          'Background: Usually "plain white background" or transparent',
        ],
        textRendering: [
          "Be Concise: Short phrases work better than paragraphs",
          "Use Quotes: \"A poster with title 'Summer Festival 2025'\"",
          'Specify Style: "in red bold font" or "handwritten style text"',
        ],
      },
    },
    {
      id: 7,
      title: "Scene Regeneration & Object Placement (Editing Images)",
      icon: RefreshCw,
      content: {
        description:
          "Sora's powerful editing feature lets you modify generated images by describing changes.",
        editingTips: [
          "Identify Elements: Describe what you want changed as you see it",
          'Be Spatially Specific: Use "left", "right", "foreground", "background"',
          "Maintain Consistency: Consider overall scene coherence",
          "One Change at a Time: For big edits, work stepwise",
          'Object Removal: "Remove" or "erase" usually works',
        ],
        exampleEdit:
          'Initial: Outdoor picnic scene on sunny day | Remix: "Make it look like evening, with sunset sky. Add string lights hanging between trees to create cozy atmosphere."',
      },
    },
    {
      id: 8,
      title: "Using the Prompt Vault",
      icon: Database,
      content: {
        description:
          "The Prompt Vault is your advanced formula builder that combines custom vision, professional keywords, and image references into perfectly structured SORA prompts.",
        process: [
          "Step 1: Write your creative vision in the text area (describe your subject, scene, or concept)",
          "Step 2: Upload a reference image for visual context (optional but recommended)",
          "Step 3: Select keywords from categories: Lighting, Framing, Locations, Texture, Creative Direction, Quality",
          "Step 4: Review the complete formula that automatically organizes your inputs",
          "Step 5: Copy the formula and paste directly into SORA",
        ],
        proTips: [
          "Structure: The vault auto-organizes keywords for optimal SORA understanding",
          'Images: Uploaded images become "--reference image" parameters',
          "Keywords: Click to add, click x to remove selected keywords",
          "Quality: Use the quality meter to optimize your prompt completeness",
        ],
      },
    },
    {
      id: 9,
      title: "Tips, Best Practices, and Warnings",
      icon: AlertTriangle,
      content: {
        generalTips: [
          'Be Specific, Avoid Redundancy: "Red ball on wooden table" not "nice pretty red ball sitting on wooden table that is brown"',
          "Avoid Ambiguity: Clarify words with multiple meanings",
          "Test in Parts: Try mini-prompts first for complex concepts",
          "Use ChatGPT to Improve: Ask for prompt refinements conversationally",
        ],
        contentWarnings: [
          "No Disallowed Content: Violence, gore, sexual, hate content",
          "Avoid Real Person Likeness: No named celebrities or individuals",
          "No Trademark Violations: Don't request copyrighted logos",
        ],
        troubleshooting: [
          "Conflicting Elements: Resolve contradictions",
          "Too Complex: Break into simpler scenes",
          "Obscure Terms: Use simpler descriptions",
          "Use Variations: Re-run same prompt for different results",
        ],
        finalAdvice:
          'Great images may not come on first try. Use Remix feature to refine. Treat each generation as a prototype. "Iterate and Refine" is key - even professional artists make many sketches!',
      },
    },
  ];

  const quickReference = {
    lighting: [
      "Soft diffused light",
      "Golden hour sunlight",
      "Neon glow",
      "Candlelight",
      "Dramatic rim lighting",
    ],
    cameraAngles: [
      "Eye-level",
      "Low-angle",
      "Bird's-eye",
      "First-person POV",
      "Close-up",
      "Wide shot",
    ],
    moodTone: [
      "Cheerful and bright",
      "Moody and dark",
      "Tranquil",
      "Whimsical",
      "Cinematic",
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Creative Director OS
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-brand-red px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
          THE PLAYBOOK
        </h1>
        <h2 className="text-xl md:text-2xl text-black font-semibold mb-2">
          Image Generation with Sora & ChatGPT
        </h2>
        <p className="text-black/80 max-w-2xl mx-auto">
          Complete guide for mastering AI image generation from beginner to
          expert
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {sections.map((section) => (
          <Card key={section.id} className="bg-gray-900 border-gray-800">
            <CardHeader className="bg-brand-red">
              <CardTitle className="text-black text-xl font-bold flex items-center space-x-3">
                <span className="bg-black text-brand-red rounded px-2 py-1 text-lg font-bold">
                  {section.id}.
                </span>
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-black border border-gray-800">
              {section.id === 1 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      How it Works:
                    </h4>
                    <p className="text-gray-300">
                      {section.content.howItWorks}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Who This Guide is For:
                    </h4>
                    <p className="text-gray-300">{section.content.whoFor}</p>
                  </div>
                </div>
              )}

              {section.id === 2 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Core Principles:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.principles.map((principle, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {principle.split(":")[0]}:
                          </strong>
                          {principle.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-brand-red font-semibold mb-2">
                      Example Progression:
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {section.content.progression}
                    </p>
                  </div>
                </div>
              )}

              {section.id === 3 && (
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-white font-semibold mb-2">
                      Prompt Structure Formula:
                    </h4>
                    <code className="text-green-400 text-sm">
                      {section.content.formula}
                    </code>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(section.content.components).map(
                      ([key, value]) => (
                        <div key={key} className="space-y-1">
                          <h5 className="text-brand-red font-semibold">
                            {key}
                          </h5>
                          <p className="text-gray-300 text-sm">{value}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {section.id === 4 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Characteristics:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.characteristics.map((char, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {char.split(":")[0]}:
                          </strong>
                          {char.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {section.id === 5 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Key Elements:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.keyElements.map((element, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {element.split(":")[0]}:
                          </strong>
                          {element.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-brand-red font-semibold mb-2">
                      Expert Example:
                    </h4>
                    <p className="text-gray-300 text-sm italic">
                      {section.content.expertExample}
                    </p>
                  </div>
                </div>
              )}

              {section.id === 6 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Logo Creation Tips:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.logoTips.map((tip, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {tip.split(":")[0]}:
                          </strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Text Rendering (GPT-4o):
                    </h4>
                    <ul className="space-y-2">
                      {section.content.textRendering.map((tip, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {tip.split(":")[0]}:
                          </strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {section.id === 7 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Editing Tips:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.editingTips.map((tip, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {tip.split(":")[0]}:
                          </strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-brand-red font-semibold mb-2">
                      Example Edit:
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {section.content.exampleEdit}
                    </p>
                  </div>
                </div>
              )}

              {section.id === 8 && (
                <div className="space-y-4">
                  <p className="text-gray-300">{section.content.description}</p>
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Step-by-Step Process:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.process.map((step, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {step.split(":")[0]}:
                          </strong>
                          {step.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-brand-red font-semibold mb-3">
                      Pro Tips:
                    </h4>
                    <ul className="space-y-1">
                      {section.content.proTips.map((tip, idx) => (
                        <li key={idx} className="text-gray-300 text-sm">
                          <strong className="text-white">
                            {tip.split(":")[0]}:
                          </strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {section.id === 9 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      General Tips:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.generalTips.map((tip, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {tip.split(":")[0]}:
                          </strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      Content Warnings:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.contentWarnings.map((warning, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {warning.split(":")[0]}:
                          </strong>
                          {warning.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-brand-red font-semibold mb-3">
                      When Things Go Wrong:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.troubleshooting.map((item, idx) => (
                        <li key={idx} className="text-gray-300">
                          •{" "}
                          <strong className="text-white">
                            {item.split(":")[0]}:
                          </strong>
                          {item.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <h4 className="text-brand-red font-semibold mb-2">
                      Final Advice:
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {section.content.finalAdvice}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Quick Reference */}
        <Card className="bg-brand-red border-brand-red">
          <CardHeader>
            <CardTitle className="text-black font-bold text-xl">
              Quick Reference: Variable Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-black p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(quickReference).map(([category, examples]) => (
                <div key={category}>
                  <h4 className="text-brand-red font-semibold mb-2 capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <ul className="space-y-1">
                    {examples.map((example, idx) => (
                      <li key={idx} className="text-gray-300 text-sm">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center py-8">
          <Button
            size="lg"
            className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-4"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            START CREATING WITH THE PROMPT VAULT
          </Button>
        </div>
      </div>
    </div>
  );
}
