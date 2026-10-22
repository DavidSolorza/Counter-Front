import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Key, ShieldCheck } from 'lucide-react';
import { analyticsService } from '../application/analytics_service';
import { AnalyticsOverviewData, RawTelemetryEvent } from '../domain/analytics_types';
import { AnalyticsKpiGrid } from './AnalyticsKpiGrid';
import { FunnelVisualizer } from './FunnelVisualizer';
import { FrictionSection } from './FrictionSection';
import { VisualComponentsSection } from './VisualComponentsSection';
import { TelemetryEventsTable } from './TelemetryEventsTable';
import './UserAnalyticsDashboard.css';

export const UserAnalyticsDashboard: React.FC = () => {
  const [siteKey] = useState('wk_live_demo');
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
      <div className="dashboard-top-bar">
        <div className="dashboard-meta-info">
          <div className="site-key-badge">
            <Key size={13} />
            <span>Licencia Activa: <strong>{siteKey}</strong></span>
          </div>
          <div className="backend-status-pill">
            <ShieldCheck size={13} />
            <span>Backend Flask :5000 Conectado</span>
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
