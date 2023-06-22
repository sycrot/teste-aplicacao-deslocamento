"use client"
import { DeslocamentoForm } from "@/app/Components/formFields";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from 'yup'
import * as deslocamentoService from '../../services/deslocamento'
import moment from "moment";

const schema = yup.object({
  kmInicial: yup.number().required(`This field is required`),
  inicioDeslocamento: yup.string().required(`Digite uma data e hora`),
  checkList: yup.string(),
  motivo: yup.string().required(`This field is required`),
  observacao: yup.string(),
  idCondutor: yup.number().required('Escolha um condutor').min(0, 'Escolha um condutor'),
  idVeiculo: yup.number().required(`Escolha um veículo`).min(0, 'Escolha um veículo'),
  idCliente: yup.number().required(`Escolha um cliente`).min(0, 'Escolha um cliente'),
})

export default function CreatDeslocamento() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()

  const date = moment().format('yyyy-MM-DDThh:mm')

  const formik = useFormik({
    initialValues: {
      kmInicial: 0,
      inicioDeslocamento: date,
      checkList: '',
      motivo: '',
      observacao: '',
      idCondutor: -1,
      idVeiculo: -1,
      idCliente: -1,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setButtonDisable(true)
      await deslocamentoService.postDeslocamento(values).then(res => {
        setOpen(true)
      }).catch(err => {
        setOpenError(true)
        setTextError(err.response.data)
      })
    },
  });

  const handleClose = () => {
    setOpen(false);
    router.push('/deslocamentos')
  };

  const handleCloseError = () => {
    setOpenError(false)
    setButtonDisable(false)
  }

  return (
    <>
      <DeslocamentoForm
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        selectChange={formik.handleChange}
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