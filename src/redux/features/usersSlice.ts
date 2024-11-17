import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export default usersSlice.reducer; 