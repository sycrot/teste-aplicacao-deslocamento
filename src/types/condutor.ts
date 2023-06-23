export type Condutor = {
  id: number
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export type CreateCondutorRes = {
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export type UpdateCondutorRes = {
  id: number
  vencimentoHabilitacao: string
}