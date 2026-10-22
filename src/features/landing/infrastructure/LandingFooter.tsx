import React from 'react';
import { Activity } from 'lucide-react';
import { APP_CONFIG } from '../../../core/config/app_config';
import './LandingFooter.css';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <div className="footer-logo-badge">
              <Activity size={14} />
            </div>
            <span className="brand-logo">{APP_CONFIG.name}</span>
          </div>
          <span className="footer-tagline">{APP_CONFIG.tagline}</span>
        </div>
        <div className="footer-meta">
          <span>Frontend Desacoplado (React 19 + TypeScript + Vite)</span>
          <span>© 2026 Counter Analytics Inc. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};
