// Encapsular la lógica específica del estado en funciones reutilizables
import { useState } from 'react';
import { User } from '../components/types'; // Define un tipo de User o impórtalo desde donde corresponda

// Hook para manejar el estado del modal
export const useUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return {
    selectedUser,
    isModalOpen,
    openModal,
    closeModal,
  };
};