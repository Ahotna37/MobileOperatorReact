using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.ViewModel;

namespace MOApi.Controllers
{
    /// <summary>
    /// контроллер тарифов
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TariffController : Controller
    {
        private readonly MOContext _context;
        public TariffController(MOContext context)
        {
            _context = context;

        }
        /// <summary>
        /// получение всех тарифов
        /// </summary>
        [HttpGet]
        public IEnumerable<TariffPlan> GetAll()
        {
            return _context.TariffPlans;
        }
        /// <summary>
        /// получение тарифа подключенного к определенному клиенту
        /// </summary>
        [HttpGet("user/{idClient}")]
        public async Task<IActionResult> GetTariffForPhysOrLegal([FromRoute] string idClient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await  _context.Clients.Where(i => i.Id == idClient).FirstOrDefaultAsync();
            var conTar = await _context.ConnectTariffs.Where(i => i.DateConnectTariffEnd == null && i.IdClient == client.Id).FirstOrDefaultAsync();
            var tar = await _context.TariffPlans.Where(i => i.IsPhysTar == client.IsPhysCl && i.Id == conTar.IdTariffPlan).ToListAsync();
            
            if (tar == null)
            {
                return NotFound();
            }
            return Ok(tar);
        }


        [HttpGet("{idTariff}")]
        public async Task<IActionResult> GetTariffById([FromRoute] int idTariff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tar = await _context.TariffPlans.Where(i => i.Id == idTariff).FirstOrDefaultAsync();

            if (tar == null)
            {
                return NotFound();
            }
            return Ok(tar);
        }


    /// <summary>
    /// создание тарифа
    /// </summary>
    [HttpPost]
        public async Task<IActionResult> CreateNewTariff([FromBody] TariffPlan tar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.TariffPlans.Add(tar);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTariff", new { id = tar.Id }, tar);
        }
        /// <summary>
        /// изменение тарифа
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTariff([FromRoute] int id, [FromBody] TariffPlan tar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.TariffPlans.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            //блок перезаписи данных
            item.Name = tar.Name;
            item.CanConnectThisTar = tar.CanConnectThisTar;
            item.CostChangeTar = tar.CostChangeTar;
            item.CostOneMinCallCity = tar.CostOneMinCallCity;
            item.CostOneMinCallInternation = tar.CostOneMinCallInternation;
            item.CostOneMinCallOutCity = tar.CostOneMinCallOutCity;
            item.CostSms = tar.CostSms;
            item.FreeMinuteForMonth = tar.FreeMinuteForMonth;
            item.IntGb = tar.IntGb;
            item.IsPhysTar = tar.IsPhysTar;
            item.SubcriptionFee = tar.SubcriptionFee;
            _context.TariffPlans.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// удаление тарифа
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTariff([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.TariffPlans.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.TariffPlans.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
