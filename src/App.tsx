import React from "react";
import { Nav } from "./components/header/Nav";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main";

import "styles/app.scss";

const App = () => {
  return (
    <>
    <header>
      <Nav/>
    </header>
    <Main />
    </>
  );
};

export default App;
