import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode;
    titulo: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }) => {
  const smDown = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box display='flex' alignItems='center' gap={1} padding={1} height={theme.spacing(12)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>
              menu
            </Icon>
          </IconButton>
        )}
       
        <Typography variant='h5'>
          {titulo}
        </Typography>
      </Box>

      <Box>
      Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};