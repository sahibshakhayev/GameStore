using System;
using AutoMapper;
using SahibGameStore.Application.Interfaces;
using SahibGameStore.Domain.Interfaces.Repositories;
using SahibGameStore.Application.Commands;
using Flunt.Notifications;
using SahibGameStore.Domain.ValueObjects;
using SahibGameStore.Domain.Entities;
using SahibGameStore.Application.ViewModels;
using Application.Interfaces;
using System.Text;
using System.Net.Mail;

namespace SahibGameStore.Application.Services
{
    public class OrderServices : Notifiable<Notification>, IOrderServices
    {
        private IUnitOfWork _unit;
        private IMapper _mapper;
        private IEmailServices _emailServices;
        public OrderServices(IUnitOfWork unit, IMapper mapper, IEmailServices emailServices)
        {
            _unit = unit;
            _mapper = mapper;
            _emailServices = emailServices;
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
            Email email = new Email(command.Email);

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

            var html = new StringBuilder();
            html.AppendLine("<h1>Your order in Game Store</h1>");
            html.AppendLine("<div>");
            html.AppendFormat("<p>User ID: {0}</p>", order.UserId);
            html.AppendFormat("<p>Form of Payment: {0}</p>", order.FormOfPayment.Number);
            html.AppendFormat("<p>Address: {0}</p>", order.Address);
            html.AppendLine("</div>");


            html.Append("<table>");
            html.Append("<thead>");
            html.Append("<tr>");
            html.Append("<th>Product ID</th>");
            html.Append("<th>Product Name</th>");
            html.Append("<th>Quantity</th>");
            html.Append("<th>Price</th>");
            html.Append("</tr>");
            html.Append("</thead>");
            html.Append("<tbody>");

            foreach (var cartItem in order.ShoppingCart.ListOfItems)
            {
                html.Append("<tr>");
                html.Append("<td>" + cartItem.ProductId + "</td>");
                html.Append("<td>" + cartItem.Product.Name + "</td>");
                html.Append("<td>" + cartItem.Quantity + "</td>");
                html.Append("<td>" + cartItem.ItemPrice + "</td>");
                html.Append("</tr>");
            }

            html.Append("</tbody>");
            html.Append("</table>");


            var htmlString = html.ToString();


            var renderer = new ChromePdfRenderer();

            var pdf = renderer.RenderHtmlAsPdf(htmlString);
          
            pdf.SaveAs("Order_" + order.Id+".pdf");





            MailMessage mailMessage = new MailMessage();

            byte[] reader = { };
            mailMessage.IsBodyHtml = true;
            mailMessage.From = new MailAddress("game-store@outlook.com");
            mailMessage.Subject = "Your Game Store Order";
            mailMessage.Body = "Please Find The Attachment";
            mailMessage.IsBodyHtml = true;
            mailMessage.Attachments.Add(new Attachment("Order_" + order.Id + ".pdf"));
            mailMessage.To.Add(new MailAddress(command.Email));

            await _emailServices.SendEmailRawAsync(command.Email, "Your Order", mailMessage);



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