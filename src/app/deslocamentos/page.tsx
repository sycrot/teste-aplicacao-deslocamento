"use client"
import TableGlobal from "../Components/table"

const tableHeads = ['KM Inicial', 'KM Final', 'Início deslocamento', 'Fim deslocamento', 'CheckList', 'Motivo', 'Observação', 'Condutor', 'Veículo', 'Cliente']

export default function Deslocamentos() {
  return (
    <div>
      <TableGlobal tableHeads={tableHeads} type='deslocamento' link="/deslocamentos"/>
    </div>
  )
}