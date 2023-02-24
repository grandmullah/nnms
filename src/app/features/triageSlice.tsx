import { PayloadAction, createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { doc, getDoc, getFirestore} from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app);

export interface user {
    id:string
}

// export interface Bio {

// }

export interface BioData {
    user:user,
    loading:'idle' | 'pending' | 'succeeded' | 'failed',
    error:string | null
}

const initialState:BioData = {
    user:{
        id:''
    },
    loading:'idle',
    error:null
}

export const BioSlice = createSlice({
    name: 'bio',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
          if (state.loading === 'idle') {
            state.loading = 'pending'
          }
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
          if (state.loading === 'pending') {
            state.user = action.payload
            state.loading = 'idle'
          }
        })
        builder.addCase(getUsers.rejected, (state, action) => {
          if (state.loading === 'pending') {
            state.loading = 'idle'
            state.error = 'Error occured'
          }
        })
      },
})



// const fetchUser = async ():Promise<user> => {
//     const docRef = doc(db, "patients", "1002");
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         return {
//             id:docSnap.data().id
//         }
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//         throw new Error()
//       }
// }

export const getUsers = createAsyncThunk('getUsers', async (id:string) => {
    const docRef = doc(db, "patients", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return {
            id:docSnap.data().id
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        throw new Error()
      }
   
})


// export const {getUsers}  = BioSlice.actions
export  const selectBio = (state:RootState) => state.Bio
export default BioSlice.reducer
