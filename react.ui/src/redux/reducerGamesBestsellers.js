import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGamesBs = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const res = await fetch("https://localhost:7017/api/Games/bestsellers");
        const data = await res.json();
        return data;
    }
)

const gamesBestsellersSlice = createSlice({
    name:'gamesBestsellers',
    initialState: {
        dataArray: [],
        addingInfo: ' ',
        isLoading: false,
        error: null
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGamesBs.pending, (state) => {
          state.isLoading = true;
        })
        builder.addCase(fetchGamesBs.fulfilled, (state, action) => {
          state.dataArray = action.payload;
          state.isLoading = false;
        })
        builder.addCase(fetchGamesBs.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
    }
})

export default gamesBestsellersSlice.reducer