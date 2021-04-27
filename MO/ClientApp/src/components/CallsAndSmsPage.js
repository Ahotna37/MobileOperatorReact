import React, { useEffect, useState } from "react";
import { DataGrid as DataGrid } from "@material-ui/data-grid";
import { Call } from "../API/methods";
import ItemList from "./ItemList";
import { dateTranslate } from "../Functions/dateTranslate";
/**
 * формирование колонок на странице для таблицы звонков
 */
const columns = [
  { field: "numberWasCall", headerName: "Номер телефона", width: 180 },
  {
    field: "dateCall",
    headerName: "Время разговора",
    width: 180,
    valueGetter: (params) => dateTranslate(params.row.dateCall),
  },
  { field: "timeTalk", headerName: "Продолжительность", width: 180 },
  { field: "costCall", headerName: "Цена звонка", width: 180 },
  {
    field: "callType",
    headerName: "Категория",
    width: 180,
    valueGetter: (params) => {
      let category;
      switch (params.row.callType) {
        case 1:
          category = "Домашний";
          break;
        case 2:
          category = "Межгород";
          break;
        case 3:
          category = "В другую страну";
          break;
      }
      return category;
    },
  },
  {
    field: "incomingCall",
    headerName: "Тип звонка",
    width: 180,
    valueGetter: (params) =>
      params.row.incomingCall ? "Входящий" : "Исходящий",
  },
];

export default function DataTable({ setTitle }) {
  useEffect(() => {
    setTitle("Звонки и смс");
    /**
     * Феч запрос на получения данных для строк
     */
    Call.returnAllCallForClient((res) => {
      setCalls(res);
      console.log(res);
    }, localStorage.getItem("id"));
  }, []);
  const [Calls, setCalls] = useState([]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={Calls} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
