import { PayloadAction, createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store'
import {app} from '../../firebase'

import { collection, query, where, getDocs,getFirestore } from "firebase/firestore";
const db = getFirestore(app);




export interface hospital  {
    label:string,
    value:string,
    description:string

}
export interface hospitals {
    hospitals:hospital[],
    loading:'idle' | 'pending' | 'succeeded' | 'failed',
    error:string | null
}
const initialState:hospitals = {
    hospitals:[],
    loading:'idle',
    error:''
    
}
export const HospitalSlice = createSlice({
    name: 'bio',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getHospitals.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending'
          }
        })
        builder.addCase(getHospitals.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
            state.hospitals = action.payload
            state.loading = 'idle'
          }
        })
        builder.addCase(getHospitals.rejected, (state, action) => {
          if (state.loading === 'pending') {
            state.loading = 'idle'
            state.error = 'Error occured'
          }
        })
      },
})
export const getHospitals = createAsyncThunk('getHospitals', async () => {
    const q = query(collection(db, "hospitals"));

    const querySnapshot = await getDocs(q);

    const {hospitals} = await processSnapshot(querySnapshot)
    return hospitals

})

async function processSnapshot(snapshot: { docs: any[]; }) {

    let hospitals:hospital[] = []
    // Map the snapshot to an array of promises
    const promises = snapshot.docs.map(async (doc) => {

        const hos:hospital = {
            label:await doc.data().name,
            value:await doc.id,
            description:await doc.data().description
        }
        hospitals.push(hos)

    });
  
    await Promise.all(promises);
    
  
    return { hospitals };
}

export  const selectHospitals = (state:RootState) => state.Hospitals
export default HospitalSlice.reducer