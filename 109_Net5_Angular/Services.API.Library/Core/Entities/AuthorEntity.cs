using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
    [BsonCollection("Autor")]
    public class AuthorEntity : Document
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("fullName")]
        public string FullName { get; set; }

        [BsonElement("academicDegree")]
        public string AcademicDegree { get; set; }

    }
}
