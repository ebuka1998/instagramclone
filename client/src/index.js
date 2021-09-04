import React from "react";
import ReactDOM from "react-dom";
import "@material-tailwind/react/tailwind.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ApolloProvider from "./ApolloProvider";
import { AuthContextProvider } from "./context/AuthContext";

import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();