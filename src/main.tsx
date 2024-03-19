import "./index.css";
import "./mocks/browser.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { enableMockServiceWorker } from "./mocks/browser.ts";
import { Provider } from "react-redux";
import store from "./store/index.ts";

enableMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
