using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для соединений клиента и услуги
    /// </summary>
    [Table("ConnectService")]
    public partial class ConnectService
    {
        [Key]
        [Column("idConnectServ")]
        public int IdConnectServ { get; set; }
        [Column("idClient")]
        public string IdClient { get; set; }
        [Column("idExtraService")]
        public int IdExtraService { get; set; }
        [Column("dateConnectBegin", TypeName = "date")]
        public DateTime DateConnectBegin { get; set; }
        [Column("dateConnectEnd", TypeName = "date")]
        public DateTime? DateConnectEnd { get; set; }

        [ForeignKey(nameof(IdClient))]
        [InverseProperty(nameof(Client.ConnectServices))]
        public virtual Client IdClientNavigation { get; set; }
        [ForeignKey(nameof(IdExtraService))]
        [InverseProperty(nameof(ExtraService.ConnectServices))]
        public virtual ExtraService IdExtraServiceNavigation { get; set; }
    }
}
