import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import Navbar from './components/Navbar/';
import SaveModal from './components/SaveModal/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/GlobalState';
import "./App.css";

export default function App() {
  return (
    <div className="wrapper">
      <header>
        <Navbar />
      </header>
      <main className="container">
        <WorkoutProvider>
          <Router>
            <Switch>
              <Route path exact="/" component={StartEditTimer}>
              </Route>
            </Switch>
          </Router>
          <SaveModal />
        </WorkoutProvider>
      </main>
      <Footer />
    </div>
  )
}
