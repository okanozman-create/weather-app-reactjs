import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config, {
  API: {
    GraphQL:  {
      headers: async () => ({
        'My-Custom-Header': 'my value'
      })
    }
  }
});




Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://h3bsxlgkjnerfkp3sjrxqsj7e4.appsync-api.eu-west-1.amazonaws.com/graphql',
      region: 'eu-west-1',
      // Set the default auth mode to "apiKey" and provide the API key value
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-fsa6jh53evgxjooo6ohiktkms4'
    }
  }
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
