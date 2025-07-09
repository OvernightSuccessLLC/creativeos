import { useState } from "react";
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
import { BookOpen, Crown, X } from "lucide-react";

interface OvernightSuccessSignupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OvernightSuccessSignup({
  isOpen,
  onClose,
}: OvernightSuccessSignupProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    option: "",
    accessCode: "",
  });
  const [showAccessCode, setShowAccessCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleOpenPlaybook = () => {
    setShowAccessCode(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-brand-red w-full max-w-md">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-black hover:bg-black/10"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
            <Crown className="w-6 h-6 text-brand-red" />
          </div>
          <CardTitle className="text-2xl font-bold text-black">
            Overnight Success
          </CardTitle>
          <p className="text-black/80 text-sm">
            Join thousands changing their lives overnight with next level
            creative systems.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showAccessCode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-black font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="bg-black text-white border-gray-700 focus:border-brand-red"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-black font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-black text-white border-gray-700 focus:border-brand-red"
                  required
                />
              </div>

              <div>
                <Label htmlFor="option" className="text-black font-semibold">
                  How Did You Find Us? *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, option: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-black text-white border-gray-700">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Friend Referral</SelectItem>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="ad">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                onClick={handleOpenPlaybook}
                className="w-full bg-black text-brand-red hover:bg-gray-900 font-bold py-3 flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>OPEN THE PLAYBOOK</span>
              </Button>

              <p className="text-xs text-black/70 text-center">
                By submitting this, you agree to receive updates about new
                features and promotional emails (you can unsubscribe at any
                time)
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  Access Code Required
                </h3>
                <p className="text-black/80 text-sm mb-4">
                  Enter your access code to unlock The Playbook
                </p>
              </div>

              <div>
                <Label
                  htmlFor="accessCode"
                  className="text-black font-semibold"
                >
                  Access Code *
                </Label>
                <Input
                  id="accessCode"
                  placeholder="Enter access code"
                  value={formData.accessCode}
                  onChange={(e) =>
                    setFormData({ ...formData, accessCode: e.target.value })
                  }
                  className="bg-black text-white border-gray-700 focus:border-brand-red"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAccessCode(false)}
                  className="flex-1 border-black text-black hover:bg-black hover:text-brand-red"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-black text-brand-red hover:bg-gray-900"
                >
                  Access Playbook
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
