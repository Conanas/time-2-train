import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import LoadPage from './pages/LoadPage/';
import Navbar from './components/Navbar/';
import SignInOut from './components/SignInOut/';
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
            <div className="wrapper">
              <header>
                <Navbar />
              </header>
              <main className="container">
                <SignInOut />
                <div className="container main-container">
                  <Router>
                    <Switch>
                      <Route exact path="/" component={StartEditTimer} />
                      <Route exact path="/workout/:id" component={StartEditTimer} />
                      <Route exact path="/load" component={LoadPage} />
                    </Switch>
                  </Router>
                </div>
              </main>
              <Footer />
            </div>
          </EditProvider>
        </WorkoutProvider>
      </LoadProvider>
    </UserProvider>
  )
}
