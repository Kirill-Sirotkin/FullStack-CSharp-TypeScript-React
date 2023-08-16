using WebApi.Core;

namespace WebApi.Service;

public class BookService : BaseService<Book, BookReadDto, BookCreateUpdateDto, BookCreateUpdateDto>, IBookService
{
    public BookService(IBookRepository bookRepo, IBookMapper mapper) : base(bookRepo, mapper) { }
}