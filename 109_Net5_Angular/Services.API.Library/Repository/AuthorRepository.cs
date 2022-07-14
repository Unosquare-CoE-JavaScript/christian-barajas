using MongoDB.Driver;
using Services.API.Library.Core.Entities;
using Services.API.Library.Core.MongoDBCtx;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.API.Library.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly IAuthorContext _authorCtx;
        public AuthorRepository(IAuthorContext authorContext)
        {
            this._authorCtx = authorContext;
        }

        public async Task<IEnumerable<Author>> GetAuthors()
        {
            return await this._authorCtx.Authors.Find(_ => true).ToListAsync();
        }
    }
}
