// Importa tipos y funciones necesarias de Next.js, React, Material-UI y funciones personalizadas.
import { GetStaticProps } from 'next'; // Importa GetStaticProps para la obtención de datos en el lado del servidor
import { useState, useEffect } from 'react'; // Importa useState y useEffect para manejar el estado y efectos secundarios
import { TextField, Button, Box, Grid, Typography, CircularProgress } from '@mui/material'; // Importa componentes de Material-UI para la interfaz
import { exportToPDF, exportToExcel } from '../utils/exportData'; 
import UserList from '../redux/components/UserList'; // Importa el componente UserList que mostrará los usuarios
import { User } from '../redux/components/types'; 

// Define las propiedades que se recibirán en el componente 'Page'
type PageProps = {
  users: User[]; // La propiedad 'users' contiene una lista de objetos de tipo 'User'
};

// Componente principal de la página
const Page = ({ users }: PageProps) => {
  // Inicializa un estado local para el campo de búsqueda
  const [search, setSearch] = useState(''); 
  const [filteredUsers, setFilteredUsers] = useState(users); // Estado para los usuarios filtrados
  const [loading, setLoading] = useState(false); // Estado de carga
  
  // Maneja la lógica de búsqueda
  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    const timeoutId = setTimeout(() => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) // Compara el nombre del usuario (sin importar mayúsculas/minúsculas)
      );
      setFilteredUsers(filtered); // Actualiza los usuarios filtrados
      setLoading(false); // Desactiva el estado de carga
    }, 300); // Demora la búsqueda para evitar filtros innecesarios mientras el usuario escribe
    return () => clearTimeout(timeoutId); // Limpia el timeout cuando el componente se desmonte o el search cambie
  }, [search, users]); // Se ejecuta cuando el valor de 'search' cambia o cuando 'users' cambian

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Lista de Usuarios
      </Typography>
      
      {/* Contenedor para los filtros y botones */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Buscar por Nombre"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualiza el estado 'search' cuando cambia el campo de texto
          />
        </Grid>

        {/* Botones de acción para exportar */}
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            onClick={() => exportToPDF(filteredUsers)}
            disabled={filteredUsers.length === 0} // Deshabilitar si no hay usuarios
          >
            Descargar PDF
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            onClick={() => exportToExcel(filteredUsers)}
            disabled={filteredUsers.length === 0} // Deshabilitar si no hay usuarios
          >
            Descargar Excel
          </Button>
        </Grid>
      </Grid>

      {/* Indicador de carga mientras se procesan los filtros */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <UserList users={filteredUsers} /> // Muestra la lista de usuarios filtrados
      )}
    </Box>
  );
};

// Esta función obtiene los datos de los usuarios de forma estática en el momento de la construcción de la página
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users'); // Obtiene la lista de usuarios desde una API externa
  const users = await res.json(); // Convierte la respuesta a formato JSON

  return {
    props: {
      users, // Pasa los usuarios como propiedad al componente
    },
    revalidate: 60, // Revalida los datos cada 60 segundos
  };
};

// Exporta el componente principal para que sea utilizado por Next.js
export default Page;