import axios from './axios-config'
import { CreateVeiculoRes, Veiculo } from "@/app/types/veiculo";

const URL = '/api/v1/Veiculo'

export const getVeiculos = async () => {
  try {
    const { data, status } = await axios.get<Veiculo>(
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
    const { data, status } = await axios.get<Veiculo>(
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

export const postVeiculo = async (veiculo: CreateVeiculoRes) => {
  try {
    const { data, status } = await axios.post<CreateVeiculoRes>(
      `${URL}`,
      { veiculo },
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

export const updateVeiculo = async (veiculo: CreateVeiculoRes, id: number) => {
  try {
    const { data, status } = await axios.put<CreateVeiculoRes>(
      `${URL}/${id}`,
      { veiculo },
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

export const deleteVeiculo = async (id: number) => {
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