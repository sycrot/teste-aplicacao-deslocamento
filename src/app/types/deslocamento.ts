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
  kmFinal: number,
  fimDeslocamento: string
}

export type CreateDeslocamentoRes = {
  kmInicial: number
  inicioDeslocamento: string
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export type UpdateDeslocamentoRes = {
  id: number,
  kmFinal: number,
  fimDeslocamento: string,
  observacao: string
}