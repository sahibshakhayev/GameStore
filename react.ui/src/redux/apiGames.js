import { gameStoreApi } from "./api"

export const gameApi = gameStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGames: builder.query({
        query: (args) => {
          const {pageIndex, pageSize, gSearch} = args;
          return {
            url: `Games`,
            params: { page_index: pageIndex, page_size: pageSize, search: gSearch}
        }},
    }),
    getBestratedGames: builder.query({
        query: () => `Games/bestrated`,
    }),
    getBestsellersGames: builder.query({
        query: () => `Games/bestsellers`,
    }),
    getByGenreGames: builder.query({
      query: (genreId) => `Games/listbygenre/${genreId}`,
    }),
    getByIdGames: builder.query({
      query: (gameId) => `Games/${gameId}`,
    })
  }),
  overrideExisting: false
})

export const { useGetAllGamesQuery, useGetBestratedGamesQuery, useGetBestsellersGamesQuery, useGetByGenreGamesQuery, useGetByIdGamesQuery } = gameApi

