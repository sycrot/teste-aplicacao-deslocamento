import { Button, FormControl, FormHelperText, Grid, InputLabel, Link, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FormEvent, ReactNode } from "react";
import { Cliente, CreateClienteRes, UpdateClienteRes } from "../types/cliente";
import { Condutor } from "../types/condutor";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { DateValidationError } from "@mui/x-date-pickers";

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

interface PropsCliente {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<any>) => void;
  selectChange: (e: SelectChangeEvent<string>, child: ReactNode) => void;
  touched: FormikTouched<Cliente>
  errors: FormikErrors<Cliente>
  values: any
}

interface PropsCondutor {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<any>) => void;
  dateChange: (value: React.ChangeEvent<any> | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
  touched: FormikTouched<Condutor>
  errors: FormikErrors<Condutor>
  values: any
}

export function ClienteForm(props: PropsCliente) {
  return (
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
            label="Nome"
            fullWidth
            name="numeroDocumento"
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
            label="Numero"
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
  )
}

export function CondutorForm(props: PropsCondutor) {
  return (
    <>
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
              label="Numero da Habilitacao"
              fullWidth
              name="numeroHabilitacao"
              error={props.touched?.numeroHabilitacao && props.errors?.numeroHabilitacao !== undefined}
              value={props.values?.numeroHabilitacao}
              onChange={props.handleChange}
              helperText={(props.touched?.numeroHabilitacao && props.errors?.numeroHabilitacao) !== undefined && props.errors?.numeroHabilitacao} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField type="text"
              variant='outlined'
              color='primary'
              label="Catergoria da Habilitacao"
              fullWidth
              name="catergoriaHabilitacao"
              error={props.touched?.catergoriaHabilitacao && props.errors?.catergoriaHabilitacao !== undefined}
              value={props.values?.catergoriaHabilitacao}
              onChange={props.handleChange}
              helperText={(props.touched?.catergoriaHabilitacao && props.errors?.catergoriaHabilitacao) !== undefined && props.errors?.catergoriaHabilitacao} />
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker

                label="Vencimento da Habilitacao"
                value={props.values?.vencimentoHabilitacao}
                onChange={props.dateChange}
                defaultValue={props.values?.vencimentoHabilitacao}
                slotProps={{
                  textField: {
                    required: true,
                    name: 'vencimentoHabilitacao'
                  }
                }}
              />
            </LocalizationProvider>
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
    </>
  )
}