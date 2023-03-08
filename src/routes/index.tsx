import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRoutes = () => {

  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial'
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>} />
    
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};
