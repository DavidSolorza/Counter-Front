/**
 * Counter Visual Wireframe Renderer (Component Snapshot)
 * Gobernanza: Límite estricto < 150 líneas.
 */
const VisualWireframe = (function () {
    "use strict";

    function render(visual, fallback = '—') {
        if (!visual || typeof visual !== 'object') {
            return `<code style="color:#64748b; font-size:10px;">${fallback}</code>`;
        }

        if (visual.type === 'button') {
            const bg = (visual.bg && visual.bg !== 'rgba(0, 0, 0, 0)') ? visual.bg : '#f1f5f9';
            const col = visual.color || '#0f172a';
            const rad = visual.radius || '4px';
            const txt = visual.text || fallback || 'Botón';
            return `<span style="display:inline-block; padding:2px 8px; font-size:10px; font-weight:600; border-radius:${rad}; background:${bg}; color:${col}; border:1px solid #cbd5e1; box-shadow:0 1px 2px rgba(0,0,0,0.05); pointer-events:none; max-width:130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="Botón recreado (inerte)">🔘 ${txt}</span>`;
        }

        if (visual.type === 'image') {
            return `<span style="display:inline-flex; align-items:center; gap:4px; padding:2px 6px; font-size:10px; border-radius:4px; background:#f1f5f9; color:#475569; border:1px dashed #94a3b8; pointer-events:none;" title="Espacio imagen">🖼️ [${visual.alt || 'Imagen'}]</span>`;
        }

        if (visual.type === 'video') {
            return `<span style="display:inline-flex; align-items:center; gap:4px; padding:2px 6px; font-size:10px; border-radius:4px; background:#0f172a; color:#ffffff; pointer-events:none;" title="Video player">▶️ [${visual.label || 'Video'}]</span>`;
        }

        if (visual.type === 'card') {
            return `<span style="display:inline-block; padding:2px 6px; font-size:10px; border-radius:4px; background:#ffffff; color:#334155; border:1px solid #cbd5e1; pointer-events:none;" title="Card contenedor">🃏 [Card: ${visual.text || 'Card'}]</span>`;
        }

        return `<code style="color:#64748b; font-size:10px;">${fallback}</code>`;
    }

    return { render };
})();
