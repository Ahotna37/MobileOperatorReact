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
  const classes = useStyles();
  /**
   * феч возвращающий тарифы для клиента
   */
  const [tariff, setTariff] = React.useState([]);
  useEffect(() => {
    setTitle("Тарифы");
    Tariff.GetAllTariff(
      (data) => setTariff(data),
      localStorage.getItem("id"),
      {}
    );
  }, []);
  /**
   * феч для добавления тарифа
   */
  const onClickAddNewTar = (tarif) => {
    Tariff.AddNewTarForClient({
      IdClient: localStorage.getItem("id"),
      IdTariffPlan: tarif.IdTariffPlan,
    });
  };
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
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
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => onClickAddNewTar(tarif)}
                  size="small"
                  color="primary"
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
