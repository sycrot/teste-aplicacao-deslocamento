import { Cliente, CreateClienteRes, UpdateClienteRes } from "@/app/types/cliente";
import axios from './axios-config'

export const getClientes = async () => {
  try {
    const { data, status } = await axios.get<Cliente>(
      '/api/v1/Cliente',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return data
  } catch (error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}

export const getById = async (id: number) => {
  try {
    const { data, status } = await axios.get<Cliente>(
      `/api/v1/Cliente/${id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return data
  } catch (error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}

export const postCliente = async (cliente: CreateClienteRes) => {
  const { data, status } = await axios.post<CreateClienteRes>(
    `/api/v1/Cliente`,
    {
      numeroDocumento: cliente.numeroDocumento,
      tipoDocumento: cliente.tipoDocumento,
      nome: cliente.nome,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      uf: cliente.uf,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return data
}

export const updateCliente = async (cliente: UpdateClienteRes, id: number) => {
  const { data, status } = await axios.put<UpdateClienteRes>(
    `/api/v1/Cliente/${id}`,
    {
      id: cliente.id,
      nome: cliente.nome,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      uf: cliente.uf,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  return data
}

export const deleteCliente = async (id: number) => {
  try {
    const { data, status } = await axios.delete(
      `/api/v1/Cliente/${id}`,
      {
        data: {
          id: id
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

      },
    )

    return data
  } catch (error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}

export const search = async (text: string) => {
  let list: Cliente[] = await getClientes() as unknown as Cliente[]

  let listRes = list.filter(function (value) {
    return value.nome.toLowerCase().indexOf(text.toLowerCase()) > -1
  })

  return listRes
}