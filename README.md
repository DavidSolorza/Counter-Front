# ⚡ Counter-Front: Frontend React 19 Desacoplado

Frontend de observabilidad empresarial y telemetría web construido con **React 19 + TypeScript + Vite**, siguiendo una arquitectura de diseño por **Rebanadas Verticales (Vertical Slicing)** y sistema visual en **Modo Claro (Ultra-Light Modern Mode)**.

---

## 🏛️ Estructura del Proyecto

```text
Counter-Front/
├── docs/
│   ├── proposals/       # Propuestas técnicas (PROP-2026-001)
│   ├── architecture/    # ADRs y diagramas Mermaid de arquitectura
│   └── reports/         # Informes de auditoría y ejecución
├── src/
│   ├── core/
│   │   ├── config/      # Constantes globales (<150 líneas)
│   │   ├── layout/      # Navbar principal y conmutador de roles (<150 líneas)
│   │   └── theme/       # Tokens de tema claro y reset CSS (<150 líneas)
│   └── features/
│       ├── landing/     # Landing informativa, hero, características y snippet
│       ├── auth/        # Contexto de sesión, modal de login y selector de roles
│       ├── admin/       # Panel administrador, tarjetas KPI y gestión de usuarios
│       ├── analytics/   # Panel de usuario con telemetría en tiempo real
│       └── dashboard/   # Enrutador de vista según rol asignado
├── index.html           # Punto de entrada HTML con Google Fonts
├── package.json
└── vite.config.ts
```

---

## 👥 Roles y Funcionalidades

1. **🌐 Landing Page Informativa:**
   - Hero con métricas de confianza y accesos directos al panel.
   - Cuadrícula de capacidades tecnológicas (0% latencia, rage clicks, DOM snapshots, protección PII).
   - Bloque de instalación de 1 línea con botón interactivo de copiado.

2. **👑 Rol Administrador (`admin`):**
   - 4 Tarjetas de resumen en vivo: Total Cuentas, Activos, Inactivos, Cancelados.
   - Tabla reactiva de usuarios con búsqueda en tiempo real y filtros por estado.
   - Controles de acción: **Activar / Desactivar** (pausa reversible) y **Cancelar Cuenta** (con soporte de reactivación).

3. **👤 Rol Usuario / Analista (`user`):**
   - Panel de observabilidad y diagnóstico UX.
   - Métricas de sesiones rastreadas, fricción de rage clicks y latencias keepalive.
   - Flujo de eventos de telemetría en vivo con insignias por categoría.

---

## 🚀 Cómo Ejecutar Localmente

### 1. Iniciar Servidor de Desarrollo:
```bash
npm run dev
```
Abre en tu navegador `http://localhost:5174/` (o el puerto indicado por Vite).

### 2. Compilar para Producción:
```bash
npm run build
```
Genera los bundles estáticos optimizados en la carpeta `dist/`.
