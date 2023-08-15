using Microsoft.EntityFrameworkCore;
using WebApi.Core;

namespace WebApi.Infrastructure;

public class BaseRepository<T> : IRepository<T> where T : IdBase
{
    private readonly DbSet<T> _dbSet;
    private readonly DatabaseContext _context;
    public BaseRepository(DatabaseContext dbContext)
    {
        _dbSet = dbContext.Set<T>();
        _context = dbContext;
    }

    public async Task<T> Create(T newEntity)
    {
        await _dbSet.AddAsync(newEntity);
        await _context.SaveChangesAsync();
        return newEntity;
    }

    public async Task<bool> Delete(Guid id)
    {
        var entity = await GetById(id);
        if (entity is null) return false;
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<T>> GetAll(QueryOptions options)
    {
        return await _dbSet.ToArrayAsync();
    }

    public async Task<T?> GetById(Guid id)
    {
        return await _dbSet.AsNoTracking().FirstOrDefaultAsync(entity => entity.Id == id);
    }

    public async Task<T> Update(T updatedEntity)
    {
        _dbSet.Update(updatedEntity);
        await _context.SaveChangesAsync();
        return updatedEntity;
    }
}