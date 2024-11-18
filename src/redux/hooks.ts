// Encapsular la lógica específica del estado en funciones reutilizables
import { useState } from 'react';
import { User, UserComplete } from '../redux/components/types'; // Define un tipo de User o impórtalo desde donde corresponda

// Hook para manejar el estado del modal
export const useUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<UserComplete | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user: UserComplete) => {
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