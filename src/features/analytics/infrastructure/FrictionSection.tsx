import React from 'react';
import { Flame, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';
import { FrictionData } from '../domain/analytics_types';
import './FrictionSection.css';
import './FrictionErrors.css';

interface FrictionSectionProps {
  friction: FrictionData;
}

export const FrictionSection: React.FC<FrictionSectionProps> = ({ friction }) => {
  const isCritical = friction.status.toLowerCase().includes('cr');

  return (
    <div className="friction-card">
      <div className="friction-header">
        <div className="friction-title-row">
          <Flame size={18} className="friction-title-icon" />
          <div>
            <h3>Análisis de Fricción & Rage Clicks (FrictionAnalyzer)</h3>
            <span className="friction-subtitle">
              Detección de patrones de frustración e incidencias en el cliente
            </span>
          </div>
        </div>

        <div className={`friction-score-pill ${isCritical ? 'score-critical' : 'score-good'}`}>
          <ShieldAlert size={14} />
          <span>Índice UX: <strong>{friction.friction_score}/100 ({friction.status})</strong></span>
        </div>
      </div>

      <div className="friction-metrics-summary">
        <div className="friction-summary-box box-rage">
          <div className="box-top">
            <Flame size={14} />
            <span>Rage Clicks Totales</span>
          </div>
          <div className="box-val">{friction.total_rage_clicks}</div>
          <span className="box-sub">Clics repetitivos por frustración</span>
        </div>

        <div className="friction-summary-box box-errors">
          <div className="box-top">
            <AlertTriangle size={14} />
            <span>Errores JS del Cliente</span>
          </div>
          <div className="box-val">{friction.total_client_errors}</div>
          <span className="box-sub">Excepciones no capturadas</span>
        </div>
      </div>

      <div className="friction-details-grid">
        <div className="hotspots-column">
          <div className="col-header">
            <Flame size={14} />
            <h4>Hotspots de Rage Clicks</h4>
          </div>
          <div className="hotspots-list">
            {friction.rage_click_hotspots?.map((hotspot, idx) => (
              <div key={idx} className="hotspot-item">
                <div className="hotspot-main">
                  <code className="hotspot-elem">{hotspot.element}</code>
                  <span className="hotspot-text">"{hotspot.text.split('\n')[0]}"</span>
                </div>
                <div className="hotspot-badges">
                  <span className="badge-incidents">{hotspot.incidents} incidentes</span>
                  <span className="badge-clicks">{hotspot.max_clicks_recorded} clics ráfaga</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="errors-column">
          <div className="col-header">
            <AlertCircle size={14} />
            <h4>Desglose de Errores en Frontend</h4>
          </div>
          <div className="errors-list">
            {friction.client_errors_breakdown?.map((err, idx) => (
              <div key={idx} className="error-item">
                <div className="error-msg">{err.message}</div>
                <div className="error-meta">
                  <span>Línea: <code>:{err.line}</code></span>
                  <span className="error-occurrences">{err.occurrences} ocurrencias</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
