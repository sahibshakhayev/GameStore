using System;
using SahibGameStore.Application.Commands;
using SahibGameStore.Application.ViewModels;

namespace SahibGameStore.Application.Interfaces
{
    public interface IOrderServices
    {
        Task<IEnumerable<OrderListViewModel>> GetAllOrders();


        Task<IEnumerable<OrderListViewModel>> GetAllOrdersbyUser(Guid userId);


        CommandResult CancelOrder(Guid orderId, Guid userId);
       Task<CommandResult> FinishCreditCardOrder (FinishCreditCardOrderCommand order, Guid UserId);
        Task<CommandResult> FinishPayPalOrder (FinishPayPalOrderCommand order, Guid UserId);
    }
}