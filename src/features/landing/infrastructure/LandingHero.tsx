import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import './LandingHero.css';

interface LandingHeroProps {
  onNavigateDashboard: () => void;
  onOpenLogin: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigateDashboard,
  onOpenLogin,
}) => {
  return (
    <section className="landing-hero-section">
      <div className="hero-pill-badge">
        <Sparkles size={13} className="hero-badge-icon" />
        <span>v3.2.0 Enterprise Intelligence Ready</span>
      </div>

      <h1 className="hero-main-title">
        Observabilidad y Telemetría Web{' '}
        <span className="hero-highlight">Ultraligera</span>
      </h1>

      <p className="hero-description">
        Mide fricción de usuario, rage clicks y snapshots inertes del DOM en tiempo real,
        diseñado con arquitectura desacoplada y modo claro de alto impacto visual corporativo.
      </p>

      <div className="hero-cta-group">
        <button
          type="button"
          className="btn-hero-primary"
          onClick={onNavigateDashboard}
        >
          <span>Acceder al Panel de Control</span>
          <ArrowRight size={15} />
        </button>
        <button
          type="button"
          className="btn-hero-secondary"
          onClick={onOpenLogin}
        >
          <ShieldCheck size={15} />
          <span>Autenticación & Roles</span>
        </button>
      </div>

      <div className="hero-trust-metrics">
        <div className="trust-item">
          <strong>&lt; 0.5ms</strong>
          <span>Tiempo Despacho</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <strong>100%</strong>
          <span>Datos Sanitizados</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <strong>2 Roles</strong>
          <span>Admin & Analista</span>
        </div>
      </div>
    </section>
  );
};
