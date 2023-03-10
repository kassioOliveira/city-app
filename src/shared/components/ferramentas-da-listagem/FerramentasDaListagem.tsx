import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IFerramentasDaListagem {
  textoDeBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoBusca?: boolean;
  aoClicarEmNovo?: () => void;
  
}


export const FerramentasDaListagem: React.FC<IFerramentasDaListagem> = ({
  textoDeBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo= 'Novo',
  mostrarBotaoBusca = false,

}) => {
  const theme = useTheme();
  return (
    <Box 
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={2}
      display='flex'
      gap={1}
      alignItems='center'>
      {mostrarInputBusca && (
        <TextField
          size='small'
          placeholder={Environment.INPUT_DE_BUSCA}
          itemProp='home'
          value={textoDeBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoBusca && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}>

            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};

