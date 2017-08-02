import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";

import EarlyMathReport from "./early-math/report";
import CantorReport from "./cantor/report";

const rootEl = document.getElementById("root");
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );

let report;
switch (document.location.pathname) {
  case "/":
  case "/early-math":
    report = EarlyMathReport;
    break;
  case "/cantor":
    report = CantorReport;
}
render(report);
if (module.hot) {
  module.hot.accept("./early-math/report", () => render(EarlyMathReport));
  module.hot.accept("./cantor/report", () => render(CantorReport));
}
