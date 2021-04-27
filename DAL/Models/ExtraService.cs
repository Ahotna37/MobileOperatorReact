using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель дополнительной услуги
    /// </summary>
    [Table("ExtraService")]
    public partial class ExtraService
    {
        public ExtraService()
        {
            ConnectServices = new HashSet<ConnectService>();
        }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("subscFee", TypeName = "decimal(18, 0)")]
        public decimal SubscFee { get; set; }
        [Required]
        [Column("description", TypeName = "ntext")]
        public string Description { get; set; }
        public bool CanConnectThisSer { get; set; }
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [InverseProperty(nameof(ConnectService.IdExtraServiceNavigation))]
        public virtual ICollection<ConnectService> ConnectServices { get; set; }
    }
}
