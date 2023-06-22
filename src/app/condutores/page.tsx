"use client"
import TableGlobal from "../Components/table";
import React from "react";

const tableHeads = ['Nome', 'Numero da Habilitacao', 'Catergoria da Habilitacao', 'Vencimento da Habilitacao']

export default function Condutores() {
  return (
    <>
      <TableGlobal tableHeads={tableHeads} type='condutor' link="/condutores"/>
    </>
  )
}