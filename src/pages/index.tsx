// Importa tipos y funciones necesarias
import { useState, useEffect } from 'react'; // useState y useEffect para manejar estados locales y efectos
import { TextField, Button, Box, Grid, Typography, CircularProgress } from '@mui/material'; // Material-UI para UI
import { exportToPDF, exportToExcel } from '../utils/exportData';
import UserList from '../redux/components/UserList';
import { useSelector, useDispatch } from 'react-redux'; // Redux para manejar estado global
import { setUsers } from '../redux/features/usersSlice'; // Importa la acción para manejar los usuarios
import { RootState } from '../redux/store'; // Importa el estado raíz para tipado
import { GetStaticProps } from 'next'; // Para obtener datos en el servidor
import { User } from '../redux/components/types'; 

// Componente principal de la página
const Page = ({ initialUsers }: { initialUsers: User[] }) => {
  const dispatch = useDispatch();

  // Obtiene los usuarios del estado global
  const users = useSelector((state: RootState) => state.users.users);

  // Inicializa el estado local para la búsqueda y los usuarios filtrados
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Despacha los usuarios iniciales al estado global al cargar la página
  useEffect(() => {
    dispatch(setUsers(initialUsers)); // Establece los usuarios iniciales en Redux
  }, [initialUsers, dispatch]);

  // Filtra los usuarios en base al campo de búsqueda
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered); // Actualiza los usuarios filtrados
      setLoading(false);
    }, 300); // Añade un debounce de 300 ms para optimizar la búsqueda
    return () => clearTimeout(timeoutId);
  }, [search, users]); // Ejecuta el efecto cuando cambian 'search' o 'users'

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Lista de Usuarios
      </Typography>

      {/* Contenedor de filtros y botones */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Buscar por Nombre"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        {/* Botones de acción */}
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            onClick={() => exportToPDF(filteredUsers)}
            disabled={filteredUsers.length === 0}
          >
            Descargar PDF
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            onClick={() => exportToExcel(filteredUsers)}
            disabled={filteredUsers.length === 0}
          >
            Descargar Excel
          </Button>
        </Grid>
      </Grid>

      {/* Indicador de carga o lista de usuarios */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <UserList users={filteredUsers} />
      )}
    </Box>
  );
};

// Obtiene los usuarios desde una API y los pasa como prop inicial
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const initialUsers = await res.json();

  return {
    props: {
      initialUsers, // Pasa los usuarios como propiedad inicial
    },
    revalidate: 60, // Revalida los datos cada 60 segundos
  };
};

// Exporta el componente principal
export default Page;