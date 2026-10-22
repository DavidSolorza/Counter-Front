# ADR 010: Integración de Google OAuth 2.0 y Seguridad de Credenciales

## Estado
Aceptado

## Contexto
El usuario ha creado las credenciales de cliente OAuth 2.0 en Google Cloud Console para la autenticación de la plataforma Counter Intelligence.

Se requiere incorporar autenticación federada con Google en el frontend y registrar las variables en el entorno local (`.env`).

## Decisión
1. Incorporar `VITE_GOOGLE_CLIENT_ID` en el archivo `.env` local (excluido en `.gitignore`) y documentarlo como plantilla en `.env.example`.
2. Mantener el `Client Secret` estrictamente fuera del paquete cliente de Vite y de cualquier archivo rastreado por control de versiones (reservado al backend seguro para intercambio confidencial).
3. Implementar un servicio de aplicación especializado `google_auth_service.ts` siguiendo el protocolo estándar OpenID Connect / OAuth 2.0 con el endpoint oficial `https://accounts.google.com/o/oauth2/v2/auth`.
4. Diseñar el componente atómico `GoogleLoginButton` con el logo vectorial SVG oficial de Google sin dependencias de SDKs comerciales opacos.

## Consecuencias
- Soporte dual de proveedores OAuth (GitHub y Google).
- Cumplimiento de la regla de oro: Cero SDKs comerciales y <150 líneas por archivo.
- Protección total de secretos verificada por GitHub Secret Scanning.
