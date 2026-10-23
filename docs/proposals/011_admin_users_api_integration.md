# Propuesta Técnica: Integración de API Real para Gestión de Usuarios y Licencias (:8080)

## 1. Diagnóstico Actual
Actualmente, el componente [`UserTable.tsx`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/infrastructure/UserTable.tsx) consume una lista estática en memoria definida en [`user_management_service.ts`](file:///c:/Users/Usuario/Desktop/Counter-Front/src/features/admin/application/user_management_service.ts) (`INITIAL_MOCK_USERS`).

Aunque el microservicio de Spring Boot (`:8080`) tiene la base de datos `security.db` con las tablas `client_licenses` y `users`, **no se había expuesto el endpoint REST para consultar ni actualizar masivamente la lista de usuarios**.

---

## 2. Solución de Ingeniería

### 2.1. En el Backend (Spring Boot :8080)
Crear el controlador REST `AdminUsersController.java` (`< 90 líneas`):
- **`GET /api/v1/admin/users`:** Consulta `security.db` (`client_licenses` y `users`) y retorna el listado de usuarios y clientes con sus claves de sitio (`site_key`), dominios, estado operativo (`is_active`) y roles.
- **`POST /api/v1/admin/users/{siteKey}/toggle`:** Alterna el estado activo/pausado de la cuenta y su Kill-Switch directamente en la base de datos SQLite.
- **`POST /api/v1/admin/users/{siteKey}/cancel`:** Cancela formalmente el acceso de un cliente.

### 2.2. En el Frontend (Counter-Front)
- **`user_management_service.ts`:**
  - Migrar `getAll()` a función asíncrona: `getAll(): Promise<ManagedUser[]>`.
  - Consumir el endpoint mediante `httpClient.get<ManagedUser[]>()`.
  - Disponer de fallback resiliente en caso de interrupción del servicio backend.
- **`AdminPanel.tsx`:**
  - Manejo de estado asíncrono con spinner de carga (`isLoading`).
  - Botón de refresco manual *"Actualizar Usuarios"* sincronizado con `security.db`.
  - Llamadas a endpoints de alternar estado y cancelación vinculadas al backend.

---

## 3. Garantía de Gobernanza
- Límite absoluto de máximo 150 líneas por archivo.
- Uso exclusivo de `fetch` nativo a través de `HttpClient`.
- Tipado TypeScript estricto.
