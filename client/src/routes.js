import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PriceMatch from "./Pages/pricematch";
import Home from "./Pages/home";
import App from "./App";

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />

      <Route path="/pricematch" exact component={PriceMatch} />
    </div>
  </Router>
);
