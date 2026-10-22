# Propuesta Técnica: Integración de Google OAuth 2.0 y Configuración de Entorno

## 1. Justificación y Objetivos
- **Soporte Multi-Proveedor (GitHub & Google):** Ampliar las capacidades de federación de identidad de `Counter-Front` incorporando inicio de sesión con Google OAuth 2.0 junto con el existente de GitHub.
- **Configuración de Variables de Entorno Seguras:** Registrar el Client ID público de Google en el archivo local `.env` y en la plantilla `.env.example`, aislando el Client Secret en el backend según las directrices de seguridad de OAuth 2.0 y OWASP.
- **Experiencia de Usuario Unificada:** Proveer un botón oficial con la identidad visual corporativa de Google (`GoogleLoginButton`) y detección reactiva del callback de redirección (`accounts.google.com/o/oauth2/v2/auth`).

---

## 2. Contrato de Configuración
```env
# Google OAuth 2.0 Client ID (Identificador Público de Cliente Web)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## 3. Plan de Implementación
1. Actualizar `.env` y `.env.example` con `VITE_GOOGLE_CLIENT_ID`.
2. Actualizar `vite-env.d.ts` y `app_config.ts`.
3. Añadir `google` a `AuthProviderType` en `user_session.ts`.
4. Implementar `google_auth_service.ts`.
5. Crear `GoogleLoginButton.tsx` y su hoja de estilos.
6. Integrar en `LoginForm.tsx` y `auth_context.tsx`.
7. Validar compilación y límite estricto de 150 líneas por archivo.
