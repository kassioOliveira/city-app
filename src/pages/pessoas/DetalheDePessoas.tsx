
import { useEffect,useState } from 'react';

import { LinearProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const [nome,setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          if( result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          }else{
            setNome(result.nomeCompleto);
            setIsLoading(false);
            console.log(result);
          }
        });
    }

  }, [id,setNome]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')){
      PessoasService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          }else{ 
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }

  };


  return (
    <LayoutBaseDePagina
      titulo={id === 'nova'? 'Nova pessoa': nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEVoltar={handleSave}
          aoClicarEmApagar={()=> handleDelete(Number(id))}
          aoClicarEmVoltar={()=> navigate('/pessoas')}
          aoClicarEmNovo={()=> navigate('/pessoas/detalhe/nova')}
          
        />
      }
    >
      {
        isLoading && (
          <LinearProgress variant='indeterminate'/>
        )
      }
      <div>DetalheDePessoas {id}</div>
    </LayoutBaseDePagina>
  );
};