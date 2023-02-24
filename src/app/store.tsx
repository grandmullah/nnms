import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import BioReducer from './features/triageSlice'

export const store = configureStore({
  reducer: {
    Auth:AuthReducer,
    Bio:BioReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch