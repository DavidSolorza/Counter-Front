import React from 'react';
import { Layout, MousePointerClick } from 'lucide-react';
import { VisualComponentItem } from '../domain/analytics_types';
import './VisualComponentsSection.css';

interface VisualComponentsSectionProps {
  components: VisualComponentItem[];
}

export const VisualComponentsSection: React.FC<VisualComponentsSectionProps> = ({ components }) => {
  return (
    <div className="visuals-card">
      <div className="visuals-header">
        <div className="visuals-title-row">
          <Layout size={16} className="visuals-icon" />
          <div>
            <h3>Componentes DOM Interfase (VisualWireframe)</h3>
            <span className="visuals-subtitle">
              Reconstrucción de estilos CSS reales y cuota de interacción del usuario
            </span>
          </div>
        </div>
        <span className="visuals-tag">Snapshots Inertes</span>
      </div>

      <div className="visuals-grid">
        {components.map((comp, idx) => {
          const previewStyles: React.CSSProperties = {
            backgroundColor: comp.styles?.backgroundColor || '#f1f5f9',
            color: comp.styles?.color || '#0f172a',
            borderRadius: comp.styles?.borderRadius || '6px',
            border: '1px solid #cbd5e1',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-block',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };

          return (
            <div key={idx} className="visual-item-card">
              <div className="visual-preview-box">
                <span className="visual-preview-label">Wireframe Real:</span>
                <div style={previewStyles}>
                  {comp.text?.split('\n')[0] || comp.element}
                </div>
              </div>

              <div className="visual-info">
                <code className="visual-element-tag">{comp.element}</code>
                <div className="visual-stats-row">
                  <span className="clicks-count">
                    <MousePointerClick size={12} />
                    {comp.total_clicks} Clics
                  </span>
                  <span className="share-rate">{comp.engagement_share}% Interacción</span>
                </div>
                <div className="share-bar-bg">
                  <div
                    className="share-bar-fill"
                    style={{ width: `${Math.min(comp.engagement_share * 5, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
