using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для соединения клиента и тарифа
    /// </summary>
    [Table("ConnectTariff")]
    public partial class ConnectTariff
    {
        [Key]
        [Column("idConnectTariff")]
        public int IdConnectTariff { get; set; }
        [Column("idClient")]
        public string IdClient { get; set; }
        [Column("idTariffPlan")]
        public int IdTariffPlan { get; set; }
        [Column("dateConnectTariffBegin", TypeName = "date")]
        public DateTime DateConnectTariffBegin { get; set; }
        [Column("dateConnectTariffEnd", TypeName = "date")]
        public DateTime? DateConnectTariffEnd { get; set; }

        [ForeignKey(nameof(IdClient))]
        [InverseProperty(nameof(Client.ConnectTariffs))]
        public virtual Client IdClientNavigation { get; set; }
        [ForeignKey(nameof(IdTariffPlan))]
        [InverseProperty(nameof(TariffPlan.ConnectTariffs))]
        public virtual TariffPlan IdTariffPlanNavigation { get; set; }
    }
}
