export interface PlatformInfo {
  readonly browser: string;
  readonly os: string;
  readonly device: string;
  readonly count: number;
}

export interface KpisData {
  readonly total_events: number;
  readonly total_sessions: number;
  readonly bounce_rate: number;
  readonly avg_dwell_seconds: number;
  readonly avg_events_per_session: number;
  readonly client_platforms: PlatformInfo[];
}

export interface FunnelStep {
  readonly step: number;
  readonly name: string;
  readonly sessions: number;
  readonly conversion_rate: number;
  readonly drop_off_rate: number;
}

export interface RageClickHotspot {
  readonly element: string;
  readonly text: string;
  readonly incidents: number;
  readonly max_clicks_recorded: number;
  readonly visual?: string;
}

export interface ClientErrorItem {
  readonly message: string;
  readonly line: number;
  readonly occurrences: number;
  readonly file?: string;
  readonly last_seen?: string;
}

export interface FrictionData {
  readonly friction_score: number;
  readonly status: string;
  readonly total_rage_clicks: number;
  readonly total_client_errors: number;
  readonly rage_click_hotspots: RageClickHotspot[];
  readonly client_errors_breakdown: ClientErrorItem[];
}

export interface ComponentStyles {
  readonly backgroundColor: string;
  readonly color: string;
  readonly borderRadius: string;
}

export interface VisualComponentItem {
  readonly element: string;
  readonly text: string;
  readonly visual_type: string;
  readonly styles: ComponentStyles;
  readonly total_clicks: number;
  readonly engagement_share: number;
}

export interface AnalyticsOverviewData {
  readonly site_key: string;
  readonly kpis: KpisData;
  readonly funnel: FunnelStep[];
  readonly friction: FrictionData;
  readonly visual_components: VisualComponentItem[];
}

export interface AnalyticsOverviewResponse {
  readonly success: boolean;
  readonly data: AnalyticsOverviewData;
}

export interface RawTelemetryEvent {
  readonly id: number;
  readonly site_key: string;
  readonly event_type: string;
  readonly page_url: string;
  readonly created_at: string;
  readonly event_data: {
    readonly element?: string;
    readonly text?: string;
    readonly path?: string;
    readonly title?: string;
    readonly _client?: {
      readonly browser?: string;
      readonly os?: string;
      readonly device?: string;
    };
    readonly _network?: {
      readonly client_ip?: string;
      readonly location?: string;
      readonly is_local?: boolean;
    };
  };
}

export interface RawEventsResponse {
  readonly site_key: string;
  readonly events: RawTelemetryEvent[];
}
