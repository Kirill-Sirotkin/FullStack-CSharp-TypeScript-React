using WebApi.Core;

namespace WebApi.Service;

public class LoanReadDto
{
    public Guid Id { get; init; }
    public required Guid UserId { get; set; }
    public required Guid BookId { get; set; }
    public DateTime TakenDate { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? ReturnedDate { get; set; }
    public LoanStatus Status { get; set; }
}

public class LoanCreateUpdateDto
{
    public required Guid UserId { get; set; }
    public required Guid BookId { get; set; }
    public DateTime TakenDate { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? ReturnedDate { get; set; }
    public LoanStatus Status { get; set; }
}