import { gameStoreApi } from "./api"

export const platformsApi = gameStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlatforms: builder.query({
        query: () => `Platforms`,
    })
  }),
  overrideExisting: false
})

export const { useGetAllPlatformsQuery } = platformsApi