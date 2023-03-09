import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard: React.FC = () => {
  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={
        <FerramentasDaListagem 
          textoDeBusca='Nova'
          mostrarInputBusca
          mostrarBotaoBusca/>}>
        teste
    </LayoutBaseDePagina>
  );
};