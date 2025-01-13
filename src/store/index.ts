import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import groupsReducer from './groupsSlice'
import userReducer from './userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      groups: groupsReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

