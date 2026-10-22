# Propuesta Técnica: Configuración de Variables de Entorno Seguras y GitHub OAuth 2.0

## 1. Justificación y Objetivos de Seguridad
- **Protección de Secretos:** Aislar las variables de conexión del backend y credenciales de terceros en `.env` local, excluyéndolas formalmente del rastreo de Git mediante `.gitignore` para prevenir fugas de secretos al repositorio público.
- **Flujo Oficial de GitHub OAuth:** Configurar el Client ID (`Ov23liCRgpOkJdEvTFzO`) para permitir la autorización directa mediante GitHub (`login/oauth/authorize`) y el procesamiento automatizado del `code` retornado al frontend.
- **Aislamiento del Client Secret:** El `Client Secret` (`7b26c3...`) se mantiene exclusivamente reservado para el backend Spring Boot (`security.db`), cumpliendo los estándares de seguridad de OWASP y OAuth 2.0 donde los clientes públicos (SPAs) jamás deben compilar secretos en el bundle JS.

---

## 2. Variables de Entorno Definidas

```env
# Backend Flask (Analítica y Telemetría)
VITE_API_BASE_URL=http://127.0.0.1:5000/api/v1

# Microservicio Spring Boot (Autenticación y Licencias)
VITE_AUTH_BASE_URL=http://localhost:8080/api/v1/auth

# GitHub OAuth 2.0 Client ID (Identificador Público)
VITE_GITHUB_CLIENT_ID=Ov23liCRgpOkJdEvTFzO

# Clave de Licencia por Defecto
VITE_DEFAULT_SITE_KEY=wk_live_demo
```

---

## 3. Impacto en la Arquitectura
1. [`app_config.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/core/config/app_config.ts): Lee `import.meta.env` con fallbacks predeterminados.
2. [`github_auth_service.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/auth/application/github_auth_service.ts): Soporta redirección con `redirectToGithubOAuth()` e intercambio de `code` vía `authenticateWithCode()`.
3. [`auth_context.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/auth/application/auth_context.tsx): Detecta el parámetro `?code=` al volver de GitHub, limpia el historial con `window.history.replaceState` y completa la autenticación sin intervención manual.
