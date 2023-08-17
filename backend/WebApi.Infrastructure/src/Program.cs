using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using WebApi.Core;
using WebApi.Infrastructure;
using WebApi.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DatabaseContext>();

builder.Services
    .AddScoped<IAuthService, AuthService>()
    .AddScoped<IUserMapper, UserMapper>()
    .AddScoped<IUserRepository, UserRepository>()
    .AddScoped<IUserService, UserService>()
    .AddScoped<IBookMapper, BookMapper>()
    .AddScoped<IBookRepository, BookRepository>()
    .AddScoped<IBookService, BookService>()
    .AddScoped<IAuthorMapper, AuthorMapper>()
    .AddScoped<IAuthorRepository, AuthorRepository>()
    .AddScoped<IAuthorService, AuthorService>()
    .AddScoped<ILoanMapper, LoanMapper>()
    .AddScoped<ILoanRepository, LoanRepository>()
    .AddScoped<ILoanService, LoanService>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT in the following format: Bearer [token]"
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

var jwtSecret = builder.Configuration.GetValue<string>("JwtSecret");
if (jwtSecret is null) throw new Exception("No secret was found in appsettings");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "library-backend",
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret)),
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

