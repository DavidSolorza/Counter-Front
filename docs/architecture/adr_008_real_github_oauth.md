# ADR 008: Eliminación de Sesión Precargada y Redirección Real a GitHub OAuth

## Estado
Aceptado

## Contexto
El frontend presentaba una sesión administrativa precargada en memoria (`INITIAL_ADMIN_SESSION`) al inicializar la aplicación. Además, el botón de login simulaba la llamada a Spring Boot con un nombre fijo en vez de conectar con el proveedor oficial GitHub OAuth mediante el Client ID registrado (`Ov23liCRgpOkJdEvTFzO`).

## Decisión
1. Modificar el estado inicial de `session` en `AuthContext` para que comience en `null`.
2. Asignar al botón principal de GitHub la ejecución inmediata del flujo de redirección hacia `https://github.com/login/oauth/authorize`.
3. Procesar el código devuelto por GitHub (`?code=`) en el ciclo de vida inicial del frontend, enviando el código a Spring Boot para validar la identidad y crear la licencia en `security.db`.
4. Mantener la opción de acceso por credenciales locales para pruebas de desarrollo.

## Consecuencias
- La aplicación no inicia logueada por defecto. Requiere autenticación legítima.
- El flujo de GitHub OAuth es 100% interoperable con el portal de GitHub y el backend de Spring Boot.
