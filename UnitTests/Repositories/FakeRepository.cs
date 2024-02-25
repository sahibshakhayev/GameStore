using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SahibGameStore.Domain.Entities.Common;
using SahibGameStore.Domain.Interfaces.Repositories;

namespace SahibGameStore.UnitTests.Repositories
{
    public class FakeRepository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {

        public HashSet<TEntity> _entities = new HashSet<TEntity>();
        public void SaveChanges()
        {
            ChangesSaved = true;
        }

        public bool ChangesSaved { get; set; }

        public Guid Add(TEntity obj)
        {
            _entities.Add(obj);
            SaveChanges();

            return new Guid();
        }

        public async virtual Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await Task.Run(() =>
            {
                return _entities.ToList();
            });
        }

        public async virtual Task<TEntity> GetByIdAsync(Guid id)
        {
            return await Task.Run(() =>
            {
                return _entities.Where(x => x.Id == id).FirstOrDefault();
            });
        }
        public void Remove(Guid id)
        {
            var entity = GetById(id);
            _entities.Remove(entity);
            SaveChanges();
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return _entities.ToList();
        }

        public TEntity GetById(Guid id)
        {
            return _entities.Where(p => p.Id == id).FirstOrDefault();
        }

        public void Update(TEntity obj)
        {
            _entities.Remove(obj);
            _entities.Add(obj);
            SaveChanges();
        }
    }
}
