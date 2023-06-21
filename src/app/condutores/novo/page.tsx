"use client"
import React from "react";
import { CondutorForm } from "@/app/Components/formFields";
import * as yup from "yup"
import * as condutorService from "../../services/condutor"
import { useFormik } from 'formik'
import { Alert, Breadcrumbs, Dialog, Grid, IconButton, Link, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const schema = yup.object({
  nome: yup.string().required(`This field is required`),
  numeroHabilitacao: yup.string().required(`This field is required`),
  catergoriaHabilitacao: yup.string().required(`This field is required`),
  vencimentoHabilitacao: yup.date().required(`This field is required`)
}).required()

export default function CreateCondutor() {

  const formik = useFormik({
    initialValues: {
      nome: '',
      numeroHabilitacao: '',
      catergoriaHabilitacao: '',
      vencimentoHabilitacao: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      /* await condutorService.postCondutor(values).then(res => {

      }) */
      console.log(values)
    },
  });

  return (
    <>
      <CondutorForm
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        dateChange={formik.handleChange}
        touched={formik.touched}
        errors={formik.errors}
        values={formik.values}
      />
    </>
  )
}