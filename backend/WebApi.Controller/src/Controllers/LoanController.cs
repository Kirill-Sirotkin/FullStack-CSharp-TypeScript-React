using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

[Authorize]
public class LoanController : LibraryControllerBase<Loan, LoanReadDto, LoanCreateUpdateDto, LoanCreateUpdateDto>
{
    public LoanController(ILoanService baseService) : base(baseService) { }

    [HttpPost]
    public override async Task<ActionResult<LoanReadDto>> Create([FromBody] LoanCreateUpdateDto dto)
    {
        var (idVerified, roleVerified) = VerificationService.VerifyIdAndRole(
            HttpContext.User.Identity as ClaimsIdentity,
            dto.UserId,
            new string[] { "Admin" }
        );

        if (!idVerified)
            if (!roleVerified) return StatusCode(403);
        return await base.Create(dto);
    }

    [HttpGet("{id:Guid}")]
    public override async Task<ActionResult<LoanReadDto>> GetById([FromRoute] Guid id)
    {
        var loan = await _baseService.GetById(id);
        var (idVerified, roleVerified) = VerificationService.VerifyIdAndRole(
            HttpContext.User.Identity as ClaimsIdentity,
            loan.UserId,
            new string[] { "Admin", "Librarian" }
        );

        if (!idVerified)
            if (!roleVerified) return StatusCode(403);

        return Ok(loan);
    }

    [Authorize(Roles = "Admin, Librarian")]
    [HttpGet]
    public override async Task<ActionResult<IEnumerable<LoanReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
    {
        return await base.GetAll(queryOptions);
    }

    [Authorize(Roles = "Admin, Librarian")]
    [HttpPatch("{id:Guid}")]
    public override async Task<ActionResult<LoanReadDto>> Update([FromRoute] Guid id, [FromBody] LoanCreateUpdateDto update)
    {
        return await base.Update(id, update);
    }

    [Authorize(Roles = "Admin, Librarian")]
    [HttpDelete("{id:Guid}")]
    public override async Task<ActionResult<bool>> Delete([FromRoute] Guid id)
    {
        return await base.Delete(id);
    }
}