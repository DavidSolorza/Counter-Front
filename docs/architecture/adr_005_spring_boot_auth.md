# ADR 005: Integración de Autenticación con Spring Boot y SQLite

## Estado
Aceptado

## Contexto
El backend ha expuesto un microservicio de autenticación y seguridad en Spring Boot ejecutándose en `http://localhost:8080/api/v1/auth/github`. Este servicio valida la identidad del usuario contra la base de datos `security.db` (SQLite) y asocia o genera una licencia activa con su respectivo `site_key`.

Anteriormente, el frontend generaba sesiones simuladas exclusivamente en memoria. Es imperativo acoplar el frontend a este endpoint para obtener sesiones persistidas y tokens de seguridad válidos (`__cntr_token`).

## Decisión
1. Extender `HttpClient` en `src/core/http/http_client.ts` para proveer el método `post<T>()` utilizando la API Fetch nativa de la plataforma sin librerías externas.
2. Crear un servicio de aplicación `github_auth_service.ts` que ejecute el contrato `POST http://localhost:8080/api/v1/auth/github`.
3. Almacenar el token (`__cntr_token`) y la clave del sitio (`__cntr_site_key`) en `localStorage`.
4. Disponer de un mecanismo de fallback que permita continuar la experiencia en modo desarrollo local en caso de desconexión del microservicio.

## Consecuencias
- Las sesiones en el frontend quedan sincronizadas con `security.db` y las licencias de Counter.
- Se mantiene el cumplimiento riguroso de la regla de máximo 150 líneas por archivo.
- No se introducen dependencias comerciales ni SDKs opacos.
