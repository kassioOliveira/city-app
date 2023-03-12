import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IListagemPessoas, PessoasService } from '../../shared/services/api/pessoas/PessoasService';



export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoas[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';

  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(()=> {

      PessoasService.getAll(1,busca)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
          }else {
            console.log(result);
            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });

    });
     
    
  }, [busca]);
  

  return (
    <LayoutBaseDePagina
      titulo='Listagem de pessoas'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova'
          textoDeBusca={busca}
          mostrarBotaoBusca
          mostrarInputBusca
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, { replace:true})}

        />
      }>

      <TableContainer component={Paper} variant='outlined' sx={{m:1, width:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};