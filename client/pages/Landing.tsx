import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Submit to Netlify Forms
      const formData = new FormData();
      formData.append("form-name", "email-capture");
      formData.append("email", email);
      formData.append("name", name);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
      // Navigate to playbook after 2 seconds
      setTimeout(() => {
        navigate("/playbook");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Navigate anyway to not block user
      navigate("/playbook");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitted) {
    return (
      <div
        className="min-h-screen bg-brand-red flex items-center justify-center p-4"
      >
        <Card className="max-w-md w-full bg-black border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-heading text-white mb-4 font-body">Welcome!</h2>
            <p className="text-gray-300 mb-4">
              Thank you for joining. Redirecting you to the Playbook...
            </p>
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-brand-red flex items-center justify-center p-4"
    >
      <div className="max-w-lg w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1964cc1516094f2c9726884f044c2ef1%2Fe52dffb7c4f54f50b3b0d0f00bb479a2?format=webp&width=800"
            alt="Overnight Success Logo"
            className="h-36 w-auto mx-auto"
          />
        </div>
        {/* Email Capture Card */}
        <Card className="bg-black border-none shadow-2xl">
          <CardHeader className="text-center pb-3 pt-5">
            <CardTitle className="text-3xl font-heading text-white mb-2 font-body">
              Get Access
            </CardTitle>
            <p className="text-white font-semibold leading-7 mt-1.5 font-body">
              Enter your details to access the AI Playbook and Toolkit
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-5 pt-0">
            {/* Hidden form for Netlify */}
            <form name="email-capture" data-netlify="true" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
            </form>
            {/* Visible form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 font-body"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 font-body"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-button py-3 text-lg font-body"
              >
                {isSubmitting ? "Getting Access..." : "Get Access Now"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-white text-sm font-body">
                Join thousands of creators using AI to accelerate their success
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
