import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppNavigation from "@/components/AppNavigation";
import {
  Bell,
  Zap,
  Camera,
  Crown,
  BarChart3,
  Users,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  Star,
} from "lucide-react";
const Updates: React.FC = () => {
  const navigate = useNavigate();
  const updates = [
    {
      id: 1,
      type: "feature",
      title: "AI Quality Optimizer 2.0 Released",
      description:
        "Enhanced prompt analysis with real-time quality metrics and advanced keyword suggestions for better results.",
      timestamp: "2 hours ago",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      reactions: { likes: 124, comments: 23, shares: 8 },
      isNew: true,
    },
    {
      id: 2,
      type: "community",
      title: "1M+ Prompts Generated This Week",
      description:
        "Our community has generated over 1 million high-quality prompts this week. Thank you for being part of the creative revolution!",
      timestamp: "6 hours ago",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      reactions: { likes: 89, comments: 12, shares: 5 },
      isNew: true,
    },
    {
      id: 3,
      type: "studio",
      title: "New Lifestyle Studio Features",
      description:
        "Added advanced mood filters, lighting presets, and emotion-based keyword categories for more authentic lifestyle photography.",
      timestamp: "1 day ago",
      icon: Camera,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      reactions: { likes: 156, comments: 34, shares: 12 },
      isNew: false,
    },
    {
      id: 4,
      type: "feature",
      title: "New AI Toolkit Features",
      description:
        "Discover 70+ new AI tools added to our toolkit, including advanced image generation and creative design tools.",
      timestamp: "2 days ago",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      reactions: { likes: 78, comments: 19, shares: 6 },
      isNew: false,
    },
    {
      id: 5,
      type: "analytics",
      title: "Weekly Performance Report",
      description:
        "Your prompts generated 2.3x higher engagement this week. View detailed analytics and optimization suggestions.",
      timestamp: "3 days ago",
      icon: BarChart3,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      reactions: { likes: 45, comments: 8, shares: 3 },
      isNew: false,
    },
    {
      id: 6,
      type: "feature",
      title: "Template Library Expansion",
      description:
        "50+ new professional templates added across all studios including portrait, product, and architectural photography.",
      timestamp: "5 days ago",
      icon: Camera,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      reactions: { likes: 203, comments: 56, shares: 18 },
      isNew: false,
    },
    {
      id: 7,
      type: "community",
      title: "Community Showcase Winner",
      description:
        "Congratulations to @creativepro_sarah for winning this week's prompt challenge with her innovative lifestyle series!",
      timestamp: "1 week ago",
      icon: Star,
      color: "text-gold-500",
      bgColor: "bg-yellow-500/10",
      reactions: { likes: 312, comments: 87, shares: 24 },
      isNew: false,
    },
  ];
  return (
    <div className="min-h-screen bg-brand-red text-black">
      {/* Navigation */}
      <AppNavigation />
      {/* Updates Feed */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-4 sm:space-y-6">
          {updates.map((update, index) => (
            <Card
              key={update.id}
              className="bg-black border border-white/20 hover:border-brand-red transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/10 overflow-hidden group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideIn 0.6s ease-out forwards",
              }}
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`p-2 rounded-lg ${update.bgColor} flex-shrink-0`}
                    >
                      <update.icon className={`w-5 h-5 ${update.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold text-sm sm:text-base truncate font-body">
                          {update.title}
                        </h3>
                        {update.isNew && (
                          <Badge className="bg-brand-red text-black hover:bg-brand-red-hover font-button px-2 py-0.5">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-body">
                        {update.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-white/50 text-xs font-body">
                          {update.timestamp}
                        </span>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-white/60 hover:text-brand-red transition-colors group font-body">
                            <Heart className="w-4 h-4 group-hover:fill-current" />
                            <span className="text-xs">
                              {update.reactions.likes}
                            </span>
                          </button>
                          <button className="flex items-center space-x-1 text-white/60 hover:text-brand-red transition-colors font-body">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">
                              {update.reactions.comments}
                            </span>
                          </button>
                          <button className="flex items-center space-x-1 text-white/60 hover:text-brand-red transition-colors font-body">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">
                              {update.reactions.shares}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button
            className="bg-black text-brand-red border border-white/20 hover:bg-brand-red hover:text-black font-button px-8 py-4 min-h-[48px] touch-manipulation transition-all duration-300"
          >
            LOAD MORE UPDATES
          </Button>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default Updates;
