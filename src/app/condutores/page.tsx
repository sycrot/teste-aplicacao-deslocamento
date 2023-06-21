"use client"
import { Button } from "@mui/material";
import Link from "next/link";
import TableGlobal from "../Components/table";
import * as condutoresService from '../services/condutor'
import { Condutor } from "../types/condutor";
import React from "react";

const tableHeads = ['Nome', 'Numero da Habilitacao', 'Catergoria da Habilitacao', 'Vencimento da Habilitacao']

export default function Condutores() {
  const [condutores, setCondutores] = React.useState<Condutor[]>([])

  React.useEffect(() => {
    const getClientes = async () => {
      let res = await condutoresService.getCondutores() as unknown as Condutor[]
      console.log(res)
      setCondutores(res)
    }
    getClientes()
  }, [])

  return (
    <>
      <TableGlobal tableHeads={tableHeads} type='condutor' link="/condutores"/>
    </>
  )
}