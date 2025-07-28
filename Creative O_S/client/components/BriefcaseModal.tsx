import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Package,
  Calendar,
  Bell,
  BookOpen,
  Database,
  LayoutTemplate,
  Zap,
  Crown,
  ExternalLink,
  Download,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
interface BriefcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}
export default function BriefcaseModal({
  isOpen,
  onClose,
  onNavigate,
}: BriefcaseModalProps) {
  if (!isOpen) return null;
  const updates = [
    {
      date: "Jan 20, 2025",
      type: "New Launch",
      title: "Creative Director OS v1.0 - Live Now!",
      description:
        "The complete Creative Director OS is now live with all features integrated: Templates, Playbook, and AI Toolkit working seamlessly together.",
      badge: "LIVE",
      badgeColor: "bg-green-500",
      action: "Visit Playbook",
      actionPath: "/playbook",
    },
    {
      date: "Jan 20, 2025",
      type: "Enhancement",
      title: "Templates Library with Copy-to-Clipboard",
      description:
        "Browse our growing collection of professional prompt templates. Each template is tested and optimized for SORA with one-click copying.",
      badge: "UPDATED",
      badgeColor: "bg-purple-500",
      action: "Browse Templates",
      actionPath: "/templates",
    },
    {
      date: "Jan 20, 2025",
      type: "Resource",
      title: "Complete AI Toolkit with 25+ Tools",
      description:
        "Access our curated collection of the best AI creative tools, organized by category with direct links and usage recommendations.",
      badge: "FEATURED",
      badgeColor: "bg-orange-500",
      action: "View Toolkit",
      actionPath: "/ai-toolkit",
    },
  ];
  const navigationItems = [
    {
      name: "THE PLAYBOOK",
      icon: BookOpen,
      path: "/playbook",
      color: "bg-green-600",
    },
    {
      name: "TEMPLATES",
      icon: LayoutTemplate,
      path: "/templates",
      color: "bg-blue-600",
    },
    {
      name: "AI TOOLKIT",
      icon: Zap,
      path: "/ai-toolkit",
      color: "bg-purple-600",
    },
  ];
  const stats = [
    { label: "Active Users", value: "2.4k", icon: Users },
    { label: "Templates", value: "150+", icon: LayoutTemplate },
    { label: "Keywords", value: "500+", icon: Database },
    { label: "Tools Listed", value: "25+", icon: Zap },
  ];
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-black border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                <Package className="w-4 h-4 text-white font-body" />
              </div>
              <CardTitle
                className="text-xl text-white brand-heading font-body"
              >
                THE BRIEFCASE
              </CardTitle>
              <Badge className="bg-brand-red text-white text-xs font-body">LIVE</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-white font-body"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="w-4 h-4 text-brand-red mr-1" />
                  <span className="text-lg font-heading text-white font-body">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-white">{stat.label}</span>
              </div>
            ))}
          </div>
          {/* Quick Navigation */}
          <div className="flex space-x-3 mt-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className="flex items-center space-x-2 px-3 py-2 rounded text-sm font-body-medium text-white hover:text-white hover:bg-gray-800 transition-colors font-body"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(item.path);
                    onClose();
                  }
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            <div>
              <h2
                className="text-2xl font-brand-black text-white mb-2 brand-heading font-body"
              >
                Latest Updates & Features
              </h2>
              <p className="text-white">
                Stay up to date with new features, content, and improvements to
                Creative Director OS
              </p>
            </div>
            <div className="space-y-4">
              {updates.map((update, index) => (
                <Card
                  key={index}
                  className="bg-gray-900 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm text-white flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {update.date}
                          </span>
                          <Badge
                            className={`${update.badgeColor} text-white text-xs`}
                          >
                            {update.badge}
                          </Badge>
                        </div>
                        <h3
                          className="text-lg font-semibold text-white mb-2 font-body"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                          }}
                        >
                          {update.title}
                        </h3>
                        <p className="text-white text-sm mb-3">
                          {update.description}
                        </p>
                        {update.action && (
                          <Button
                            size="sm"
                            className="bg-brand-red hover:opacity-90 text-white font-body"
                            onClick={() => {
                              if (onNavigate && update.actionPath) {
                                onNavigate(update.actionPath);
                                onClose();
                              }
                            }}
                          >
                            {update.action}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-brand-red text-sm font-body-medium">
                          {update.type}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-brand-red to-red-600 border border-red-500">
              <CardContent className="p-6 text-center">
                <Crown className="w-8 h-8 text-white mx-auto mb-3 font-body" />
                <h3
                  className="text-xl font-heading text-white mb-2 font-body"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "700",
                  }}
                >
                  Ready to Create?
                </h3>
                <p className="text-white mb-4 font-body">
                  Start building professional prompts with the complete Creative
                  Director OS toolkit
                </p>
                <Button
                  className="bg-white text-black hover:bg-gray-100 font-button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate("/playbook");
                      onClose();
                    }
                  }}
                >
                  Start Creating Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
