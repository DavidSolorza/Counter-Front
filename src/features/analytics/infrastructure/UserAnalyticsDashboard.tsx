import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Key, ShieldCheck, Eye, ArrowLeft } from 'lucide-react';
import { useActiveSiteKey } from '../../auth/application/auth_context';
import { analyticsService } from '../application/analytics_service';
import { AnalyticsOverviewData, RawTelemetryEvent } from '../domain/analytics_types';
import { AnalyticsKpiGrid } from './AnalyticsKpiGrid';
import { FunnelVisualizer } from './FunnelVisualizer';
import { FrictionSection } from './FrictionSection';
import { VisualComponentsSection } from './VisualComponentsSection';
import { TelemetryEventsTable } from './TelemetryEventsTable';
import './UserAnalyticsDashboard.css';

interface UserAnalyticsDashboardProps {
  customSiteKey?: string;
  monitoredUserTitle?: string;
  onExitMonitoring?: () => void;
}

export const UserAnalyticsDashboard: React.FC<UserAnalyticsDashboardProps> = ({
  customSiteKey,
  monitoredUserTitle,
  onExitMonitoring,
}) => {
  const defaultSiteKey = useActiveSiteKey();
  const siteKey = customSiteKey || defaultSiteKey;
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const [events, setEvents] = useState<RawTelemetryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [overviewData, rawEvents] = await Promise.all([
        analyticsService.getOverview(siteKey),
        analyticsService.getEvents(siteKey, 15),
      ]);
      setData(overviewData);
      setEvents(rawEvents);
      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setIsLoading(false);
    }
  }, [siteKey]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="user-dashboard-container">
      {monitoredUserTitle && onExitMonitoring && (
        <div className="admin-monitoring-alert">
          <div className="alert-content">
            <Eye size={15} />
            <span>
              Modo Auditoría Admin: Monitoreando telemetría de <strong>{monitoredUserTitle}</strong> (Licencia: <code>{siteKey}</code>)
            </span>
          </div>
          <button type="button" className="btn-exit-monitoring" onClick={onExitMonitoring}>
            <ArrowLeft size={13} />
            <span>Volver a Gestión de Usuarios</span>
          </button>
        </div>
      )}

      <div className="dashboard-top-bar">
        <div className="dashboard-meta-info">
          <div className="site-key-badge">
            <Key size={13} />
            <span>Licencia Activa: <strong>{siteKey}</strong></span>
          </div>
          <div className="backend-status-pill">
            <ShieldCheck size={13} />
            <span>Colector de Telemetría Activo</span>
          </div>
          {lastUpdated && <span className="last-sync-text">Sincronizado: {lastUpdated}</span>}
        </div>

        <button
          type="button"
          className="btn-refresh"
          onClick={loadData}
          disabled={isLoading}
          title="Recargar datos de analítica"
        >
          <RefreshCw size={13} className={isLoading ? 'spinning' : ''} />
          <span>{isLoading ? 'Actualizando...' : 'Recargar Datos'}</span>
        </button>
      </div>

      {data && (
        <div className="analytics-content-stack">
          <AnalyticsKpiGrid kpis={data.kpis} />
          <FunnelVisualizer funnel={data.funnel} />
          <FrictionSection friction={data.friction} />
          <VisualComponentsSection components={data.visual_components} />
          <TelemetryEventsTable events={events} />
        </div>
      )}
    </div>
  );
};
