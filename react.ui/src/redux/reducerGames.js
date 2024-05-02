import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGames = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const res = await fetch("https://localhost:7017/api/Games");
        const data = await res.json();
        return data;
    }
)

const gamesSlice = createSlice({
    name:'games',
    initialState: {
        dataArray: [],
        addingInfo: ' ',
        isLoading: false,
        error: null
    },
    reducers:{
        addingData: (state, action) => {
            return { ...state, addingInfo: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.pending, (state) => {
          state.isLoading = true;
        })
        builder.addCase(fetchGames.fulfilled, (state, action) => {
          state.dataArray = action.payload;
          state.isLoading = false;
        })
        builder.addCase(fetchGames.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
    }
})

export const { addingData } =  gamesSlice.actions

export default gamesSlice.reducer