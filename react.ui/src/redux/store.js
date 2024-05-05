import { configureStore } from '@reduxjs/toolkit'
import { gameStoreApi } from "./api"
import { setupListeners } from '@reduxjs/toolkit/query'
import accountSlice from "./accountSlice"

let applicationStore = configureStore({
    reducer:{
        account: accountSlice,
        [gameStoreApi.reducerPath]: gameStoreApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameStoreApi.middleware)
})

setupListeners(applicationStore.dispatch);

export default applicationStore;