"use client"
import React from "react";
import * as yup from "yup"
import * as clienteService from "../../services/cliente"
import { useFormik } from 'formik'
import { ClienteForm } from "@/app/Components/formFields";
import { Alert, Breadcrumbs, Dialog, Grid, IconButton, Link, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


const schema = yup.object({
  numeroDocumento: yup.string().required(`This field is required`),
  tipoDocumento: yup.string().required(`This field is required`),
  nome: yup.string().required(`This field is required`),
  logradouro: yup.string().required(`This field is required`),
  numero: yup.string().required(`This field is required`),
  bairro: yup.string().required(`This field is required`),
  cidade: yup.string().required(`This field is required`),
  uf: yup.string().required(`This field is required`),
}).required()

export default function CreateCliente() {
  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      numeroDocumento: '',
      tipoDocumento: '',
      nome: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await clienteService.postCliente(values).then(res => {
        setOpen(true)
      })
    },
  });

  const handleClose = () => {
    setOpen(false);
    router.push('/clientes')
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">Cliente criado com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/clientes">
              Clientes
            </Link>
            <Typography color="text.primary">Novo cliente</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">Novo cliente</Typography>
        </Grid>
        <Grid item xs={12}>
          <ClienteForm
            handleSubmit={formik.handleSubmit}
            handleChange={formik.handleChange}
            selectChange={formik.handleChange}
            touched={formik.touched}
            errors={formik.errors}
            values={formik.values} />
        </Grid>
      </Grid>

    </>
  )
}