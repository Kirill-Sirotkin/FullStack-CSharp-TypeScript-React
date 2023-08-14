namespace WebApi.Core;

public class Loan : IdBase
{
    public required User User { get; set; }
    public required Book Book { get; set; }
    public DateTime TakenDate
    {
        get => TakenDate;
        set { if (value > DueDate || value > ReturnedDate) throw new Exception("Book cannot be taken before being due or returned"); }
    }
    public DateTime DueDate
    {
        get => DueDate;
        set { if (value < TakenDate) throw new Exception("Book cannot be due earlier than being taken"); }
    }
    public DateTime? ReturnedDate
    {
        get => ReturnedDate;
        set { if (value < TakenDate) throw new Exception("Book cannot be returned before being taken"); }
    }
    public LoanStatus Status { get; set; }
}

public enum LoanStatus
{
    InProgress,
    Returned,
    Overdue
}