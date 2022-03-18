using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOApi.Controllers
{
    /// <summary>
    /// контроллер звонков клиентов
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CallController : Controller
    {
        private readonly MOContext _context;
        public CallController(MOContext context)
        {
            _context = context;

        }
        /// <summary>
        /// гет запрос для получения всех звонков
        /// </summary>
        [HttpGet]
        public IEnumerable<Call> GetAll()
        {
            /*            Call call = new Call() { CostCall = 123 };
                        List<Call> calls = new List<Call>();
                        calls.Add(call);
                        return calls;*/
            return _context.Calls;
        }
        /// <summary>
        /// гет запрос для получения звонков клиента
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCallForClient([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var calls = await _context.Calls.Where(i => i.IdClient == id).ToListAsync();
            //var call = await _context.Calls.SingleOrDefaultAsync(i => i.IdClient == idClient);
            if (calls == null)
            {
                return NotFound();
            }
            return Ok(calls);
        }
        /// <summary>
        /// пост запрос на создание новых звонков
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateNewCall([FromBody] Call call)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Calls.Add(call);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCall", new { id = call.Id }, call);
        }
        /// <summary>
        /// апдейт звонка
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCall([FromRoute] int id, [FromBody] Call call)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Calls.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            //блок перезаписи данных
            item.DateCall = call.DateCall;
            item.TimeTalk = call.TimeTalk;
            item.NumberWasCall = call.NumberWasCall;
            item.CallType = call.CallType;
            item.CostCall = call.CostCall;
            item.IncomingCall = call.IncomingCall;
            item.IdClient = call.IdClient;
            _context.Calls.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// удаление звонков
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCall([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Calls.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Calls.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
