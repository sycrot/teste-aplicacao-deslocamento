"use client"
import React from "react";
import { VeiculoForm } from "@/components/formFields";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as veiculoService from '../../../services/veiculo'
import * as yup from 'yup'

const schema = yup.object({
  placa: yup.string().required(`This field is required`),
  marcaModelo: yup.string().required(`This field is required`),
  anoFabricacao: yup.number().required(`This field is required`),
  kmAtual: yup.number().required(`This field is required`)
}).required()

export default function CreateVeiculo() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      placa: '',
      marcaModelo: '',
      anoFabricacao: 1800,
      kmAtual: 0
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setButtonDisable(true)
      await veiculoService.postVeiculo(values).then(res => {
        setOpen(true)
      }).catch(err => {
        setOpenError(true)
        setTextError(err.response.data)
      }) 
    },
  });

  const handleClose = () => {
    setOpen(false);
    router.push('/veiculos')
  };

  const handleCloseError = () => {
    setOpenError(false)
    setButtonDisable(false)
  }

  return (
    <>
      <VeiculoForm
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        handleClose={handleClose}
        handleCloseError={handleCloseError}
        page="create"
        open={open}
        openError={openError}
        textError={textError}
        buttonDisable={buttonDisable}
      />
    </>
  )
}