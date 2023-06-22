"use client"
import React from "react";
import { VeiculoForm } from "@/app/Components/formFields";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as veiculoService from '../../../services/veiculo'
import * as yup from 'yup'
import { Veiculo } from "@/app/types/veiculo";

const schema = yup.object({
  placa: yup.string().required(`This field is required`),
  marcaModelo: yup.string().required(`This field is required`),
  anoFabricacao: yup.number().required(`This field is required`),
  kmAtual: yup.number().required(`This field is required`)
}).required()

export default function UpdateVeiculo() {
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [textError, setTextError] = React.useState('')
  const router = useRouter()
  const routerParams = useParams()

  const [veiculo, setVeiculo] = React.useState<Veiculo>({
    id: +routerParams.id,
    placa: '',
    marcaModelo: '',
    anoFabricacao: 0,
    kmAtual: 0
  })

  React.useEffect(() => {
    const getCliente = async () => {
      await veiculoService.getById(+routerParams.id).then((value) => {
        setVeiculo(value as Veiculo)
      })
    }
    getCliente()
  }, [routerParams.id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: +routerParams.id,
      placa: veiculo.placa,
      marcaModelo: veiculo.marcaModelo,
      anoFabricacao: veiculo.anoFabricacao,
      kmAtual: veiculo.kmAtual
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setButtonDisable(true)
      await veiculoService.updateVeiculo(values, +routerParams.id).then(res => {
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
        page="update"
        open={open}
        openError={openError}
        textError={textError}
        buttonDisable={buttonDisable}
      />
    </>
  )
}