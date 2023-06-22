"use client"
import * as yup from "yup"
import * as clienteService from "../../../services/cliente"
import { useParams, useRouter } from "next/navigation";
import { Cliente } from "@/app/types/cliente";
import React from "react";
import { ClienteForm } from "@/app/Components/formFields";
import { useFormik } from "formik";

const schema = yup.object().shape({
  numeroDocumento: yup.string(),
  tipoDocumento: yup.string(),
  nome: yup.string().required(`This field is required`),
  logradouro: yup.string().required(`This field is required`),
  numero: yup.string().required(`This field is required`),
  bairro: yup.string().required(`This field is required`),
  cidade: yup.string().required(`This field is required`),
  uf: yup.string().required(`This field is required`),
})


export default function AtualizarCliente() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
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
      setButtonDisable(true)
      await clienteService.updateCliente(values, +routerParams.id).then(res => {
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
    setButtonDisable(false)
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
        page="update"
        open={open}
        handleCloseError={handleCloseError}
        openError={openError}
        textError={textError}
        buttonDisable={buttonDisable} />
    </>
  )
}