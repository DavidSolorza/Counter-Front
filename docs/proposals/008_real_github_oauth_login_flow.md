# Propuesta Técnica: Flujo Auténtico de GitHub OAuth y Estado Inicial Desconectado

## 1. Problema Identificado
1. **Sesión precargada por defecto:** El estado inicial de `AuthContext` asignaba una sesión administrativa fija en memoria (`INITIAL_ADMIN_SESSION`), provocando que la aplicación arrancara autenticada como David Solorza sin requerir interacción del usuario.
2. **Acción del botón de GitHub desacoplada:** El botón principal de GitHub realizaba una simulación local en lugar de iniciar el flujo de redirección oficial hacia GitHub OAuth (`https://github.com/login/oauth/authorize`).

---

## 2. Solución Arquitectónica

### 2.1. Estado Inicial Desconectado (Guest Mode)
- `session` inicializa estrictamente en `null` (o restaura sesión previa de `localStorage` si el usuario ya inició sesión explícitamente).
- La barra de navegación muestra el botón de llamada a la acción: **"Iniciar Sesión"**.
- La Landing Page y las vistas públicas operan con la clave de demostración predeterminada (`wk_live_demo`).
- El Panel Operativo protege el acceso mediante la pantalla de autorización hasta que el usuario se autentique.

### 2.2. Flujo de Autenticación Real de GitHub OAuth 2.0
1. El usuario hace clic en el botón principal **"Continuar con GitHub"** en el modal de autenticación.
2. La aplicación redirige al servidor oficial de GitHub:
   ```text
   https://github.com/login/oauth/authorize?client_id=Ov23liCRgpOkJdEvTFzO&redirect_uri=http://localhost:5174/&scope=read:user,user:email&state=[role]
   ```
3. El usuario autoriza la aplicación en GitHub con sus credenciales reales.
4. GitHub redirige de vuelta a `http://localhost:5174/?code=[authorization_code]&state=[role]`.
5. Al cargar la aplicación, `AuthContext` captura el código de la URL, limpia el historial del navegador (`history.replaceState`) y despacha la petición al microservicio de Spring Boot (`POST /api/v1/auth/github` con `{ code, role }`).
6. Spring Boot asocia la identidad del usuario, genera su sesión con clave única (`site_key`) y la devuelve al frontend.
7. El frontend activa la sesión y da acceso al panel operativo.

---

## 3. Garantía de Gobernanza
- Límite estricto de máximo 150 líneas por archivo.
- Uso del cliente HTTP nativo con control de timeout.
- Aislamiento total de claves secretas fuera del navegador.
