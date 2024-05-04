import { gameStoreApi } from "./api"

export const genreApi = gameStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGenres: builder.query({
        query: () => `Genres`,
    })
  }),
  overrideExisting: false
})

export const { useGetAllGenresQuery } = genreApi