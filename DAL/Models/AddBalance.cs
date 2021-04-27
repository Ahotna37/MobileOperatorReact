using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для пополнения баланса
    /// </summary>
    [Table("AddBalance")]
    public partial class AddBalance
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("idClient")]
        public string IdClient { get; set; }
        public int SumForAdd { get; set; }
        [Required]
        [Column("phoneNumberForAddBalance")]
        [StringLength(50)]
        public string PhoneNumberForAddBalance { get; set; }
        [Required]
        [Column("numberBankCard")]
        [StringLength(50)]
        public string NumberBankCard { get; set; }
        [Required]
        [Column("nameBankCard")]
        [StringLength(50)]
        public string NameBankCard { get; set; }
        [Column("dateBankCard", TypeName = "date")]
        public DateTime DateBankCard { get; set; }
        [Column("CVVBankCard")]
        public int CvvbankCard { get; set; }
        [Column("dateAddBalance", TypeName = "date")]
        public DateTime DateAddBalance { get; set; }

        [ForeignKey(nameof(IdClient))]
        [InverseProperty(nameof(Client.AddBalances))]
        public virtual Client IdClientNavigation { get; set; }
    }
}
