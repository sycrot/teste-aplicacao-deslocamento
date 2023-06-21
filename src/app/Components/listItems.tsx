import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Link from 'next/link';

export const mainListItems = (
  <React.Fragment>
    <Link href="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/clientes">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
    </Link>
    <Link href="/condutores">
      <ListItemButton>
        <ListItemIcon>
          <RecentActorsIcon />
        </ListItemIcon>
        <ListItemText primary="Condutores" />
      </ListItemButton>
    </Link>
    <Link href="/deslocamentos">
      <ListItemButton>
        <ListItemIcon>
          <DepartureBoardIcon />
        </ListItemIcon>
        <ListItemText primary="Deslocamentos" />
      </ListItemButton>
    </Link>
    <Link href="/veiculos">
      <ListItemButton>
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="Veiculos" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);