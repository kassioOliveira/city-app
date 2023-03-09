import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard: React.FC = () => {
  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={
        <FerramentasDeDetalhe mostrarBotaoNovo mostrarBotaoSalvarEFechar />}
    >
        teste
    </LayoutBaseDePagina>
  );
};