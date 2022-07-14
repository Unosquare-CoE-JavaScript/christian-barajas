using MongoDB.Driver;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Core.MongoDBCtx
{
    public interface IAuthorContext
    {
        IMongoCollection<Author> Authors { get; }


    }
}
