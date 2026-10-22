import React, { useState } from 'react';
import { AuthProvider } from './features/auth/application/auth_context';
import { LoginForm } from './features/auth/infrastructure/LoginForm';
import { Navbar } from './core/layout/Navbar';
import { LandingView } from './features/landing/infrastructure/LandingView';
import { DashboardRouterView } from './features/dashboard/infrastructure/DashboardRouterView';
import { APP_CONFIG, AppView } from './core/config/app_config';

export const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(APP_CONFIG.routes.landing);

  return (
    <div className="app-layout">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      <main className="app-main-content">
        {currentView === APP_CONFIG.routes.landing ? (
          <LandingView
            onNavigateDashboard={() => setCurrentView(APP_CONFIG.routes.dashboard)}
          />
        ) : (
          <DashboardRouterView />
        )}
      </main>

      <LoginForm />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
