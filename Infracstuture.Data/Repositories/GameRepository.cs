using SahibGameStore.Domain.Entities;
using SahibGameStore.Domain.Entities.ReleationshipEntities;
using SahibGameStore.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using SahibGameStore.Infracstuture.Data.Context;
using SahibGameStore.Infracstuture.Data.Repositories.Common;
using SahibGameStore.Domain.ValueObjects;
using System.Numerics;
using SahibGameStore.Domain;

namespace SahibGameStore.Infracstuture.Data.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        private SahibGameStoreContext _db;
        public GameRepository(SahibGameStoreContext db) : base(db)
        {
            _db = db;
        }

        public IEnumerable<Game> SearchByName(string search)
        {
            return _db.Games.Where(p => p.Name.Contains(search));
        }

        public async Task<IEnumerable<dynamic>> GetAllGamesWithDevelopersAsync()
        {
            var query = from game in _db.Games
                        select new { game };

            return await query.ToListAsync();
        }


        public async Task<IEnumerable<Game>> GetAllGamesFromThisGenreAsync(Guid genreId)
        {
            return await _db.Games
                      .Include(_ => _.GameDevelopers)
                      .ThenInclude(_ => _.Developer)
                      .Include(_ => _.GameGenres)
                      .ThenInclude(_ => _.Genre)
                      .Include(_ => _.GamePlatforms)
                      .ThenInclude(_ => _.Platform)
                      .Include(_ => _.GamePublishers)
                      .ThenInclude(_ => _.Publisher)
                      .Where(_ => _.GameGenres.Any(x => x.GenreId == genreId))
                      .ToListAsync();
        }

        public override async Task<IEnumerable<Game>> GetAllAsync()
        {
            return await _db.Games
                      .Include(_ => _.GameDevelopers)
                      .ThenInclude(_ => _.Developer)
                      .Include(_ => _.GameGenres)
                      .ThenInclude(_ => _.Genre)
                      .Include(_ => _.GamePlatforms)
                      .ThenInclude(_ => _.Platform)
                      .Include(_ => _.GamePublishers)
                      .ThenInclude(_ => _.Publisher)
                      .ToListAsync();
        }

        public override async Task<Game> GetByIdAsync(Guid id)
        {
            return await _db.Games
                      .Include(_ => _.GameDevelopers)
                      .ThenInclude(_ => _.Developer)
                      .Include(_ => _.GameGenres)
                      .ThenInclude(_ => _.Genre)
                      .Include(_ => _.GamePlatforms)
                      .ThenInclude(_ => _.Platform)
                      .Include(_ => _.GamePublishers)
                      .ThenInclude(_ => _.Publisher)
                      .Include(_ => _.Reviews)
                      .Where(_ => _.Id == id)
                      .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Game>> GetBestRatedGamesAsync()
        {
            var source = await _db.Games
                .Include(_ => _.Reviews).ToListAsync();

            return source.OrderByDescending(x => x.UsersScore).Take(5);
        }

        public async Task<IEnumerable<Game>> GetBestSellerGamesAsync()
        {

            var data = await _db.CartItems
                .Join(_db.ShoppingCarts, cartItem => cartItem.ShoppingCartId, cart => cart.Id, (cartItem, cart) => new { cartItem, cart })
                .Join(_db.Orders, combined => combined.cart, order => order.ShoppingCart, (combined, order) => combined.cartItem)
                .GroupBy(cartItem => cartItem.ProductId)
                .Select(group => new { ProductId = group.Key, Count = group.Count() })
                .Join(_db.Games, group => group.ProductId, game => game.Id, (group, game) => new { game, group.Count })
                .OrderByDescending(result => result.Count)
                .Select(result => result.game)
                .Take(5)
                .ToListAsync();
            return data;

        }

        //public async Task<IEnumerable<Game>> GetBestSellerGamesAsync()
        //{
        //    return await Task.Run(() =>
        //    {
        //        return (
        //        from cartItems in _db.CartItems
        //        join carts in _db.ShoppingCarts on cartItems.ShoppingCartId equals carts.Id
        //        join orders in _db.Orders on carts.Id equals orders.ShoppingCartId
        //        group cartItems by cartItems.ProductId into ctGroup
        //        let count = ctGroup.Count()
        //        join games in _db.Games on ctGroup.Key equals games.Id
        //        orderby count descending
        //        select games
        //        ).Take(5);
        //    });
        //}

        public override void Update(Game obj)
        {
            Game game = _db.Games.Include(_ => _.GameDevelopers)
                      .ThenInclude(_ => _.Developer)
                      .Include(_ => _.GameGenres)
                      .ThenInclude(_ => _.Genre)
                      .Include(_ => _.GamePlatforms)
                      .ThenInclude(_ => _.Platform)
                      .Include(_ => _.GamePublishers)
                      .ThenInclude(_ => _.Publisher).FirstOrDefault(x => x.Id == obj.Id);
            if (game is null)
                throw new ArgumentException();

            // var result = _db.GameDevelopers.FromSql($"SELECT FROM gameDevelopers WHERE GameId = {obj.Id}").ToList();

            game.ChangeName(obj.Name);
            game.ChangePrice(obj.Price);
            game.ChangeReleaseDate(obj.ReleaseDate);
            game.ChangeDescription(obj.Description);
            game.ChangeShortDescription(obj.ShortDescription);
            game.ChangeDevelopersList(obj.GameDevelopers);
            game.ChangePublishersList(obj.GamePublishers);
            game.ChangeGenresList(obj.GameGenres);
            game.ChangePlatformsList(obj.GamePlatforms);
            _db.SaveChanges();
        }

        public async Task<GameOverview> GetOverview(Guid gameId)
        {
            return await _db.GamesOverview.Where(x => x.GameId == gameId).FirstOrDefaultAsync();
        }

        public async Task AddOrUpdateOverview(GameOverview gameOverview)
        {
            var go = await GetOverview(gameOverview.GameId);

            if (go is null)
                _db.GamesOverview.Add(gameOverview);
            else
                go.changeHtml(gameOverview.Html);

            _db.SaveChanges();
        }

        public async Task<PaginatedList<Game>> GetPaginatedAll(int pageIndex, int pageSize, string search, Filtrate filtrate)
        {
           



            var games = await _db.Games.Where(p => p.Name.Contains(search)).Where(p => p.Price >= filtrate.minPrice && p.Price <= filtrate.maxPrice)
            .Where(p => !String.IsNullOrEmpty(filtrate.CompanyId.ToString()) ? (p.GameDevelopers.FirstOrDefault(d => d.GameId == p.Id && d.DeveloperId == filtrate.CompanyId) != null) || (p.GamePublishers.FirstOrDefault(d => d.GameId == p.Id && d.PublisherId == filtrate.CompanyId) != null) : true)
            .Where(p => !String.IsNullOrEmpty(filtrate.PlatformId.ToString()) ? (p.GamePlatforms.FirstOrDefault(pl => pl.GameId == p.Id && pl.PlatformId == filtrate.PlatformId) != null) : true)
            .Where(p => !String.IsNullOrEmpty(filtrate.CompanyId.ToString()) ? (p.GameGenres.FirstOrDefault(g => g.GameId == p.Id && g.GenreId == filtrate.GenreId) != null) : true)
            .OrderBy(b => b.Id)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize).Include(_ => _.GameDevelopers)
                      .ThenInclude(_ => _.Developer)
                      .Include(_ => _.GameGenres)
                      .ThenInclude(_ => _.Genre)
                      .Include(_ => _.GamePlatforms)
                      .ThenInclude(_ => _.Platform)
                      .Include(_ => _.GamePublishers)
                      .ThenInclude(_ => _.Publisher)
            .ToListAsync();




            var count = await _db.Games.CountAsync();
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedList<Game>(games, pageIndex, totalPages);
        }


       


    }
}