using WebApi.Core;

namespace WebApi.Service;

public class LoanService : BaseService<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto>, ILoanService
{
    public LoanService(ILoanRepository loanRepo, ILoanMapper mapper) : base(loanRepo, mapper) { }
}