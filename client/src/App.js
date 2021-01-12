import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import LoadPage from './pages/LoadPage/';
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
              <Route exact path="/" component={StartEditTimer} />
              <Route exact path="/load" component={LoadPage} />
            </Switch>
          </Router>
          <SaveModal />
        </WorkoutProvider>
      </main>
      <Footer />
    </div>
  )
}
