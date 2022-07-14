namespace Services.API.Security.Core.DTO
{
    public class UserDto
    {

        public string Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }

        public string JwtToken { get; set; }
    }
}
