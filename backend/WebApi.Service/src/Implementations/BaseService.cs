using WebApi.Core;

namespace WebApi.Service;

public class BaseService<T, TReadDto, TCreateDto, TUpdateDto> : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
    private readonly IRepository<T> _baseRepository;
    protected readonly IMapper<T, TReadDto, TCreateDto, TUpdateDto> _mapper;

    public BaseService(IRepository<T> baseRepo, IMapper<T, TReadDto, TCreateDto, TUpdateDto> mapper)
    {
        _baseRepository = baseRepo;
        _mapper = mapper;
    }

    public async Task<TReadDto> Create(TCreateDto dto)
    {
        return _mapper.MapToRead(await _baseRepository.Create(_mapper.MapFromCreate(dto)));
    }

    public async Task<bool> Delete(Guid id)
    {
        return await _baseRepository.Delete(id);
    }

    public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
    {
        var query = await _baseRepository.GetAll(queryOptions);
        var result = query.Select(entity => _mapper.MapToRead(entity));
        return result;
    }

    public async Task<TReadDto> GetById(Guid id)
    {
        var result = await _baseRepository.GetById(id);
        if (result is null) throw new Exception("Get by id: User not found");
        return _mapper.MapToRead(result);
    }

    public async Task<TReadDto> Update(Guid id, TUpdateDto updated)
    {
        var previousEntity = await _baseRepository.GetById(id);
        if (previousEntity is null) throw new Exception("Update: User not found");
        var newUserInfo = _mapper.MapFromUpdate(previousEntity, updated);
        await _baseRepository.Update(newUserInfo);
        return _mapper.MapToRead(newUserInfo);
    }
}