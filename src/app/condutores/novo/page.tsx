"use client"
import React from "react";
import { CondutorForm } from "@/app/Components/formFields";
import * as yup from "yup"
import * as condutorService from "../../services/condutor"
import { useFormik } from 'formik'
import { useRouter } from "next/navigation";

const schema = yup.object({
  nome: yup.string().required(`This field is required`),
  numeroHabilitacao: yup.string().required(`This field is required`),
  categoriaHabilitacao: yup.string().required(`This field is required`),
  vencimentoHabilitacao: yup.string().required(`This field is required`)
}).required()

export default function CreateCondutor() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      nome: '',
      numeroHabilitacao: '',
      categoriaHabilitacao: '',
      vencimentoHabilitacao: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setButtonDisable(true)
      await condutorService.postCondutor(values).then(res => {
        setOpen(true)
      }).catch(err => {
        setOpenError(true)
        setTextError(err.response.data)
      })
    },
  });

  const handleClose = () => {
    setOpen(false);
    router.push('/condutores')
  };

  const handleCloseError = () => {
    setOpenError(false)
    setButtonDisable(false)
  }

  return (
    <>
      <CondutorForm
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