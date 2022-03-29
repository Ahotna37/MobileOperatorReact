import React, { useEffect } from "react";
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
import MainPageReturn from "./MainPage";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Account } from "../API/methods";
import { Link as RouterLink } from "react-router-dom";
/**
 * основная страница на которую помещаются контент с других страниц
 */
/**
 * формирование футера
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Site by Belyaew Anton
      {"."}
    </Typography>
  );
}
/**
 * стили страницы
 */
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  conteinerContent: {
    padding: theme.spacing(5, 1),
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
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  root: {
    flexGrow: 1,
  },
  linkForMe: {
    color: "inherit !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navItem: {
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function GeneralPage({ children, noHeader = false, title }) {
  const classes = useStyles();

  const logOut = () => {
    Account.logOut({}, {});
  };

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  /**
   * навигация приложения в боковой выдвигающейся панели
   */
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link className={classes.linkForMe} component={RouterLink} to="/">
          <ListItem button>Главная</ListItem>
        </Link>
        <Link
          className={classes.linkForMe}
          component={RouterLink}
          to="/CallsAndSmsPage"
        >
          <ListItem button>История</ListItem>
        </Link>

        <Link
          className={classes.linkForMe}
          component={RouterLink}
          to="/AddBalance"
        >
          <ListItem button>Пополнить баланс</ListItem>
        </Link>
        <Link className={classes.linkForMe} component={RouterLink} to="/Tariff">
          <ListItem button>Тарифы</ListItem>
        </Link>
        <Link
          className={classes.linkForMe}
          component={RouterLink}
          to="/Service"
        >
          <ListItem button>Услуги</ListItem>
        </Link>
        {localStorage.getItem("role") === "admin" ? (
          <Link
            className={classes.linkForMe}
            component={RouterLink}
            to="/ClientList"
          >
            <ListItem button>Список клиентов</ListItem>
          </Link>
        ) : null}
        <Link
          className={classes.linkForMe}
          component={RouterLink}
          //onClick = {logOut}
          to="/Authorization"
        >
          <ListItem button>Выход</ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <CssBaseline />
      {noHeader ? null : (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className="navIcon"
                color="inherit"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon></MenuIcon>
              </IconButton>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <div className="navigation">
                <Link
                  component={RouterLink}
                  className={classes.linkForMe}
                  to="/"
                >
                  {" "}
                  <Button className={classes.navItem} color="inherit">
                    Главная
                  </Button>
                </Link>
                <Link
                  className={classes.linkForMe}
                  component={RouterLink}
                  to="/CallsAndSmsPage"
                >
                  <Button className={classes.navItem} color="inherit">
                    История
                  </Button>
                </Link>
                <Link
                  className={classes.linkForMe}
                  component={RouterLink}
                  to="/AddBalance"
                >
                  <Button className={classes.navItem} color="inherit">
                    Пополнить баланс
                  </Button>
                </Link>
                <Link
                  className={classes.linkForMe}
                  component={RouterLink}
                  to="/Tariff"
                >
                  <Button className={classes.navItem} color="inherit">
                    Тарифы
                  </Button>
                </Link>
                <Link
                  className={classes.linkForMe}
                  component={RouterLink}
                  to="/Service"
                >
                  <Button className={classes.navItem} color="inherit">
                    Услуги
                  </Button>
                </Link>
                {localStorage.getItem("role") === "admin" ? (
                  <Link
                    className={classes.linkForMe}
                    component={RouterLink}
                    to="/ClientList"
                  >
                    <Button className={classes.navItem} color="inherit">
                      Список клиентов
                    </Button>
                  </Link>
                ) : null}
                <Link
                  className={classes.linkForMe}
                  component={RouterLink}
                  to="/Authorization"
                  //onClick = {logOut}
                >
                  {" "}
                  <Button className={classes.navItem} color="inherit">
                    Выход
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      )}
      {/**
       * контент со всех страниц
       */}
      <Container className={classes.conteinerContent}>{children}</Container>
      {/**
       * футер
       */}
      {noHeader ? null : (
        <Container maxWidth="md" className={classes.footer}>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
}
