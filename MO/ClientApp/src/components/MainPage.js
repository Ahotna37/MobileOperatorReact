import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Client, Service, Tariff } from "../API/methods";
/**
 * главная страница с данными о клиенте
 */
/**
 * стили страницы
 */
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainPageReturn({ setTitle }) {
  const classes = useStyles();

  /**
   * хранилище данных клиента
   */
  const [user, setUser] = useState({
    phoneNumber: "",
    balance: "",
    freeMin: "",
    freeSms: "",
    freeGb: "",
    name: "",
    surName: "",
    nameOrganization: "",
    email: "",
  });
  const getByIdSuccess = (data) => {
    setUser(data);
    const buf = [...tiers];
    buf[0].left = data.freeMin;
    buf[1].left = data.freeGb;
    buf[2].left = data.freeSms;
    setTiers(buf);
  };
  const getClient = () => {
    Client.getById(getByIdSuccess, localStorage.getItem("id"));
  };
  const [tariff, setTariff] = useState({
    name: "",
  });
  const getTarByIdSuccess = (data) => {
    setTariff(data[0]);
    localStorage.setItem("idTariff", data[0].id);
  };
  const GetTariffForPhysOrLegal = () => { // вернуть получение тарифа
    Tariff.GetTariffForPhysOrLegal(
      getTarByIdSuccess,
      localStorage.getItem("id")
    );
  };
  
  //   const GetTariffForPhysOrLegal = () => {
  // };

  /**
   * данные страницы по-умолчанию для загрузки страницы без загрузки клиента из БД
   */
  const [tiers, setTiers] = useState([
    {
      title: "Минуты",
      left: 0,
      description: ["на 30 дней"],
      buttonText: "Пакет минут",
      buttonVariant: "outlined",
      name: "Пакет минут",
    },
    {
      title: "Интернет",
      subheader: "Гигабайты",
      left: "15",
      description: ["на 30 дней"],
      buttonText: "Пакет интернета",
      buttonVariant: "contained",
      name: "Пакет интернета",
    },
    {
      title: "СМС",
      left: "30",
      description: ["на 30 дней"],
      buttonText: "Пакет СМС",
      buttonVariant: "outlined",
      name: "Пакет смс",
    },
  ]);
  const onClickAddNewSer = (tier) => {
    Service.AddNewSerForClient((data) => getClient(), {
      idClient: localStorage.getItem("id"),
      Name: tier.name,
    });
  };
  useEffect(() => {
    setTitle("Главная");
    getClient();
    GetTariffForPhysOrLegal();
  }, []);
  /**
   * разметка страницы
   */
  return (
    <>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Баланс: {user.balance}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {user.name ? user.surName + " " + user.name : user.nameOrganization}
        </Typography>
        {/* <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Активный тариф: {tariff.name}
        </Typography> */}
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {user.phoneNumber}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.left}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        Осталось дней: {user.email}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="secondary"
                    onClick={() => onClickAddNewSer(tier)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
