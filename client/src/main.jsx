import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider} from "react-redux";
import globalReducer from "./states/index.js";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: (getDeault) => getDeault()
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
)
