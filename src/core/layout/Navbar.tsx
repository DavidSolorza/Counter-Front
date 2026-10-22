import React from 'react';
import {
  Activity,
  Globe,
  LayoutDashboard,
  ArrowLeftRight,
  LogOut,
  LogIn,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useAuth } from '../../features/auth/application/auth_context';
import { APP_CONFIG, AppView } from '../config/app_config';
import './Navbar.css';
import './NavbarSession.css';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { session, logout, openAuthModal, switchRole } = useAuth();

  const handleRoleToggle = () => {
    if (!session) return;
    const nextRole = session.role === 'admin' ? 'user' : 'admin';
    switchRole(nextRole);
  };

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button
            type="button"
            className="navbar-brand"
            onClick={() => onNavigate(APP_CONFIG.routes.landing)}
          >
            <div className="brand-logo-badge">
              <Activity className="brand-icon" size={18} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">Counter</span>
              <span className="brand-edition">Enterprise</span>
            </div>
          </button>

          <div className="navbar-divider" />

          <nav className="navbar-nav">
            <button
              type="button"
              className={`nav-link ${currentView === APP_CONFIG.routes.landing ? 'active' : ''}`}
              onClick={() => onNavigate(APP_CONFIG.routes.landing)}
            >
              <Globe size={15} />
              <span>Plataforma</span>
            </button>
            <button
              type="button"
              className={`nav-link ${currentView === APP_CONFIG.routes.dashboard ? 'active' : ''}`}
              onClick={() => onNavigate(APP_CONFIG.routes.dashboard)}
            >
              <LayoutDashboard size={15} />
              <span>Panel Operativo</span>
            </button>
          </nav>
        </div>

        <div className="navbar-right">
          {session ? (
            <div className="session-controls">
              <button
                type="button"
                className={`role-switcher-chip role-chip-${session.role}`}
                onClick={handleRoleToggle}
                title="Alternar entre rol Administrador y Usuario"
              >
                {session.role === 'admin' ? (
                  <ShieldCheck size={14} className="role-icon" />
                ) : (
                  <User size={14} className="role-icon" />
                )}
                <span className="role-name">
                  {session.role === 'admin' ? 'Admin' : 'Usuario'}
                </span>
                <span className="role-chip-divider" />
                <ArrowLeftRight size={12} className="switch-icon" />
              </button>

              <div className="user-profile-badge">
                <span className="user-email-text">{session.email}</span>
              </div>

              <button
                type="button"
                className="btn-nav-logout"
                onClick={logout}
                title="Cerrar sesión activa"
              >
                <LogOut size={14} />
                <span>Salir</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-nav-login"
              onClick={openAuthModal}
            >
              <LogIn size={15} />
              <span>Iniciar Sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
