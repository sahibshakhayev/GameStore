using System;
using AutoMapper;
using SahibGameStore.Application.Interfaces;
using SahibGameStore.Domain.Interfaces.Repositories;
using SahibGameStore.Application.Commands;
using Flunt.Notifications;
using SahibGameStore.Domain.ValueObjects;
using SahibGameStore.Domain.Entities;
using SahibGameStore.Application.ViewModels;

namespace SahibGameStore.Application.Services
{
    public class OrderServices : Notifiable<Notification>, IOrderServices
    {
        private IUnitOfWork _unit;
        private IMapper _mapper;
        public OrderServices(IUnitOfWork unit, IMapper mapper)
        {
            _unit = unit;
            _mapper = mapper;
        }



        public async Task<IEnumerable<OrderListViewModel>> GetAllOrders()
        {

            return _mapper.Map<IEnumerable<OrderListViewModel>>(await _unit.Orders.GetAllAsync());
        }


        public async Task<IEnumerable<OrderListViewModel>> GetAllOrdersbyUser(Guid userId)
        {

            return _mapper.Map<IEnumerable<OrderListViewModel>>(await _unit.Orders.GetByUserIdAsync(userId));
        }


        public CommandResult CancelOrder(Guid orderId, Guid userId) { 
        
            var cancelStatus = _unit.Orders.CancelOrder(orderId);

            if (cancelStatus == 0)
            {
               return new CommandResult(true, "Order cancelled!");
            }
            return new CommandResult(false, "Order not found!");

        }
        public async Task<CommandResult> FinishCreditCardOrder(FinishCreditCardOrderCommand command, Guid UserId)
        {
            Email email = new Email(_unit.Users.GetById(UserId).Name);

            var payment = new CreditCardPayment(
               command.CardHolderName,
               command.CardNumber,
               command.PaidDate,
               command.ExpireDate,
               command.Total,
               command.TotalPaid,
               command.Payer,
               email);




            var cart = await _unit.Carts.GetCartByUserId(UserId);

            var order = new Order(UserId, cart, payment);

            order.AddNonconformity(payment, cart);

            if (order.IsInvalid)
            {
                return new CommandResult(false, "Can't finish the order request.");
            }

            _unit.Orders.CreateOrder(order);



            cart.Deactivate();

           _unit.Carts.Update(cart);

            _unit.SaveChanges();

            return new CommandResult(true, "Order finished with success.");
        }

        public async  Task<CommandResult> FinishPayPalOrder(FinishPayPalOrderCommand command, Guid UserId)
        {

            Email email = new Email(_unit.Users.GetById(UserId).Name);
            var payment = new PayPalPayment(
               command.TransactionCode,
               command.PaidDate,
               command.ExpireDate,
               command.Total,
               command.TotalPaid,
               command.Payer,
               email);


            var cart = await _unit.Carts.GetCartByUserId(UserId);

            var order = new Order(UserId, cart, payment);

            order.AddNonconformity(payment, cart);

            if (order.IsInvalid)
                return new CommandResult(false, "Can't finish the order request.");

            _unit.Orders.CreateOrder(order);


            cart.Deactivate();

            _unit.Carts.Update(cart);

            _unit.SaveChanges();


            return new CommandResult(true, "Order finished with success.");
        }
    }
}