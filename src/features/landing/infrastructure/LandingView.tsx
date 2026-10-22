import React from 'react';
import { useAuth } from '../../auth/application/auth_context';
import { LandingHero } from './LandingHero';
import { LandingFeatures } from './LandingFeatures';
import { LandingRolePreview } from './LandingRolePreview';
import { LandingCodeSnippet } from './LandingCodeSnippet';
import { LandingFooter } from './LandingFooter';

interface LandingViewProps {
  onNavigateDashboard: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigateDashboard }) => {
  const { openAuthModal, login } = useAuth();

  const handleSelectRoleFromPreview = (role: 'admin' | 'user') => {
    const email = role === 'admin' ? 'admin@counter.io' : 'usuario@empresa.com';
    login(email, role);
    onNavigateDashboard();
  };

  return (
    <div className="landing-view-wrapper">
      <LandingHero
        onNavigateDashboard={onNavigateDashboard}
        onOpenLogin={openAuthModal}
      />
      <LandingFeatures />
      <LandingRolePreview onSelectRole={handleSelectRoleFromPreview} />
      <LandingCodeSnippet />
      <LandingFooter />
    </div>
  );
};
