import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface IAuthState {
  isAuth: boolean;
  jid: string;
}

const initialState: IAuthState = {
  isAuth: false,
  jid: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setJid: (state, action: PayloadAction<string>) => {
      state.jid = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth.isAuth;
export const selectJid = (state: RootState) => state.auth.jid;

export const { setAuth, setJid } = authSlice.actions;

export const authReducer = authSlice.reducer;
