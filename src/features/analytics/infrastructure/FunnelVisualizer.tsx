import React from 'react';
import { Filter, ArrowRight } from 'lucide-react';
import { FunnelStep } from '../domain/analytics_types';
import './FunnelVisualizer.css';

interface FunnelVisualizerProps {
  funnel: FunnelStep[];
}

export const FunnelVisualizer: React.FC<FunnelVisualizerProps> = ({ funnel }) => {
  return (
    <div className="funnel-card">
      <div className="funnel-header">
        <div className="funnel-title-row">
          <Filter size={16} className="funnel-icon" />
          <h3>Embudo de Conversión (4 Etapas de Comportamiento)</h3>
        </div>
        <span className="funnel-tag">Motor FunnelProcessor</span>
      </div>

      <div className="funnel-steps-grid">
        {funnel.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="funnel-step-box">
              <div className="step-header">
                <span className="step-num">{step.step}</span>
                <span className="step-name">{step.name.replace(/^\d+\.\s*/, '')}</span>
              </div>

              <div className="step-metric-row">
                <span className="step-sessions">{step.sessions} Sesión(es)</span>
                <span className="step-rate">{step.conversion_rate}% Conv.</span>
              </div>

              <div className="step-progress-bg">
                <div
                  className="step-progress-bar"
                  style={{ width: `${Math.max(step.conversion_rate, 5)}%` }}
                />
              </div>

              <div className="step-dropoff">
                Abandono: <strong>{step.drop_off_rate}%</strong>
              </div>
            </div>

            {idx < funnel.length - 1 && (
              <div className="funnel-arrow">
                <ArrowRight size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
