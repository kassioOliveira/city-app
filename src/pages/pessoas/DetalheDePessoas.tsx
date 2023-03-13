import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = () => {
    console.log('Delete');
  };


  return (
    <LayoutBaseDePagina
      titulo='Detalhe de pessoa'
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEVoltar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmVoltar={()=> navigate('/pessoas')}
          aoClicarEmNovo={()=> navigate('/pessoas/detalhe/nova')}
          
        />
      }
    >
      <div>DetalheDePessoas {id}</div>
    </LayoutBaseDePagina>
  );
};