# 📋 Propuesta Técnica: Migración a React SPA (Landing + Panel con Roles)

**ID:** PROP-2026-001  
**Autor:** Agente 1 (VP of Engineering) & Agente 2 (Software Architect)  
**Estado:** PENDIENTE DE APROBACIÓN DEL USUARIO  
**Fecha:** 2026-10-22  

---

## 1. Resumen Ejecutivo (El Qué y El Por Qué)

### 1.1. Contexto Actual
El repositorio actual cuenta con archivos estáticos desacoplados (`index.html`, `dashboard.html`, vanilla JS y CSS).

### 1.2. Requerimiento del Usuario
1. Migrar a una arquitectura moderna en **React** (Vite + TypeScript + Vanilla CSS modular).
2. Estructurar la aplicación en **dos áreas principales**:
   - **Landing Page:** Informativa, moderna, orientada a producto y conversión.
   - **Panel Administrativo (Dashboard):** Con autenticación simulada (carcasa/esqueleto frontend sin backend aún), conmutador de roles (`admin` y `user`).
3. **Gestión de Roles y Permisos (Admin vs User):**
   - Rol `admin`: Puede ver la lista de usuarios, activar/desactivar cuentas, y cancelar accesos.
   - Rol `user`: Vista estándar de métricas y analítica básica sin controles destructivos de gestión de cuentas.
4. **Diseño Visual & Estética:**
   - Paleta de **colores claros, luminosos y elegantes** (Ultra-Light Modern Mode: fondos blancos y slate-50/slate-100, bordes nítidos, acentos azul índigo, esmeralda para activos, toques sutiles de glassmorphism).
   - Tipografía moderna (Inter / Outfit / SF Pro), transiciones fluidas y micro-animaciones.
5. **Enfoque de Fase Actual:** Solo Front-End (esqueleto, mocks reactivos en memoria, contratos de dominio listos para enchufar el backend REST en la siguiente fase).

---

## 2. Arquitectura Propuesta (Vertical Slicing & SOLID)

Siguiendo el contrato de gobernanza técnica, el proyecto se estructurará en rebanadas verticales dentro de `src/features/`, respetando rigurosamente el **límite de 150 líneas por archivo**:

```text
Counter-Front/
├── docs/
│   ├── proposals/
│   │   └── 001_react_migration_and_auth_roles.md
│   └── architecture/
│       └── adr_001_react_vertical_slicing.md
├── src/
│   ├── core/
│   │   ├── config/              # Constantes de diseño, roles y configuración
│   │   ├── theme/               # Tokens de colores claros y variables CSS (<150 líneas)
│   │   ├── router/              # Router liviano o conmutador de vistas (<150 líneas)
│   │   └── layout/              # Navbar, Sidebar, Footer compartidos (<150 líneas)
│   └── features/
│       ├── landing/             # Rebanada: Landing Page Informativa
│       │   ├── domain/          # Entidades (FeatureItem, MetricHighlight)
│       │   ├── application/     # Casos de uso informativos
│       │   └── infrastructure/  # HeroSection, FeaturesGrid, PricingTeaser, LandingView
│       ├── auth/                # Rebanada: Autenticación & Control de Sesión
│       │   ├── domain/          # UserEntity, UserRole ('admin' | 'user'), SessionState
│       │   ├── application/     # MockAuthService (login, logout, switchRole)
│       │   └── infrastructure/  # LoginForm, RoleSwitcher, AuthModal
│       ├── admin/               # Rebanada: Gestión Administrativa de Usuarios
│       │   ├── domain/          # ManagedUser, UserStatus ('active' | 'suspended' | 'cancelled')
│       │   ├── application/     # UserManagementService (toggleStatus, cancelUser)
│       │   └── infrastructure/  # UserTable, UserActionButtons, AdminDashboardView
│       └── analytics/           # Rebanada: Panel de Métricas / Analítica
│           ├── domain/          # MetricCard, TelemetryEvent
│           ├── application/     # MockAnalyticsService
│           └── infrastructure/  # MetricsOverview, ActivityTable, UserDashboardView
├── package.json
└── vite.config.ts
```

---

## 3. Paleta de Colores y Sistema Visual Claro

- **Fondo General:** `#F8FAFC` (Slate 50 ultra suave)
- **Superficies de Tarjetas y Paneles:** `#FFFFFF` con borde `#E2E8F0` y elevaciones suaves `box-shadow: 0 1px 3px rgba(0,0,0,0.05)`
- **Color Principal (Brand / Acento):** `#2563EB` (Royal Blue) y `#3B82F6` (Electric Blue hover)
- **Acento Secundario (Admin & Status):**
  - **Activo:** Badge `#DCFCE7` (verde pastel) con texto `#15803D`
  - **Inactivo / Pausado:** Badge `#FEF3C7` (ámbar suave) con texto `#B45309`
  - **Cancelado:** Badge `#FEE2E2` (rojo suave) con texto `#B91C1C`
- **Tipografía y Textos:** `#0F172A` (Slate 900 primario), `#64748B` (Slate 500 secundario)

---

## 4. Garantía de Cumplimiento de Reglas (Gobernanza)

1. **Límite <= 150 líneas:** Cada vista compleja se dividirá en subcomponentes atómicos (ej. `UserTable.tsx`, `UserTableRow.tsx`, `UserStatusBadge.tsx`, `UserFilterBar.tsx`).
2. **Vanilla CSS:** Estilos puros organizados en módulos CSS o variables globales en `:root`, sin librerías sobredimensionadas.
3. **Desacoplamiento Front/Back:** Toda la lógica de datos usa interfaces de Dominio y Servicios simulados con memoria local para que la posterior integración con el backend Flask (`http://127.0.0.1:5000/api/v1`) sea solo cambiar la capa de `infrastructure/api`.

---

## 5. Próximos Pasos (Esperando Aprobación)

1. Recepción de visto bueno del usuario.
2. Inicialización de Vite + React + TypeScript en el proyecto.
3. Creación del ADR en `docs/architecture/`.
4. Implementación modular con componentes por debajo de 150 líneas.
5. Verificación en navegador y entrega de informe técnico.
