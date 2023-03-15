import { useMemo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, LinearProgress, Pagination, IconButton, Icon } from '@mui/material';

import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IListagemCidades, CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { Environment } from '../../shared/environment';



export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCidades[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';

  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');

  }, [searchParams]);


  useEffect(() => {
    setIsLoading(true);

    debounce(()=> {

      CidadesService.getAll(pagina,busca)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
          }else {
            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });

    });
     
    
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')){
      CidadesService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          }else{ 
            setRows(oldRows => oldRows.filter(oldRow => oldRow.id !== id));
            alert('Registro apagado com sucesso!');
          }
        });
    }

  };
  

  return (
    <LayoutBaseDePagina
      titulo='Listagem de cidades'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova'
          textoDeBusca={busca}
          aoClicarEmNovo={()=> navigate('/cidades/detalhe/nova')}
          mostrarBotaoBusca
          mostrarInputBusca
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto,pagina: '1'}, { replace:true})}

        />
      }>

      <TableContainer component={Paper} variant='outlined' sx={{m:1, width:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.map(row => (
              <TableRow key={row.id}>
                <IconButton size='small' onClick={() =>handleDelete(row.id)}>
                  <Icon>delete</Icon>
                </IconButton>
                <IconButton size='small' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                  <Icon>edit</Icon>
                </IconButton>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}

          </TableBody>


          { totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}


          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination page={pagina} 
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage)=> setSearchParams({ busca, pagina: newPage.toString()}, {replace: true})}/>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};