﻿using SahibGameStore.Application.AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SahibGameStore.Infracstuture.Data.Context;
using SahibGameStore.Infracstuture.Injector;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Serilog;
using System.Text.Json.Serialization;
using static SahibGameStore.WebAPI.Extensions;

namespace SahibGameStore.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("AllowAllOrigins",
               builder =>
               {
                   builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
               }));

            services.AddAutoMapper(typeof(DomainToViewModelMappingProfile), typeof(DTOToDomainMappingProfile));

            
            services.AddDbContext<SahibGameStoreContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));



            services
               .AddAuthentication(options =>
               {
                   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

               })
               .AddJwtBearer(cfg =>
               {
                   cfg.RequireHttpsMetadata = false;
                   cfg.SaveToken = true;
                   cfg.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidIssuer = Configuration["JwtIssuer"],
                       ValidAudience = Configuration["JwtAudience"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                       ClockSkew = TimeSpan.Zero
                   };
               });

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<SahibGameStoreContext>()
                .AddDefaultTokenProviders();

            services.AddSingleton<IConfiguration>(Configuration);

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
           

            services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            ;




            services.AddSerilog();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Sahib Game Store", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme() { In = ParameterLocation.Header, Description = "Please insert JWT with Bearer into field", Name = "Authorization", Type = SecuritySchemeType.ApiKey });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                } });
    
            });

            RegisterServices(services);

            services.AddHttpContextAccessor();



            Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Information()
           .WriteTo.Console()
           .CreateLogger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.EnvironmentName == "Development")
            {
                app.UseDeveloperExceptionPage();
            }
           
            app.UseStaticFiles();
           

            app.UseCors("AllowAllOrigins");

            app.UseMiddleware<TokenBlacklistMiddleware>();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sahib Game Store");
            });
           
            app.UseAuthentication();

            app.UseRouting();




            app.UseAuthorization();

            app.UseSerilogRequestLogging();


           

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        public static void RegisterServices(IServiceCollection services)
        {
            Injection.RegisterServices(services);
        }
    }
}