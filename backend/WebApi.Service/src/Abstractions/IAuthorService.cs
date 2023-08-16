using WebApi.Core;

namespace WebApi.Service;

public interface IAuthorService : IBaseService<Author, AuthorReadDto, AuthorCreateUpdateDto, AuthorCreateUpdateDto> { }