import { Modal, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
//import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ItemList from "./ItemList";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import { Client } from "../API/methods";
import { DataGrid as DataGrid } from "@material-ui/data-grid";
import { dateTranslate } from "../Functions/dateTranslate";
import Button from "@material-ui/core/Button";
/**
 * формирование колонок для таблицы физических лиц
 */
const columnsForPhys = [
  { field: "phoneNumber", headerName: "Номер телефона", width: 140 },
  {
    field: "dateConnect",
    headerName: "Дата подключения",
    width: 160,
    valueGetter: (params) => dateTranslate(params.row.dateConnect),
  },
  { field: "balance", headerName: "Баланс", width: 90 },
  { field: "freeMin", headerName: "Минуты", width: 90 },
  { field: "freeGb", headerName: "Интернет", width: 90 },
  { field: "freeSms", headerName: "СМС", width: 90 },
  { field: "name", headerName: "Имя", width: 110 },
  { field: "surName", headerName: "Фамилия", width: 110 },
  { field: "numberPassport", headerName: "Паспорт", width: 110 },
  {
    field: "dateOfBirth",
    headerName: "Дата рождения",
    width: 160,
    valueGetter: (params) => dateTranslate(params.row.dateOfBirth),
  },
];
/**
 * формирование колонок для таблицы юридических лиц
 */
const columnsForLegal = [
  { field: "phoneNumber", headerName: "Номер телефона", width: 140 },
  { field: "dateConnect", headerName: "Дата подключения", width: 150 },
  { field: "balance", headerName: "Баланс", width: 90 },
  { field: "freeMin", headerName: "Минуты", width: 90 },
  { field: "freeGB", headerName: "Интернет", width: 90 },
  { field: "freeSms", headerName: "СМС", width: 90 },
  { field: "nameOrganizarion", headerName: "Организация", width: 110 },
  { field: "startDate", headerName: "Начало работы", width: 150 },
  { field: "itn", headerName: "ИНН", width: 110 },
  { field: "legalAdress", headerName: "Юридический адрес", width: 110 },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  dataGrid: {
    '.MuiCheckbox-colorPrimary.Mui-checked': {
      color: 'red'
    },
  },

}));

export default function ClientList({ setTitle }) {
  const classes = useStyles();
  /**
   * феч запросы для получения данных для колонок
   */
  const [clientsPhys, setClientsPhys] = useState([]);
  const [clientsLegal, setClientsLegal] = useState([]);
  useEffect(() => {
    setTitle("Список клиентов");
    Client.getAllPhys((res) => setClientsPhys(res));
    Client.getAllLegal((res) => setClientsLegal(res));
  }, []);
  const [selectedRowsLegal, setSelectedRowsLegal] = useState([]);
  const onSelectionModelChangeLegal = (data) => {
    setSelectedRowsLegal(data.selectionModel);
  };

  const deleteLegal = () => {
    selectedRowsLegal.map((legal) => {
      Client.deleteClient((data) => console.log(data), legal);
    });
  };
  const [selectedRowsPhys, setSelectedRowsPhys] = useState([]);
  const onSelectionModelChangePhys = (data) => {
    setSelectedRowsPhys(data.selectionModel);
  };

  const deletePhys = () => {
    selectedRowsPhys.map((phys) => {
      Client.deleteClient((data) => console.log(data), phys);
    });
  };
  /**
   * пазметка страницы
   */
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Список физических лиц
      </Typography>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid className={classes.dataGrid}
          rows={clientsPhys}
          columns={columnsForPhys}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={onSelectionModelChangePhys}
        />
      </div>
      <Button variant="contained" color="secondary" onClick={deletePhys}>
        Удалить
      </Button>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Список юридических лиц
      </Typography>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={clientsLegal}
          columns={columnsForLegal}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={onSelectionModelChangeLegal}
        />
      </div>
      <Button variant="contained" color="secondary" onClick={deleteLegal}>
        Удалить
      </Button>
    </>
  );
}
