import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages';
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path exact="/">
          <StartEditTimer />
        </Route>
      </Switch>

    </Router>
  )
}
