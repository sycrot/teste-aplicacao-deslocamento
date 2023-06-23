"use client"
import React from "react";
import TableGlobal from "../../components/table";

const tableHeads = ['Nome', 'Número do Documento', 'Tipo do Documento', 'Logradouro', 'Número', 'Bairro', 'Cidade', 'Estado']

export default function Clientes() {
  return (
    <>
      <TableGlobal tableHeads={tableHeads} type='cliente' link="/clientes" />
    </>
  )
}