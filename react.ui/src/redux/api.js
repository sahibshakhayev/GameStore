import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gameStoreApi = createApi({
  reducerPath: 'gameStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7017/api/' }),
  endpoints: () => ({})
})