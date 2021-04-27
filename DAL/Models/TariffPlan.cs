using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для тарифного плана
    /// </summary>
    [Table("TariffPlan")]
    public partial class TariffPlan
    {
        public TariffPlan()
        {
            ConnectTariffs = new HashSet<ConnectTariff>();
        }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("costOneMinCallCity", TypeName = "decimal(18, 0)")]
        public decimal CostOneMinCallCity { get; set; }
        [Column("costOneMinCallOutCity", TypeName = "decimal(18, 0)")]
        public decimal CostOneMinCallOutCity { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal CostOneMinCallInternation { get; set; }
        [Column("intGB")]
        public float IntGb { get; set; }
        [Column("SMS")]
        public int Sms { get; set; }
        [Column("isPhysTar")]
        public bool IsPhysTar { get; set; }
        [Column("costChangeTar", TypeName = "decimal(18, 0)")]
        public decimal CostChangeTar { get; set; }
        public bool CanConnectThisTar { get; set; }
        [Column("subcriptionFee")]
        public int SubcriptionFee { get; set; }
        [Column("freeMinuteForMonth")]
        public int FreeMinuteForMonth { get; set; }
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("costSms", TypeName = "decimal(18, 0)")]
        public decimal CostSms { get; set; }

        [InverseProperty(nameof(ConnectTariff.IdTariffPlanNavigation))]
        public virtual ICollection<ConnectTariff> ConnectTariffs { get; set; }
    }
}
