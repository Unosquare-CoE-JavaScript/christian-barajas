using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Services.API.Library.Core.Entities
{
    [BsonCollection("Book")]
    public class BookEntity : Document
    {
        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        public int Price { get; set; }

        [BsonElement("publishDate")]
        public DateTime? PublishDate { get; set; }

        [BsonElement("author")]
        public AuthorEntity Author{ get; set; }
    }
}
