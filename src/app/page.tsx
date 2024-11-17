'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Importamos el store de Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/features/usersSlice';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper, Box, Typography, Container } from '@mui/material'; // Importamos componentes de Material-UI
import * as XLSX from 'xlsx';  // Usamos SheetJS para exportar a Excel
import { jsPDF } from 'jspdf';  // Importamos jsPDF para la creación de PDFs
import 'jspdf-autotable';  // Importamos el plugin jsPDF AutoTable para manejar tablas en PDFs
import { UserOptions } from 'jspdf-autotable';

// Definimos una extensión para jsPDF que incluya autoTable
interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

// Importamos ThemeProvider y createTheme de Material-UI para personalizar el tema
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Creamos un tema personalizado para la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal del tema
    },
    secondary: {
      main: '#dc004e', // Color secundario del tema
    },
    background: {
      default: '#f4f6f8', // Fondo predeterminado más claro
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Fuente principal
  },
});

const Page = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users); // Obtenemos los usuarios desde el estado global
  const [search, setSearch] = useState(''); // Estado local para manejar la búsqueda por nombre

  useEffect(() => {
    // Fetch data de la API cuando el componente se monta
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      dispatch(setUsers(data)); // Guardamos los usuarios en el estado global
    };
    fetchData(); // Llamamos a la función para obtener los datos
  }, [dispatch]);

  // Filtramos los usuarios por nombre
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  // Función para exportar los datos a Excel usando SheetJS
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);  // Convertimos los usuarios a una hoja de Excel
    const wb = XLSX.utils.book_new();  // Creamos un nuevo libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');  // Añadimos la hoja al libro
    XLSX.writeFile(wb, 'usuarios.xlsx');  // Generamos el archivo Excel
  };

  // Función para exportar los datos a PDF usando jsPDF
  const downloadPDF = () => {
    const doc = new jsPDF() as jsPDFCustom;  // Creamos un documento PDF usando jsPDF
    doc.text('Lista de Usuarios', 14, 10);  // Añadimos un título al PDF

    // Definimos las columnas y los datos para la tabla
    const columns = ['ID', 'Nombre', 'Correo', 'Teléfono', 'Compañía'];
    const rows = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.company.name
    ]);

    // Añadimos una tabla al documento PDF con los datos
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20, // Configuramos el espacio desde el que empieza la tabla
    });

    doc.save('usuarios.pdf');  // Guardamos el archivo PDF
  };

  return (
    <ThemeProvider theme={theme}> {/* Aplicamos el tema personalizado */}
      <Provider store={store}>  {/* Proveemos el store de Redux */}
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
          <Box mb={4}>
            <Typography variant="h3" color="primary" align="center">Lista de Usuarios</Typography>
          </Box>

          {/* Barra de búsqueda */}
          <TextField
            label="Buscar por Nombre"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearch(e.target.value)}  // Actualizamos el estado de búsqueda
            margin="normal"
          />

          {/* Botones para exportar a Excel y PDF */}
          <Box mb={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={downloadExcel}>Descargar Excel</Button>
            <Button variant="contained" color="secondary" onClick={downloadPDF}>Descargar PDF</Button>
          </Box>

          {/* Tabla de usuarios */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Compañía</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Provider>
    </ThemeProvider>
  );
};

export default Page;