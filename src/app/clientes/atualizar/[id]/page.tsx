"use client"
import * as yup from "yup"
import * as clienteService from "../../../services/cliente"
import { useParams, useRouter } from "next/navigation";
import { Cliente } from "@/app/types/cliente";
import React from "react";
import { ClienteForm } from "@/app/Components/formFields";
import { useFormik } from "formik";
import { Alert, Breadcrumbs, Dialog, Grid, IconButton, Link, Typography } from "@mui/material";

const schema = yup.object().shape({
  numeroDocumento: yup.string().required(`This field is required`),
  tipoDocumento: yup.string().required(`This field is required`),
  nome: yup.string().required(`This field is required`),
  logradouro: yup.string().required(`This field is required`),
  numero: yup.string().required(`This field is required`),
  bairro: yup.string().required(`This field is required`),
  cidade: yup.string().required(`This field is required`),
  uf: yup.string().required(`This field is required`),
}).required()


export default function AtualizarCliente() {
  const [open, setOpen] = React.useState(false)
  const routerParams = useParams()
  const router = useRouter()

  const [cliente, setCliente] = React.useState<Cliente>({
    id: +routerParams.id,
    numeroDocumento: "",
    tipoDocumento: "",
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  })

  React.useEffect(() => {
    const getCliente = async () => {
      await clienteService.getById(+routerParams.id).then((value) => {
        setCliente(value as Cliente)
      })
    }
    getCliente()
  }, [routerParams.id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: +routerParams.id,
      numeroDocumento: cliente.numeroDocumento,
      tipoDocumento: cliente.tipoDocumento,
      nome: cliente.nome,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      uf: cliente.uf
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await clienteService.updateCliente(values, +routerParams.id).then(res => {
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
        <Alert severity="success">Cliente atualizado com sucesso!<IconButton sx={{ marginLeft: 2 }} size="small" onClick={handleClose} autoFocus color="success">OK</IconButton></Alert>
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/clientes">
              Clientes
            </Link>
            <Typography color="text.primary">Atualizar cliente</Typography>
          </Breadcrumbs>
          <Typography variant="h4" color="text.primary">Atualizar cliente</Typography>
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