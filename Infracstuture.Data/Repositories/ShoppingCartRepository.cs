using System;
using System.Linq;
using System.Threading.Tasks;
using SahibGameStore.Domain.Entities;
using SahibGameStore.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using SahibGameStore.Infracstuture.Data.Context;
using SahibGameStore.Infracstuture.Data.Repositories.Common;

namespace SahibGameStore.Infracstuture.Data.Repositories
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        private readonly SahibGameStoreContext _db;
        public ShoppingCartRepository(SahibGameStoreContext db) : base(db)
        {
            _db = db;
        }

        public ShoppingCart GetActiveShoppingCartByUserId(Guid userId)
        {
            return _db.ShoppingCarts.Where(_ => _.UserId == userId && _.Active).FirstOrDefault();
        }

        public override Guid Add(ShoppingCart cart)
        {
            if (_db.ShoppingCarts.Where(_ => _.Id == cart.Id && _.Active).Count() > 0)
                throw new Exception("There is already an active shopping cart for this user");
            else
                _db.Set<ShoppingCart>().Add(cart);

            _db.SaveChanges();
            return cart.Id;
        }

        public async Task<ShoppingCart> GetCartByUserId(Guid userId)
        {
            return await _db.ShoppingCarts.Where(_ => _.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task CreateCart(ShoppingCart cart)
        {
            _db.ShoppingCarts.Add(cart);
            await _db.SaveChangesAsync();
        }
    }
}