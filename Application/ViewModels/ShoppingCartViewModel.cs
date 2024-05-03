using SahibGameStore.Domain.Entities.Common;
using SahibGameStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SahibGameStore.Domain.Entities.ReleationshipEntities;

namespace SahibGameStore.Application.ViewModels
{
    public class ShoppingCartViewModel
    {

        public Guid Id { get; set; }    

        public Guid UserId { get; set; }

        private ICollection<CartItem> ListOfItems { get; set; }




        public IEnumerable<dynamic> Items { get {

                return  ListOfItems.Select(i => new
                {
                    Id = i.ProductId,
                    Name = i.Product.Name,
                    Quantity = i.Quantity 



                });
            
            
            
            
            } }






    }
}
