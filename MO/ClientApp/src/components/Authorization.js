import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ClientListPage from "./ClientList";
import { Account } from "../API/methods";
/**
 * стили страницы
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    //maxWidth:"30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
  registr: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function SignIn() {
  //для всего
  const classes = useStyles();
  //проверка авторизации
  const onClickCheckAuthorisation = () => {
    CheckAuthorisationUser();
  };

  /**
   * феч запрос на авторизацию клиента
   */
  async function CheckAuthorisationUser() {
    let result = await fetch(
      "https://localhost:5001/api/Account/isAuthenticated",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-control-expose-headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
      }
    );
    result = await result.json();
    if ("error" in result) {
      setErrors(result.error);
    }
    return result;
  }

  //Авторизация
  const [
    inputValuesForAuthorisation,
    setInputValuesForAuthorisation,
  ] = React.useState({
    LoginPhoneNumber: "",
    Password: "",
  });
  const handleChangeInputForAuthorisation = (event) => {
    const { value, name } = event.target;
    setInputValuesForAuthorisation((prev) => ({ ...prev, [name]: value }));
  };
  const onClickAuthorisation = () => {
    authorisationUser();
  };
  const returnClientSuccess = (data) => {
    localStorage.setItem("id", data.userId);
    localStorage.setItem("role", data.role);
    document.location.replace("/");
  };

  const authorisationUserSuccess = (data) => {
    if ("error" in data) {
      setErrors(data.error);
    } else {
      Account.returnClient(returnClientSuccess);
    }
  };

  const authorisationUser = () => {
    Account.auth((data) => authorisationUserSuccess(data), {
      LoginPhoneNumber: inputValuesForAuthorisation.LoginPhoneNumber,
      Password: inputValuesForAuthorisation.Password,
    });
  };

  //для модалки Регистрация
  const [open, setOpen] = React.useState(false);
  const [inputValuesForRegister, setInputValuesForRegister] = React.useState({
    LoginPhoneNumber: "",
    Password: "",
    PasswordConfirm: "",
    NameClient: "",
    SurNameClient: "",
    PassportClient: "",
    DateOfBirthClient: "2021-01-01",
    nameOrganisation: "",
    itn: "",
    legalAddress: "",
    dateStartWorkOrganisation: "2021-01-01",
  });
  const handleChangeInputForRegister = (event) => {
    const { value, name } = event.target;
    setInputValuesForRegister((prev) => ({ ...prev, [name]: value }));
  };
  const onClickCreate = () => {
    createUser();
  };
  const createUserSuccess = (data) => {
    if ("error" in data) {
      setErrors(data.error);
    } else {
      Account.returnClient(returnClientSuccess);
    }
  };
  const createUser = () => {
    Account.createClient((data) => createUserSuccess(data), {
      LoginPhoneNumber: inputValuesForRegister.LoginPhoneNumber,
      Password: inputValuesForRegister.Password,
      PasswordConfirm: inputValuesForRegister.PasswordConfirm,
      //физ лицо
      NameClient: inputValuesForRegister.NameClient,
      SurNameClient: inputValuesForRegister.SurNameClient,
      PassportClient: inputValuesForRegister.PassportClient,
      DateOfBirthClient: inputValuesForRegister.DateOfBirthClient,
      //юридическое лицо
      nameOrganisation: inputValuesForRegister.nameOrganisation,
      legalAddress: inputValuesForRegister.legalAddress,
      itn: inputValuesForRegister.itn,
      dateStartWorkOrganisation:
        inputValuesForRegister.dateStartWorkOrganisation,
    });
  };

  //открытие модалки
  const [errors, setErrors] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //для радиокнопки
  const [valueRB, setValueRadioTypeClient] = React.useState("phys");

  const handleChangeRadioTypeClient = (event) => {
    setValueRadioTypeClient(event.target.value);
  };
  /**
   * разметка страницы
   */
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="LoginPhoneNumber"
            autoComplete="login"
            value={inputValuesForAuthorisation.LoginPhoneNumber}
            onChange={handleChangeInputForAuthorisation}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Пароль"
            type="password"
            id="password"
            value={inputValuesForAuthorisation.Password}
            onChange={handleChangeInputForAuthorisation}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить"
          /> */}
          <List component="nav" aria-label="main mailbox folders">
            {errors.map((error) => (
              <ListItem>
                <ListItemText className={classes.error} primary={error} />
              </ListItem>
            ))}
          </List>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={onClickAuthorisation}
          >
            Войти
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            className={classes.registr}
          >
            Регистрация
          </Button>
          {/* <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={CheckAuthorisationUser}
            className={classes.submit}
          >
            Проверка
          </Button> */}
          <Modal
            style={{ inset: "30%" }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paperModal}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Тип клиента</FormLabel>
                  <RadioGroup
                    aria-label="Тип клиента"
                    name="Тип"
                    value={valueRB}
                    onChange={handleChangeRadioTypeClient}
                  >
                    <FormControlLabel
                      value="phys"
                      control={<Radio />}
                      label="Физическое лицо"
                    />
                    <FormControlLabel
                      value="legal"
                      control={<Radio />}
                      label="Юридическое лицо"
                    />
                  </RadioGroup>
                </FormControl>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="loginPhoneNumber"
                      label="Логин"
                      name="LoginPhoneNumber"
                      autoComplete="loginPhoneNumber"
                      value={inputValuesForRegister.LoginPhoneNumber}
                      onChange={handleChangeInputForRegister}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={
                        valueRB === "phys" ? "NameClient" : "nameOrganisation"
                      }
                      label={
                        valueRB === "phys" ? "Имя" : "Название организации"
                      }
                      type="name"
                      id="name"
                      autoComplete="name"
                      value={
                        valueRB === "phys"
                          ? inputValuesForRegister.NameClient
                          : inputValuesForRegister.nameOrganisation
                      }
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={
                        valueRB === "phys" ? "SurNameClient" : "legalAddress"
                      }
                      label={
                        valueRB === "phys" ? "Фамилия" : "Юридический адрес"
                      }
                      type="surName"
                      id="surName"
                      autoComplete="surName"
                      value={
                        valueRB === "phys"
                          ? inputValuesForRegister.SurNameClient
                          : inputValuesForRegister.legalAddress
                      }
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Password"
                      label="Пароль"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={inputValuesForRegister.Password}
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="PasswordConfirm"
                      label="Подтверждение пароля"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={inputValuesForRegister.PasswordConfirm}
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={valueRB === "phys" ? "PassportClient" : "itn"}
                      label={
                        valueRB === "phys" ? "Серия и номер паспорта" : "ИНН"
                      }
                      type="passportClient"
                      id="passportClient"
                      autoComplete="passportClient"
                      value={
                        valueRB === "phys"
                          ? inputValuesForRegister.PassportClient
                          : inputValuesForRegister.itn
                      }
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="date"
                      label={
                        valueRB === "phys" ? "Дата рождения" : "Начало работы"
                      }
                      type="date"
                      defaultValue="2021-01-01"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name={
                        valueRB === "phys"
                          ? "DateOfBirthClient"
                          : "dateStartWorkOrganisation"
                      }
                      value={
                        valueRB === "phys"
                          ? inputValuesForRegister.DateOfBirthClient
                          : inputValuesForRegister.dateStartWorkOrganisation
                      }
                      onChange={handleChangeInputForRegister}
                    />
                  </Grid>

                  <List component="nav" aria-label="main mailbox folders">
                    {errors.map((error) => (
                      <ListItem>
                        <ListItemText
                          className={classes.error}
                          primary={error}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    //type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={onClickCreate}
                  >
                    Создать клиента
                  </Button>
                </Grid>
              </div>
            </Fade>
          </Modal>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Вспомнить пароль
              </Link> */}
            </Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
