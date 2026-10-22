# ⚡ Counter-Front: Frontend y Landing Page Desacoplada

Interfaz de usuario independiente y panel de control en **Modo Claro** para la plataforma de analítica y observabilidad empresarial **Counter**.

---

## 🏛️ Arquitectura Desacoplada

Este proyecto está 100% aislado del motor de backend y base de datos:
- **Repositorio Backend:** [DavidSolorza/Counter](https://github.com/DavidSolorza/Counter.git)
- **Repositorio Frontend:** [DavidSolorza/Counter-Front](https://github.com/DavidSolorza/Counter-Front.git)
- **Canal de Comunicación Exclusivo:** HTTP REST a través de `/api/v1/` (`http://127.0.0.1:5000/api/v1`).

---

## 📂 Estructura del Proyecto

```text
Counter-Front/
├── .gitignore               # Exclusión estricta de dependencias node y código backend
├── index.html               # Landing page corporativa y guía de integración
├── dashboard.html           # Panel analítico en vivo en Modo Claro
├── styles/
│   └── main.css             # Sistema de diseño Modo Claro (< 150 líneas)
├── scripts/
│   ├── api_client.js        # Consumo de endpoints REST del backend (< 150 líneas)
│   ├── visual_wireframe.js  # Renderizado de componentes DOM inertes (< 150 líneas)
│   └── dashboard.js         # Orquestación y polleo del dashboard (< 150 líneas)
└── README.md                # Documentación del frontend
```

---

## 🚀 Cómo Ejecutar Localmente

Puedes servir este proyecto con cualquier servidor HTTP estático:

### Con Node / npx:
```bash
npx serve .
```

### Con Python:
```bash
python -m http.server 3000
```

### Con Live Server (VS Code):
Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

Abre tu navegador en `http://localhost:3000` (o el puerto asignado) para visualizar la Landing Page y el Dashboard.
