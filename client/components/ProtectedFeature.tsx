import React, { useState, ReactNode } from 'react';
import { useAuth, User } from '@/contexts/AuthContext';
import PaywallModal from './PaywallModal';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';

interface ProtectedFeatureProps {
  children: ReactNode;
  feature: keyof User['features'];
  requiredPlan?: 'pro' | 'enterprise';
  fallback?: ReactNode;
  showUpgradeButton?: boolean;
  featureName?: string;
}

const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({
  children,
  feature,
  requiredPlan = 'pro',
  fallback,
  showUpgradeButton = true,
  featureName,
}) => {
  const { hasFeature, upgradeRequired, isAuthenticated } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);

  // If user has access to the feature, render children
  if (isAuthenticated && hasFeature(feature)) {
    return <>{children}</>;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default locked state UI
  return (
    <>
      <div className="relative">
        <div className="filter blur-sm pointer-events-none opacity-50">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              {requiredPlan === 'enterprise' ? 'Enterprise' : 'Pro'} Feature
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {featureName || 'This feature'} requires a {requiredPlan} plan
            </p>
            {showUpgradeButton && (
              <Button
                onClick={() => setShowPaywall(true)}
                className="bg-brand-red hover:bg-red-600 text-white font-bold"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature={featureName}
        requiredPlan={requiredPlan}
      />
    </>
  );
};

export default ProtectedFeature;
