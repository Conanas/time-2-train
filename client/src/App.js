import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import Container from './components/Container/';
import "./App.css";

export default function App() {
    return (
        <Container>
            <Router>
                <Switch>
                    <Route path exact="/">
                        <StartEditTimer />
                    </Route>
                </Switch>
            </Router>
        </Container>
    )
}
