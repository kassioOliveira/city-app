
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

export const AppRoutes = () => {

  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

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
      <Route path='/pagina-inicial' element={
        <Button variant='contained' color='primary' onClick={toggleDrawerOpen} >toggle theme</Button>} />
    
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};
