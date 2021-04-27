using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.ViewModel
{
    /// <summary>
    /// модель данных для контроллера тарифа
    /// </summary>
    public class TariffViewModel
    {
        [Required]
        [StringLength(50)]
        [Display(Name = "Название тарифа")]
        public string Name { get; set; }
        [Display(Name = "Стоимость одной минуты в домашнем регионе")]
        public decimal CostOneMinCallCity { get; set; }
        [Display(Name = "Стоимость одной минуты вне домашнего региона")]
        public decimal CostOneMinCallOutCity { get; set; }
        [Display(Name = "Стоимость одной минуты в другой стране")]
        public decimal CostOneMinCallInternation { get; set; }
        [Display(Name = "ГБ интернета")]
        public float IntGb { get; set; }
        [Display(Name = "Количество смс")]
        public int Sms { get; set; }
        [Display(Name = "Кто может подключить данный тариф")]
        public bool IsPhysTar { get; set; }
        [Display(Name = "Стоимость смены тарифа")]
        public decimal CostChangeTar { get; set; }
        [Display(Name = "Можно ли подключить данный тариф")]
        public bool CanConnectThisTar { get; set; }
        [Display(Name = "Цена в месяц")]
        public int SubcriptionFee { get; set; }
        [Display(Name = "Бесплатных минут в месяц")]
        public int FreeMinuteForMonth { get; set; }
        public int Id { get; set; }
        [Display(Name = "Стоимость смс")]
        public decimal CostSms { get; set; }
        [Display(Name = "id клиента подключаемого тариф")]
        public string idClient { get; set; }

    }
}
