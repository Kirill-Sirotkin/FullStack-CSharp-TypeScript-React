namespace WebApi.Core;

public class Author : IdBase
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
    public string Biography
    {
        get => Biography;
        set { if (value.Length > 500) throw new Exception("Biography cannot be longer than 500 characters"); Biography = value; }
    }
}