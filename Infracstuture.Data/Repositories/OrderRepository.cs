using System.Linq;
using SahibGameStore.Infracstuture.Data.Context;
using SahibGameStore.Domain.Entities;
using SahibGameStore.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace SahibGameStore.Infracstuture.Data.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private SahibGameStoreContext _db;
        public OrderRepository(SahibGameStoreContext db)
        {
            _db = db;
        }


        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _db.Orders.Include(_ => _.ShoppingCart).ThenInclude(sc => sc.ListOfItems).ThenInclude(ci => ci.Product).Include(py => py.FormOfPayment).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetByUserIdAsync(Guid id)
        {
            return await _db.Orders.Include(_ => _.ShoppingCart).ThenInclude(sc => sc.ListOfItems).ThenInclude(ci => ci.Product).Include(py => py.FormOfPayment).Where(_ => _.UserId == id).ToListAsync();
        }

        public int CancelOrder(Guid orderId)
        {
            var order = _db.Orders.Include(_ => _.ShoppingCart).ThenInclude(sc => sc.ListOfItems).ThenInclude(ci => ci.Product).FirstOrDefault(o => o.Id == orderId);

            if (order != null)
            {
                order.Deactivate();

                foreach (var item in order.ShoppingCart.ListOfItems)
                {
                    var p = _db.Games.FirstOrDefault(g => g.Id == item.Product.Id);

                    if(p != null)
                    {
                        p.ChangeAvailableQuantity(p.AvailableQuantity + item.Quantity);
                        _db.Games.Update(p);
                    }
                }
                _db.Orders.Update(order);
                _db.SaveChanges();
                return 0;
            }
            return 1;



        }

        public void CreateOrder(Order order)
        {
            _db.Orders.Add(order);
            _db.SaveChanges();
        }

        public void FinishOrder(Order order)
        {
    
            order.Deactivate();
        }
    }
}