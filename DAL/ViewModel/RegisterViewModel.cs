using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.ViewModel
{
    /// <summary>
    /// модель данных для регистрации
    /// </summary>
    public class RegisterViewModel
    {
        [Required]//обязательное поле
        [Display(Name = "Логин")]
        public string LoginPhoneNumber { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DataType(DataType.Password)]
        [Display(Name = "Подтвердить пароль")]
        public string PasswordConfirm { get; set; }
        [Required]
        [Display(Name = "Тип клиента")]
        public bool isPhis { get; set; }
        /// <summary>
        /// Поля для Физического лица
        /// </summary>
        [Display(Name = "Имя клиента")]
        public string NameClient { get; set; }
        [Display(Name = "Фамилия")]
        public string SurNameClient { get; set; }
        [Display(Name = "Серия/номер паспорта")]
        public string PassportClient { get; set; }
        [Display(Name = "Дата рождения")]
        public DateTime DateOfBirthClient { get; set; }
        /// <summary>
        /// Поля для Юридического лица
        /// </summary>
        [Display(Name = "Название организации")]
        public string nameOrganisation { get; set; }
        [Display(Name = "ИНН")]
        public string itn { get; set; }
        [Display(Name = "Юридический адрес")]
        public string legalAddress { get; set; }
        [Display(Name = "Начало работы организации")]
        public DateTime dateStartWorkOrganisation { get; set; }
    }
}
