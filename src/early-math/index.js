import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";

import Report from "./report";

const rootEl = document.getElementById("root");
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );

render(Report);
if (module.hot) module.hot.accept("./report", () => render(Report));
