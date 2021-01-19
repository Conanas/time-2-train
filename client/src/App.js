import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import LoadPage from './pages/LoadPage/';
import LoginPage from './pages/LoginPage/';
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/WorkoutContext';
import { LoadProvider } from './utils/LoadContext';
import { EditProvider } from './utils/EditContext';
import { UserProvider } from './utils/UserContext';
import "./App.css";

export default function App() {
  return (
    <div className="wrapper">
      <header>
        <Navbar />
      </header>
      <main className="container">
        <UserProvider>
          <LoadProvider>
            <WorkoutProvider>
              <EditProvider>
                <Router>
                  <Switch>
                    <Route exact path="/" component={StartEditTimer} />
                    <Route exact path="/workout/:id" component={StartEditTimer} />
                    <Route exact path="/load" component={LoadPage} />
                    <Route exact path="/login" component={LoginPage} />
                  </Switch>
                </Router>
              </EditProvider>
            </WorkoutProvider>
          </LoadProvider>
        </UserProvider>
      </main>
      <Footer />
    </div>
  )
}
