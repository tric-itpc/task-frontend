import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./assets/components/App/App";
import { setupStore } from "./assets/redux/store";
import "./index.sass";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);
