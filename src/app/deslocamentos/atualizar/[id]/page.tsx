"use client"
import { DeslocamentoForm, PutDeslocamentoForm } from "@/app/Components/formFields";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import * as yup from 'yup'
import * as deslocamentoService from '../../../services/deslocamento'
import moment from "moment";
import { Deslocamento, UpdateDeslocamentoRes } from "@/app/types/deslocamento";

const schema = yup.object({
  kmFinal: yup.number().required(`This field is required`),
  fimDeslocamento: yup.string(),
  observacao: yup.string(),
})

export default function UpdateDeslocamento() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()
  const routerParams = useParams()
  const date = moment().format()

  const [deslocamento, setDeslocamento] = React.useState<UpdateDeslocamentoRes>({
    id: +routerParams.id,
    kmFinal: 0,
    fimDeslocamento: '',
    observacao: '',
  })

  React.useEffect(() => {
    const getCliente = async () => {
      await deslocamentoService.getById(+routerParams.id).then((value) => {
        setDeslocamento(value as UpdateDeslocamentoRes)
      })
    }
    getCliente()
  }, [routerParams.id])

  const formik = useFormik({
    initialValues: {
      id: +routerParams.id,
      kmFinal: 0,
      fimDeslocamento: date,
      observacao: deslocamento.observacao,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await deslocamentoService.updateDeslocamento(values, +routerParams.id).then(res => {
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
      <PutDeslocamentoForm
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        selectChange={formik.handleChange}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
        handleClose={handleClose}
        handleCloseError={handleCloseError}
        page="update"
        open={open}
        openError={openError}
        textError={textError}
      />
    </>
  )
}