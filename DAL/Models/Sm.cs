using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для СМС
    /// </summary>
    public partial class Sm
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("idClient")]
        public string IdClient { get; set; }
        [Column("dateSms", TypeName = "date")]
        public DateTime DateSms { get; set; }
        [Required]
        [Column("recipientSms")]
        [StringLength(50)]
        public string RecipientSms { get; set; }
        [Required]
        [Column("textSms", TypeName = "text")]
        public string TextSms { get; set; }
        [Column("costSMS", TypeName = "decimal(18, 0)")]
        public decimal CostSms { get; set; }
        [Column("incomingSms")]
        public bool IncomingSms { get; set; }

        [ForeignKey(nameof(IdClient))]
        [InverseProperty(nameof(Client.Sms))]
        public virtual Client IdClientNavigation { get; set; }
    }
}
