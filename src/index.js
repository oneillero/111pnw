import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe('pk_test_51NRzmyHhbdbWHAwHiRTKCZcsPbQt6noUZznVWHEdv0YRgIbWFoPcv0dfV2cTkWlRBTVTAB2Ez1qfSpEzswnU7Uie00jl5j3GKE');

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
    <UserProvider>
      <App />
    </UserProvider>
    </Elements>
  </React.StrictMode>
);
