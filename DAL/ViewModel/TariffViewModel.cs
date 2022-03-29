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
        public string name { get; set; }
        [Display(Name = "Стоимость одной минуты в домашнем регионе")]
        public decimal costOneMinCallCity { get; set; }
        [Display(Name = "Стоимость одной минуты вне домашнего региона")]
        public decimal costOneMinCallOutCity { get; set; }
        [Display(Name = "Стоимость одной минуты в другой стране")]
        public decimal costOneMinCallInternation { get; set; }
        [Display(Name = "ГБ интернета")]
        public float intGb { get; set; }
        [Display(Name = "Количество смс")]
        public int sms { get; set; }
        [Display(Name = "Кто может подключить данный тариф")]
        public bool isPhysTar { get; set; }
        [Display(Name = "Стоимость смены тарифа")]
        public decimal costChangeTar { get; set; }
        [Display(Name = "Можно ли подключить данный тариф")]
        public bool canConnectThisTar { get; set; }
        [Display(Name = "Цена в месяц")]
        public int subcriptionFee { get; set; }
        [Display(Name = "Бесплатных минут в месяц")]
        public int freeMinuteForMonth { get; set; }
        public int id { get; set; }
        [Display(Name = "Стоимость смс")]
        public decimal costSms { get; set; }
        [Display(Name = "id клиента подключаемого тариф")]
        public string idClient { get; set; }

    }
}
