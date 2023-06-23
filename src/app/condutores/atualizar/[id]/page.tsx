"use client"
import React from "react";
import { CondutorForm } from "@/components/formFields";
import * as yup from "yup"
import * as condutorService from "../../../../services/condutor"
import { useFormik } from 'formik'
import { useParams, useRouter } from "next/navigation";
import { Condutor } from "@/types/condutor";
import { Alert, Dialog, Grid, IconButton, Typography } from "@mui/material";

const schema = yup.object().shape({
  nome: yup.string(),
  numeroHabilitacao: yup.string(),
  categoriaHabilitacao: yup.string(),
  vencimentoHabilitacao: yup.string().required(`This field is required`)
})

export default function AtualizarCondutor() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const routerParams = useParams()
  const router = useRouter()

  const [condutor, setCondutor] = React.useState<Condutor>({
    id: +routerParams.id,
    nome: '',
    numeroHabilitacao: '',
    categoriaHabilitacao: '',
    vencimentoHabilitacao: ''
  })

  React.useEffect(() => {
    const getCondutor = async () => {
      await condutorService.getById(+routerParams.id).then((value) => {
        setCondutor(value as Condutor)
      })
    }
    getCondutor()
  }, [routerParams.id])

  const getDate = (date: string) => {
    const newDate = new Date(date)

    let day = newDate.getDate()
    let month = newDate.getMonth()
    let year = newDate.getFullYear()

    let newDay = `${day}`
    let newMonth = `${month}`

    if (day < 10) {
      newDay = `0${day}`
    } 
    if (month < 10) {
      newMonth = `0${newMonth}`
    }
    return `${year}-${newMonth}-${newDay}`
  }


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: +routerParams.id,
      nome: condutor.nome,
      numeroHabilitacao: condutor.numeroHabilitacao,
      categoriaHabilitacao: condutor.categoriaHabilitacao,
      vencimentoHabilitacao: getDate(condutor.vencimentoHabilitacao)
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setButtonDisable(true)
      await condutorService.updateCondutor(values, +routerParams.id).then(res => {
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
        page="update"
        open={open}
        handleCloseError={handleCloseError}
        openError={openError}
        textError={textError}
        buttonDisable={buttonDisable}
      />
    </>
  )
}