using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{

    public interface IIdentity
    {
        // Тип аутентификации
        string AuthenticationType { get; }
        // атунтифицирован ли пользователь
        bool IsAuthenticated { get; }
        //Имя текущего пользователя 
        string Name { get; }
    }
    public interface IPrincipal
    {
        IIdentity Identity { get; }
        bool IsInRole(string role);
    }
}
