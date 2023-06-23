import axios from './axios-config'
import { CreateVeiculoRes, UpdateVeiculoRes, Veiculo } from "@/types/veiculo";

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
  const { data, status } = await axios.post<CreateVeiculoRes>(
    `${URL}`,
    {
      placa: veiculo.placa,
      marcaModelo: veiculo.marcaModelo,
      anoFabricacao: veiculo.anoFabricacao,
      kmAtual: veiculo.kmAtual
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

export const updateVeiculo = async (veiculo: UpdateVeiculoRes, id: number) => {
  const { data, status } = await axios.put<UpdateVeiculoRes>(
    `${URL}/${id}`,
    { 
      id: id,
      marcaModelo: veiculo.marcaModelo,
      anoFabricacao: veiculo.anoFabricacao,
      kmAtual: veiculo.kmAtual
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

export const deleteVeiculo = async (id: number) => {
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
  let list: Veiculo[] = await getVeiculos() as unknown as Veiculo[]

  let listRes = list.filter(function (value) {
    return value.placa.toLowerCase().indexOf(text.toLowerCase()) > -1
  })

  return listRes
}