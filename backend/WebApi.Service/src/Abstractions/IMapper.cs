namespace WebApi.Service;

public interface IMapper<T, TReadDto, TCreateDto, TUpdateDto>
{
    public TReadDto MapToRead(T entity);
    public T MapFromCreate(TCreateDto entityCreate);
    public T MapFromUpdate(T previousEntity, TUpdateDto entityUpdate);
}