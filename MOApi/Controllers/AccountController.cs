using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL.Models;
using DAL.ViewModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Data.Entity;

namespace MOApi.Controllers
{
    /// <summary>
    /// Контроллер авторизации/регистрации/аутентификации
    /// </summary>
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private readonly UserManager<Client> _clientManager;
        private readonly SignInManager<Client> _signInManager;
        private readonly MOContext _context;
        /// <summary>
        /// конструктор контроллера
        /// </summary>
        public AccountController(UserManager<Client> clientManager, SignInManager<Client> signInManager, MOContext context)
        {
            _clientManager = clientManager;
            _signInManager = signInManager;
            _context = context;
        }
        /// <summary>
        /// пост запрос для регистрации пользователя
        /// </summary>
        [HttpPost]
        [Route("api/account/register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                   Client client;
                ConnectTariff conTar;
                if (!String.IsNullOrEmpty(model.NameClient.ToString()) && String.IsNullOrEmpty(model.nameOrganisation.ToString()))
                {
                    /// <summary>
                    /// регистрация физ лица
                    /// </summary>
                    client = new Client
                    {
                        PhoneNumber = model.LoginPhoneNumber,
                        UserName = model.LoginPhoneNumber,
                        Balance = 0,
                        DateConnect = DateTime.Now,
                        DateOfBirth = model.DateOfBirthClient,
                        Email = "ads",
                        EmailConfirmed = true,
                        FreeGb = 0,
                        FreeMin = 0,
                        FreeSms = 0,
                        IsPhysCl = true,
                        Name = model.NameClient,
                        NormalizedEmail = "ads",
                        NormalizedUserName = model.LoginPhoneNumber,
                        NumberPassport = model.PassportClient,
                        Password = model.Password,
                        PhoneNumberConfirmed = true,
                        SurName = model.SurNameClient

                    };

                }
                else
                {
                    /// <summary>
                    ///регистрация юр лица
                    /// </summary>
                    client = new Client
                    {
                        PhoneNumber = model.LoginPhoneNumber,
                        UserName = model.LoginPhoneNumber,
                        Balance = 0,
                        DateConnect = DateTime.Now,
                        Email = "ads",
                        EmailConfirmed = true,
                        FreeGb = 0,
                        FreeMin = 0,
                        FreeSms = 0,
                        IsPhysCl = false,
                        NormalizedEmail = "ads",
                        NormalizedUserName = model.LoginPhoneNumber,
                        Password = model.Password,
                        PhoneNumberConfirmed = true,
                        Itn = model.itn,
                        LegalAdress = model.legalAddress,
                        NameOrganization = model.nameOrganisation,
                        StartDate = model.dateStartWorkOrganisation

                    };
                }
                // Добавление нового пользователя
                var result = await _clientManager.CreateAsync(client, model.Password);
                if (result.Succeeded)
                {
                    // установка куки
                    await _clientManager.AddToRoleAsync(client, "user");
                    await _signInManager.SignInAsync(client, false);

                    var msg = new
                    {
                        message = "Добавлен новый пользователь: " +
                    client.UserName,
                        id = client.Id
                    };
                    if (client.IsPhysCl)
                        conTar = new ConnectTariff
                        {
                            DateConnectTariffBegin = DateTime.Now,
                            DateConnectTariffEnd = null,
                            IdClient = client.Id,
                            IdTariffPlan = 2
                        };
                    else
                        conTar = new ConnectTariff
                        {
                            DateConnectTariffBegin = DateTime.Now,
                            DateConnectTariffEnd = null,
                            IdClient = client.Id,
                            IdTariffPlan = 3
                        };
                    _context.ConnectTariffs.Add(conTar);
                    await _context.SaveChangesAsync();
                    return Ok(msg);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty,
                        error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Пользователь не добавлен.",
                        error = ModelState.Values.SelectMany(e =>
                        e.Errors.Select(er => er.ErrorMessage))
                    };
                    return Ok(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные.",
                    error = ModelState.Values.SelectMany(e =>
                    e.Errors.Select(er => er.ErrorMessage))
                };

                return Ok(errorMsg);
            }
        }
        /// <summary>
        /// пост запрос для авторизации
        /// </summary>
        [HttpPost]
        [Route("api/Account/Login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.LoginPhoneNumber, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    var clientByLogin = _context.Clients.FirstOrDefault(i => i.PhoneNumber == model.LoginPhoneNumber);
                    var msg = new
                    {
                        message = "Выполнен вход пользователем: " + model.LoginPhoneNumber,
                        id = clientByLogin.Id,
                    };
                    return Ok(msg);
                }
                else
                {
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                    var errorMsg = new
                    {
                        message = "Вход не выполнен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return NotFound(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                    error = ModelState.Values.SelectMany(e =>
                    e.Errors.Select(er => er.ErrorMessage))
                };
                return NotFound(errorMsg);
            }
        }
        /// <summary>
        /// пост запрос на удаление куков чтобы разлогиниться
        /// </summary>
        [HttpPost]
        [Route("api/Account/LogOff")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> LogOff()
        {
            // Удаление куки
            await _signInManager.SignOutAsync();
            var msg = new
            {

                message = "Выполнен выход."
            };
            return Ok(msg);
        }
        /// <summary>
        /// пост запрос для аутентификации
        /// </summary>
        [HttpPost]
        [Route("api/Account/isAuthenticated")]
        //[ValidateAntiForgeryToken]
   
        public async Task<IActionResult> LogisAuthenticatedOff()
        {
            Client usr = await GetCurrentUserAsync();
            var message = usr == null ? "Вы Гость. Пожалуйста, выполните вход." : "Вы вошли как: " + usr.UserName; var msg = new
            {
                message,
                userId = usr.Id,
                role = usr.UserName,
            };
            return Ok(msg);
        }
        private Task<Client> GetCurrentUserAsync() =>
        _clientManager.GetUserAsync(HttpContext.User);
    }
}
