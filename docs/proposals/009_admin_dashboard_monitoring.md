# Propuesta Técnica: Capacidad de Monitoreo de Dashboards de Usuarios para el Administrador

## 1. Justificación y Objetivos
- **Visión Holística del Administrador:** El Administrador del sistema no solo debe gestionar altas, bajas, pausas y licencias de usuarios, sino también disponer de visibilidad en tiempo real sobre la telemetría y métricas recopiladas por cada cliente o cuenta de usuario en la plataforma.
- **Modo Auditoría / Inspección de Dashboards:** Permitir que el Administrador acceda directamente al Dashboard de Analítica de cualquier usuario desde la tabla de gestión, visualizando sus KPIs, embudo de conversión, componentes de fricción y eventos con su respectiva `site_key`.
- **Navegación Fluida:** Proporcionar un banner de control que indique claramente al administrador que se encuentra en modo auditoría e incluya un botón de acción rápida para retornar a la vista de gestión sin perder la sesión administrativa.

---

## 2. Componentes Involucrados y Modificaciones
1. **[`managed_user.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/domain/managed_user.ts):**
   - Incorporar `siteKey?: string` en la entidad `ManagedUser`.
2. **[`user_management_service.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/application/user_management_service.ts):**
   - Asignar claves de sitio únicas a cada usuario del sistema.
3. **[`UserActionControls.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/infrastructure/UserActionControls.tsx):**
   - Agregar el botón de acción **"Monitorear"** con icono `Activity`.
4. **[`UserAnalyticsDashboard.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/analytics/infrastructure/UserAnalyticsDashboard.tsx):**
   - Aceptar props opcionales `customSiteKey`, `monitoredUserTitle` y `onExitMonitoring`.
5. **[`AdminPanel.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/infrastructure/AdminPanel.tsx):**
   - Gestionar el estado `monitoredUser: ManagedUser | null` y orquestar el cambio de vista.

---

## 3. Garantía de Gobernanza
- Límite absoluto de máximo 150 líneas por archivo fuente.
- Tipado TypeScript estricto.
- Componentes desacoplados bajo Vertical Slicing.
