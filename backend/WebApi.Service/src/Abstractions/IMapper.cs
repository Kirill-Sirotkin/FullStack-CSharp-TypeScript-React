namespace WebApi.Service;

public interface IMapper<T, TReadDto, TCreateDto> // add update later
{
    public TReadDto MapToRead(T user);
    public T MapFromCreate(TCreateDto user);
}