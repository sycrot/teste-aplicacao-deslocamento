import { Cliente, CreateClienteRes } from "@/app/types/cliente";
import axios from './axios-config'
import { Condutor, CreateCondutorRes } from "@/app/types/condutor";
import { CreateDeslocamentoRes, Deslocamento } from "@/app/types/deslocamento";

const URL = '/api/v1/Deslocamento'

export const getDeslocamentos = async () => {
  try {
    const { data, status } = await axios.get<Deslocamento>(
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
    const { data, status } = await axios.get<Deslocamento>(
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

export const postDeslocamento = async (deslocamento: CreateDeslocamentoRes) => {
  try {
    const { data, status } = await axios.post<CreateDeslocamentoRes>(
      `${URL}`,
      { deslocamento },
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

export const updateDeslocamento = async (deslocamento: CreateDeslocamentoRes, id: number) => {
  try {
    const { data, status } = await axios.put<CreateDeslocamentoRes>(
      `${URL}/${id}`,
      { deslocamento },
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

export const deleteDeslocamento = async (id: number) => {
  try {
    const { data, status } = await axios.delete(
      `${URL}/${id}`,
      {
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