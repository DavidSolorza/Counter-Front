import React from 'react';
import { Radio } from 'lucide-react';
import { RawTelemetryEvent } from '../domain/analytics_types';
import './TelemetryEventsTable.css';

interface TelemetryEventsTableProps {
  events: RawTelemetryEvent[];
}

export const TelemetryEventsTable: React.FC<TelemetryEventsTableProps> = ({ events }) => {
  return (
    <div className="events-card">
      <div className="events-header">
        <div className="events-title-wrap">
          <h3>Flujo de Eventos Ingestados (Keepalive Telemetry)</h3>
          <span className="events-subtitle">Registro granular de telemetría persistido en analytics.db</span>
        </div>
        <span className="events-live-pill">
          <Radio size={12} className="live-icon" />
          <span>Feed en Vivo</span>
        </span>
      </div>

      <div className="table-responsive">
        <table className="events-table">
          <thead>
            <tr>
              <th>ID Evento</th>
              <th>Tipo</th>
              <th>Elemento / Título</th>
              <th>Ruta URL</th>
              <th>Dispositivo / IP</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((ev) => (
                <tr key={ev.id}>
                  <td><span className="ev-id">#{ev.id}</span></td>
                  <td>
                    <span className={`ev-pill pill-${ev.event_type}`}>
                      {ev.event_type.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="ev-target">
                    {ev.event_data?.element || ev.event_data?.title || 'Vista de Página'}
                  </td>
                  <td><code className="ev-path">{ev.page_url.replace('http://localhost:5175', '')}</code></td>
                  <td>
                    <span className="ev-device">
                      {ev.event_data?._client?.browser || 'N/A'} • {ev.event_data?._network?.client_ip || '127.0.0.1'}
                    </span>
                  </td>
                  <td><span className="ev-time">{ev.created_at}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-events-state">
                  No hay eventos registrados recientemente para esta licencia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
