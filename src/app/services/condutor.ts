import { Cliente, CreateClienteRes } from "@/app/types/cliente";
import axios from './axios-config'
import { Condutor, CreateCondutorRes, UpdateCondutorRes } from "@/app/types/condutor";
import moment from "moment";

const URL = '/api/v1/Condutor'

export const getCondutores = async () => {
  try {
    const { data, status } = await axios.get<Condutor>(
      `${URL}`,
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
    const { data, status } = await axios.get<Condutor>(
      `${URL}/${id}`,
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

export const postCondutor = async (condutor: CreateCondutorRes) => {
  const { data, status } = await axios.post<CreateCondutorRes>(
    `${URL}`,
    {
      nome: condutor.nome,
      numeroHabilitacao: condutor.numeroHabilitacao,
      categoriaHabilitacao: condutor.categoriaHabilitacao,
      vencimentoHabilitacao: condutor.vencimentoHabilitacao
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

export const updateCondutor = async (condutor: UpdateCondutorRes, id: number) => {

  const { data, status } = await axios.put<UpdateCondutorRes>(
    `${URL}/${id}`,
    {
      id: id,
      vencimentoHabilitacao: condutor.vencimentoHabilitacao
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

export const deleteCondutor = async (id: number) => {
  try {
    const { data, status } = await axios.delete(
      `${URL}/${id}`,
      {
        data: {
          id: id
        },
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

export const search = async (text: string) => {
  let list: Condutor[] = await getCondutores() as unknown as Condutor[]

  let listRes = list.filter(function (value) {
    return value.nome.toLowerCase().indexOf(text.toLowerCase()) > -1
  })

  return listRes
}