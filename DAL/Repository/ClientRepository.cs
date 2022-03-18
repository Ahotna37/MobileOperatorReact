using DAL.Interfaces;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    /// <summary>
    /// реализация паттерна repository, реализации функций контроллера Клиента
    /// </summary>
    public class ClientRepository : IRepositoryClient
    {
        private readonly MOContext _context;

        public ClientRepository(MOContext context)
        {
            this._context = context;
        }
        public async Task<Client> DeleteClientById(string id)
        {
            var item = _context.Clients.Find(id);
            if (item == null)
            {
                return null;
            }
            item.LockoutEnabled = true;
            //_context.Clients.Remove(item);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
            }
            return item;
        }

        public async Task<Client> GetClientById(string id)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(i => i.Id == id);
            try
            {
               
                var dateCon = _context.ConnectTariffs.Where(i => i.IdClient == id && i.DateConnectTariffEnd == null).FirstOrDefault();
                client.DateConnect = dateCon.DateConnectTariffBegin;
                client.DateConnect = client.DateConnect.AddMonths(1);
                var d = (client.DateConnect - DateTime.Now).Days;
                // client.Email - это количество дней до обновления баланса
                client.Email = d.ToString();
                await _context.SaveChangesAsync();

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
            }
            
            if (client == null)
            {
                return null;
            }
            return client;
        }

        public async Task<IEnumerable<Client>> GetClients()
        {
            try
            {
                return await _context.Clients.ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
                return null;
            }
        }

        public async Task<IEnumerable<Client>> GetLegalClients()
        {
            try
            {
                var client = await _context.Clients.Where(i => i.IsPhysCl == false && i.LockoutEnabled == false).ToListAsync();
                if (client == null)
                {
                    return null;
                }
                return client;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
                return null;
            }
        }

        public async Task<IEnumerable<Client>> GetPhysicalClients()
        {
            try
            {
                var client = await _context.Clients.Where(i => i.IsPhysCl == true && i.LockoutEnabled == false).ToListAsync();
                if (client == null)
                {
                    return null;
                }
                return client;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //throw;
                return null;
            }
        }
    }
}
