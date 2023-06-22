"use client"
import Link from "next/link";
import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Grid, IconButton, InputBase, Skeleton, Stack, TableFooter, TablePagination, useTheme } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Condutor } from "../types/condutor";
import { Cliente } from "../types/cliente";
import { Deslocamento } from "../types/deslocamento";
import { Veiculo } from "../types/veiculo";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import * as clienteService from '../services/cliente'
import * as condutorService from '../services/condutor'
import * as deslocamentoService from '../services/deslocamento'
import * as veiculoService from '../services/veiculo'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function HandleTableBody(type: string, value: any) {
  switch (type) {
    case 'cliente':
      return (
        <>
          <StyledTableCell component="th" scope="row">
            {value.nome}
          </StyledTableCell>
          <StyledTableCell align="left">{value.numeroDocumento}</StyledTableCell>
          <StyledTableCell align="left">{value.tipoDocumento}</StyledTableCell>
          <StyledTableCell align="left">{value.logradouro}</StyledTableCell>
          <StyledTableCell align="left">{value.numero}</StyledTableCell>
          <StyledTableCell align="left">{value.bairro}</StyledTableCell>
          <StyledTableCell align="left">{value.cidade}</StyledTableCell>
          <StyledTableCell align="left">{value.uf}</StyledTableCell>
        </>
      )
    case 'condutor':
      return (
        <>
          <StyledTableCell component="th" scope="row">
            {value.nome}
          </StyledTableCell>
          <StyledTableCell align="left">{value.numeroHabilitacao}</StyledTableCell>
          <StyledTableCell align="left">{value.catergoriaHabilitacao}</StyledTableCell>
          <StyledTableCell align="left">{value.vencimentoHabilitacao}</StyledTableCell>
        </>
      )
    case 'deslocamento':
      return (
        <>
          <StyledTableCell component="th" scope="row">
            {value.kmInicial}
          </StyledTableCell>
          <StyledTableCell align="left">{value.kmFinal}</StyledTableCell>
          <StyledTableCell align="left">{value.inicioDeslocamento}</StyledTableCell>
          <StyledTableCell align="left">{value.fimDeslocamento}</StyledTableCell>
          <StyledTableCell align="left">{value.checkList}</StyledTableCell>
          <StyledTableCell align="left">{value.motivo}</StyledTableCell>
          <StyledTableCell align="left">{value.observacao}</StyledTableCell>
          <StyledTableCell align="left">{value.idCondutor}</StyledTableCell>
          <StyledTableCell align="left">{value.idVeiculo}</StyledTableCell>
          <StyledTableCell align="left">{value.idCliente}</StyledTableCell>
        </>
      )
    case 'veiculo':
      return (
        <>
          <StyledTableCell component="th" scope="row">
            {value.placa}
          </StyledTableCell>
          <StyledTableCell align="left">{value.marcaModelo}</StyledTableCell>
          <StyledTableCell align="left">{value.anoFabricacao}</StyledTableCell>
          <StyledTableCell align="left">{value.kmAtual}</StyledTableCell>
        </>
      )
    default:
      return <><p>Empty</p></>
  }
}

function handleLoading() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={60} />
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={60} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={490} />
        </Stack>
      </Grid>
    </Grid>
  )
}

interface Props {
  tableHeads: any[],
  type: string,
  link: string
}

