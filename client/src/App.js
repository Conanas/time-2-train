import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import TimerPage from './pages/TimerPage';
import LoadPage from './pages/LoadPage/';
import Navbar from './components/Navbar/';
import SignInOut from './components/SignInOut/';
import CreatePage from './pages/CreatePage/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/WorkoutContext';
import { LoadProvider } from './utils/LoadContext';
import { EditProvider } from './utils/EditContext';
import { UserProvider } from './utils/UserContext';
import "./App.css";

export default function App() {

  return (

    <UserProvider>
      <LoadProvider>
        <WorkoutProvider>
          <EditProvider>
            <Router>
              <div className="wrapper">
                <header>
                  <Navbar />
                </header>
                <main className="container">
                  <SignInOut />
                  <div className="container main-container">
                    <Switch>
                      <Route exact path="/" component={StartEditTimer} />
                      <Route exact path="/timer" component={TimerPage} />
                      <Route exact path="/create" component={CreatePage} />
                      <Route exact path="/load" component={LoadPage} />
                    </Switch>
                  </div>
                </main>
                <Footer />
              </div>
            </Router>
          </EditProvider>
        </WorkoutProvider>
      </LoadProvider>
    </UserProvider>

  )
}
