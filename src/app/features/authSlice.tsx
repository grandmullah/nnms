import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
    hospital:string,
    role:string
}

const initialState:AuthState = {
    hospital:'',
    role:''
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth:(state,action:PayloadAction<AuthState>) =>{
            state.hospital = action.payload.hospital
            state.role= action.payload.role
        }
    }
})

export const {updateAuth}  = AuthSlice.actions
export  const selectAuth = (state:RootState) => state.Auth
export default AuthSlice.reducer