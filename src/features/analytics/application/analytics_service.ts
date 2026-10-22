import { httpClient } from '../../../core/http/http_client';
import {
  AnalyticsOverviewData,
  AnalyticsOverviewResponse,
  RawEventsResponse,
  RawTelemetryEvent,
} from '../domain/analytics_types';

const BASE_URL = 'http://localhost:5000/api/v1';

export class AnalyticsService {
  public async getOverview(siteKey: string = 'wk_live_demo'): Promise<AnalyticsOverviewData> {
    try {
      const response = await httpClient.get<AnalyticsOverviewResponse>(
        `${BASE_URL}/analytics/overview/${siteKey}`
      );
      if (response && response.success && response.data) {
        return response.data;
      }
      throw new Error('Respuesta inválida del servidor');
    } catch (error) {
      console.warn('Fallo al conectar con Flask backend, activando fallback local:', error);
      return this.getFallbackOverview(siteKey);
    }
  }

  public async getEvents(siteKey: string = 'wk_live_demo', limit: number = 15): Promise<RawTelemetryEvent[]> {
    try {
      const response = await httpClient.get<RawEventsResponse>(
        `${BASE_URL}/events/${siteKey}?limit=${limit}`
      );
      if (response && Array.isArray(response.events)) {
        return response.events;
      }
      return [];
    } catch (error) {
      console.warn('Fallo al obtener eventos en vivo:', error);
      return [];
    }
  }

  private getFallbackOverview(siteKey: string): AnalyticsOverviewData {
    return {
      site_key: siteKey,
      kpis: {
        total_events: 113,
        total_sessions: 1,
        bounce_rate: 0.0,
        avg_dwell_seconds: 21.0,
        avg_events_per_session: 113.0,
        client_platforms: [
          { browser: 'Chrome', os: 'Windows', device: 'desktop', count: 113 },
        ],
      },
      funnel: [
        { step: 1, name: '1. Visita y Entrada', sessions: 1, conversion_rate: 100.0, drop_off_rate: 0.0 },
        { step: 2, name: '2. Exploración Catálogo', sessions: 1, conversion_rate: 100.0, drop_off_rate: 0.0 },
        { step: 3, name: '3. Intención de Compra', sessions: 1, conversion_rate: 100.0, drop_off_rate: 0.0 },
        { step: 4, name: '4. Contacto y Conversión', sessions: 1, conversion_rate: 100.0, drop_off_rate: 0.0 },
      ],
      friction: {
        friction_score: 30,
        status: 'Crítico',
        total_rage_clicks: 17,
        total_client_errors: 6,
        rage_click_hotspots: [
          {
            element: 'BUTTON#faq-header-4.w-full',
            text: 'RENOVACIONES - ¿Puedo renovar la cuenta?',
            incidents: 6,
            max_clicks_recorded: 4,
          },
          {
            element: 'BUTTON#faq-header-2.w-full',
            text: 'MODALIDADES - ¿Qué diferencia hay?',
            incidents: 5,
            max_clicks_recorded: 4,
          },
        ],
        client_errors_breakdown: [
          {
            file: 'http://localhost:5175/react-dom.js',
            line: 9715,
            message: 'Uncaught Error: Rendered more hooks than during the previous render.',
            occurrences: 4,
          },
        ],
      },
      visual_components: [
        {
          element: 'SPAN.text-emerald-700',
          text: '¡Añadido!',
          visual_type: 'button',
          styles: { backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgb(4, 120, 87)', borderRadius: '0px' },
          total_clicks: 11,
          engagement_share: 11.6,
        },
        {
          element: 'BUTTON.px-5',
          text: 'Escribir mi Reseña',
          visual_type: 'button',
          styles: { backgroundColor: 'rgb(59, 130, 246)', color: 'rgb(255, 255, 255)', borderRadius: '16px' },
          total_clicks: 5,
          engagement_share: 5.3,
        },
      ],
    };
  }
}

export const analyticsService = new AnalyticsService();
