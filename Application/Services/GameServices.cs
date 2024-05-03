using System;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using SahibGameStore.Application.Interfaces;
using SahibGameStore.Application.ViewModels;
using SahibGameStore.Domain.Interfaces.Repositories;
using System.Threading.Tasks;
using SahibGameStore.Domain.Entities;
using SahibGameStore.Application.DTOS.Games;
using SahibGameStore.Domain.ValueObjects;
using SahibGameStore.Application.Commands;
using SahibGameStore.Domain;

namespace SahibGameStore.Application.Services
{
    public class GameServices : IGameServices
    {
        private IUnitOfWork _unit;
        private IMapper _mapper;
        public GameServices(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }

        public async Task<IEnumerable<dynamic>> GetAllGamesWithDevelopersAsync()
        {
            return await _unit.Games.GetAllGamesWithDevelopersAsync();
        }

        public async Task<IEnumerable<GameListViewModel>> GetAllGames()
        {
            return _mapper.Map<IEnumerable<GameListViewModel>>(await _unit.Games.GetAllAsync());
        }

        public async Task<GameViewModel> GetGameById(Guid gameId)
        {
            return _mapper.Map<GameViewModel>(await _unit.Games.GetByIdAsync(gameId));
        }

        public async Task<IEnumerable<GameListViewModel>> GetGamesByGenre(Guid genreId)
        {
            return _mapper.Map<IEnumerable<GameListViewModel>>(await _unit.Games.GetAllGamesFromThisGenreAsync(genreId));
        }

        public Guid InsertGame(AddOrUpdateGameDTO gamevm)
        {
            return _unit.Games.Add(_mapper.Map<Game>(gamevm));
        }
        public void UpdateGame(AddOrUpdateGameDTO gamevm)
        {
            _unit.Games.Update(_mapper.Map<Game>(gamevm));
        }
        public void DeleteGame(Guid id)
        {
            _unit.Games.Remove(id);
        }

        public async Task<IEnumerable<GameListViewModel>> GetBestRatedGames()
        {
            return _mapper.Map<IEnumerable<GameListViewModel>>(await _unit.Games.GetBestRatedGamesAsync());
        }

        public async Task<IEnumerable<GameListViewModel>> GetBestSellerGames()
        {
            return _mapper.Map<IEnumerable<GameListViewModel>>(await _unit.Games.GetBestSellerGamesAsync());
        }

        public async Task UpdateThumbImage(Guid id, string path)
        {
            var game = await _unit.Games.GetByIdAsync(id);
            game.ChangeThumbImagePath(path);
            _unit.Games.Update(game);
        }

        public async Task AddOrUpdateOverview(AddOrUpdateGameOverviewDTO model)
        {
            await _unit.Games.AddOrUpdateOverview(_mapper.Map<GameOverview>(model));
        }

        public async Task<dynamic> GetOverview(Guid id)
        {
            return await _unit.Games.GetOverview(id);
        }

        public async Task<PaginatedList<GameListViewModel>> GetAllGamesPaginated(int page_index, int page_size, string search, Filtrate filtrate)
        {
            return _mapper.Map<PaginatedList<GameListViewModel>>(await _unit.Games.GetPaginatedAll(page_index, page_size,search, filtrate));
        }
    }
}