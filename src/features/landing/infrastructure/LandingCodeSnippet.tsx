import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { APP_CONFIG } from '../../../core/config/app_config';
import './LandingCodeSnippet.css';

export const LandingCodeSnippet: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="${APP_CONFIG.apiBaseUrl.replace('/api/v1', '')}/counter.js" data-site-key="wk_live_demo" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="landing-snippet-section">
      <div className="snippet-card">
        <div className="snippet-card-header">
          <div>
            <span className="snippet-badge">Instalación Frontend</span>
            <h3>Integración en 1 Línea de Código</h3>
          </div>
          <button type="button" className="btn-copy" onClick={handleCopy}>
            {copied ? (
              <>
                <Check size={14} className="copy-success-icon" />
                <span>Copiado al Portapapeles</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar Snippet</span>
              </>
            )}
          </button>
        </div>

        <p className="snippet-desc">
          Agrega la etiqueta antes del cierre de <code>&lt;/body&gt;</code> en cualquier aplicación HTML, React, Angular o Vue:
        </p>

        <div className="code-container">
          <Terminal size={14} className="code-term-icon" />
          <code>{snippet}</code>
        </div>

        <div className="snippet-footer">
          <span>Canal de Soporte Oficial: {APP_CONFIG.supportEmail}</span>
          <span>Arquitectura Desacoplada HTTP REST</span>
        </div>
      </div>
    </section>
  );
};
