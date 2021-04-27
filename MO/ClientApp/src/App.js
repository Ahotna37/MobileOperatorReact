import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Authorization from "./components/Authorization";
// import Button from '@material-ui/core/Button';
import LayoutGeneralPage from "./components/LayoutGeneralPage";
import MainPage from "./components/MainPage";
import CallsAndSmsPage from "./components/CallsAndSmsPage";
import AddBalance from "./components/AddBalance";
import Tariff from "./components/Tariff";
import ClientList from "./components/ClientList";
import Service from "./components/Service";
import { useLocation } from "react-router-dom";

/**
 * файл загрузки прокта содержащий роутинг между всеми страницами
 */
export default function App() {
  const url = useLocation();
  const [title, setTitle] = useState("Главная");
  /**
   *определение всех роутов в приложении
   */
  return (
    <LayoutGeneralPage
      title={title}
      noHeader={url.pathname.toLocaleLowerCase().includes("/authorization")}
    >
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <MainPage title={title} setTitle={setTitle} {...props}>
              {" "}
            </MainPage>
          )}
          exact
        />
        <Route path="/authorization" component={Authorization} exact />
        <Route
          path="/CallsAndSmsPage"
          render={(props) => (
            <CallsAndSmsPage title={title} setTitle={setTitle} {...props}>
              {" "}
            </CallsAndSmsPage>
          )}
          exact
        />
        <Route
          path="/AddBalance"
          render={(props) => (
            <AddBalance title={title} setTitle={setTitle} {...props}>
              {" "}
            </AddBalance>
          )}
          exact
        />
        <Route
          path="/Tariff"
          render={(props) => (
            <Tariff title={title} setTitle={setTitle} {...props}>
              {" "}
            </Tariff>
          )}
          exact
        />
        <Route
          path="/ClientList"
          render={(props) => (
            <ClientList title={title} setTitle={setTitle} {...props}>
              {" "}
            </ClientList>
          )}
          exact
        />
        <Route
          path="/Service"
          render={(props) => (
            <Service title={title} setTitle={setTitle} {...props}>
              {" "}
            </Service>
          )}
          exact
        />
      </Switch>
    </LayoutGeneralPage>
  );
}
