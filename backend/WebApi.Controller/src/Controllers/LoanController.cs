using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

public class LoanController : LibraryControllerBase<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto>
{
    public LoanController(ILoanService baseService) : base(baseService) { }
}