import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const backendURL = 'https://localhost:7017/api/'

export const registerUser = createAsyncThunk(
  'account/register',
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      await axios({
        method: 'post',
        url: `${backendURL}Account/Register`,
        data: {
          email,
          userName,
          password
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'account/login',
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `${backendURL}Account/Login`,
        data: {
          userName,
          password
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      }
      else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const accessToken = localStorage.getItem('accessToken')? localStorage.getItem('accessToken') : null

const initialState = {
  loading: false,
  userInfo: null,
  accessToken: accessToken,
  error: null,
  success: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.loading = false;
      state.userInfo = null;
      state.accessToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.accessToken = payload.accessToken;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
})

export const { logout, setCredentials } = accountSlice.actions
export default accountSlice.reducer