using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Core;

[Table("Users")]
public class User : IdBase
{
    public string FirstName
    {
        get => FirstName;
        set { if (value.Length > 20) throw new Exception("First name cannot be longer than 20 characters"); FirstName = value; }
    }
    public string LastName
    {
        get => LastName;
        set { if (value.Length > 30) throw new Exception("Last name cannot be longer than 20 characters"); LastName = value; }
    }
    public string Email
    {
        get => Email;
        set
        {
            int atIndex = value.IndexOf('@');
            int dotIndex = value.LastIndexOf('.');
            if (atIndex < 0) throw new Exception("Email must contain @ symbol");
            if (dotIndex < 0) throw new Exception("Email must contain . symbol followed by domain");
            if (dotIndex < atIndex) throw new Exception("Email must contain . symbol followed by domain after @ symbol");

            Email = value;
        }
    }
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