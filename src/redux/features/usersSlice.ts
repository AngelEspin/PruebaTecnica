// Maneja el estado global de los usuarios utilizando Redux. 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserComplete, User } from '../components/types';


// Interfaz para el estado de los usuarios
interface UsersState {
  users: User[];  // Arreglo con usuarios básicos (solo los datos requeridos)
  completeUsers: UserComplete[];  // Arreglo con usuarios completos (datos adicionales)
}

// Estado inicial del slice de usuarios
const initialState: UsersState = {
  users: [],
  completeUsers: [],
};

// Definición del slice para manejar los usuarios
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Acción para establecer los usuarios con datos básicos
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    // Acción para establecer los usuarios con información completa
    setCompleteUsers: (state, action: PayloadAction<UserComplete[]>) => {
      state.completeUsers = action.payload;
    },
  },
});

// Exporta las acciones para ser usadas en otros archivos
export const { setUsers, setCompleteUsers } = usersSlice.actions;

// Exporta el reducer del slice
export default usersSlice.reducer;