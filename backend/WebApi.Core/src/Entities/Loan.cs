namespace WebApi.Core;

public class Loan : IdBase
{
    public required User User { get; set; }
    public required Book Book { get; set; }
    public DateTime TakenDate { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? ReturnedDate { get; set; }
    public LoanStatus Status { get; set; }
}

public enum LoanStatus
{
    InProgress,
    Returned,
    Overdue
}