import React, { useEffect, useState, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PageA } from "./pages/pageA";
import { PageB } from "./pages/pageB";
import {LoginPage} from "./pages/loginPage"

import{ SessionProvider} from "./common"


function App() {
  return (
    <>
    <SessionProvider>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={LoginPage}/>
          <Route path="/pageB" component={PageB} />
        </Switch>
      </HashRouter>
    </SessionProvider>
    </>
  );
}

export default App;
