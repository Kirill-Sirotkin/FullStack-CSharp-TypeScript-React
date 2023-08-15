using WebApi.Core;

namespace WebApi.Service;

public class BaseService<T, TReadDto, TCreateDto, TUpdateDto> : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
    private readonly IRepository<T> _baseRepository;
    protected readonly IMapper<T, TReadDto, TCreateDto> _mapper;

    public BaseService(IRepository<T> baseRepo, IMapper<T, TReadDto, TCreateDto> mapper)
    {
        _baseRepository = baseRepo;
        _mapper = mapper;
    }

    public Task<TReadDto> Create(TCreateDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
    {
        throw new NotImplementedException();
    }

    public Task<TReadDto> GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<TReadDto> Update(Guid id, TUpdateDto updated)
    {
        throw new NotImplementedException();
    }
}