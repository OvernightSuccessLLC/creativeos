import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Crown,
  Zap,
  BarChart3,
  Headphones,
  Star,
  CheckCircle,
  X,
  Lock,
  Key,
  Sparkles,
} from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  requiredPlan?: 'pro' | 'enterprise';
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  feature,
  requiredPlan = 'pro',
}) => {
  const { login, isLoading } = useAuth();
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) return;

    setIsSubmitting(true);
    setError('');

    const success = await login(accessKey.trim());
    if (success) {
      onClose();
    } else {
      setError('Invalid access key. Please check and try again.');
    }
    setIsSubmitting(false);
  };

  const plans = [
    {
      name: 'Free',
      key: 'DEMO-FREE-2025',
      price: '$0',
      period: 'forever',
      color: 'bg-gray-600',
      features: [
        'Basic prompt generation',
        '10 prompts per day',
        'Standard templates',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      key: 'PRO-ACCESS-2025',
      price: '$29',
      period: 'month',
      color: 'bg-brand-red',
      popular: true,
      features: [
        'Unlimited prompts',
        'Advanced analytics',
        'Priority support',
        'Exclusive templates',
        'Advanced quality optimizer',
        'Export capabilities',
      ],
    },
    {
      name: 'Enterprise',
      key: 'ENTERPRISE-2025',
      price: '$99',
      period: 'month',
      color: 'bg-purple-600',
      features: [
        'Everything in Pro',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'Team collaboration',
        'White-label options',
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand-red rounded-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upgrade Required</h2>
              {feature && (
                <p className="text-gray-400 text-sm">
                  Access "{feature}" with {requiredPlan} plan
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Access Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-brand-red" />
              Quick Access with Key
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter your access key..."
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={!accessKey.trim() || isSubmitting}
                className="bg-brand-red hover:bg-red-600 text-white font-bold px-6"
              >
                {isSubmitting ? 'Verifying...' : 'Access'}
              </Button>
            </form>
            
            {/* Demo Keys */}
            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Demo access keys for testing:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="text-gray-300">
                  <span className="font-mono bg-gray-800 px-2 py-1 rounded">DEMO-FREE-2025</span>
                  <span className="ml-2 text-gray-500">Free Plan</span>
                </div>
                <div className="text-gray-300">
                  <span className="font-mono bg-gray-800 px-2 py-1 rounded">PRO-ACCESS-2025</span>
                  <span className="ml-2 text-gray-500">Pro Plan</span>
                </div>
                <div className="text-gray-300">
                  <span className="font-mono bg-gray-800 px-2 py-1 rounded">ENTERPRISE-2025</span>
                  <span className="ml-2 text-gray-500">Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative bg-gray-900 border-gray-700 hover:border-gray-600 transition-all ${
                  plan.popular ? 'ring-2 ring-brand-red' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-red text-white font-bold px-3 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-white">
                    {plan.price}
                    <span className="text-lg text-gray-400 font-normal">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => setAccessKey(plan.key)}
                    className={`w-full ${plan.color} hover:opacity-90 text-white font-bold`}
                  >
                    Use {plan.name} Key
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <Zap className="w-8 h-8 text-brand-red mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Unlimited Access</h4>
              <p className="text-gray-400 text-xs">Generate unlimited prompts</p>
            </div>
            <div className="text-center p-4">
              <BarChart3 className="w-8 h-8 text-brand-red mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Advanced Analytics</h4>
              <p className="text-gray-400 text-xs">Track performance metrics</p>
            </div>
            <div className="text-center p-4">
              <Headphones className="w-8 h-8 text-brand-red mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Priority Support</h4>
              <p className="text-gray-400 text-xs">Get help when you need it</p>
            </div>
            <div className="text-center p-4">
              <Star className="w-8 h-8 text-brand-red mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Exclusive Content</h4>
              <p className="text-gray-400 text-xs">Access premium templates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
