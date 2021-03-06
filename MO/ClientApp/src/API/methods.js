/**
 * Файл для феч запросов
 */
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
/**
 * Команды КРАД
 */
const T = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};
/**
 * адрес бэкэнда
 */
const url = "https://localhost:5001/api/";
/**
 * Контроллеры бэкэнда
 */
const CLASS = {
  Client: "Client",
  Account: "Account",
  Call: "Call",
  Tariff: "Tariff",
  UserTariff: "Tariff/user",
  AddBalance: "AddBalance",
  Service: "Service",
};

const error = () => toast.error(' Недостаточно средств, попоните счет', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
const success = () => toast.success('Успех!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const convertJSONToUrlEncoded = (obj) => {
  let str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(key + "=" + obj[key]);
    }
  }
  return str.join("&");
};

function request(methodClass, requestType, method, data, options, success) {
  let urlEncodedData = "";
  if (method) {
    method = "/" + method;
  }
  // console.log(data);
  const isDataEmpty = Object.keys(data).length === 0;

  if (isDataEmpty || requestType === T.PUT || requestType === T.GET) {
    urlEncodedData = "?" + convertJSONToUrlEncoded(data);
  }
  let response = url + methodClass + method + urlEncodedData;
  // console.log(data);
  /**
   * реализации феч запросов
   */
  switch (requestType) {
    case T.GET:
      fetch(response, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
          ...options,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => success(data))
        // .catch(() => window.location.replace("/authorization"));
      break;
    case T.POST:
      fetch(response, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
          ...options,
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status !== 204) {
            return res.json();
          } else {
            return new Promise((res) => res({}));
          }
        })
        .then((res) => success(res))
        .catch(() => window.location.replace("/"));
      break;
    case T.PUT:
      fetch(response, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
          ...options,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => success(res))
      // .catch(() => window.location.replace("/authorization"));
      break;
    case T.DELETE:
      fetch(response, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
          ...options,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => success(res))
      // .catch(() => window.location.replace("/authorization"));
      break;
    default:
      console.log("Такого запроса не существует!");
  }
}
/**
 * запросы для контроллера - клиент
 */
export const Client = {
  getAll: (success) => {
    request(CLASS.Client, T.GET, "", {}, {}, success);
  },
  getAllPhys: (success) => {
    request(CLASS.Client, T.GET, "phys", {}, {}, success);
  },
  getAllLegal: (success) => {
    request(CLASS.Client, T.GET, "legal", {}, {}, success);
  },
  getById: (success, id) => {
    request(CLASS.Client, T.GET, id, {}, {}, success);
  },
  deleteClient: (success, id) => {
    request(CLASS.Client, T.DELETE, id, {}, {}, success);
  },
};
/**
 * запросы для контроллера - аккаунт
 */
export const Account = {
  auth: (success, body) => {
    request(CLASS.Account, T.POST, "Login", body, {}, success);
  },
  returnClient: (success, body) => {
    request(CLASS.Account, T.POST, "isAuthenticated", {}, {}, success);
  },
  createClient: (success, body) => {
    request(CLASS.Account, T.POST, "register", body, {}, success);
  },
  logOut: (success, body) => {
    request(CLASS.Account, T.POST, "LogOff", body, {}, success);
  },
};
/**
 * запросы для контроллера - звонки
 */
export const Call = {
  returnAllCallForClient: (success, id) => {
    request(CLASS.Call, T.GET, id, {}, {}, success);
  },
};
/**
 * запросы для контроллера - тарифы
 */
export const Tariff = {
  GetAllTariff: (success) => {
    request(CLASS.Tariff, T.GET, "", "all", {}, success);
  },
  AddNewTarForClient: (success, body) => {
    console.log(body);
    request(CLASS.Tariff, T.PUT, localStorage.idClient, body, {}, success);
  },
  createTariff: (success, body) => {
    request(CLASS.Tariff, T.POST, "", body, {}, success);
  },
  GetTariffForPhysOrLegal: (success, id) => {
    request(CLASS.UserTariff, T.GET, id, {}, {}, success);
  },
};
/**
 * запросы для контроллера - пополнение баланса
 */
export const AddBalance = {
  CreateNewAddBalance: (success, body) => {
    request(CLASS.AddBalance, T.POST, "", body, {}, success);
  },
};
/**
 * запросы для контроллера - услуги
 */
export const Service = {
  GetAllService: (success) => {
    request(CLASS.Service, T.GET, "", {}, {}, success);
  },
  AddNewSerForClient: (success, body) => {
    request(CLASS.Service, T.POST, "connectnewser", body, {}, success);
  },
};
