import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Tariff } from "../API/methods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * страница тарифов
 */
/**
 * стили страницы
 */
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  tariff: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tariffMedia: {
    //paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album({ setTitle }) {
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
  const classes = useStyles();
  /**
   * феч возвращающий тарифы для клиента
   */
  const setTariffClient = () => {
    const url = `https://localhost:5001/api/Tariff/listtar/${localStorage.getItem("id")}`;
    fetch(url, {
      method: "GET",
      // body: JSON.stringify(info),
      headers: { "Content-Type": "application/json", 'Accept': 'application/json, application/xml, text/plain, text/html, .' },
    })
      .then((res) => res.json())
      .then((data) => setTariff(data))
  }
  const [tariff, setTariff] = React.useState([]);
  const [connectedTar, setConnectedTar] = React.useState([]);
  useEffect(() => {
    setTitle("Тарифы");
    setTariffClient();
    const urlClient = `https://localhost:5001/api/Tariff/user/${localStorage.getItem("id")}`;
    fetch(urlClient, {
      method: "GET",
      // body: JSON.stringify(info),
      headers: { "Content-Type": "application/json", 'Accept': 'application/json, application/xml, text/plain, text/html, .' },
    })
      .then((res) => res.json())
      .then((data) => setConnectedTar(data))

  }, []);
  /**
   * феч для добавления тарифа
   */
   const onClickAddNewTar = (tarif) => {
    fetch(`https://localhost:5001/api/Tariff/connecttar/${localStorage.getItem("id")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "access-control-expose-headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
      body: tarif.id
      // body: {tarId: tarif.id},
    })
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      } else {
        return res
      }
    })
      .then(() => success())
      .then (() => setTariffClient())
      .catch(() => error());
  }
  // const onClickAddNewTar = (tarif) => {
  //   console.log(tarif);
  //   Tariff.AddNewTarForClient({
  //     // IdTariffPlan: tarif.IdTariffPlan,
  //     tarif
  //   });
  // };
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <ToastContainer/>
      <Grid container spacing={4}>
        {tariff.map((tarif) => (
          <Grid item key={tarif} xs={12} sm={6} md={4}>
            <Card className={classes.tariff}>
              <CardContent className={classes.tariffMedia}>
                <Typography gutterBottom variant="h5" component="h2">
                  {tarif.name}
                </Typography>
                <Typography>
                  Стоимость в месяц {tarif.subcriptionFee}
                </Typography>
                <Typography>
                  Бесплатные минуты {tarif.freeMinuteForMonth}
                </Typography>
                <Typography>Бесплатные СММ {tarif.sms}</Typography>
                <Typography>Интернет {tarif.intGb}</Typography>
                <Typography>Стоимость минуты в городе {tarif.costOneMinCallCity}</Typography>
                <Typography>Стоимость минуты вне города {tarif.costOneMinCallInternation}</Typography>
                <Typography>Стоимость минуты в другую страну {tarif.costOneMinCallOutCity}</Typography>
                <Typography>Стоимость смс {tarif.costSms}</Typography>
                <Typography>Стоимость смены тарифа {tarif.costChangeTar}</Typography>
                <Typography>Стоимость в месяц {tarif.subcriptionFee}</Typography>
              </CardContent>
              <CardActions>

                <Button
                  onClick={() => onClickAddNewTar(tarif)}
                  size="small"
                  color="secondary"
                  disabled={tarif.name === connectedTar.name}
                >
                  Подключить
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
