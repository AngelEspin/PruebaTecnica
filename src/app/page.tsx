'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { setUsers } from '../redux/features/usersSlice';
import { RootState } from '../redux/store';
import UserList from '../components/UserList';
import { exportToPDF, exportToExcel } from '../utils/exportData'; // Asegúrate de usar la ruta correcta
const Page = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      dispatch(setUsers(data));
    };
    fetchData();
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom  color="secondary">
        Lista de Usuarios
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Buscar por Nombre"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={() => exportToPDF(filteredUsers)}>
            Descargar PDF
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={() => exportToExcel(filteredUsers)}>
            Descargar Excel
          </Button>
        </Grid>
      </Grid>
      <UserList users={filteredUsers} />
    </Box>
  );
};

export default Page;