using WebApi.Core;

namespace WebApi.Service;

public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{

    Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
    Task<TReadDto> GetById(Guid id);
    Task<TReadDto> Update(Guid id, TUpdateDto updated);
    Task<bool> Delete(Guid id);
    Task<TReadDto> Create(TCreateDto dto);
}