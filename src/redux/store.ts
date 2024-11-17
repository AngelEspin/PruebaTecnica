// Este código configura el store de Redux para gestionar el estado de los usuarios en la aplicación.

//Importación para utilizar las herramientas de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';  
import usersReducer from './features/usersSlice';  
import { createSlice, PayloadAction } from '@reduxjs/toolkit';  

// Configuración del store con el reducer de usuarios
export const store = configureStore({
  reducer: {
    users: usersReducer,  // Reducer para manejar el estado de los usuarios
  },
});

// Definición del tipo 'Company' para la propiedad 'company' en 'User'
interface Company {
  name: string;
}

// Interfaz de 'User' que representa la estructura de datos de un usuario
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: Company;
}

// Interfaz para el estado de los usuarios
interface UsersState {
  users: User[];  
}

// Estado inicial del slice de usuarios
const initialState: UsersState = {
  users: [],  // Inicialmente no hay usuarios
};

// Definición del slice para manejar los usuarios
const usersSlice = createSlice({
  name: 'users',  // Nombre del slice
  initialState,  
  reducers: {
    // Acción para establecer los usuarios en el estado
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;  // Actualiza el estado con el payload
    },
  },
});

// Exporta la acción 'setUsers' para ser usada en otros archivos
export const { setUsers } = usersSlice.actions;

// Exporta el slice completo para ser usado en la configuración del store
export default usersSlice;

// Exporta tipos derivados del store para ser utilizados en toda la aplicación
export type RootState = ReturnType<typeof store.getState>;  // Tipo para acceder al estado
export type AppDispatch = typeof store.dispatch;  // Tipo para despachar acciones
