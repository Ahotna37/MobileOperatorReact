import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ClientInfForAddBalanceForm from "./ClientInfForAddBalanceForm";
import Review from "./Review";
import { AddBalance } from "../API/methods";

/**
 *стили страницы
 */
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Пополнение баланса", "Информация об оплате"];

/**
 * реализация страницы пополнения баланса
 */
export default function Checkout({ setTitle }) {
  const classes = useStyles();
  /**
   * хранилище данных для пополнения баланса
   */
  const [inputValuesForAddBalance, setInputValuesForAddBalance] = useState({
    PhoneNumberForAddBalance: "",
    SumForAdd: "",
    NumberBankCard: "",
    NameBankCard: "",
    DateBankCard: "",
    CvvbankCard: "",
    IdClient: localStorage.getItem("id"),
  });
  /**
   * феч запрос на создание пополнения баланса
   */
  const CreateNewAddBalance = () => {
    AddBalance.CreateNewAddBalance(
      (data) => setActiveStepIsEnd(true),
      inputValuesForAddBalance
    );
  };
  const [activeStepIsEnd, setActiveStepIsEnd] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  /**
   * функция препеключения между подстраницами на странице пополнения баланса
   */
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ClientInfForAddBalanceForm
            setInputValuesForAddBalance={setInputValuesForAddBalance}
            inputValuesForAddBalance={inputValuesForAddBalance}
          />
        );
      case 1:
        return <Review inputValuesForAddBalance={inputValuesForAddBalance} />;
      // case 2:
      //   return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    setTitle("Пополнить баланс");
  });
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        className={classes.appBar}
      ></AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Перевод средств
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStepIsEnd ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Баланс обновлен.
                </Typography>
                <Typography variant="subtitle1">
                  Оплата на сумму {inputValuesForAddBalance.SumForAdd}{" "}
                  совершена.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? CreateNewAddBalance
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Оплатить" : "Далее"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
