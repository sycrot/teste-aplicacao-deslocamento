"use client"
import TableGlobal from "../../components/table";

const tableHeads = ['Placa', 'Marca/Modelo', 'Ano de fabricacao', 'KM Atual']

export default function Veiculos () {
  return (
    <div>
      <TableGlobal tableHeads={tableHeads} type='veiculo' link="/veiculos"/>
    </div>
  )
}