# Propuesta Técnica: Integración de Autenticación GitHub OAuth con Spring Boot (:8080)

## 1. Resumen Ejecutivo
- **Objetivo:** Conectar el flujo de autenticación de GitHub en `Counter-Front` con el microservicio de seguridad y licencias desarrollado en Spring Boot (`http://localhost:8080/api/v1/auth/github`).
- **Impacto:** Sustituir la simulación en memoria por una sesión respaldada por base de datos SQLite (`security.db`), persistiendo el token de sesión (`__cntr_token`) y la clave de licencia (`__cntr_site_key`) en `localStorage`.

---

## 2. Contrato de API Verificado

### 2.1. Endpoint de Autenticación
- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/auth/github`
- **Cabeceras:** `Content-Type: application/json`

### 2.2. Payload de Solicitud (Frontend -> Spring Boot)
```json
{
  "code": "CODIGO_DE_GITHUB_OPCIONAL",
  "username": "DavidSolorza",
  "avatar_url": "https://github.com/DavidSolorza.png",
  "email": "davidsolorza@github.local",
  "role": "admin"
}
```

### 2.3. Payload de Respuesta (Spring Boot -> Frontend)
```json
{
  "success": true,
  "token": "cntr_sess_d26583b4fbfd4b68b862068cfb5b0874",
  "user": {
    "username": "DavidSolorza",
    "email": "davidsolorza@github.local",
    "avatar_url": "https://github.com/DavidSolorza.png",
    "role": "admin",
    "provider": "github"
  },
  "license": {
    "site_key": "wk_live_demo",
    "client_name": "Streaming Store JP",
    "allowed_domain": "*",
    "is_active": 1
  }
}
```

---

## 3. Plan de Arquitectura y Modificaciones

1. **Extensión del Cliente HTTP (`src/core/http/http_client.ts`):**
   - Incorporar método nativo `post<T>(url: string, body: unknown, timeoutMs?: number)` respetando AbortController y cero SDKs comerciales.
   - Límite de líneas estimado: ~75 líneas.

2. **Definición de Contratos de Dominio (`src/features/auth/domain/auth_contracts.ts`):**
   - Tipos explícitos para `GithubAuthPayload`, `SpringAuthResponse`, `UserLicense`.
   - Límite de líneas estimado: ~35 líneas.

3. **Servicio de Autenticación (`src/features/auth/application/github_auth_service.ts`):**
   - Orquestador del llamado HTTP, almacenamiento en `localStorage` (`__cntr_token`, `__cntr_site_key`) y fallback resiliente.
   - Límite de líneas estimado: ~65 líneas.

4. **Sincronización en `AuthContext` (`src/features/auth/application/auth_context.tsx`):**
   - Conversión de `loginWithGithub` a flujo asíncrono con control de carga (`isAuthenticating`) y error.
   - Límite de líneas estimado: ~110 líneas.

5. **Actualización de Componentes UI:**
   - Feedback visual en `GithubLoginButton.tsx` (estado cargando).
   - Integración con el contexto de auth.

---

## 4. Garantía de Gobernanza
- **Límite de 150 líneas por archivo:** Todos los archivos creados o modificados mantendrán un conteo estricto inferior a 120 líneas.
- **Sin SDKs comerciales:** Consumo nativo mediante `fetch` estándar.
- **Iconografía:** 100% Lucide React y SVG vectorial limpio.
