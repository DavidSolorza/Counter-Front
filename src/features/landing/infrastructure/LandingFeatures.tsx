import React from 'react';
import { Zap, Flame, Eye, ShieldCheck, LucideIcon } from 'lucide-react';
import './LandingFeatures.css';

interface FeatureCardData {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
  tag: string;
}

const FEATURES: FeatureCardData[] = [
  {
    icon: Zap,
    iconClass: 'icon-zap',
    title: '0% Latencia de Impacto',
    description: 'Los paquetes se procesan en segundo plano usando sendBeacon y keepalive asíncrono sin bloquear la CPU.',
    tag: 'Rendimiento',
  },
  {
    icon: Flame,
    iconClass: 'icon-flame',
    title: 'Detección de Rage Clicks',
    description: 'Algoritmo heurístico que identifica patrones de clics repetitivos causados por frustración o cuelgues.',
    tag: 'UX Audit',
  },
  {
    icon: Eye,
    iconClass: 'icon-eye',
    title: 'Snapshots DOM Inertes',
    description: 'Captura el estado estructural del elemento interactuado para reproducción visual sin datos personales.',
    tag: 'Diagnóstico',
  },
  {
    icon: ShieldCheck,
    iconClass: 'icon-shield',
    title: 'Censura PII Nativa',
    description: 'Algoritmo de tokenización en el cliente que enmascara contraseñas, tarjetas y campos confidenciales.',
    tag: 'Seguridad',
  },
];

export const LandingFeatures: React.FC = () => {
  return (
    <section className="landing-features-section">
      <div className="section-title-wrap">
        <span className="section-badge">Capacidades Principales</span>
        <h2 className="section-title">Ingeniería para Diagnóstico de Fricción</h2>
        <p className="section-subtitle">
          Diseñado para proporcionar telemetría profunda sin comprometer la velocidad de tu web.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="feature-card">
              <div className="feature-top">
                <div className={`feature-icon-box ${item.iconClass}`}>
                  <IconComp size={18} />
                </div>
                <span className="feature-tag">{item.tag}</span>
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
