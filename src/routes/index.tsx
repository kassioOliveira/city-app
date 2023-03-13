import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDePessoas } from '../pages';

export const AppRoutes = () => {

  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>} />
    
      <Route path='/pessoas' element={<ListagemDePessoas/>} />
    
      <Route path='/pessoas/detalhe/:id' element={<Dashboard/>} />
    
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};
