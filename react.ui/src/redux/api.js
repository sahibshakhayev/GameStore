import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gameStoreApi = createApi({
  reducerPath: 'gameStoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7017/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().account.accessToken;
      console.log(token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
})