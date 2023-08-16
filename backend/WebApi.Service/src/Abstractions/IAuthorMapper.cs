using WebApi.Core;

namespace WebApi.Service;

public interface IAuthorMapper : IMapper<Author, AuthorReadDto, AuthorCreateUpdateDto, AuthorCreateUpdateDto> { }