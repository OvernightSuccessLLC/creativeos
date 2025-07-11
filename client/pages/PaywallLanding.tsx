import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Crown,
  Check,
  Zap,
  BookOpen,
  Database,
  LayoutTemplate,
  ArrowRight,
  Star,
} from "lucide-react";

export default function PaywallLanding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    option: "",
    accessCode: "",
  });

  const features = [
    {
      icon: Database,
      title: "PROMPT VAULT",
      description: "Advanced formula builder with 500+ professional keywords",
    },
    {
      icon: LayoutTemplate,
      title: "TEMPLATE LIBRARY",
      description: "Pre-built prompts for every creative scenario",
    },
    {
      icon: BookOpen,
      title: "THE PLAYBOOK",
      description: "Complete guide from beginner to expert level",
    },
    {
      icon: Zap,
      title: "AI TOOLKIT",
      description: "Curated collection of 25+ premium AI tools",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Process access code
      if (formData.accessCode === "DEMO2025") {
        navigate("/prompt-vault");
      } else {
        alert("Invalid access code. Contact support for assistance.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-brand-black text-black brand-heading"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
            >
              OVERNIGHT SUCCESS
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-black/80 mb-4 max-w-2xl mx-auto">
            Join thousands changing their lives overnight with next-level
            creative AI systems
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-black/70 mb-8">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-1 h-1 bg-black/50 rounded-full"></div>
            <div>2,430+ Members</div>
            <div className="w-1 h-1 bg-black/50 rounded-full"></div>
            <div>95% Success Rate</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2
            className="text-2xl sm:text-3xl font-black text-white text-center mb-8 sm:mb-12"
            style={{ fontWeight: 900 }}
          >
            WHAT YOU GET INSTANT ACCESS TO
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-700 text-center"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-red" />
                  </div>
                  <CardTitle
                    className="text-white font-black text-sm sm:text-base"
                    style={{ fontWeight: 900 }}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="py-12 sm:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <Card className="bg-black border-gray-800">
            <CardHeader className="text-center">
              <CardTitle
                className="text-2xl font-black text-white mb-2"
                style={{ fontWeight: 900 }}
              >
                {step === 1 ? "GET INSTANT ACCESS" : "ENTER ACCESS CODE"}
              </CardTitle>
              <p className="text-gray-400 text-sm">
                {step === 1
                  ? "Start your transformation today"
                  : "Enter your exclusive access code to unlock"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-white font-bold"
                      >
                        FULL NAME *
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="bg-gray-900 border-gray-700 text-white mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white font-bold">
                        EMAIL ADDRESS *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-gray-900 border-gray-700 text-white mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="option" className="text-white font-bold">
                        HOW DID YOU FIND US? *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, option: value })
                        }
                        required
                      >
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-2">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="referral">
                            Friend Referral
                          </SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="ad">Advertisement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div>
                    <Label
                      htmlFor="accessCode"
                      className="text-white font-bold"
                    >
                      ACCESS CODE *
                    </Label>
                    <Input
                      id="accessCode"
                      placeholder="Enter your access code"
                      value={formData.accessCode}
                      onChange={(e) =>
                        setFormData({ ...formData, accessCode: e.target.value })
                      }
                      className="bg-gray-900 border-gray-700 text-white mt-2"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Demo code: DEMO2025
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-black font-black py-3"
                  style={{ fontWeight: 900 }}
                  disabled={
                    step === 1
                      ? !formData.fullName ||
                        !formData.email ||
                        !formData.option
                      : !formData.accessCode
                  }
                >
                  {step === 1 ? (
                    <>
                      CONTINUE
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      ACCESS PLATFORM
                      <Crown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full border-gray-700 text-white hover:bg-gray-800"
                  >
                    BACK
                  </Button>
                )}
              </form>

              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-xs text-gray-400">
                  By continuing, you agree to receive updates about new features
                  and promotional content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-black py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3
            className="text-xl sm:text-2xl font-black text-white mb-8"
            style={{ fontWeight: 900 }}
          >
            WHAT MEMBERS SAY
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                text: "This platform completely transformed how I create content. The AI tools are incredible!",
                author: "Sarah M.",
                role: "Content Creator",
              },
              {
                text: "The prompt vault alone is worth the investment. Saved me hundreds of hours.",
                author: "Mike R.",
                role: "Digital Marketer",
              },
              {
                text: "From beginner to expert in just 30 days. The playbook is pure gold.",
                author: "Jessica L.",
                role: "Entrepreneur",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
