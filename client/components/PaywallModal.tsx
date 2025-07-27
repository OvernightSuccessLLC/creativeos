import React from 'react';

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
  // No longer showing any paywall or upgrade content
  // Simply close the modal if opened
  if (isOpen) {
    onClose();
  }
  
  return null;
};

export default PaywallModal;
