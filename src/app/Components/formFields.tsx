"use client"
import { Alert, Breadcrumbs, Button, Dialog, FormControl, FormHelperText, Grid, IconButton, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import React, { FormEvent, ReactNode } from "react";
import { Cliente, CreateClienteRes, UpdateClienteRes } from "../types/cliente";
import { Condutor } from "../types/condutor";
import { Veiculo } from "../types/veiculo";
import { Deslocamento, UpdateDeslocamentoRes } from "../types/deslocamento";
import * as condutorService from '../services/condutor'
import * as clienteService from '../services/cliente'
import * as veiculoService from '../services/veiculo'
import moment from "moment";

const states = [
  { nome: "Acre", "sigla": "AC" },
  { nome: "Alagoas", "sigla": "AL" },
  { nome: "Amapá", "sigla": "AP" },
  { nome: "Amazonas", "sigla": "AM" },
  { nome: "Bahia", "sigla": "BA" },
  { nome: "Ceará", "sigla": "CE" },
  { nome: "Distrito Federal", "sigla": "DF" },
  { nome: "Espírito Santo", "sigla": "ES" },
  { nome: "Goiás", "sigla": "GO" },
  { nome: "Maranhão", "sigla": "MA" },
  { nome: "Mato Grosso", "sigla": "MT" },
  { nome: "Mato Grosso do Sul", "sigla": "MS" },
  { nome: "Minas Gerais", "sigla": "MG" },
  { nome: "Pará", "sigla": "PA" },
  { nome: "Paraíba", "sigla": "PB" },
  { nome: "Paraná", "sigla": "PR" },
  { nome: "Pernambuco", "sigla": "PE" },
  { nome: "Piauí", "sigla": "PI" },
  { nome: "Rio de Janeiro", "sigla": "RJ" },
  { nome: "Rio Grande do Norte", "sigla": "RN" },
  { nome: "Rio Grande do Sul", "sigla": "RS" },
  { nome: "Rondônia", "sigla": "RO" },
  { nome: "Roraima", "sigla": "RR" },
  { nome: "Santa Catarina", "sigla": "SC" },
  { nome: "São Paulo", "sigla": "SP" },
  { nome: "Sergipe", "sigla": "SE" },
  { nome: "Tocantins", "sigla": "TO" }
]

interface IProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleClose: () => void;
  handleCloseError: () => void;
  openError: boolean
  open: boolean
  values: any
  page: string
  textError: string
}

interface IPropsCliente {
  touched: FormikTouched<Cliente>
  errors: FormikErrors<Cliente>
  selectChange?: (e: SelectChangeEvent<string>, child: ReactNode) => void;
}

interface IPropsCondutor {
  touched: FormikTouched<Condutor>
  errors: FormikErrors<Condutor>
}

interface IPropsVeiculo {
  touched: FormikTouched<Veiculo>
  errors: FormikErrors<Veiculo>
}

interface IPropsDeslocamento {
  touched: FormikTouched<Deslocamento>
  errors: FormikErrors<Deslocamento>
  selectChange?: (e: SelectChangeEvent<string>, child: ReactNode) => void;
}

interface IPropsPutDeslocamento {
  touched: FormikTouched<UpdateDeslocamentoRes>
  errors: FormikErrors<UpdateDeslocamentoRes>
  selectChange?: (e: SelectChangeEvent<string>, child: ReactNode) => void;
}

type TPropsCliente = IPropsCliente & IProps

type TPropsCondutor = IPropsCondutor & IProps

type TPropsVeiculo = IPropsVeiculo & IProps

type TPropsDeslocamento = IPropsDeslocamento & IProps

type TPropsPutDeslocamento = IPropsPutDeslocamento & IProps


