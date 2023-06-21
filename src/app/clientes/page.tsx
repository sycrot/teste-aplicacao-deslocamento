"use client"
import Link from "next/link";
import React from "react";
import { Button, Grid, IconButton, InputBase, Paper, TextField } from "@mui/material";
import TableGlobal from "../Components/table";
import SearchIcon from '@mui/icons-material/Search';

const tableHeads = ['Nome', 'Numero do Documento', 'Tipo do Documento', 'Logradouro', 'Numero', 'Bairro', 'Cidade', 'Estado']

export default function Clientes() {
  return (
    <>
      <TableGlobal tableHeads={tableHeads} type='cliente' link="/clientes" />
    </>
  )
}