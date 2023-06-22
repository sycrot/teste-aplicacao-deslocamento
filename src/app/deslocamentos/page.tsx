"use client"
import TableGlobal from "../Components/table"

const tableHeads = ['KM Inicial', 'KM Final', 'Início deslocamento', 'fimDeslocamento', 'CheckList', 'Motivo', 'Observação', 'idCondutor', 'idVeiculo', 'idCliente']

export default function Deslocamentos() {
  return (
    <div>
      <TableGlobal tableHeads={tableHeads} type='deslocamento' link="/deslocamentos"/>
    </div>
  )
}