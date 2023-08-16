using WebApi.Core;

namespace WebApi.Service;

public interface ILoanMapper : IMapper<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto> { }