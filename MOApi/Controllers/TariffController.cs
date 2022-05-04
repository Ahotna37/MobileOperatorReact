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
        /// получение тарифов для физ лиц
        /// </summary>
        [HttpGet("listtar/{idClient}")]
        public async Task<IActionResult> GetTariffForAllPhysOrLegal([FromRoute] string idClient)
      {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await _context.Clients.Where(i => i.Id == idClient).FirstOrDefaultAsync();
            var tar = await _context.TariffPlans.Where(i => i.IsPhysTar == client.IsPhysCl).ToListAsync();

            if (tar == null)
            {
                return NotFound();
            }
            return Ok(tar);
        }
        /// <summary>
        /// получение тарифа подключенного к определенному клиенту
        /// </summary>
        [HttpGet("user/{idClient}")]
        public async Task<IActionResult> GetTariffForClient([FromRoute] string idClient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await  _context.Clients.Where(i => i.Id == idClient).FirstOrDefaultAsync();
            var conTar = await _context.ConnectTariffs.Where(i => i.DateConnectTariffEnd == null && i.IdClient == client.Id).FirstOrDefaultAsync();
            var tar = await _context.TariffPlans.Where(i => i.IsPhysTar == client.IsPhysCl && i.Id == conTar.IdTariffPlan).FirstOrDefaultAsync();
            
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
        [HttpPost("create")]
        //[Route("api/tariff")]
        public async Task<IActionResult> CreateNewTariff([FromBody] TariffPlan tar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var allTar = _context.TariffPlans.ToList();
            foreach (var tarOld in allTar)
            {
                if (tar.Name == tarOld.Name)
                {
                    return BadRequest("Тариф уже существует");
                }
            }
            _context.TariffPlans.Add(tar);
            await _context.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// добавление новой услуги клиенту
        /// </summary>
        [HttpPost("connecttar/{idClient}")]
        public async Task<IActionResult> AddTariffForClient([FromRoute] string idClient, [FromBody] int tarId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var oldConn = _context.ConnectTariffs.Where(i => i.IdClient == tarVM.idClient && i.DateConnectTariffEnd == null).FirstOrDefault();
            //oldConn.DateConnectTariffEnd = DateTime.Now;
            var client = await _context.Clients.Where(i => i.Id == idClient).FirstOrDefaultAsync();
            var newTar = await _context.TariffPlans.Where(i => i.Id == tarId).FirstOrDefaultAsync();
            if(client.Balance < newTar.CostChangeTar)
            {
                return BadRequest("Недостаточно средств");
            }
            client.Balance -= newTar.CostChangeTar;
            var oldTarConnect = await _context.ConnectTariffs.Where(i => i.IdClient == idClient & i.DateConnectTariffEnd == null).FirstOrDefaultAsync();
            oldTarConnect.DateConnectTariffEnd = DateTime.Now;
            _context.ConnectTariffs.Add(new ConnectTariff()
            {
                IdClient = idClient,
                DateConnectTariffBegin = DateTime.Now,
                DateConnectTariffEnd = null,
                IdTariffPlan = tarId
            });
            client.FreeMin = newTar.FreeMinuteForMonth;
            client.FreeGb = newTar.IntGb;
            client.FreeSms = newTar.Sms;
            //_context.TariffPlans.Add(tarVM);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public async Task<IActionResult> ConnectTarForClientCreatedInStartup(string loginClient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var oldConn = _context.ConnectTariffs.Where(i => i.IdClient == tarVM.idClient && i.DateConnectTariffEnd == null).FirstOrDefault();
            //oldConn.DateConnectTariffEnd = DateTime.Now;
            var newTar = await _context.TariffPlans.Where(i => i.Id == 1).FirstOrDefaultAsync();//физ лицо
            //var newTar = await _context.TariffPlans.Where(i => i.Id == 1).FirstOrDefaultAsync();//юр лицо
            var client = await _context.Clients.Where(i => i.PhoneNumber == loginClient).FirstOrDefaultAsync();
            //oldTarConnect.DateConnectTariffEnd = DateTime.Now;
            _context.ConnectTariffs.Add(new ConnectTariff()
            {
                IdClient = client.Id,
                DateConnectTariffBegin = DateTime.Now,
                DateConnectTariffEnd = null,
                IdTariffPlan = newTar.Id
            });
            //_context.TariffPlans.Add(tarVM);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// изменение тарифа
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTariff([FromRoute] int id, [FromBody] TariffViewModel tar)
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
            item.Name = tar.name;
            item.CanConnectThisTar = tar.canConnectThisTar;
            item.CostChangeTar = tar.costChangeTar;
            item.CostOneMinCallCity = tar.costOneMinCallCity;
            item.CostOneMinCallInternation = tar.costOneMinCallInternation;
            item.CostOneMinCallOutCity = tar.costOneMinCallOutCity;
            item.CostSms = tar.costSms;
            item.FreeMinuteForMonth = tar.freeMinuteForMonth;
            item.IntGb = tar.intGb;
            item.IsPhysTar = tar.isPhysTar;
            item.SubcriptionFee = tar.subcriptionFee;
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
        [HttpGet("tariffstats")]
        public async Task<IActionResult> TariffStats()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tariffs = await _context.TariffPlans.ToListAsync();
            var connects = await _context.ConnectTariffs.ToListAsync();
            List<Stats> stats = new List<Stats>();
            foreach (var tar in tariffs)
            {
                var item = _context.ConnectTariffs.Where(i => i.IdTariffPlan == tar.Id).Count();
                /*var item = _context.ConnectTariffs.Where(i=>i.DateConnectTariffEnd==null).GroupBy(i => i.IdTariffPlan == tar.Id).Count();*/
                stats.Add(new Stats() { name = tar.Name, value = item });
            }
            return Ok(stats);
        }
        [HttpGet("tariffstatsnow")]
        public async Task<IActionResult> TariffStatsNow()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tariffs = await _context.TariffPlans.ToListAsync();
            var connects = await _context.ConnectTariffs.ToListAsync();
            List<Stats> stats = new List<Stats>();
            foreach (var tar in tariffs)
            {
                var item = _context.ConnectTariffs.Where(i => i.DateConnectTariffEnd == null).Where(i => i.IdTariffPlan == tar.Id).Count();
                stats.Add(new Stats() { name = tar.Name, value = item });
            }
            return Ok(stats);
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
