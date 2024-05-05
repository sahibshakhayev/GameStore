import { gameStoreApi } from "./api"

export const accountApi = gameStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserClaims: builder.query({
      query: () => ({
        url: 'Account/UserClaims',
        method: 'GET',
      }),
    })
  }),
  overrideExisting: false
})

export const { useGetUserClaimsQuery } = accountApi

