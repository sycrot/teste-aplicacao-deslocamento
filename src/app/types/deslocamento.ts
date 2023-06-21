export type Deslocamento = {
  id: number
  kmInicial: number
  inicioDeslocamento: Date
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export type CreateDeslocamentoRes = {
  kmInicial: number
  inicioDeslocamento: Date
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}