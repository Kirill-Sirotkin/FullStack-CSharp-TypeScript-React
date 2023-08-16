using WebApi.Core;

namespace WebApi.Service;

public interface IBookMapper : IMapper<Book, BookReadDto, BookCreateUpdateDto, BookCreateUpdateDto> { }