import { Cliente, CreateClienteRes } from "@/app/types/cliente";
import axios from './axios-config'
import { Condutor, CreateCondutorRes } from "@/app/types/condutor";
import { CreateDeslocamentoRes, Deslocamento, UpdateDeslocamento } from "@/app/types/deslocamento";
import moment from "moment";

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
  const date = moment()
  const { data, status } = await axios.post<CreateDeslocamentoRes>(
    `${URL}/IniciarDeslocamento`,
    {
      kmInicial: deslocamento.kmInicial,
      inicioDeslocamento: date,
      checkList: deslocamento.checkList,
      motivo: deslocamento.motivo,
      observacao: deslocamento.observacao,
      idCondutor: deslocamento.idCondutor,
      idVeiculo: deslocamento.idVeiculo,
      idCliente: deslocamento.idCliente
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

export const updateDeslocamento = async (deslocamento: UpdateDeslocamento, id: number) => {
  const date = moment()
  const { data, status } = await axios.put<UpdateDeslocamento>(
    `${URL}/${id}/EncerrarDeslocamento`,
    {
      id: id,
      kmFinal: deslocamento.kmFinal,
      fimDeslocamento: date,
      observacao: deslocamento.observacao
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
  } catch (error) {
    console.log('unexpected error: ', error)
    return 'An unexpected error ocurred'
  }
}