export function ClienteForm(props: TPropsCliente) {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Cliente {props.page === 'create' ? 'criado' : 'atualizado'} com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>
      <Dialog
        open={props.openError}
        onClose={props.handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={10}>
              {props.textError}
            </Grid>
            <Grid item xs={2}>
              <IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleCloseError} autoFocus color="error">OK</IconButton>
            </Grid>
          </Grid>
        </Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/clientes">
              Clientes
            </Link>
            <Typography color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} cliente</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} cliente</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Nome"
                  fullWidth
                  name="nome"
                  error={props.touched?.nome && props.errors?.nome !== undefined}
                  value={props.values?.nome}
                  onChange={props.handleChange}
                  helperText={(props.touched?.nome && props.errors?.nome) !== undefined && props.errors?.nome} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Número do documento"
                  fullWidth
                  name="numeroDocumento"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.numeroDocumento && props.errors?.numeroDocumento !== undefined}
                  value={props.values?.numeroDocumento}
                  onChange={props.handleChange}
                  helperText={(props.touched?.numeroDocumento && props.errors?.numeroDocumento) !== undefined && props.errors?.numeroDocumento} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Tipo do Documento"
                  fullWidth
                  name="tipoDocumento"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.tipoDocumento && props.errors?.tipoDocumento !== undefined}
                  value={props.values?.tipoDocumento}
                  onChange={props.handleChange}
                  helperText={(props.touched?.tipoDocumento && props.errors?.tipoDocumento) !== undefined && props.errors?.tipoDocumento} />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Logradouro"
                  name="logradouro"
                  fullWidth
                  error={props.touched?.logradouro && props.errors?.logradouro !== undefined}
                  value={props.values?.logradouro}
                  onChange={props.handleChange}
                  helperText={(props.touched?.logradouro && props.errors?.logradouro) !== undefined && props.errors?.logradouro} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Número"
                  name="numero"
                  fullWidth
                  error={props.touched?.numero && props.errors?.numero !== undefined}
                  value={props.values?.numero}
                  onChange={props.handleChange}
                  helperText={(props.touched?.numero && props.errors?.numero) !== undefined && props.errors?.numero} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Bairro"
                  name="bairro"
                  error={props.touched?.bairro && props.errors?.bairro !== undefined}
                  value={props.values?.bairro}
                  onChange={props.handleChange}
                  helperText={(props.touched?.bairro && props.errors?.bairro) !== undefined && props.errors?.bairro} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Cidade"
                  name="cidade"
                  error={props.touched?.cidade && props.errors?.cidade !== undefined}
                  value={props.values?.cidade}
                  onChange={props.handleChange}
                  helperText={(props.touched?.cidade && props.errors?.cidade) !== undefined && props.errors?.cidade} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={props.touched?.uf && props.errors?.uf !== undefined}>
                  <InputLabel id="demo-simple-select-label">Estado (UF)</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="estado"
                    name="uf"
                    value={props.values?.uf}
                    onChange={props.selectChange}
                  >
                    {states.map((value, index) => (
                      <MenuItem key={index} value={value.sigla}>{value.nome}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{(props.touched?.uf && props.errors?.uf) !== undefined && props.errors?.uf}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="end" alignItems="end">
                <Grid container justifyContent="space-between">
                  <Link href="/clientes">
                    <Button type="button" variant="outlined" color="primary">voltar</Button>
                  </Link>
                  <Button type="submit" variant="contained" color="success">enviar</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

    </>
  )
}

export function CondutorForm(props: TPropsCondutor) {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Condutor {props.page === 'create' ? 'criado' : 'atualizado'} com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>
      <Dialog
        open={props.openError}
        onClose={props.handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={10}>
              {props.textError}
            </Grid>
            <Grid item xs={2}>
              <IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleCloseError} autoFocus color="error">OK</IconButton>
            </Grid>
          </Grid>
        </Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/condutores">
              Condutores
            </Link>
            <Typography color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} condutor</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} condutor</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Nome"
                  fullWidth
                  name="nome"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.nome && props.errors?.nome !== undefined}
                  value={props.values?.nome}
                  onChange={props.handleChange}
                  helperText={(props.touched?.nome && props.errors?.nome) !== undefined && props.errors?.nome} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Numero da Habilitacao"
                  fullWidth
                  name="numeroHabilitacao"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.numeroHabilitacao && props.errors?.numeroHabilitacao !== undefined}
                  value={props.values?.numeroHabilitacao}
                  onChange={props.handleChange}
                  helperText={(props.touched?.numeroHabilitacao && props.errors?.numeroHabilitacao) !== undefined && props.errors?.numeroHabilitacao} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Categoria da Habilitacao"
                  fullWidth
                  name="categoriaHabilitacao"
                  error={props.touched?.categoriaHabilitacao && props.errors?.categoriaHabilitacao !== undefined}
                  disabled={props.page === 'create' ? false : true}
                  value={props.values?.catergoriaHabilitacao}
                  onChange={props.handleChange}
                  helperText={(props.touched?.categoriaHabilitacao && props.errors?.categoriaHabilitacao) !== undefined && props.errors?.categoriaHabilitacao} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type="date"
                  variant='outlined'
                  color='primary'
                  label="Vencimento da Habilitacao"
                  fullWidth
                  name="vencimentoHabilitacao"
                  error={props.touched?.vencimentoHabilitacao && props.errors?.vencimentoHabilitacao !== undefined}
                  value={props.values?.vencimentoHabilitacao}
                  onChange={props.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="end" alignItems="end">
                <Grid container justifyContent="space-between">
                  <Link href="/condutores">
                    <Button type="button" variant="outlined" color="primary">voltar</Button>
                  </Link>
                  <Button type="submit" variant="contained" color="success">enviar</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export function VeiculoForm(props: TPropsVeiculo) {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Veículo {props.page === 'create' ? 'criado' : 'atualizado'} com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>
      <Dialog
        open={props.openError}
        onClose={props.handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={10}>
              {props.textError}
            </Grid>
            <Grid item xs={2}>
              <IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleCloseError} autoFocus color="error">OK</IconButton>
            </Grid>
          </Grid>
        </Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/veiculos">
              Veículos
            </Link>
            <Typography color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Placa"
                  fullWidth
                  name="placa"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.placa && props.errors?.placa !== undefined}
                  value={props.values?.placa}
                  onChange={props.handleChange}
                  helperText={(props.touched?.placa && props.errors?.placa) !== undefined && props.errors?.placa} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Marca/Modelo"
                  fullWidth
                  name="marcaModelo"
                  error={props.touched?.marcaModelo && props.errors?.marcaModelo !== undefined}
                  value={props.values?.marcaModelo}
                  onChange={props.handleChange}
                  helperText={(props.touched?.marcaModelo && props.errors?.marcaModelo) !== undefined && props.errors?.marcaModelo} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  variant='outlined'
                  color='primary'
                  label="Ano de fabricação"
                  fullWidth
                  name="anoFabricacao"
                  error={props.touched?.anoFabricacao && props.errors?.anoFabricacao !== undefined}
                  value={props.values?.anoFabricacao}
                  onChange={props.handleChange}
                  helperText={(props.touched?.anoFabricacao && props.errors?.anoFabricacao) !== undefined && props.errors?.anoFabricacao}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="number"
                  variant='outlined'
                  color='primary'
                  label="KM Atual"
                  fullWidth
                  name="kmAtual"
                  error={props.touched?.kmAtual && props.errors?.kmAtual !== undefined}
                  value={props.values?.kmAtual}
                  onChange={props.handleChange}
                  helperText={(props.touched?.kmAtual && props.errors?.kmAtual) !== undefined && props.errors?.kmAtual} />
              </Grid>

              <Grid item xs={12} justifyContent="end" alignItems="end">
                <Grid container justifyContent="space-between">
                  <Link href="/veiculos">
                    <Button type="button" variant="outlined" color="primary">voltar</Button>
                  </Link>
                  <Button type="submit" variant="contained" color="success">enviar</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export function DeslocamentoForm(props: TPropsDeslocamento) {
  const [condutores, setCondutores] = React.useState<Condutor[]>()
  const [veiculos, setVeiculos] = React.useState<Veiculo[]>()
  const [clientes, setClientes] = React.useState<Cliente[]>()

  const date = moment().format('yyyy-MM-DD')
  const getCondutores = React.useCallback(async () => {
    await condutorService.getCondutores().then(res => {
      setCondutores(res as unknown as Condutor[])
    })
  }, [])

  const getVeiculos = React.useCallback(async () => {
    await veiculoService.getVeiculos().then(res => {
      setVeiculos(res as unknown as Veiculo[])
    })
  }, [])

  const getClientes = React.useCallback(async () => {
    await clienteService.getClientes().then(res => {
      setClientes(res as unknown as Cliente[])
    })
  }, [])

  React.useEffect(() => {
    getCondutores()
    getVeiculos()
    getClientes()
  }, [getCondutores, getClientes, getVeiculos])

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Veículo {props.page === 'create' ? 'criado' : 'atualizado'} com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>
      <Dialog
        open={props.openError}
        onClose={props.handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={10}>
              {props.textError}
            </Grid>
            <Grid item xs={2}>
              <IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleCloseError} autoFocus color="error">OK</IconButton>
            </Grid>
          </Grid>
        </Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/veiculos">
              Veículos
            </Link>
            <Typography color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField type="number"
                  variant='outlined'
                  color='primary'
                  label="KM Inicial"
                  fullWidth
                  name="kmInicial"
                  disabled={props.page === 'create' ? false : true}
                  error={props.touched?.kmInicial && props.errors?.kmInicial !== undefined}
                  value={props.values?.kmInicial}
                  onChange={props.handleChange}
                  helperText={(props.touched?.kmInicial && props.errors?.kmInicial) !== undefined && props.errors?.kmInicial} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="date"
                  variant='outlined'
                  color='primary'
                  label="Marca/Modelo"
                  fullWidth
                  name="inicioDeslocamento"
                  error={props.touched?.inicioDeslocamento && props.errors?.inicioDeslocamento !== undefined}
                  value={date}
                  onChange={props.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type="text"
                  variant='outlined'
                  color='primary'
                  label="Checklist"
                  fullWidth
                  name="checkList"
                  error={props.touched?.checkList && props.errors?.checkList !== undefined}
                  value={props.values?.checkList}
                  onChange={props.handleChange}
                  helperText={(props.touched?.checkList && props.errors?.checkList) !== undefined && props.errors?.checkList}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Motivo"
                  fullWidth
                  name="motivo"
                  error={props.touched?.motivo && props.errors?.motivo !== undefined}
                  value={props.values?.motivo}
                  onChange={props.handleChange}
                  helperText={(props.touched?.motivo && props.errors?.motivo) !== undefined && props.errors?.motivo} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="text"
                  variant='outlined'
                  color='primary'
                  label="Observalção"
                  fullWidth
                  name="observacao"
                  error={props.touched?.observacao && props.errors?.observacao !== undefined}
                  value={props.values?.observacao}
                  onChange={props.handleChange}
                  helperText={(props.touched?.observacao && props.errors?.observacao) !== undefined && props.errors?.observacao} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={props.touched?.idCondutor && props.errors?.idCondutor !== undefined}>
                  <InputLabel id="demo-simple-select-label">Condutor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="condutor"
                    name="idCondutor"
                    value={props.values?.idCondutor}
                    onChange={props.selectChange}
                  >
                    {condutores?.map((value, index) => (
                      <MenuItem key={index} value={value.id}>{value.id} - {value.nome}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{(props.touched?.idCondutor && props.errors?.idCondutor) !== undefined && props.errors?.idCondutor}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={props.touched?.idVeiculo && props.errors?.idVeiculo !== undefined}>
                  <InputLabel id="demo-simple-select-label">Veiculo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="veiculo"
                    name="idVeiculo"
                    value={props.values?.idVeiculo}
                    onChange={props.selectChange}
                  >
                    {veiculos?.map((value, index) => (
                      <MenuItem key={index} value={value.id}>{value.id} - {value.placa}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{(props.touched?.idVeiculo && props.errors?.idVeiculo) !== undefined && props.errors?.idVeiculo}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={props.touched?.idCliente && props.errors?.idCliente !== undefined}>
                  <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="cliente"
                    name="idCliente"
                    value={props.values?.idCliente}
                    onChange={props.selectChange}
                  >
                    {clientes?.map((value, index) => (
                      <MenuItem key={index} value={value.id}>{value.id} - {value.nome}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{(props.touched?.idCliente && props.errors?.idCliente) !== undefined && props.errors?.idCliente}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="end" alignItems="end">
                <Grid container justifyContent="space-between">
                  <Link href="/deslocamentos">
                    <Button type="button" variant="outlined" color="primary">voltar</Button>
                  </Link>
                  <Button type="submit" variant="contained" color="success">enviar</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export function PutDeslocamentoForm(props: TPropsPutDeslocamento) {
  const date = moment().format('yyyy-MM-DD')

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Veículo {props.page === 'create' ? 'criado' : 'atualizado'} com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>
      <Dialog
        open={props.openError}
        onClose={props.handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error" sx={{ alignItems: 'center' }}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={10}>
              {props.textError}
            </Grid>
            <Grid item xs={2}>
              <IconButton sx={{ marginLeft: 2 }} size="small" onClick={props.handleCloseError} autoFocus color="error">OK</IconButton>
            </Grid>
          </Grid>
        </Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/veiculos">
              Veículos
            </Link>
            <Typography color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">{props.page === 'create' ? 'Novo' : 'Atualizar'} veículo</Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField type="number"
                  variant='outlined'
                  color='primary'
                  label="KM Final"
                  fullWidth
                  name="kmFinal"
                  error={props.touched?.kmFinal && props.errors?.kmFinal !== undefined}
                  value={props.values?.kmFinal}
                  onChange={props.handleChange}
                  helperText={(props.touched?.kmFinal && props.errors?.kmFinal) !== undefined && props.errors?.kmFinal} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField type="date"
                  variant='outlined'
                  color='primary'
                  label="Marca/Modelo"
                  fullWidth
                  name="fimDeslocamento"
                  error={props.touched?.fimDeslocamento && props.errors?.fimDeslocamento !== undefined}
                  value={date}
                  onChange={props.handleChange}
                  InputLabelProps={{
                    shrink: true
                  }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type="text"
                  variant='outlined'
                  color='primary'
                  label="Observação"
                  fullWidth
                  name="observacao"
                  error={props.touched?.observacao && props.errors?.observacao !== undefined}
                  value={props.values?.observacao}
                  onChange={props.handleChange}
                  helperText={(props.touched?.observacao && props.errors?.observacao) !== undefined && props.errors?.observacao}
                />
              </Grid>
              <Grid item xs={12} justifyContent="end" alignItems="end">
                <Grid container justifyContent="space-between">
                  <Link href="/deslocamentos">
                    <Button type="button" variant="outlined" color="primary">voltar</Button>
                  </Link>
                  <Button type="submit" variant="contained" color="success">enviar</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}