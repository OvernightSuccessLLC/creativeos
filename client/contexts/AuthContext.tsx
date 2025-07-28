import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  accessKey?: string;
  features: {
    unlimitedPrompts: boolean;
    advancedAnalytics: boolean;
    prioritySupport: boolean;
    exclusiveTemplates: boolean;
    apiAccess: boolean;
  };
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessKey: string) => Promise<boolean>;
  logout: () => void;
  hasFeature: (feature: keyof User['features']) => boolean;
  upgradeRequired: (feature: keyof User['features']) => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Demo access keys for testing
const ACCESS_KEYS = {
  'DEMO-FREE-2025': {
    plan: 'free' as const,
    features: {
      unlimitedPrompts: false,
      advancedAnalytics: false,
      prioritySupport: false,
      exclusiveTemplates: false,
      apiAccess: false,
    }
  },
  'PRO-ACCESS-2025': {
    plan: 'pro' as const,
    features: {
      unlimitedPrompts: true,
      advancedAnalytics: true,
      prioritySupport: true,
      exclusiveTemplates: true,
      apiAccess: false,
    }
  },
  'ENTERPRISE-2025': {
    plan: 'enterprise' as const,
    features: {
      unlimitedPrompts: true,
      advancedAnalytics: true,
      prioritySupport: true,
      exclusiveTemplates: true,
      apiAccess: true,
    }
  }
};
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for stored access key on app load
    const storedKey = localStorage.getItem('creative_director_access_key');
    if (storedKey && ACCESS_KEYS[storedKey as keyof typeof ACCESS_KEYS]) {
      const keyData = ACCESS_KEYS[storedKey as keyof typeof ACCESS_KEYS];
      setUser({
        id: `user_${Date.now()}`,
        email: 'demo@creativedirector.com',
        plan: keyData.plan,
        accessKey: storedKey,
        features: keyData.features,
      });
    }
    setIsLoading(false);
  }, []);
  const login = async (accessKey: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const keyData = ACCESS_KEYS[accessKey as keyof typeof ACCESS_KEYS];
    if (keyData) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: 'demo@creativedirector.com',
        plan: keyData.plan,
        accessKey,
        features: keyData.features,
      };
      setUser(newUser);
      localStorage.setItem('creative_director_access_key', accessKey);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('creative_director_access_key');
  };
  const hasFeature = (feature: keyof User['features']): boolean => {
    return user?.features[feature] ?? false;
  };
  const upgradeRequired = (feature: keyof User['features']): boolean => {
    return !hasFeature(feature);
  };
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasFeature,
    upgradeRequired,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
