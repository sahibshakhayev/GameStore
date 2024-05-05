using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SahibGameStore.Domain.Entities.Common;
using System.Net.Mail;

namespace Application.Interfaces
{
    public interface IEmailServices
    {

        Task<object> SendEmailAsync(string email, string subject, string message);
        Task<object> SendEmailRawAsync(string email, string subject, MailMessage mailMessage);
    }
}
