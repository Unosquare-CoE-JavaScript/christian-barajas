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
    public class BooksController : ControllerBase
    {
        private readonly IMongoRepository<BookEntity> _bookRepository;

        public BooksController(IMongoRepository<BookEntity> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpPost]
        public async Task Post(BookEntity request)
        {
            await _bookRepository.InsertDocument(request);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookEntity>>> Get()
        {
            return Ok(await _bookRepository.GetAll());
        }

        [HttpPost("Query")]
        public async Task<ActionResult<PaginationEntity<BookEntity>>> QueryPagination(PaginationEntity<BookEntity> request)
        {
            var results = await _bookRepository.PaginationByFilter(request);
            return Ok(results);
        }

        [HttpGet("{BookId}")]
        public async Task<ActionResult<BookEntity>> GetById(string BookId)
        {
            var result = await _bookRepository.GetById(BookId);
            return Ok(result);
        }
    }
}
