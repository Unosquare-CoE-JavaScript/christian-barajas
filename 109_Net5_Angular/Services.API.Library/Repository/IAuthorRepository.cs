using Services.API.Library.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.API.Library.Repository
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAuthors();
    }
}
