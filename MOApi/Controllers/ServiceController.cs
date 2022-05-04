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
    /// контроллер Дополнительных услуг
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : Controller
    {

        private readonly MOContext _context;
        public ServiceController(MOContext context)
        {
            _context = context;

        }
        /// <summary>
        /// получение всех тарифов
        /// </summary>
        [HttpGet]
        public IEnumerable<ExtraService> GetAll()
        {
            return _context.ExtraServices;
        }
        /// <summary>
        /// гет запрос для получения услуги по его id
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ser = await _context.ExtraServices.SingleOrDefaultAsync(i => i.Id == id);
            if (ser == null)
            {
                return NotFound();
            }
            return Ok(ser);
        }
        /// <summary>
        /// запрос на создание новой услуги
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateNewService([FromBody] ExtraService service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.ExtraServices.Add(service);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetExtraService", new { id = service.Id }, service);
        }

        /// <summary>
        /// добавление новой услуги клиенту
        /// </summary>
        [HttpPost]
        [Route("connectnewser")]
        public async Task<IActionResult> AddServiceForClient([FromBody] ServiceViewModel serVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await _context.Clients.Where(i => i.Id == serVM.idClient).FirstOrDefaultAsync();
        var newSer = await _context.ExtraServices.Where(i => i.Name == serVM.Name).FirstOrDefaultAsync();
            if (client.Balance < newSer.SubscFee)
            {
                return BadRequest("Недостаточно средств, пополните баланс");
            }
                _context.ConnectServices.Add(new ConnectService()
            {
                DateConnectBegin = DateTime.Now,
                DateConnectEnd = DateTime.Now,
                IdClient = serVM.idClient,
                IdExtraService = newSer.Id
            });
            
            //_context.TariffPlans.Add(tarVM);
            switch (serVM.Name)
            {
                case "Пакет минут":
                    {
                        if (client.Balance >= 100)
                        {
                            client.Balance = client.Balance - 100;
                            client.FreeMin = client.FreeMin + 100;
                        }
                        break;
                    }
                case "Пакет интернета":
                    {
                        if (client.Balance >= 100)
                        {
                            client.Balance = client.Balance - 100;
                            client.FreeGb = client.FreeGb + 2;
                        }
                        break;
                    }
                case "Пакет смс":
                    {
                        if (client.Balance >= 50)
                        {
                            client.Balance = client.Balance - 50;
                            client.FreeSms = client.FreeSms + 50;
                        }
                        break;
                    }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        ///изменение услуги
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService([FromRoute] int id, [FromBody] ExtraService service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.ExtraServices.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            //блок перезаписи данных
            item.Name = service.Name;
            item.SubscFee = service.SubscFee;
            item.Description = service.Description;
            item.CanConnectThisSer = service.CanConnectThisSer;
            _context.ExtraServices.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// удаление услуги
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.ExtraServices.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.ExtraServices.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("servicestats")]
        public async Task<IActionResult> ServiceStats()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var services = await _context.ExtraServices.ToListAsync();
            var connects = await _context.ConnectServices.ToListAsync();
            List<Stats> stats = new List<Stats>();
            foreach (var ser in services)
            {
                var item = _context.ConnectServices.Where(i => i.IdExtraService == ser.Id).Count();
                /*var item = _context.ConnectTariffs.Where(i=>i.DateConnectTariffEnd==null).GroupBy(i => i.IdTariffPlan == tar.Id).Count();*/
                stats.Add(new Stats() { name = ser.Name, value = item });
            }
            return Ok(stats);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
