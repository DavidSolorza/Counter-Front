# Propuesta Técnica: Aislamiento Dinámico de Métricas por Site Key Personalizada

## 1. Contexto y Requerimiento
Al autenticarse con GitHub en Spring Boot (`:8080`), el microservicio responde con dos credenciales diferenciadas:
1. **Token de Sesión (`token`):** Llave privada (`cntr_sess_...`) utilizada para autorizar operaciones administrativas en el backend.
2. **Site Key de Licencia (`license.site_key`):** Llave pública única vinculada al cliente (`cntr_[usuario]_[hash]...`).

En lugar de depender exclusivamente de una clave estática o de `VITE_DEFAULT_SITE_KEY`, el frontend debe seleccionar de forma reactiva la llave del usuario activo:
```typescript
const activeSiteKey = user?.license?.site_key || import.meta.env.VITE_DEFAULT_SITE_KEY;
```

## 2. Beneficios de la Arquitectura
- **Aislamiento Multi-Tenant de Métricas:** Cada cliente visualiza únicamente sus propios eventos, embudos y análisis de fricción generados con su Site Key.
- **Generador de Snippet Dinámico:** En la Landing Page y panel de instalación, el usuario obtiene el script de integración (`<script src=".../counter.js" data-site-key="...">`) autocompletado con su llave personal.
- **Fallback Transparente:** Si no se ha iniciado sesión, el sistema recurre al entorno de demostración (`VITE_DEFAULT_SITE_KEY || 'wk_live_demo'`) sin romper la UI.

## 3. Plan de Implementación
1. Actualizar [`user_session.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/auth/domain/user_session.ts) para almacenar la entidad `UserLicense`.
2. Exponer el hook `useActiveSiteKey()` en [`auth_context.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/auth/application/auth_context.tsx).
3. Conectar `activeSiteKey` en [`LandingCodeSnippet.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/landing/infrastructure/LandingCodeSnippet.tsx), [`UserAnalyticsDashboard.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/analytics/infrastructure/UserAnalyticsDashboard.tsx) y [`LicenseManagementCard.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/infrastructure/LicenseManagementCard.tsx).
4. Validar límite estricto de 150 líneas por archivo.
