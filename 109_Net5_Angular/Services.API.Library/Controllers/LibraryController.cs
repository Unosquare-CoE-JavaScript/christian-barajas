using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;
using Services.API.Library.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.API.Library.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMongoRepository<AuthorEntity> _authorGenericRepository;

        public LibraryController(IAuthorRepository authorRepository, IMongoRepository<AuthorEntity> authorGenericRepository)
        {
            this._authorRepository = authorRepository;
            this._authorGenericRepository = authorGenericRepository;
        }

        [HttpGet("Authors")] 
        public async Task<ActionResult<IEnumerable<Author>>> GetAllAuthors()
        {
            var results = await this._authorRepository.GetAuthors();

            return Ok(results);
        }

        [HttpGet("GenericAuthors")]
        public async Task<ActionResult<IEnumerable<AuthorEntity>>> GetAllGenericAuthors()
        {
            var results = await this._authorGenericRepository.GetAll();

            return Ok(results);
        }
    }
}
