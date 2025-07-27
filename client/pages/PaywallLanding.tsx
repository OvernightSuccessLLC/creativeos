import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import PaywallModal from "@/components/PaywallModal";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Check,
  Zap,
  BookOpen,
  LayoutTemplate,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

export default function PaywallLanding() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showPaywall, setShowPaywall] = useState(true);

  // If user is already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: LayoutTemplate,
      title: "Unlimited Prompts",
      description: "Generate unlimited high-quality prompts for any creative project",
    },
    {
      icon: BookOpen,
      title: "Complete Playbook",
      description: "Master AI prompting with our comprehensive guide",
    },
    {
      icon: Zap,
      title: "Premium Tools",
      description: "Access to curated collection of 50+ premium AI tools",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Track performance and optimize your creative output",
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-brand-red">
      <AppNavigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Crown className="w-12 h-12 text-black" />
            <h1 className="text-4xl sm:text-5xl font-bold text-black">
              Creative Director OS
            </h1>
          </div>
          <p className="text-xl text-black/80 mb-8 max-w-3xl mx-auto">
            Transform your creative workflow with AI-powered prompt generation. 
            Join thousands of creators who've revolutionized their productivity.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <stat.icon className="w-5 h-5 text-black" />
                  <span className="text-2xl font-bold text-black">{stat.value}</span>
                </div>
                <span className="text-sm text-black/70">{stat.label}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setShowPaywall(true)}
            className="bg-black text-white hover:bg-gray-800 font-bold px-8 py-4 text-lg"
          >
            <Crown className="w-5 h-5 mr-2" />
            Get Access Now
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-black border-gray-800">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-black rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Trusted by Creative Professionals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Product Designer",
                quote: "This tool has 10x'd my creative output. The AI recommendations are incredibly accurate.",
              },
              {
                name: "Marcus Rodriguez",
                role: "Content Creator",
                quote: "The template library saved me hours of work. Every prompt is perfectly crafted.",
              },
              {
                name: "Emma Thompson",
                role: "Marketing Director",
                quote: "Our team's productivity has skyrocketed since using Creative Director OS.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Transform Your Creative Process?
          </h2>
          <p className="text-black/80 mb-8">
            Join the creative revolution with instant access to premium AI tools.
          </p>
          <Button
            onClick={() => setShowPaywall(true)}
            className="bg-black text-white hover:bg-gray-800 font-bold px-12 py-4 text-xl"
          >
            <Crown className="w-6 h-6 mr-3" />
            Start Creating Now
          </Button>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => {
          setShowPaywall(false);
          navigate('/');
        }}
      />
    </div>
  );
}
