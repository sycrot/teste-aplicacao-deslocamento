import { Cliente, CreateClienteRes } from "@/app/types/cliente";
import axios from './axios-config'
import { Condutor, CreateCondutorRes } from "@/app/types/condutor";

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
  try {
    const { data, status } = await axios.post<CreateCondutorRes>(
      `${URL}`,
      { 
        nome: condutor.nome,
        numeroHabilitacao: condutor.numeroHabilitacao,
        catergoriaHabilitacao: condutor.catergoriaHabilitacao,
        vencimentoHabilitacao: condutor.vencimentoHabilitacao,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    return data
  } catch(error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}

export const updateCondutor = async (condutor: CreateCondutorRes, id: number) => {
  try {
    const { data, status } = await axios.put<CreateCondutorRes>(
      `${URL}/${id}`,
      { condutor },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    return data
  } catch(error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
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
  } catch(error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}