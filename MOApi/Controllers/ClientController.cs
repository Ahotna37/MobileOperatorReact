using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using DAL.Interfaces;
using DAL.Repository;

namespace MOApi.Controllers
{
    /// <summary>
    /// контроллер клиента
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : Controller
    {
        private readonly MOContext _context;
        private readonly IRepositoryClient repositoryClient;
        public ClientController(MOContext context)
        {
            _context = context;
            repositoryClient = new ClientRepository(context);
        }
        /// <summary>
        /// гет запрос для получения всех клиентов
        /// </summary>
        [HttpGet]
        public async Task<IEnumerable<Client>> GetAll()
        {
            return await repositoryClient.GetClients();
        }
        /// <summary>
        /// гет запрос для получения всех физических лиц
        /// </summary>
        [HttpGet]
        [Route("phys")]
        public async Task<IActionResult> GetAllPhys()
        {
            try
            {
                var client = await _context.Clients.Where(i => i.IsPhysCl == true).Where(i => i.LockoutEnabled == true).ToListAsync(); // LockoutEnabled - флаг что клиент удален, true если не удален, false если удален
                if (client == null)
                {
                    return null;
                }
                return Ok(client);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
                return NotFound(e.Message);
            }

/*            var clients = await repositoryClient.GetPhysicalClients();
            if (clients == null)
            {
                return NotFound();
            }
            return Ok(clients);*/
        }
        /// <summary>
        /// гет запрос для получения всехюридических лиц
        /// </summary>
        [HttpGet]
        [Route("legal")]
        public async Task<IActionResult> GetAllLegal()
        {
            try
            {
                var client = await _context.Clients.Where(i => i.IsPhysCl == false).Where(i => i.LockoutEnabled == true).ToListAsync();
                if (client == null)
                {
                    return null;
                }
                return Ok(client);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
                return NotFound(e.Message);
            }
/*            var clients = await repositoryClient.GetLegalClients();
            if (clients == null)
            {
                return NotFound();
            }
            return Ok(clients);*/
        }
        /// <summary>
        /// получения клиента по айди
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = await repositoryClient.GetClientById(id);
          
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        /// <summary>
        /// апдейт клиента
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient([FromRoute] int id, [FromBody] Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Clients.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            //блок перезаписи данных
            if (item.Name != null && client.Name != null)//физическое лицо
            {
                item.Name = client.Name;
                item.SurName = client.SurName;
                item.NumberPassport = client.NumberPassport;
                item.DateOfBirth = client.DateOfBirth;
            }
            else//юридическое лицо
            {
                item.NameOrganization = client.NameOrganization;
                item.LegalAdress = client.LegalAdress;
                item.StartDate = client.StartDate;
                item.Itn = client.Itn;
            }
            //общие параметры
            item.Balance = client.Balance;
            item.DateConnect = client.DateConnect;
            item.FreeGb = client.FreeGb;
            item.FreeMin = client.FreeMin;
            item.FreeSms = client.FreeSms;
            item.IsPhysCl = client.IsPhysCl;
            /*item.Password = client.Password;*/
            item.PhoneNumber = client.PhoneNumber;
            _context.Clients.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// удаление клиента
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient([FromRoute] string id)
        {
            var connect = _context.ConnectTariffs.Where(i => i.IdClient == id).Where(i =>i.DateConnectTariffEnd == null).FirstOrDefault();
            connect.DateConnectTariffEnd = DateTime.Now;
            
            var deletedClient = _context.Clients.Where(i => i.Id == id).FirstOrDefault();
            deletedClient.LockoutEnabled = false; // флаг что клиент удален
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (deletedClient == null)
            {
                return NotFound();
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
