/**
 * Counter API Client (Desacoplado - HTTP REST)
 * Gobernanza: Límite estricto < 150 líneas.
 */
const CounterAPI = (function () {
    "use strict";

    let apiBase = window.localStorage.getItem('counter_api_base') || 'http://127.0.0.1:5000/api/v1';

    function setBaseUrl(newUrl) {
        if (!newUrl) return;
        apiBase = newUrl.replace(/\/+$/, '');
        window.localStorage.setItem('counter_api_base', apiBase);
    }

    function getBaseUrl() {
        return apiBase;
    }

    async function getSummary(siteKey) {
        try {
            const res = await fetch(`${apiBase}/analytics/summary/${siteKey}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('[CounterAPI] Error al obtener resumen analítico:', err);
            return null;
        }
    }

    async function getEvents(siteKey, limit = 10) {
        try {
            const res = await fetch(`${apiBase}/events/${siteKey}?limit=${limit}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('[CounterAPI] Error al obtener eventos en vivo:', err);
            return null;
        }
    }

    return {
        setBaseUrl,
        getBaseUrl,
        getSummary,
        getEvents
    };
})();
