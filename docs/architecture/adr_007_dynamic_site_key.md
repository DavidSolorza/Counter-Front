# ADR 007: Resolución Dinámica de Site Key y Aislamiento de Telemetría

## Estado
Aceptado

## Contexto
El microservicio de seguridad y licencias (`:8080`) asigna o recupera una clave única pública (`license.site_key`) al autenticar al usuario mediante GitHub. Para evitar colisiones y garantizar el aislamiento de métricas por cuenta, los componentes de telemetría y snippets de instalación deben resolver la llave de forma dinámica.

## Decisión
1. Almacenar el objeto completo de licencia (`UserLicense`) en la sesión del usuario (`UserSession`).
2. Exponer un hook reutilizable `useActiveSiteKey()` en `auth_context.tsx` que evalúe:
   `session?.license?.site_key || session?.siteKey || localStorage.getItem('__cntr_site_key') || import.meta.env.VITE_DEFAULT_SITE_KEY || 'wk_live_demo'`.
3. Inyectar `activeSiteKey` dinámicamente en:
   - `LandingCodeSnippet.tsx` para generar el snippet listo para pegar con la llave personal.
   - `UserAnalyticsDashboard.tsx` para consultar los datos correspondientes en Flask (`:5000`).
   - `LicenseManagementCard.tsx` para la administración de licencias en el panel de administrador.

## Consecuencias
- Telemetría aislada para cada cliente que inicia sesión.
- Experiencia de instalación automatizada y personalizada.
- Cero acoplamiento a valores fijos cableados en el código.
