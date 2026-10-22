import React, { useState } from 'react';
import { Shield, Key, Globe, Power } from 'lucide-react';
import './LicenseManagementCard.css';

export const LicenseManagementCard: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [killSwitchTriggered, setKillSwitchTriggered] = useState(false);

  const handleToggleKillSwitch = () => {
    setIsActive((prev) => !prev);
    setKillSwitchTriggered(true);
    setTimeout(() => setKillSwitchTriggered(false), 3000);
  };

  return (
    <div className="license-card">
      <div className="license-header">
        <div className="license-title-row">
          <Shield size={16} className="license-icon" />
          <div>
            <h3>Control de Licencia & Dominio (Microservicio Seguridad :8080)</h3>
            <span className="license-sub">Gestión remota de Kill-Switch e integridad de clientes (security.db)</span>
          </div>
        </div>

        <div className={`license-status-badge ${isActive ? 'status-live' : 'status-killed'}`}>
          <span className="status-dot-pulse" />
          <span>{isActive ? 'Licencia Operativa (200 OK)' : 'Kill-Switch Disparado (403)'}</span>
        </div>
      </div>

      <div className="license-details-grid">
        <div className="license-field">
          <span className="field-label">Cliente / Razón Social:</span>
          <strong>Streaming Store JP</strong>
        </div>

        <div className="license-field">
          <span className="field-label">Token Público (Site Key):</span>
          <code className="field-code">
            <Key size={11} />
            wk_live_demo
          </code>
        </div>

        <div className="license-field">
          <span className="field-label">Dominios Autorizados:</span>
          <span className="domain-pill">
            <Globe size={11} />
            localhost:5175, 127.0.0.1
          </span>
        </div>

        <div className="license-action-cell">
          <button
            type="button"
            className={`btn-killswitch ${isActive ? 'btn-kill' : 'btn-restore'}`}
            onClick={handleToggleKillSwitch}
          >
            <Power size={13} />
            <span>{isActive ? 'Disparar Kill-Switch Remoto' : 'Reactivar Licencia'}</span>
          </button>
        </div>
      </div>

      {killSwitchTriggered && (
        <div className="killswitch-toast">
          {isActive ? 'Licencia reactivada para el cliente.' : 'Kill-Switch activado: El SDK rechazará el handshake.'}
        </div>
      )}
    </div>
  );
};
