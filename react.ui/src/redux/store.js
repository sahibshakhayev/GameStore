import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from "./reducerGames"
import gamesBestsellersSlice from "./reducerGamesBestsellers"
import gamesBestratedSlice from "./reducerGamesBestrated"

let applicationStore = configureStore({
    reducer:{
        games: gamesSlice,
        gamesBestsellers: gamesBestsellersSlice,
        gamesBestrated: gamesBestratedSlice
    }
})

export default applicationStore;