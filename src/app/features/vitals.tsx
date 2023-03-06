import { PayloadAction, createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getDatabase,  ref, set,  push,onValue} from "firebase/database";
import {app} from '../../firebase'
const db = getDatabase(app);






export interface Vital {
    by:string
    hospital:string,
    uid:string,
    bodyWeight: string,
    bodyTemperature:string,
    pulseRate:string,
    bloodPressure:string,
    respiratoryRate:string,
    timestamp:string,
}

export interface vitalsState {

    loading:'idle' | 'pending' | 'succeeded' | 'failed',
    error:string | null
}

const initialState:vitalsState = {

    loading:'idle',
    error:null
}

export const VitalSlice = createSlice({
    name: 'vitals',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(updateVitals.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending'
          }
        })
        builder.addCase(updateVitals.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
       
            state.loading = 'idle'
          }
        })
        builder.addCase(updateVitals.rejected, (state, action) => {
          if (state.loading === 'pending') {
            state.loading = 'idle'
            state.error = 'Error occured'
          }
        })
      },
})




export const updateVitals = createAsyncThunk('updateVitals', async (data:Vital) => {
    console.log(data)
    try {
        const postVitalRef = ref(db, `Records/${data.uid}/vitals`);

        
        const newPostRef = push(postVitalRef);
        set(newPostRef,data);

    } catch (error) {
        console.log(error)
        throw new Error()
    }
    
   
})


// export const {getUsers}  = BioSlice.actions
export  const updateVital = (state:RootState) => state.Complains
export default VitalSlice.reducer
