
import { useEffect,useState } from 'react';

import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { Box } from '@mui/system';
import { IVFormErrors } from '../../shared/forms/IVFormErrors';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),

});

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose  } = useVForm();

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
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        email: '',
        cidadeId: undefined,
        nomeCompleto: '',
      });
    }

  }, [id,setNome]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema.
      validate(dados, {abortEarly:false})
      .then((dadosValidados) => {

        setIsLoading(true);

        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error){
                alert(result.message);
              }else{
    
                if(isSaveAndClose()){
                  navigate('/pessoas');
                }else{
                  navigate(`/pessoas/detalhe/${result}`);
                }
                
              }
            });
        }else{
          PessoasService
            .updateById(Number(id),{id: Number(id), ...dadosValidados})
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error){
                alert(result.message);
              }else {
                if(isSaveAndClose()){
                  navigate('/pessoas');
                }
              }
            });
        }
      })
      .catch((errors:yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
   
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

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmApagar={()=> handleDelete(Number(id))}
          aoClicarEmVoltar={()=> navigate('/pessoas')}
          aoClicarEmNovo={()=> navigate('/pessoas/detalhe/nova')}
          
        />
      }
    >
      
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate'/>
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography> 
            </Grid>

            <Grid container item direction='row' spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome completo'
                  disabled={isLoading}
                  name='nomeCompleto'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
        
            </Grid>

            <Grid container item direction='row' spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  label='Email'
                  fullWidth
                  disabled={isLoading}
                  name='email'
                />
              </Grid>
        
            </Grid>

            <Grid container item direction='row' spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading}/>
              </Grid>
        
            </Grid>
            
        
          </Grid>

        </Box>
        
      </VForm>

    </LayoutBaseDePagina>
  );
};