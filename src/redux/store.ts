// Este archivo configura el store de Redux para gestionar el estado de los usuarios

import { configureStore } from '@reduxjs/toolkit';  
import usersReducer from './features/usersSlice';  
import { createSlice, PayloadAction } from '@reduxjs/toolkit';  
import { UserComplete, User } from '../redux/components/types';


// Configuración del store con el reducer de usuarios
export const store = configureStore({
  reducer: {
    users: usersReducer,  // Reducer para manejar el estado de los usuarios
  },
});



// Interfaz para el estado de los usuarios
interface UsersState {
  users: User[];  // Arreglo de usuarios con datos básicos
  completeUsers: UserComplete[];  // Arreglo con usuarios completos, incluyendo información adicional
}

// Estado inicial del slice de usuarios
const initialState: UsersState = {
  users: [],  // Inicialmente no hay usuarios con datos básicos
  completeUsers: [],  // Inicialmente no hay usuarios con información adicional
};



// Exporta tipos derivados del store para ser utilizados en toda la aplicación

export type RootState = ReturnType<typeof store.getState>;  // Tipo para acceder al estado
export type AppDispatch = typeof store.dispatch;  // Tipo para despachar acciones