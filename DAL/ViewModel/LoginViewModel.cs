using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.ViewModel
{
    /// <summary>
    /// модель данных для авторизации 
    /// </summary>
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Логин")]
        public string LoginPhoneNumber { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }
        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }
        public string ReturnUrl { get; set; }
    }
}
