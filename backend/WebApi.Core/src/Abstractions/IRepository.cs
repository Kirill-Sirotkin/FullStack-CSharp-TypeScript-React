namespace WebApi.Core;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAll(QueryOptions options);
    Task<T?> GetById(Guid id);
    Task<T> Update(T updatedEntity);
    Task<bool> Delete(Guid id);
    Task<T> Create(T newEntity);
}