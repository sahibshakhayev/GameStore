using Flunt.Notifications;
using SahibGameStore.Domain.Entities;
using System;
using System.Collections.Generic;

namespace SahibGameStore.Application.Commands
{
    public class FinishPayPalOrderCommand
    {
        public Guid ShoppingCartId { get; set; }

        public string TransactionCode { get; set; }
        public string PaymentNumber { get; set; }
        public DateTime PaidDate { get; set; }

        public string Payer { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal Total { get; set; }
        public decimal TotalPaid { get; set; }
        public string PayerEmail { get; set; }

        public void Validate() { }
    }
}
