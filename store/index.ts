import { configureStore } from '@reduxjs/toolkit'
import groupsReducer from './groupsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      groups: groupsReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

