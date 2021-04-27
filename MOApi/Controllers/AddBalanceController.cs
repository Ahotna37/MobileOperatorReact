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
    /// контроллер пополнения баланса
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AddBalanceController : Controller
    {
        private readonly MOContext _context;
        public AddBalanceController(MOContext context)
        {
            _context = context;

        }
        /// <summary>
        /// гет запрос для получения всех пополнений стредств
        /// </summary>
        [HttpGet]
        public IEnumerable<AddBalance> GetAll()
        {
            return _context.AddBalances;
        }
        /// <summary>
        /// гет запрос для получения пополнения средств по его id
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddBalanceItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var addBalance = await _context.AddBalances.SingleOrDefaultAsync(i => i.Id == id);
            if (addBalance == null)
            {
                return NotFound();
            }
            return Ok(addBalance);
        }
        /// <summary>
        /// пост запрос на добавление в бд новое пополнение средств
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateNewAddBalance([FromBody] AddBalance addBalance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await _context.Clients.Where(i => i.Id == addBalance.IdClient).FirstOrDefaultAsync();
            client.Balance = client.Balance + addBalance.SumForAdd;
            _context.AddBalances.Add(addBalance);

            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// апдейт запрос для изменнения пополнения средств
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClientBalanse([FromRoute] int id, [FromBody] AddBalance addBalance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.AddBalances.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            //блок перезаписи данных
            item.SumForAdd = addBalance.SumForAdd;
            item.PhoneNumberForAddBalance = addBalance.PhoneNumberForAddBalance;
            item.NumberBankCard = addBalance.NumberBankCard;
            item.NameBankCard = addBalance.NameBankCard;
            item.DateBankCard = addBalance.DateBankCard;
            item.CvvbankCard = addBalance.CvvbankCard;
            item.DateBankCard = addBalance.DateBankCard;
            _context.AddBalances.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
