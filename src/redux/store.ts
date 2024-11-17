// store.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice'; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: Company;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice; 

// Esto permite que el store sea utilizado en toda la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;