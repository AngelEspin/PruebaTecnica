'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { setUsers } from '../redux/features/usersSlice';
import { RootState } from '../redux/store';
import UserList from '../redux/components/UserList';
import { exportToPDF, exportToExcel } from '../utils/exportData';

// Componente principal que muestra una lista de usuarios y permite filtrar y exportar los datos.
const Page = () => {
  const dispatch = useDispatch(); // Obtiene la función de despacho para actualizar el estado global.
  const users = useSelector((state: RootState) => state.users.users); // Selecciona la lista de usuarios del estado global.
  const [search, setSearch] = useState(''); // Estado local para manejar la búsqueda.

  useEffect(() => {
    // Realiza una solicitud para obtener los datos de los usuarios al montar el componente.
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      dispatch(setUsers(data)); // Actualiza el estado global con los datos obtenidos.
    };
    fetchData();
  }, [dispatch]); // Se asegura de que `dispatch` esté disponible en el alcance del efecto.

  // Filtra los usuarios según el término de búsqueda ingresado.
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      {/* Título principal */}
      <Typography variant="h3" gutterBottom color="primary">
        Lista de Usuarios
      </Typography>

      {/* Controles de búsqueda y exportación */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          {/* Campo para ingresar el término de búsqueda */}
          <TextField
            fullWidth
            label="Buscar por Nombre"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          {/* Botón para exportar los usuarios filtrados a PDF */}
          <Button variant="contained" onClick={() => exportToPDF(filteredUsers)}>
            Descargar PDF
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          {/* Botón para exportar los usuarios filtrados a Excel */}
          <Button variant="contained" onClick={() => exportToExcel(filteredUsers)}>
            Descargar Excel
          </Button>
        </Grid>
      </Grid>

      {/* Componente que muestra la lista de usuarios filtrados */}
      <UserList users={filteredUsers} />
    </Box>
  );
};

export default Page;