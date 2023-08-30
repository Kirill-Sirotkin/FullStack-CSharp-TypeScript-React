using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class BaseRepository<T> : IRepository<T> where T : IdBase
{
    private readonly DbSet<T> _dbSet;
    protected readonly DatabaseContext _context;
    public BaseRepository(DatabaseContext dbContext)
    {
        _dbSet = dbContext.Set<T>();
        _context = dbContext;
    }

    public virtual async Task<T> Create(T newEntity)
    {
        await _dbSet.AddAsync(newEntity);
        await _context.SaveChangesAsync();
        return newEntity;
    }

    public virtual async Task<bool> Delete(Guid id)
    {
        var entity = await GetById(id);
        if (entity is null) return false;
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public virtual async Task<IEnumerable<T>> GetAll(QueryOptions options)
    {
        var collection = await _dbSet.ToArrayAsync();
        return GetCollectionWithOptions(options, collection);
    }

    public virtual async Task<T?> GetById(Guid id)
    {
        return await _dbSet.AsNoTracking().FirstOrDefaultAsync(entity => entity.Id == id);
    }

    public virtual async Task<T> Update(T updatedEntity)
    {
        _dbSet.Update(updatedEntity);
        await _context.SaveChangesAsync();
        return updatedEntity;
    }

    protected virtual IEnumerable<T> GetCollectionWithOptions(QueryOptions options, IEnumerable<T> collection)
    {
        switch (options.Order)
        {
            case "UdpatedAt":
                collection = options.OrderByDescending ?
                    collection.OrderByDescending(obj => obj.UpdatedAt) :
                    collection.OrderBy(obj => obj.UpdatedAt);
                break;
            case "CreatedAt":
                collection = options.OrderByDescending ?
                    collection.OrderByDescending(obj => obj.CreatedAt) :
                    collection.OrderBy(obj => obj.CreatedAt);
                break;
            case "Id":
                collection = options.OrderByDescending ?
                    collection.OrderByDescending(obj => obj.Id) :
                    collection.OrderBy(obj => obj.Id);
                break;
            default:
                collection = options.OrderByDescending ?
                    collection.OrderByDescending(obj => obj.UpdatedAt) :
                    collection.OrderBy(obj => obj.UpdatedAt);
                break;
        }
        int sliceStart = (options.PageNumber - 1) * options.PerPage;
        int sliceEnd = options.PageNumber * options.PerPage - 1;

        if (sliceStart < 0) sliceStart = 0;
        if (sliceStart >= collection.Count()) sliceStart = collection.Count() - 1;
        if (sliceEnd < 0) sliceEnd = 0;
        if (sliceEnd >= collection.Count()) sliceEnd = collection.Count() - 1;
        if (sliceStart > sliceEnd) sliceStart = sliceEnd;

        Console.WriteLine($"START: {sliceStart}");
        Console.WriteLine($"END: {sliceEnd}");

        return collection.Skip(sliceStart).Take(sliceEnd - sliceStart + 1);
    }
}