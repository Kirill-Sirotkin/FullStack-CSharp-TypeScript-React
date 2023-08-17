using Microsoft.AspNetCore.Authorization;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[Authorize(Roles = "Admin")]
public class LoanController : LibraryControllerBase<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto>
{
    public LoanController(ILoanService baseService) : base(baseService) { }
}