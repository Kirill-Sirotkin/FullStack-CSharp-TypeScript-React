using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace WebApi.Core;

public class DatabaseContext : DbContext
{
    private readonly IConfiguration _configuration;
    public DbSet<User>? Users { get; set; }
    public DbSet<Book>? Books { get; set; }
    public DbSet<Author>? Authors { get; set; }
    public DbSet<Loan>? Loans { get; set; }

    public DatabaseContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var builder = new NpgsqlDataSourceBuilder(_configuration.GetConnectionString("DefaultConnection"));
        builder.MapEnum<Role>();
        optionsBuilder.UseNpgsql(builder.Build());
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<Role>();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
    }
}