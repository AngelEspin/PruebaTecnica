import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { useUserModal } from '../hooks'; // Importa el hook personalizado para manejar el modal
import { User } from './types'; // Importa el tipo User desde 'types.ts'

const modalStyle = {
  position: 'absolute' as 'absolute', // Establece la posición del modal
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Centra el modal en la pantalla
  width: 500,
  bgcolor: 'background.paper', // Fondo del modal
  boxShadow: 24, // Sombra del modal
  p: 4, // Padding del modal
  borderRadius: 2, // Bordes redondeados
};

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  const { selectedUser, isModalOpen, openModal, closeModal } = useUserModal(); // Usar el hook para gestionar el estado del modal

  if (users.length === 0) {
    return <p>No se encontraron usuarios.</p>; // Muestra un mensaje si no hay usuarios
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Compañía</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => openModal(user)}>
                    Ver detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para ver información completa */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          {selectedUser && ( // Muestra la información solo si hay un usuario seleccionado
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Información completa de {selectedUser.name}
              </Typography>
              <Typography><strong>ID:</strong> {selectedUser.id}</Typography>
              <Typography><strong>Nombre de usuario:</strong> {selectedUser.username}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Teléfono:</strong> {selectedUser.phone}</Typography>
              <Typography><strong>Sitio web:</strong> {selectedUser.website}</Typography>

              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                Dirección
              </Typography>
              <Typography>
                {selectedUser.address?.street}, {selectedUser.address?.suite}, {selectedUser.address?.city} -{' '}
                {selectedUser.address?.zipcode}
              </Typography>
              <Typography>
                <strong>Coordenadas:</strong> Latitud: {selectedUser.address?.geo.lat}, Longitud:{' '}
                {selectedUser.address?.geo.lng}
              </Typography>

              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
                Empresa
              </Typography>
              <Typography><strong>Nombre:</strong> {selectedUser.company.name}</Typography>
              <Typography><strong>Eslogan:</strong> {selectedUser.company.catchPhrase}</Typography>
              <Typography><strong>BS:</strong> {selectedUser.company.bs}</Typography>

              <Button variant="contained" color="primary" onClick={closeModal} sx={{ mt: 2 }}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserList;