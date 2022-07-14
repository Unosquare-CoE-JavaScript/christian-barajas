using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;
using Services.API.Library.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.API.Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IMongoRepository<AuthorEntity> _authorGenericRepository;

        public AuthorController(IMongoRepository<AuthorEntity> authorGenericRepository)
        {
            this._authorGenericRepository = authorGenericRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorEntity>>> GetAllAuthors()
        {
            var results = await this._authorGenericRepository.GetAll();

            return Ok(results);
        }

        [HttpGet("{AuthorId}")]
        public async Task<ActionResult<AuthorEntity>> GetAuthorById(string AuthorId)
        {
            var result = await this._authorGenericRepository.GetById(AuthorId);

            return Ok(result);
        }

        [HttpPost]
        public async Task Post(AuthorEntity request)
        {
            await this._authorGenericRepository.InsertDocument(request);
        }

        [HttpPut("{AuthorId}")]
        public async Task Put(string AuthorId, AuthorEntity request)
        {
            request.Id = AuthorId;
            await this._authorGenericRepository.UpdateDocument(request);
        }

        [HttpDelete("{AuthorId}")]
        public async Task Delete(string AuthorId)
        {
            await this._authorGenericRepository.DeleteById(AuthorId);
        }

        [HttpPost("Query")]
        public async Task<ActionResult<PaginationEntity<AuthorEntity>>> QueryPagination(PaginationEntity<AuthorEntity> request)
        {
            return await this._authorGenericRepository.PaginationBy(
                filter => filter.Name == request.Filter,
                request);
        }
        [HttpPost("QueryByItem")]
        public async Task<ActionResult<PaginationEntity<AuthorEntity>>> QueryByItemPagination(PaginationEntity<AuthorEntity> request)
        {
            return await this._authorGenericRepository.PaginationByFilter(request);
        }
    }
}
