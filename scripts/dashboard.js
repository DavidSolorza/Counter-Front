/**
 * Counter Dashboard Controller (Frontend Desacoplado)
 * Gobernanza: Límite estricto < 150 líneas.
 */
(function () {
    "use strict";

    const SITE_KEY = 'wk_test_12345';
    let pollInterval = null;

    async function refreshSummary() {
        const data = await CounterAPI.getSummary(SITE_KEY);
        if (!data) return;

        document.getElementById('s-tot').textContent = data.total_events || 0;
        document.getElementById('s-cli').textContent = data.total_clicks || 0;
        document.getElementById('s-rag').textContent = data.rage_clicks || 0;
        document.getElementById('s-err').textContent = data.errors_count || 0;

        const elList = document.getElementById('top-el-list');
        if (data.top_elements && data.top_elements.length) {
            elList.innerHTML = data.top_elements.map(e => `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:11px;">
                    <code>${e.element}</code><strong>${e.clicks} clics</strong>
                </div>
            `).join('');
        } else {
            elList.innerHTML = '<span style="color:#64748b;">Sin clics registrados aún.</span>';
        }

        const sc = data.scroll_milestones || {};
        const scMax = Math.max(sc['25%'] || 0, sc['50%'] || 0, sc['75%'] || 0, sc['100%'] || 0, 1);
        document.getElementById('scroll-bars').innerHTML = ['25%', '50%', '75%', '100%'].map(m => {
            const cnt = sc[m] || 0;
            const pct = Math.round((cnt / scMax) * 100);
            return `
                <div class="bar-wrap">
                    <div class="bar-label"><span>Lectura ${m}</span><span>${cnt} visitas</span></div>
                    <div class="bar-bg"><div class="bar-fill" style="width:${pct}%;"></div></div>
                </div>
            `;
        }).join('');
    }

    async function refreshEvents() {
        const data = await CounterAPI.getEvents(SITE_KEY, 8);
        const tbody = document.getElementById('tbl-events');
        if (!data || !data.events || !data.events.length) return;

        tbody.innerHTML = data.events.map(e => {
            const client = (e.event_data && e.event_data._client) || {};
            const net = (e.event_data && e.event_data._network) || {};
            const tc = e.event_type === 'rage_click' ? 'b-rage' :
                (e.event_type.includes('error') ? 'b-err' :
                (e.event_type === 'scroll_milestone' ? 'b-scr' :
                (e.event_type === 'web_vitals' ? 'b-vit' :
                (e.event_type === 'click' ? 'b-click' : ''))));

            const visualMockup = VisualWireframe.render(
                e.event_data?.visual,
                e.event_data?.element || e.event_data?.depth || e.event_data?.metric || '—'
            );

            const timeStr = e.created_at ? e.created_at.split(' ')[1] : '';
            const browserStr = `${client.browser || 'Chrome'} / ${client.os || 'Windows'}`;
            const ipStr = net.client_ip || '127.0.0.1';

            return `
                <tr>
                    <td>${timeStr}</td>
                    <td><span class="badge ${tc}">${e.event_type}</span></td>
                    <td>${visualMockup}</td>
                    <td style="max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${e.page_url}">${e.page_url}</td>
                    <td>${browserStr}</td>
                    <td>${ipStr}</td>
                </tr>
            `;
        }).join('');
    }

    function init() {
        refreshSummary();
        refreshEvents();
        pollInterval = setInterval(() => {
            refreshSummary();
            refreshEvents();
        }, 2000);
    }

    window.addEventListener('DOMContentLoaded', init);
})();
