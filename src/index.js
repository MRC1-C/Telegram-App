import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import RootStore from "./store/RootStore";
import { Router } from "react-router";
// import 'leaflet/dist/leaflet.css';

let rootStore = new RootStore();
ReactDOM.render(
    <Provider rootStore={rootStore}>
      <Router history={rootStore.history}>
        <App />
      </Router>
    </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
