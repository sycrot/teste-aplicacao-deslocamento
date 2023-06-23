export type Cliente = {
  id: number
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export type CreateClienteRes = {
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export type UpdateClienteRes = {
  id: number
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}