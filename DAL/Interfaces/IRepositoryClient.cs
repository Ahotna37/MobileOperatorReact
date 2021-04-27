using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    /// <summary>
    /// интерфес для реализации патерна repository
    /// </summary>
    public interface IRepositoryClient
    {
        Task<IEnumerable<Client>> GetClients();
        Task<IEnumerable<Client>> GetPhysicalClients();
        Task<IEnumerable<Client>> GetLegalClients();
        Task<Client> GetClientById(string id);
        Task<Client> DeleteClientById(string id);
    }
}
