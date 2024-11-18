// Importa tipos y funciones necesarias de Next.js, React, Material-UI y funciones personalizadas.
import { GetStaticProps } from 'next'; // Importa GetStaticProps para la obtención de datos en el lado del servidor
import { useState } from 'react'; // Importa useState para manejar el estado en el componente
import { TextField, Button, Box, Grid, Typography } from '@mui/material'; // Importa componentes de Material-UI para la interfaz
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
  
  // Filtra la lista de usuarios en función del valor de búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) // Compara el nombre del usuario (sin importar mayúsculas/minúsculas)
  );

  return (
    <Box sx={{ padding: 3 }}> {/* Contenedor principal con padding */}
      <Typography variant="h3" gutterBottom color="primary"> {/* Título principal de la página */}
        Lista de Usuarios
      </Typography>
      <Grid container spacing={2} alignItems="center"> {/* Contenedor para los filtros y botones */}
        <Grid item xs={12} md={8}> {/* Campo de búsqueda que ocupa el 8 de 12 espacios en pantallas medianas y más grandes */}
          <TextField
            fullWidth
            label="Buscar por Nombre" // Etiqueta del campo de búsqueda
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)} // Actualiza el estado 'search' cuando cambia el campo de texto
          />
        </Grid>
        <Grid item xs={12} md={2}> {/* Botón para exportar los usuarios filtrados a PDF */}
          <Button variant="contained" onClick={() => exportToPDF(filteredUsers)}>
            Descargar PDF
          </Button>
        </Grid>
        <Grid item xs={12} md={2}> {/* Botón para exportar los usuarios filtrados a Excel */}
          <Button variant="contained" onClick={() => exportToExcel(filteredUsers)}>
            Descargar Excel
          </Button>
        </Grid>
      </Grid>
      {/* Muestra la lista de usuarios filtrados */}
      <UserList users={filteredUsers} />
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
    revalidate: 60, // Revalida los datos cada 60 segundos (esto permite que los datos se actualicen de forma periódica)
  };
};

// Exporta el componente principal para que sea utilizado por Next.js
export default Page;