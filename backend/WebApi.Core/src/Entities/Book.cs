using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Core;

[Table("Books")]
public class Book : IdBase
{
    public string Title
    {
        get => Title;
        set { if (value.Length > 20) throw new Exception("Title cannot be longer than 20 characters"); Title = value; }
    }
    public string Isbn
    {
        get => Isbn;
        set
        {
            if (value.Length != 13) throw new Exception("ISBN must be 13 digits long");
            if (!value.All(char.IsDigit)) throw new Exception("ISBN must contain only digits");
            Isbn = value;
        }
    }
    public DateTime PublishedDate
    {
        get => PublishedDate;
        set => PublishedDate = value;
    }
    public Guid AuthorId
    {
        get;
        set;
    }
    public string Description
    {
        get => Description;
        set { if (value.Length > 500) throw new Exception("Description cannot be longer than 500 characters"); Description = value; }
    }
    public int Quantity
    {
        get => Quantity;
        set { if (Quantity < 0) throw new Exception("Cannot have negative book quantity"); Quantity = value; }
    }
}