import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppNavigation from "@/components/AppNavigation";
import BriefcaseModal from "@/components/BriefcaseModal";
import {
  Eye,
  Palette,
  User,
  Mic,
  Camera,
  Zap,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
export default function CharacterSpec() {
  const navigate = useNavigate();
  const [showBriefcase, setShowBriefcase] = useState(false);
  const characterData = {
    visual_design: {
      animation_style: "Animorph-ultra-realistic",
      skin_texture: "scaly plush with high-spec light bounce",
      base_color: "grape purple",
      belly_color: "faded neon green",
      eyebrows: "soft sculpted ridges for smirks and squints",
      mouth: "wide with sharp but goofy fangs, high viseme fidelity",
      eyes: "round, expressive with slow-lid motion",
    },
    body_structure: {
      build: "thicc with dad-bod gut",
      arms: "short and bulky with white claws",
      fingers: "rounded tips, designed for joint articulation",
      movement_style: "lazy float with comedic swagger",
    },
    clothing: "nude plush, optional gold chain or grillz",
    voice_sync: {
      enabled: true,
      style: "laid-back stoner drawl or lazy punchline rap",
      mouth_rig: "hyperflex quad-mesh blendshape for smooth transition",
    },
    lighting_adaptability:
      "sunset soak, backyard haze, reflective water bounce",
    camera_behavior:
      "slow dolly-in, cigarette smoke swirls, bokeh background drag",
    personality_tags: [
      "washed-up icon",
      "chronic philosopher",
      "beer belly menace",
      "suburban burnout",
    ],
  };
  const SpecSection = ({
    title,
    icon: Icon,
    children,
    color = "bg-purple-500",
  }: any) => (
    <Card className="bg-black/80 border border-gray-800 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-white text-lg font-heading">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-brand-red via-red-600 to-red-800 text-white"
    >
      {/* Navigation */}
      <AppNavigation onUpdatesClick={() => setShowBriefcase(true)} />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate("/ai-toolkit")}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Toolkit
          </Button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4">
              Character Specification
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ultra-realistic animorph design with comedic swagger and
              professional-grade rigging
            </p>
          </div>
        </div>
        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Character Image */}
          <div className="order-2 lg:order-1">
            <Card className="bg-black/90 border border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Ff00de8740d7d48d4aad72b97aeec5a09?format=webp&width=800"
                    alt="Character Reference"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600 text-white font-heading px-3 py-1">
                      Reference Model
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading text-white mb-2">
                    Visual Reference
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    High-fidelity character model showcasing the target
                    aesthetic and personality. Note the expressive features,
                    body proportions, and overall comedic swagger that defines
                    this character's unique appeal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right Column - Specifications */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Visual Design */}
            <SpecSection title="Visual Design" icon={Eye} color="bg-purple-600">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">
                      Animation Style
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {characterData.visual_design.animation_style}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">
                      Skin Texture
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {characterData.visual_design.skin_texture}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">
                      Color Palette
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                        <span className="text-gray-300 text-sm">
                          Base: {characterData.visual_design.base_color}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-400"></div>
                        <span className="text-gray-300 text-sm">
                          Belly: {characterData.visual_design.belly_color}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">
                      Facial Features
                    </h4>
                    <div className="space-y-1 text-gray-300 text-sm">
                      <p>• {characterData.visual_design.eyebrows}</p>
                      <p>• {characterData.visual_design.mouth}</p>
                      <p>• {characterData.visual_design.eyes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SpecSection>
            {/* Body Structure */}
            <SpecSection title="Body Structure" icon={User} color="bg-blue-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Build & Proportions
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {characterData.body_structure.build}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {characterData.body_structure.arms}
                  </p>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Movement Style
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {characterData.body_structure.movement_style}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {characterData.body_structure.fingers}
                  </p>
                </div>
              </div>
            </SpecSection>
            {/* Voice & Audio */}
            <SpecSection
              title="Voice Synchronization"
              icon={Mic}
              color="bg-green-600"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-green-500 text-white">Enabled</Badge>
                  <span className="text-gray-300 text-sm">
                    Real-time voice sync capabilities
                  </span>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Voice Style
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {characterData.voice_sync.style}
                  </p>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Mouth Rigging
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {characterData.voice_sync.mouth_rig}
                  </p>
                </div>
              </div>
            </SpecSection>
            {/* Lighting & Camera */}
            <SpecSection
              title="Technical Specs"
              icon={Camera}
              color="bg-yellow-600"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Lighting Adaptability
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {characterData.lighting_adaptability}
                  </p>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Camera Behavior
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {characterData.camera_behavior}
                  </p>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">
                    Clothing
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {characterData.clothing}
                  </p>
                </div>
              </div>
            </SpecSection>
            {/* Personality Tags */}
            <SpecSection
              title="Personality Profile"
              icon={Sparkles}
              color="bg-red-600"
            >
              <div className="flex flex-wrap gap-2">
                {characterData.personality_tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-red-500/20 text-red-300 border border-red-500/30 font-body-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-300 text-sm mt-4">
                A complex character archetype blending nostalgic appeal with
                modern humor. Perfect for content that requires relatable,
                slightly irreverent personality traits.
              </p>
            </SpecSection>
          </div>
        </div>
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-black/90 border border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading text-white mb-4">
                Ready to Implement?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                This specification provides complete guidelines for 3D character
                creation, rigging, and animation. Perfect for game development,
                content creation, or interactive experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-heading px-8 py-3"
                  onClick={() =>
                    window.open(
                      "mailto:contact@example.com?subject=Character Implementation Request",
                      "_blank",
                    )
                  }
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Request Implementation
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-white/10 font-heading px-8 py-3"
                  onClick={() => navigate("/ai-toolkit")}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Explore More Tools
                </Button>
              </div>
            </CardContent>
          </Card>
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
