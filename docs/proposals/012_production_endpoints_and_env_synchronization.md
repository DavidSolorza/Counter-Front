# Propuesta Técnica: Sincronización de Endpoints de Producción y Variables de Entorno

- **Fecha:** 2026-10-22  
- **Autor:** VP of Engineering & Software Architect  
- **Estado:** EN EJECUCIÓN (Aprobado explícitamente por el usuario)  
- **Alcance:** `Counter-Front` (.env, .env.example, app_config.ts, analytics_service.ts, snippet generador)  

---

## 1. Justificación y Necesidad Técnica
El proyecto Counter-Front pasa de configuración de desarrollo local a los dominios públicos de producción:
- **Microservicio de Analítica:** `https://counter-api.servidor.blog`
- **Microservicio de Seguridad:** `https://counter-auth.servidor.blog`

Se detectó una deuda técnica donde `analytics_service.ts` tenía la URL `http://localhost:5000/api/v1` en código estático, impidiendo que el dashboard consumiera las métricas del servidor en producción. Además, las referencias visuales hardcodeadas (`:5000`, `:8080`) en componentes de UI deben generalizarse para un entorno empresarial.

---

## 2. Catálogo Oficial de Endpoints Sincronizados

### A. Analítica (`https://counter-api.servidor.blog`)
1. SDK Script: `GET /counter.js`
2. Ingesta: `POST /api/v1/telemetry/collect`
3. Reporte 360°: `GET /api/v1/analytics/overview/:site_key`
4. Eventos en Vivo: `GET /api/v1/events/:site_key?limit=10`

### B. Seguridad & Auth (`https://counter-auth.servidor.blog`)
1. GitHub OAuth: `POST /api/v1/auth/github`
2. Google OAuth: `POST /api/v1/auth/google`
3. Handshake Kill-Switch: `POST /api/v1/security/verify`
4. Admin Users: `GET /api/v1/admin/users`
5. Toggle Kill-Switch: `POST /api/v1/admin/users/:siteKey/toggle`
6. Reactivar / Cancelar: `POST /api/v1/admin/users/:siteKey/{activate|cancel}`

---

## 3. Plan de Modificaciones
1. Actualizar `.env` y `.env.example` con los endpoints y Google Client ID oficial.
2. Refactorizar `app_config.ts` para inferir `adminUsersUrl` dinámicamente desde `authBaseUrl`.
3. Actualizar `analytics_service.ts` para consumir `APP_CONFIG.apiBaseUrl`.
4. Modernizar etiquetas informativas de UI en `UserAnalyticsDashboard.tsx`, `AdminPanel.tsx` y `LicenseManagementCard.tsx`.
5. Validar compilación estricta y límite estricto de < 150 líneas por archivo.
