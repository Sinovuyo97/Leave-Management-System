using LeaveManagementSystem.BL.Interfaces;
using LeaveManagementSystem.DA;
using LeaveManagementSystem.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace LeaveManagementSystem.Infrustructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DatabaseContext _databaseContext;
        public Repository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public async Task AddAsync(TEntity entity)
        {
            await _databaseContext.Set<TEntity>().AddAsync(entity);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _databaseContext.Set<TEntity>().FindAsync(id);
            _databaseContext.Set<TEntity>().Remove(entity);
            await _databaseContext.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            _databaseContext.Entry(entity).State = EntityState.Modified;
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            var entity = await _databaseContext.Set<TEntity>().FindAsync(id);
            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> ListAsync()
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<TEntity>().AsEnumerable();
            });
        }

        public virtual async Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<TEntity>().Where(expression)
                    .AsNoTracking().AsEnumerable();
            });
        }

        public async Task<IList<TEntity>> GetPagedListAsync(int skip, int take)
        {
            return await _databaseContext
                .Set<TEntity>()
                .Skip(skip * take)
                .Take(take)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<TEntity> QueryAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await _databaseContext
                .Set<TEntity>().Where(expression).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
