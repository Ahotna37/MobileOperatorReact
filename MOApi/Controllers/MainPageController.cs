using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace MOApi.Controllers
{
    /// <summary>
    /// контроллер главной страницы
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MainPageController : Controller
    {
        private readonly MOContext _context;
        public MainPageController(MOContext context)
        {
            _context = context;

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await _context.Clients.SingleOrDefaultAsync(i => i.Id == id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }
    }
}
