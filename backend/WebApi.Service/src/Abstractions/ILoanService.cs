using WebApi.Core;

namespace WebApi.Service;

public interface ILoanService : IBaseService<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto> { }