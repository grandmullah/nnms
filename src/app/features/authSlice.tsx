import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
    hospital:string,
    role:string,
    name:string
}

const initialState:AuthState = {
    hospital:'',
    role:'',
    name:''
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth:(state,action:PayloadAction<AuthState>) =>{
            state.hospital = action.payload.hospital
            state.role= action.payload.role
            state.name= action.payload.name
        }
    }
})

export const {updateAuth}  = AuthSlice.actions
export  const selectAuth = (state:RootState) => state.Auth
export default AuthSlice.reducer