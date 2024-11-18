import { GetStaticProps } from 'next';
import { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { setUsers } from '../redux/features/usersSlice'; // Asegúrate de que esta ruta sea correcta
import { exportToPDF, exportToExcel } from '../utils/exportData'; // Asegúrate de que esta ruta sea correcta
import UserList from '../redux/components/UserList';
import { User } from '../redux/components/types'; // Asegúrate de importar el User correcto

type PageProps = {
  users: User[];
};

const Page = ({ users }: PageProps) => {
  const [search, setSearch] = useState('');
  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom color="primary">
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
    revalidate: 60, // Revalida los datos cada 60 segundos
  };
};

export default Page;