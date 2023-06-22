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
  const [openError, setOpenError] = React.useState(false)
  const [textError, setTextError] = React.useState('')

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
      }).catch(err => {
        setOpenError(true)
        setTextError(err.response.data)
      })
    },
  });

  const handleClose = () => {
    setOpen(false);
    router.push('/clientes')
  };

  const handleCloseError = () => {
    setOpenError(false)
  }

  return (
    <>
      <ClienteForm
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        selectChange={formik.handleChange}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        handleClose={handleClose}
        page="create"
        open={open}
        handleCloseError={handleCloseError}
        openError={openError}
        textError={textError} />

    </>
  )
}