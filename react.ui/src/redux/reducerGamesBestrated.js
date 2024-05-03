import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGamesBr = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const res = await fetch("https://localhost:7017/api/Games/bestrated");
        const data = await res.json();
        return data;
    }
)

const gamesBestratedSlice = createSlice({
    name:'gamesBestrated',
    initialState: {
        dataArray: [],
        addingInfo: ' ',
        isLoading: false,
        error: null
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGamesBr.pending, (state) => {
          state.isLoading = true;
        })
        builder.addCase(fetchGamesBr.fulfilled, (state, action) => {
          state.dataArray = action.payload;
          state.isLoading = false;
        })
        builder.addCase(fetchGamesBr.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
    }
})

export default gamesBestratedSlice.reducer