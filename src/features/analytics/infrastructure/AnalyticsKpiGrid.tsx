import React from 'react';
import { Activity, Users, Timer, CheckCircle, Monitor } from 'lucide-react';
import { KpisData } from '../domain/analytics_types';
import './AnalyticsKpiGrid.css';

interface AnalyticsKpiGridProps {
  kpis: KpisData;
}

export const AnalyticsKpiGrid: React.FC<AnalyticsKpiGridProps> = ({ kpis }) => {
  const topPlatform = kpis.client_platforms?.[0];

  return (
    <div className="kpi-section-wrap">
      <div className="kpis-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Eventos Capturados</span>
            <div className="kpi-icon-box box-blue">
              <Activity size={16} />
            </div>
          </div>
          <div className="kpi-val">{kpis.total_events.toLocaleString()}</div>
          <span className="kpi-sub">Promedio {kpis.avg_events_per_session} ev/sesión</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Sesiones Activas</span>
            <div className="kpi-icon-box box-purple">
              <Users size={16} />
            </div>
          </div>
          <div className="kpi-val">{kpis.total_sessions}</div>
          <span className="kpi-sub">Usuarios únicos rastreados</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Permanencia Activa (Dwell)</span>
            <div className="kpi-icon-box box-amber">
              <Timer size={16} />
            </div>
          </div>
          <div className="kpi-val">{kpis.avg_dwell_seconds}s</div>
          <span className="kpi-sub">Tiempo medio de navegación</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Tasa de Rebote</span>
            <div className="kpi-icon-box box-green">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="kpi-val text-green">{kpis.bounce_rate}%</div>
          <span className="kpi-sub">Retención alta en navegación</span>
        </div>
      </div>

      {topPlatform && (
        <div className="platform-pill-row">
          <Monitor size={14} className="platform-icon" />
          <span>Plataforma predominante:</span>
          <strong>{topPlatform.browser}</strong> en <strong>{topPlatform.os}</strong> ({topPlatform.device})
          <span className="platform-count">({topPlatform.count} eventos)</span>
        </div>
      )}
    </div>
  );
};
