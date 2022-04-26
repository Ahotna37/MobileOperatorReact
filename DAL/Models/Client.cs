using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// модель для клиента - главная таблица, связывает все остальные таблицы
    /// </summary>
    [Table("Client")]
    public partial class Client: IdentityUser
    {
        public Client()
        {
            AddBalances = new HashSet<AddBalance>();
            Calls = new HashSet<Call>();
            ConnectServices = new HashSet<ConnectService>();
            ConnectTariffs = new HashSet<ConnectTariff>();
            Sms = new HashSet<Sm>();
        }

        [Required]
        [Column("phoneNumber")]
        [StringLength(50)]
        public string PhoneNumber { get; set; }
        [Column("dateConnect", TypeName = "date")]
        public DateTime DateConnect { get; set; }
        [Column("balance", TypeName = "decimal(18, 0)")]
        public decimal Balance { get; set; }
        [Column("isPhysCl")]
        public bool IsPhysCl { get; set; }
/*        [Required]
        [Column("password")]
        [StringLength(10)]
        public string Password { get; set; }*/
        [Column("freeMin")]
        public int FreeMin { get; set; }
        [Column("freeSms")]
        public int FreeSms { get; set; }
        [Column("freeGB")]
        public float FreeGb { get; set; }
        [Column("name")]
        [StringLength(10)]
        public string Name { get; set; }
        [Column("surName")]
        [StringLength(10)]
        public string SurName { get; set; }
        [Column("dateOfBirth", TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }
        [Column("numberPassport")]
        [StringLength(10)]
        public string NumberPassport { get; set; }
        [Column("nameOrganization")]
        [StringLength(50)]
        public string NameOrganization { get; set; }
        [Column("legalAdress")]
        [StringLength(50)]
        public string LegalAdress { get; set; }
        [Column("ITN")]
        [StringLength(10)]
        public string Itn { get; set; }
        [Column("startDate", TypeName = "date")]
        public DateTime? StartDate { get; set; }

        [InverseProperty(nameof(AddBalance.IdClientNavigation))]
        public virtual ICollection<AddBalance> AddBalances { get; set; }
        [InverseProperty(nameof(Call.IdClientNavigation))]
        public virtual ICollection<Call> Calls { get; set; }
        [InverseProperty(nameof(ConnectService.IdClientNavigation))]
        public virtual ICollection<ConnectService> ConnectServices { get; set; }
        [InverseProperty(nameof(ConnectTariff.IdClientNavigation))]
        public virtual ICollection<ConnectTariff> ConnectTariffs { get; set; }
        [InverseProperty(nameof(Sm.IdClientNavigation))]
        public virtual ICollection<Sm> Sms { get; set; }
    }
}
