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
  inicioDeslocamento: yup.string(),
  checkList: yup.string().required(`This field is required`),
  motivo: yup.string().required(`This field is required`),
  observacao: yup.string().required(`This field is required`),
  idCondutor: yup.number().required(`This field is required`),
  idVeiculo: yup.number().required(`This field is required`),
  idCliente: yup.number().required(`This field is required`),
})

export default function CreatDeslocamento() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()

  const date = moment().format()

  const formik = useFormik({
    initialValues: {
      kmInicial: 0,
      inicioDeslocamento: date,
      checkList: '',
      motivo: '',
      observacao: '',
      idCondutor: 0,
      idVeiculo: 0,
      idCliente: 0,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
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
      />
    </>
  )
}