using WebApi.Core;
using WebApi.Service;

namespace WebApi.Controller;

public class BookController : LibraryControllerBase<Book, BookReadDto, BookCreateUpdateDto, BookCreateUpdateDto>
{
    public BookController(IBookService baseService) : base(baseService) { }
}