using WebApi.Core;

namespace WebApi.Service;

public interface IBookService : IBaseService<Book, BookReadDto, BookCreateUpdateDto, BookCreateUpdateDto> { }