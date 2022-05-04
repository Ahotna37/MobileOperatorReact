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
import { Service } from "../API/methods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * страница услуг
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
  tariffMedia: {},
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
   * феч возвращающий услуги
   */
  const [service, setService] = React.useState([]);
  useEffect(() => {
    setTitle("Услуги");
    Service.GetAllService((data) => setService(data), {});
  }, []);
  // const onClickAddNewSer = (ser) => {
  //   Service.AddNewSerForClient((data) => console.log(data), {
  //     idClient: localStorage.getItem("id"),
  //     Name: ser.name,
  //   });
  // };
  const onClickAddNewSer = (ser) => {
    fetch("https://localhost:5001/api/service/connectnewser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "access-control-expose-headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
      body: JSON.stringify({
        idClient: localStorage.getItem("id"),
        Name: ser.name,
      }),
    })
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      } else {
        return res
      }
    })
      .then(() => success())
      .catch(() => error());
  }
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <ToastContainer />
      <Grid container spacing={4}>
        {service.map((ser) => (
          <Grid item key={ser} xs={12} sm={6} md={4}>
            <Card className={classes.service}>
              <CardContent className={classes.tariffMedia}>
                <Typography gutterBottom variant="h5" component="h2">
                  {ser.name}
                </Typography>
                <Typography>Стоимость в месяц: {ser.subscFee}</Typography>
                <Typography>{ser.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => onClickAddNewSer(ser)}
                  size="small"
                  color="secondary"
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
