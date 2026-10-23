# ADR 013: Gobernanza de Roles, Permisos y Ocultación del Login de Administrador

- **Estado:** PENDIENTE DE APROBACIÓN
- **Fecha:** 2026-10-22
- **Autor:** Principal Software Architect & VP of Engineering

## Contexto
En un entorno B2B SaaS de telemetría, el acceso con privilegios de Administrador (gestión de licencias, Kill-Switches, supervisión multi-tenant) no debe ser auto-seleccionable por usuarios o visitantes externos. Debe existir un principio de Administrador Único donde:
1. Por defecto, solo existe un usuario Administrador raíz.
2. Los nuevos inicios de sesión (OAuth / Local) ingresan con rol `user`.
3. El rol de Administrador solo puede ser concedido o revocado por otro Administrador existente desde el Panel Administrativo.
4. El Administrador puede habilitar u ocultar dinámicamente la visibilidad del botón "Iniciar Sesión como Administrador" desde su panel de control.

## Decisión de Arquitectura
1. Crear el servicio de dominio y aplicación `AccessGovernanceService` en `src/features/auth/application/access_governance_service.ts` (< 80 líneas).
2. Crear el componente `AdminAccessControlCard.tsx` en `src/features/admin/infrastructure/` (< 80 líneas) con un switch interactivo para alternar la visibilidad pública de la opción de admin.
3. Modificar `RoleSelector.tsx` y `LoginForm.tsx` para renderizar condicionalmente el rol `admin` según el estado de la política.
4. Extender `UserTableRow.tsx` con un botón de acción para alternar el rol (`admin` ↔ `user`), garantizando que no se degrade al último admin.
5. Proteger el botón "Panel Operativo" en `Navbar.tsx` para que solo se muestre a usuarios con sesión activa de `role === 'admin'`.

## Consecuencias
- **Positivas:** Blindaje contra elevación no autorizada de privilegios; control centralizado para el administrador; interfaz limpia para usuarios estándar.
- **Negativas:** Los entornos de desarrollo requieren encender el switch o usar la cuenta inicial para pruebas administrativas.
