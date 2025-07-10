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
  ArrowLeft,
  Home,
  Clock,
  Target,
  Users,
} from "lucide-react";

const FONT_STYLE = {
  fontFamily: "Poppins, sans-serif",
};

const TYPOGRAPHY = {
  title: { ...FONT_STYLE, fontWeight: "900" },
  subtitle: { ...FONT_STYLE, fontWeight: "700" },
  heading: { ...FONT_STYLE, fontWeight: "600" },
  body: { ...FONT_STYLE, fontWeight: "500" },
  button: { ...FONT_STYLE, fontWeight: "700" },
};

export default function Playbook() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);

  const sections = [
    {
      id: 1,
      title: "Introduction to AI Image Generation",
      icon: BookOpen,
      content: {
        description:
          "Sora is OpenAI's advanced platform that extends ChatGPT's capabilities to create images from text prompts. It leverages the latest image generation model (GPT-4o) which excels at following detailed instructions and even rendering text within images.",
        howItWorks:
          "In Sora (or ChatGPT's image mode), you simply describe the image you want. The AI interprets your description and generates an image to match. You can specify visual details like style, lighting, composition, and more.",
        whoFor:
          "Anyone looking to create images – from beginners who have never written an image prompt, to advanced users seeking to fine-tune their results, up to experts who want to automate prompt generation and master complex scenes.",
      },
    },
    {
      id: 2,
      title: "Basics of Prompting (Prompting 101)",
      icon: Lightbulb,
      content: {
        principles: [
          'Be Specific and Clear: Provide concrete details about what you want. Vague prompts lead to unpredictable results. "A young man in a blue suit waiting at a New York City bus stop on a rainy night" vs "a person in a city". Include key attributes like colors, setting, and distinctive features.',
          'Mention the Style or Mood: The same scene can look like a photograph, watercolor painting, Pixar animation, or oil painting. Use mood adjectives: "warm and inviting", "dark and dystopian", "whimsical and cartoonish".',
          "Start Simple (Then Iterate): Begin with a short prompt focusing on one subject or scene. Build complexity through iterations rather than writing super long prompts from scratch.",
          "Use Natural Language: Write as if describing an image to another person, not like coding. Natural descriptions work better than keyword cramming.",
          "Check Output and Refine: Treat each generation as feedback. Analyze what worked and what didn't, then improve your prompt and try again.",
        ],
        progression:
          'Beginner: "Photo of a cat sitting on a windowsill." – Basic idea with no particular flair. | Advanced: "A tabby cat lounging on a sunny windowsill with soft morning light filtering through lace curtains, looking outside at birds." – Specified breed, lighting, context, and activity. | Expert: "Candid pet photography, close-up shot of a green-eyed tabby cat lounging on a sunlit Victorian bay window, rays of golden morning light patterning its fur through ornate lace curtains. Shot with shallow depth of field (85mm f/1.8)." – Added camera details, specific setting, and professional photography style.',
      },
    },
    {
      id: 3,
      title: "Key Prompt Components & Variables",
      icon: Database,
      content: {
        formula:
          "[Subject] + [Action/Pose] + [Setting] + [Lighting] + [Camera Details] + [Style] + [Quality]",
        description:
          "Not every prompt needs all components, but this formula reminds you of available options.",
        components: {
          "Subject Description":
            "The main focus of your image. Be specific about physical attributes, clothing, species, size, color, material, etc.",
          "Action/Pose":
            "What is the subject doing? Running, smiling, reading, dancing, or describe expression like 'with a gentle smile' or 'looking into camera'.",
          Setting:
            "Where is the scene taking place? Include weather, time of day, era if relevant. 'Medieval village' vs 'futuristic spaceship interior'.",
          Lighting:
            "Crucial for mood. 'Soft diffused morning light', 'dramatic chiaroscuro', 'neon city lights', 'golden hour glow', 'candlelight'.",
          "Camera Details":
            "Camera angle, lens choice, depth of field. '85mm portrait lens', 'wide-angle shot', 'macro lens', 'shallow depth with bokeh'.",
          Style:
            "Artistic approach and mood. 'Photorealistic', 'Studio Ghibli style', 'oil painting', 'minimalist', 'cyberpunk', 'vintage film photography'.",
        },
      },
    },
    {
      id: 4,
      title: "Specialized Photography Styles",
      icon: Camera,
      content: {
        lifestyle: {
          title: "Lifestyle Photography",
          description:
            "Depicts people in everyday situations with a candid, relatable feel.",
          tips: [
            "Focus on everyday scenarios and activities",
            'Use words like "candid", "natural", "unposed"',
            "Include environmental context and props",
            "Emphasize natural lighting and warm tones",
          ],
          example:
            "A candid photo of a young couple hiking on a forest trail in autumn. They're laughing and looking at each other, surrounded by trees with orange and red leaves. The sun is low, casting warm golden light through the trees.",
        },
        studio: {
          title: "Studio/Product Photography",
          description:
            "Professional product shots with clean aesthetics and perfect lighting.",
          tips: [
            "Isolate product with plain backgrounds",
            "Specify lighting to minimize harsh reflections",
            'Use terms like "ultra-sharp focus" and camera angles',
            "Consider contextual vs isolated approaches",
          ],
          example:
            "Studio product shot of a luxury watch on a marble surface with soft reflection, ambient warm lighting. Two-point lighting setup, ultra-sharp focus on the watch.",
        },
      },
    },
    {
      id: 5,
      title: "Advanced Techniques & Image Editing",
      icon: RefreshCw,
      content: {
        description:
          "One of the most powerful features is editing images through language - essentially image editing through prompts instead of Photoshop.",
        editingTips: [
          'Reference elements clearly ("the car in the background")',
          "Be spatially specific (left, right, foreground, background)",
          "Make one change at a time for complex edits",
          "Maintain consistency with original style and lighting",
          'Use "same art style" or "same lighting" for seamless additions',
        ],
        textInImages: [
          "Keep phrases short and use simple fonts",
          "Put exact text in quotes in your prompt",
          "GPT-4o handles text better than previous models",
          'Specify font style: "bold red font" or "handwritten"',
          'For plain text, specify "plain block letters"',
        ],
        exampleEditSequence: [
          'Initial: "A group of friends having a picnic on a sunny day in the park"',
          'Edit 1: "Make it look like early evening, with a vibrant sunset sky"',
          'Edit 2: "Add string lights hanging between the trees to create a cozy atmosphere"',
          "Edit 3: \"Everyone's clothing should be a bit warmer (light jackets), since it's evening now\"",
        ],
      },
    },
    {
      id: 6,
      title: "Using the Prompt Vault",
      icon: Database,
      content: {
        description:
          "The Prompt Vault helps you build 'formula' prompts by combining your ideas, reference images, and expert-curated keywords.",
        steps: [
          "Write Your Vision: Freely describe your image concept. Don't worry about structure yet - just get your creative vision down.",
          "Upload Reference Image (Optional): Add an inspiring image for style or color palette guidance. GPT-4o can use references as visual inspiration.",
          "Select Keywords from Categories: Choose from professionally curated keywords organized by Art Style, Lighting, Composition, Camera, Mood, etc.",
          "Review & Copy Formula: The vault compiles everything into a structured, optimized prompt ready to paste into Sora.",
        ],
        proTips: [
          "Structured approach: The vault ensures you don't forget a variable. It's especially useful if you're not yet comfortable juggling all the prompt components in your head.",
          "Reference images are powerful: If you upload a sketch of a logo and describe it, Sora can produce a cleaner or more detailed version. Or if you love the style of a particular painting, you can reference it to imbue your generated image with a similar vibe.",
          "Quality meter guidance: The quality meter might indicate how comprehensive your prompt is. If it's low, you probably have a minimal description – consider adding more keywords or details until the meter suggests the prompt is robust.",
          "Pre-vetted keywords: The vault uses keywords known to work well. Terms like '4K', 'bokeh', 'dramatic lighting', 'concept art' etc., which the AI responds to strongly.",
          "Continue iterating: After generating with the vault prompt, you can still iterate further. The vault gets you a great first prompt. From there, treat it like any image: use follow-up edits or try slight variations.",
        ],
        essence:
          "The Prompt Vault is like having an AI prompt engineer co-pilot with you. It's very useful for complex visions or when you want to explore a variety of styles for the same basic idea.",
      },
    },
    {
      id: 7,
      title: "Pro Tips, Best Practices & Common Pitfalls",
      icon: AlertTriangle,
      content: {
        bestPractices: [
          'Avoid ambiguity: "Bank" could mean river bank or money bank - add context',
          "Be specific, not redundant: Don't pile on synonymous adjectives",
          "Test complex ideas in chunks: Build elaborate scenes layer by layer",
          "Leverage ChatGPT's conversation: Ask for prompt improvements between generations",
          "Re-run for variations: Same prompt can yield different results",
          "Use the remix feature: Fine-tune images through edits rather than starting over",
        ],
        commonIssues: [
          'Conflicting instructions: "Bright night scene" - clarify what you mean',
          "Overly complex prompts: Sometimes simple works better than 100+ words",
          "Ignoring iteration: Professional artists do multiple drafts - so should you",
          "Not using natural language: Write descriptively, not like keyword lists",
          "Starting fresh too quickly: Try editing before completely rewriting prompts",
          "Forgetting context: When editing, maintain the original scene's style and lighting",
        ],
        workflows: [
          "Re-run or Variations: Because image generation has some randomness, if an output is close but not perfect, try hitting generate again with the same prompt (or a tiny tweak). Often the second or third try gives a result you like.",
          "Final Refinements – Remix and Iterate: Use the Remix (Edit) feature to your advantage. It's there to fine-tune images in ways that would be tedious to prompt from scratch. Want that car a little more to the left? Prompt an edit. Wish the scene was at night instead of day? Edit it.",
          "The motto here is Iterate and Refine. Professional artists do many sketches and drafts – consider each generation a draft that you can build upon.",
        ],
      },
    },
  ];

  const quickReference = {
    lightingStyles: [
      "Golden hour",
      "Soft diffused",
      "Dramatic chiaroscuro",
      "Neon glow",
      "Candlelight",
      "Studio lighting",
      "Backlit",
      "Rim lighting",
    ],
    cameraTechniques: [
      "Eye-level shot",
      "Low-angle",
      "Bird's-eye view",
      "Close-up/macro",
      "Wide shot",
      "85mm portrait",
      "Fisheye lens",
      "Shallow depth of field",
    ],
    artStyles: [
      "Photorealistic",
      "Oil painting",
      "Watercolor",
      "Studio Ghibli",
      "Cyberpunk",
      "Vintage film",
      "Minimalist",
      "Concept art",
    ],
    moodTone: [
      "Cinematic",
      "Dreamy",
      "Dramatic",
      "Whimsical",
      "Dark/dystopian",
      "Warm/inviting",
      "Serene",
      "Gritty",
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white" style={FONT_STYLE}>
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />

      {/* Header */}
      <div className="bg-brand-red px-6 py-5 text-center">
        <h1
          className="text-4xl md:text-6xl text-black mb-4"
          style={TYPOGRAPHY.title}
        >
          THE PLAYBOOK
        </h1>
        <h2
          className="text-xl md:text-2xl text-black mb-2"
          style={TYPOGRAPHY.subtitle}
        >
          Image Generation with Sora & ChatGPT
        </h2>
      </div>

      {/* Content Sections */}
      <div
        className="max-w-5xl mx-auto px-8 space-y-12"
        style={{ margin: "-99px auto 0", padding: "20px 32px 0" }}
      >
        {sections.map((section) => (
          <Card key={section.id} className="bg-black border-white">
            <CardHeader
              className="bg-brand-red"
              style={{ padding: "20px 24px" }}
            >
              <CardTitle
                className="text-black text-xl flex items-center space-x-3"
                style={TYPOGRAPHY.subtitle}
              >
                <span
                  className="bg-black text-brand-red rounded px-2 py-1 text-lg"
                  style={TYPOGRAPHY.subtitle}
                >
                  {section.id}.
                </span>
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent
              className="bg-black border border-white"
              style={{ padding: section.id === 1 ? "32px 32px 20px" : "32px" }}
            >
              {section.id === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4
                      className="text-brand-red text-lg"
                      style={TYPOGRAPHY.heading}
                    >
                      How it Works:
                    </h4>
                    <p
                      className="text-white leading-relaxed"
                      style={TYPOGRAPHY.body}
                    >
                      {section.content.howItWorks}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4
                      className="text-brand-red text-lg"
                      style={TYPOGRAPHY.heading}
                    >
                      Who This Guide is For:
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

              {section.id === 2 && (
                <div className="space-y-6">
                  <div>
                    <ul className="space-y-3">
                      <li
                        className="text-white leading-relaxed"
                        style={{
                          ...TYPOGRAPHY.body,
                          marginBottom: "20px",
                          padding: "20px 0",
                        }}
                      >
                        •{" "}
                        <strong
                          className="text-brand-red"
                          style={TYPOGRAPHY.heading}
                        >
                          Be Specific and Clear:
                        </strong>{" "}
                        Provide concrete details about what you want. Vague
                        prompts lead to unpredictable results. "A young man in a
                        blue suit waiting at a New York City bus stop on a rainy
                        night" vs "a person in a city". Include key attributes
                        like colors, setting, and distinctive features.
                      </li>
                      <li
                        className="text-white leading-relaxed"
                        style={{ ...TYPOGRAPHY.body, paddingBottom: "20px" }}
                      >
                        •{" "}
                        <strong
                          className="text-brand-red"
                          style={TYPOGRAPHY.heading}
                        >
                          Mention the Style or Mood:
                        </strong>{" "}
                        The same scene can look like a photograph, watercolor
                        painting, Pixar animation, or oil painting. Use mood
                        adjectives
                      </li>
                      <li
                        className="text-white leading-relaxed"
                        style={{ ...TYPOGRAPHY.body, paddingBottom: "20px" }}
                      >
                        •{" "}
                        <strong
                          className="text-brand-red"
                          style={TYPOGRAPHY.heading}
                        >
                          Start Simple (Then Iterate):
                        </strong>{" "}
                        Begin with a short prompt focusing on one subject or
                        scene. Build complexity through iterations rather than
                        writing super long prompts from scratch. Treat each
                        generation as feedback. Analyze what worked and what
                        didn't, then improve your prompt and try again.
                      </li>
                      <li
                        className="text-white leading-relaxed"
                        style={{ ...TYPOGRAPHY.body, paddingBottom: "20px" }}
                      >
                        •{" "}
                        <strong
                          className="text-brand-red"
                          style={TYPOGRAPHY.heading}
                        >
                          Use Natural Language:
                        </strong>{" "}
                        Write as if describing an image to another person, not
                        like coding. Natural descriptions work better than
                        keyword cramming.
                      </li>
                    </ul>
                  </div>
                  <div
                    className="bg-black rounded-lg"
                    style={{ paddingRight: "24px" }}
                  >
                    <h4
                      className="text-brand-red text-lg mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      Example Progression:
                    </h4>
                    <p
                      className="text-white leading-relaxed"
                      style={TYPOGRAPHY.body}
                    >
                      Beginner: "Photo of a cat sitting on a windowsill." –
                      Basic idea with no particular flair.
                      <br />
                      <br />
                      Advanced: "A tabby cat lounging on a sunny windowsill with
                      soft morning light filtering through lace curtains,
                      looking outside at birds." – Specified breed, lighting,
                      context, and activity.
                      <br />
                      <br />
                      Expert: "Candid pet photography, close-up shot of a
                      green-eyed tabby cat lounging on a sunlit Victorian bay
                      window, rays of golden morning light patterning its fur
                      through ornate lace curtains. Shot with shallow depth of
                      field (85mm f/1.8).
                    </p>
                  </div>
                </div>
              )}

              {section.id === 3 && (
                <div className="space-y-6" style={{ padding: "20px 32px" }}>
                  <div
                    className="bg-black rounded-lg"
                    style={{ paddingRight: "24px" }}
                  >
                    <h4
                      className="text-brand-red mb-3"
                      style={{ ...TYPOGRAPHY.heading, fontSize: "21px" }}
                    >
                      <span style={{ color: "rgb(249, 57, 33)" }}>
                        Master Formula:
                      </span>
                    </h4>
                    <code
                      className="text-white block mb-3"
                      style={{ ...TYPOGRAPHY.body, fontSize: "12px" }}
                    >
                      <span style={{ color: "rgb(255, 255, 255)" }}>
                        [Subject] + [Action/Pose] + [Setting] + [Lighting] +
                        [Camera Details] + [Style] + [Quality]
                      </span>
                    </code>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(section.content.components).map(
                      ([key, value]) => (
                        <div key={key} className="space-y-2">
                          <h5
                            className="text-brand-red text-base"
                            style={TYPOGRAPHY.heading}
                          >
                            {key}
                          </h5>
                          <p
                            className="text-white leading-relaxed"
                            style={TYPOGRAPHY.body}
                          >
                            {value}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {section.id === 4 && (
                <div className="space-y-6">
                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      {section.content.lifestyle.title}
                    </h4>
                    <p className="text-white mb-3" style={TYPOGRAPHY.body}>
                      {section.content.lifestyle.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {section.content.lifestyle.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-black p-3 rounded border border-white">
                      <h5
                        className="text-brand-red mb-2 text-sm"
                        style={TYPOGRAPHY.heading}
                      >
                        Example:
                      </h5>
                      <p
                        className="text-white text-sm italic"
                        style={TYPOGRAPHY.body}
                      >
                        "{section.content.lifestyle.example}"
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      {section.content.studio.title}
                    </h4>
                    <p className="text-white mb-3" style={TYPOGRAPHY.body}>
                      {section.content.studio.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {section.content.studio.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-black p-3 rounded border border-white">
                      <h5
                        className="text-brand-red mb-2 text-sm"
                        style={TYPOGRAPHY.heading}
                      >
                        Example:
                      </h5>
                      <p
                        className="text-white text-sm italic"
                        style={TYPOGRAPHY.body}
                      >
                        "{section.content.studio.example}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section.id === 5 && (
                <div className="space-y-4">
                  <p className="text-white" style={TYPOGRAPHY.body}>
                    {section.content.description}
                  </p>

                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      Scene Regeneration & Object Placement
                    </h4>
                    <h5 className="text-white mb-2" style={TYPOGRAPHY.heading}>
                      Editing Best Practices:
                    </h5>
                    <ul className="space-y-2">
                      {section.content.editingTips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-white mb-2" style={TYPOGRAPHY.heading}>
                      Text in Images:
                    </h5>
                    <ul className="space-y-2">
                      {section.content.textInImages.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black p-4 rounded border border-white">
                    <h4
                      className="text-brand-red mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      Example Edit Sequence:
                    </h4>
                    <ul className="space-y-1">
                      {section.content.exampleEditSequence.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-white text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {section.id === 6 && (
                <div className="space-y-4">
                  <p className="text-white" style={TYPOGRAPHY.body}>
                    {section.content.description}
                  </p>

                  <div className="grid gap-4">
                    {section.content.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-black p-4 rounded border border-white"
                      >
                        <div className="flex items-start space-x-3">
                          <span
                            className="bg-brand-red text-black rounded-full w-6 h-6 flex items-center justify-center text-sm"
                            style={TYPOGRAPHY.subtitle}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-white" style={TYPOGRAPHY.body}>
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      Pro Tips for the Vault:
                    </h4>
                    <ul className="space-y-2">
                      {section.content.proTips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white text-sm"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-black p-4 rounded border border-white">
                    <h4
                      className="text-brand-red mb-2"
                      style={TYPOGRAPHY.heading}
                    >
                      In Essence:
                    </h4>
                    <p className="text-white text-sm" style={TYPOGRAPHY.body}>
                      {section.content.essence}
                    </p>
                  </div>
                </div>
              )}

              {section.id === 7 && (
                <div className="space-y-6">
                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      ✅ Best Practices
                    </h4>
                    <ul className="space-y-2">
                      {section.content.bestPractices.map((tip, idx) => (
                        <li
                          key={idx}
                          className="text-white"
                          style={TYPOGRAPHY.body}
                        >
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      ⚠️ Common Issues
                    </h4>
                    <ul className="space-y-2">
                      {section.content.commonIssues.map((issue, idx) => (
                        <li
                          key={idx}
                          className="text-white"
                          style={TYPOGRAPHY.body}
                        >
                          • {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className="text-brand-red mb-3"
                      style={TYPOGRAPHY.heading}
                    >
                      Advanced Workflow Strategies:
                    </h4>
                    <div className="space-y-3">
                      {section.content.workflows.map((workflow, idx) => (
                        <div
                          key={idx}
                          className="bg-black p-3 rounded border border-white"
                        >
                          <p
                            className="text-white text-sm"
                            style={TYPOGRAPHY.body}
                          >
                            {workflow}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Quick Reference */}
        <Card className="bg-brand-red border-brand-red">
          <CardHeader>
            <CardTitle
              className="text-black text-xl"
              style={TYPOGRAPHY.subtitle}
            >
              Quick Reference Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-black p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(quickReference).map(([category, examples]) => (
                <div key={category}>
                  <h4
                    className="text-brand-red mb-2 capitalize"
                    style={TYPOGRAPHY.heading}
                  >
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <ul className="space-y-1">
                    {examples.map((example, idx) => (
                      <li
                        key={idx}
                        className="text-white text-sm"
                        style={TYPOGRAPHY.body}
                      >
                        • {example}
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
            className="bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4"
            style={TYPOGRAPHY.button}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            START CREATING WITH THE PROMPT VAULT
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
