using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.ViewModel
{
    /// <summary>
    /// модель данных для контроллера услуг
    /// </summary>
    public class ServiceViewModel
    {
        [Required]
        [StringLength(50)]
        [Display(Name = "Название тарифа")]
        public string Name { get; set; }
        [Display(Name = "id клиента подключаемого тариф")]
        public string idClient { get; set; }
    }
}
