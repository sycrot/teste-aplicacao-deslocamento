export type Veiculo = {
  id: number,
  placa: string,
  marcaModelo: string,
  anoFabricacao: number,
  kmAtual: number
}

export type CreateVeiculoRes = {
  placa: string,
  marcaModelo: string,
  anoFabricacao: number,
  kmAtual: number
}