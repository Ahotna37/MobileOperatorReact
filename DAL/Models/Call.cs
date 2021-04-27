using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для звонков
    /// </summary>
    [Table("Call")]
    public partial class Call
    {
        [Column("dateCall", TypeName = "date")]
        public DateTime DateCall { get; set; }
        [Column("timeTalk")]
        public int TimeTalk { get; set; }
        [Required]
        [Column("numberWasCall")]
        [StringLength(50)]
        public string NumberWasCall { get; set; }
        [Column("callType")]
        public int CallType { get; set; }
        [Column("costCall", TypeName = "decimal(18, 0)")]
        public decimal CostCall { get; set; }
        [Column("incomingCall")]
        public bool IncomingCall { get; set; }
        [Column("idClient")]
        public string IdClient { get; set; }
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [ForeignKey(nameof(IdClient))]
        [InverseProperty(nameof(Client.Calls))]
        public virtual Client IdClientNavigation { get; set; }
    }
}
