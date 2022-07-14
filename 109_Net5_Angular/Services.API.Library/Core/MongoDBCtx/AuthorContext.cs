using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Core.MongoDBCtx
{
    public class AuthorContext : IAuthorContext
    {
        private readonly IMongoDatabase _db;
        public AuthorContext(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Author> Authors => _db.GetCollection<Author>("Autor");
    }
}
