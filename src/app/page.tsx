"use client"
import { Avatar, Badge, Button, Grid, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, Typography, createTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Cliente } from './types/cliente';
import { Condutor } from './types/condutor';
import { Deslocamento } from './types/deslocamento';
import { Veiculo } from './types/veiculo';
import * as clienteService from './services/cliente'
import * as condutorService from './services/condutor'
import * as veiculoService from './services/veiculo'
import * as deslocamentoService from './services/deslocamento'

function handleLoading() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default function Home() {
  const [clientes, setClientes] = React.useState<Cliente[]>();
  const [condutores, setCondutores] = React.useState<Condutor[]>();
  const [veiculos, setVeiculos] = React.useState<Veiculo[]>();
  const [deslocamentos, setDeslocamentos] = React.useState<Deslocamento[]>();
  const [loading, setLoading] = React.useState(true)

  const getClientes = React.useCallback(async () => {
    await clienteService.getClientes().then(res => {
      setLoading(false)
      setClientes(res as unknown as Cliente[])
    })
  }, [])

  const getCondutores = React.useCallback(async () => {
    await condutorService.getCondutores().then(res => {
      setLoading(false)
      setCondutores(res as unknown as Condutor[])
    })
  }, [])

  const getVeiculos = React.useCallback(async () => {
    await veiculoService.getVeiculos().then(res => {
      setLoading(false)
      setVeiculos(res as unknown as Veiculo[])
    })
  }, [])

  const getDeslocamentos = React.useCallback(async () => {
    await deslocamentoService.getDeslocamentos().then(res => {
      setLoading(false)
      setDeslocamentos(res as unknown as Deslocamento[])
    })
  }, [])

  React.useEffect(() => {
    getClientes()
    getCondutores()
    getVeiculos()
    getDeslocamentos()
  }, [getClientes, getCondutores, getVeiculos, getDeslocamentos])

  return (
    <main>
      {
        loading === true ?
          handleLoading()
          :
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Link href="/clientes">
                <Button variant="contained" color="success" fullWidth sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3
                }}>
                  <Badge badgeContent={clientes?.length} color='primary' overlap='circular'>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: '#1f7424' }}>
                      <PeopleIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                  </Badge>

                  <Typography sx={{ marginTop: 1 }} variant="h6" gutterBottom>
                    Clientes
                  </Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>
              <Link href="/condutores">
                <Button variant="contained" color="error" fullWidth sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3
                }}>
                  <Badge badgeContent={condutores?.length} color='primary' overlap='circular'>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: '#db3636' }}>
                      <RecentActorsIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                  </Badge>

                  <Typography sx={{ marginTop: 1 }} variant="h6" gutterBottom>
                    condutores
                  </Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>
              <Link href="/veiculos">
                <Button variant="contained" color="warning" fullWidth sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3
                }}>
                  <Badge badgeContent={veiculos?.length} color='primary' overlap='circular'>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: '#f07918' }}>
                      <DirectionsCarIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                  </Badge>

                  <Typography sx={{ marginTop: 1 }} variant="h6" gutterBottom>
                    veículos
                  </Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>
              <Link href="/deslocamentos">
                <Button variant="contained" color="info" fullWidth sx={{
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3
                }}>
                  <Badge badgeContent={clientes?.length} color='primary' overlap='circular'>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: '#0a95e0' }}>
                      <DepartureBoardIcon sx={{ fontSize: 80 }} />
                    </Avatar>
                  </Badge>

                  <Typography sx={{ marginTop: 1 }} variant="h6" gutterBottom>
                    deslocamentos
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
      }

    </main >
  )
}
