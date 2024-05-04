using Flunt.Notifications;
using SahibGameStore.Domain.Entities;
using System;
using System.Collections.Generic;

namespace SahibGameStore.Application.Commands
{
    public class FinishCreditCardOrderCommand
    {  
         public Guid ShoppingCartId { get; set; }

        public string CardHolderName { get; set; }
        public string CardNumber { get; set; }
      
        public string Payer {  get; set; }
        public DateTime PaidDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal Total { get; set; }
        public decimal TotalPaid { get; set; }

        public void Validate() { }
    }
}
