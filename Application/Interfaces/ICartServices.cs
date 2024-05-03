using SahibGameStore.Application.DTOS.Cart;
using SahibGameStore.Application.ViewModels;
using SahibGameStore.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace SahibGameStore.Application.Interfaces
{
    public interface ICartServices
    {

        Task<ShoppingCartViewModel> GetUserCart(Guid userId);
        Task AddItemToCart(CartItemDTO item, Guid userId);
        Task RemoveItemFromCart(CartItemDTO item, Guid UserId);

        Task SetItemQuantity(CartItemDTO item, Guid UserId, int newQuantity);


    }
}
