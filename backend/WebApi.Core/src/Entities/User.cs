using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Core;

[Table("Users")]
public class User : IdBase
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public Role UserRole { get; set; }
    public required string PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}

public enum Role
{
    Admin,      // Rights to edit books and users
    Librarian,  // Rights to edit books
    Customer    // Right to borrow books
}