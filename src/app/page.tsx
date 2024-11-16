// src/app/layout.tsx o src/app/page.tsx (dependiendo de tu configuración)

'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Asegúrate de que la ruta sea correcta
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/features/usersSlice';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

const Page = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [search, setSearch] = useState('');

  // Fetch users from the API when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      dispatch(setUsers(data)); // Dispatch the action to store users in Redux
    };
    fetchData();
  }, [dispatch]);

  // Filter users based on the search query
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  // Function to handle Excel export
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  // Function to handle PDF export
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Lista de Usuarios', 20, 20);
    filteredUsers.forEach((user, index) => {
      doc.text(`${user.name} - ${user.email} - ${user.phone} - ${user.company.name}`, 20, 30 + index * 10);
    });
    doc.save('usuarios.pdf');
  };

  return (
    <Provider store={store}>  {/* Wrapping the component with Redux Provider */}
      <div>
        <h1>Lista de Usuarios</h1>

        {/* Search Bar */}
        <TextField
          label="Buscar por Nombre"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />

        {/* Buttons for downloading reports */}
        <Button variant="contained" onClick={downloadExcel}>Descargar Excel</Button>
        <Button variant="contained" onClick={downloadPDF}>Descargar PDF</Button>

        {/* Table to display users */}
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
      </div>
    </Provider> 
  );
};

export default Page;