export default function TableGlobal(props: Props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState(0)
  const [clienteDelete, setClienteDelete] = React.useState<Cliente>()
  const [condutorDelete, setCondutorDelete] = React.useState<Condutor>()
  const [deslocamentoDelete, setDeslocamentoDelete] = React.useState<Deslocamento>()
  const [veiculoDelete, setVeiculoDelete] = React.useState<Veiculo>()
  const [clientes, setClientes] = React.useState<Cliente[]>([])
  const [condutores, setCondutores] = React.useState<Condutor[]>([])
  const [deslocamentos, setDeslocamentos] = React.useState<Deslocamento[]>([])
  const [veiculos, setVeiculos] = React.useState<Veiculo[]>([])
  const [textSearch, setTextSearch] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  const getValues = React.useCallback(async () => {
    switch (props.type) {
      case 'cliente':
        await clienteService.getClientes().then(res => {
          setLoading(false)
          setClientes(res as unknown as Cliente[])
        })
        break;
      case 'condutor':
        await condutorService.getCondutores().then(res => {
          setLoading(false)
          setCondutores(res as unknown as Condutor[])
        })
        break;
      case 'veiculo':
        await veiculoService.getVeiculos().then(res => {
          setLoading(false)
          setVeiculos(res as unknown as Veiculo[])
        })
        break;
      case 'deslocamento':
        await deslocamentoService.getDeslocamentos().then(res => {
          setLoading(false)
          setDeslocamentos(res as unknown as Deslocamento[])
        })
        break;
    }
  }, [props.type])

  React.useEffect(() => {
    getValues()
  }, [getValues])

  /* const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0; */

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleClickOpen = (id: number) => {
    setIdDelete(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    switch (props.type) {
      case 'cliente':
        await clienteService.deleteCliente(idDelete)
        await clienteService.getClientes().then(res => {
          setClientes(res as unknown as Cliente[])
        })
        break;
      case 'condutor':
        await condutorService.deleteCondutor(idDelete)
        await condutorService.getCondutores().then(res => {
          setCondutores(res as unknown as Condutor[])
        })
        break;
      case 'deslocamento':
        await deslocamentoService.deleteDeslocamento(idDelete)
        await deslocamentoService.getDeslocamentos().then(res => {
          setDeslocamentos(res as unknown as Deslocamento[])
        })
        break;
      case 'veiculo':
        await veiculoService.deleteVeiculo(idDelete)
        await veiculoService.getVeiculos().then(res => {
          setVeiculos(res as unknown as Veiculo[])
        })
        break;
    }
    setOpen(false);
  }

  React.useEffect(() => {
    const getValue = async () => {
      if (idDelete !== 0) {
        switch (props.type) {
          case 'cliente':
            await clienteService.getById(idDelete).then(val => {
              setClienteDelete(val as Cliente)
            })
            break;
          case 'condutor':
            await condutorService.getById(idDelete).then(val => {
              setCondutorDelete(val as Condutor)
            })
            break;
          case 'veiculo':
            await veiculoService.getById(idDelete).then(val => {
              setVeiculoDelete(val as Veiculo)
            })
            break;
          case 'deslocamento':
            await deslocamentoService.getById(idDelete).then(val => {
              setDeslocamentoDelete(val as Deslocamento)
            })
            break;
        }
      }
    }

    getValue()
  }, [idDelete, props.type])

  const handleSliceArray = () => {
    if (props.type === 'cliente') {
      return rowsPerPage > 0
        ?
        clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : clientes
    }
    if (props.type === 'condutor') {
      return rowsPerPage > 0
        ?
        condutores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : condutores
    }
    if (props.type === 'deslocamento') {
      return rowsPerPage > 0
        ?
        deslocamentos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : deslocamentos
    }
    if (props.type === 'veiculo') {
      return rowsPerPage > 0
        ?
        veiculos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : veiculos
    }
  }

  const handleCount = () => {
    if (props.type === 'cliente') {
      return +clientes.length
    }
    if (props.type === 'condutor') {
      return +condutores.length
    }
    if (props.type === 'deslocamento') {
      return +deslocamentos.length
    }
    if (props.type === 'veiculo') {
      return +veiculos.length
    }
  }

  const handleOpenDialogValue = () => {
    if (props.type === 'cliente') {
      return clienteDelete?.nome
    }
    if (props.type === 'condutor') {
      return condutorDelete?.nome
    }
    if (props.type === 'deslocamento') {
      return 'deslocamento'
    }
    if (props.type === 'veiculo') {
      return `veiculo de placa ${veiculoDelete?.placa}`
    }
  }

  const handleOnChangeSearch = (e: any) => {
    setTextSearch(e.target.value)
  }

  const handleSearch = async () => {
    switch (props.type) {
      case 'cliente':
        await clienteService.search(textSearch).then(res => {
          setClientes(res as unknown as Cliente[])
        })
        break;
      case 'condutor':
        await condutorService.search(textSearch).then(res => {
          setCondutores(res as unknown as Condutor[])
        })
        break;
      case 'veiculo':
        await veiculoService.search(textSearch).then(res => {
          setVeiculos(res as unknown as Veiculo[])
        })
        break;
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          Deletar {handleOpenDialogValue()}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar o {handleOpenDialogValue()}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
      {loading === true ?
        handleLoading()
        :
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          {
            props.type === 'cliente' ||
            props.type === 'condutor' ||
            props.type === 'veiculo' ?
            <Grid item xs={9}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={`${props.type === 'cliente' ? 'Digite o nome do cliente' : ''}${props.type === 'condutor' ? 'Digite o nome do condutor' : ''}${props.type === 'veiculo' ? 'Digite a placa do veículo' : ''}
                  `}
                  inputProps={{ 'aria-label': 'Pesquisar' }}
                  onChange={handleOnChangeSearch}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            :
            ''
          }

          <Grid item xs={3}>
            <Link href={`${props.link}/novo`}>
              <Button variant="contained" fullWidth sx={{ height: 50 }}>
                Novo {props.type === 'cliente' && 'cliente'}
                {props.type === 'condutor' && 'condutor'}
                {props.type === 'deslocamento' && 'deslocamento'}
                {props.type === 'veiculo' && 'veiculo'}
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {props.tableHeads.map((value, index) => (
                      <StyledTableCell key={index} align="left">{value}</StyledTableCell>
                    ))}
                    <StyledTableCell align="center">Ações</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(handleSliceArray()
                  )?.map((value) => (
                    <StyledTableRow key={value.id}>
                      {HandleTableBody(props.type, value)}

                      <StyledTableCell align="left" sx={{ display: 'flex' }}>
                        <Link href={
                          `${props.link}/atualizar/${value.id}`
                        }><Fab color="primary" size="small"><EditIcon /></Fab></Link>
                        <Fab onClick={() => handleClickOpen(value.id)} color="error" size="small" sx={{ marginLeft: 1 }}><DeleteIcon /></Fab>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={handleCount() as number}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'Linhas por página',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                    <td>
                      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={getValues}>
                        <ReplayIcon />
                      </IconButton>
                    </td>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      }

    </>
  )
}