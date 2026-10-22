# ADR 006: Aislamiento de Secretos y Variables de Entorno en el Frontend

## Estado
Aceptado

## Contexto
El usuario proporcionó las credenciales de GitHub OAuth:
- **Client ID:** `Ov23liCRgpOkJdEvTFzO`
- **Client Secret:** `7b26c3e8d4f6162b8c3905d5777be78c129febc6`

Se solicitó agregar `.env` y configurar las variables de conexión con el backend asegurando que la información no quede expuesta de forma insegura.

## Decisión
1. **Creación de `.env` y `.env.example`:**
   - `.env` contiene los valores operativos locales.
   - `.env.example` contiene la plantilla para desarrolladores.
   - `.gitignore` excluye `.env` para evitar cualquier filtración hacia repositorios públicos.
2. **Aislamiento Estricto del Client Secret:**
   - Según el estándar OAuth 2.0 (RFC 6749) y las directrices de seguridad de OWASP, las aplicaciones Single Page Application (SPA) que se ejecutan en el navegador no pueden guardar secretos confidenciales de forma segura.
   - El `Client ID` es seguro de exponer en el frontend para el redirect a `https://github.com/login/oauth/authorize`.
   - El `Client Secret` queda restringido al backend de Spring Boot (`security.db`) y no se inyecta en el cliente web.
3. **Manejo Dinámico de Código de Autorización:**
   - Cuando GitHub redirige a `http://localhost:5174/?code=...`, el frontend captura el código y lo envía al microservicio de Spring Boot (`POST /api/v1/auth/github`), limpiando inmediatamente la URL mediante `window.history.replaceState`.

## Consecuencias
- Cero exposición de claves secretas en el código de producción o en los bundles empaquetados por Vite.
- Flujo de GitHub OAuth 100% interoperable tanto en modo redirect oficial como en modo local directo.
