import { PayloadAction, createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getDatabase,  ref, set,  push,onValue} from "firebase/database";
import {app} from '../../firebase'
const db = getDatabase(app);






export interface complain {
    by:string
    hospital:string,
    uid:string,
    complain:string,
    timestamp:string,
}

export interface complainsState {

    loading:'idle' | 'pending' | 'succeeded' | 'failed',
    error:string | null
}

const initialState:complainsState = {

    loading:'idle',
    error:null
}

export const ComplainsSlice = createSlice({
    name: 'bio',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(updateComplains.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending'
          }
        })
        builder.addCase(updateComplains.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
       
            state.loading = 'idle'
          }
        })
        builder.addCase(updateComplains.rejected, (state, action) => {
          if (state.loading === 'pending') {
            state.loading = 'idle'
            state.error = 'Error occured'
          }
        })
      },
})




export const updateComplains = createAsyncThunk('updateComplains', async (data:complain) => {
    try {
        const postComplainRef = ref(db, `Records/${data.uid}/complains`);

        
        const newPostRef = push(postComplainRef);
        set(newPostRef,data);

    } catch (error) {
        console.log(error)
        throw new Error()
    }
    
   
})


// export const {getUsers}  = BioSlice.actions
export  const updateComplain = (state:RootState) => state.Complains
export default ComplainsSlice.reducer
