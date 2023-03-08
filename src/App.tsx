
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components/menu-lateral/Menu-lateral';
import { AppDrawerProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>

        </BrowserRouter>
      </AppDrawerProvider>

    </AppThemeProvider>
  );
};

