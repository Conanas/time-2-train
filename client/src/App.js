import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useStayAwake from "use-stay-awake";
import 'materialize-css/dist/css/materialize.min.css';
import HomePage from './pages/HomePage/';
import CreatePage from './pages/CreatePage/';
import EditPage from './pages/EditPage'
import TimerPage from './pages/TimerPage';
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/contexts/WorkoutContext';
import { EditProvider } from './utils/contexts/EditContext';
import "./App.css";

export default function App() {
  const device = useStayAwake();
  useEffect(() => {
    device.preventSleeping();
  }, [])
  return (
    <WorkoutProvider>
      <EditProvider>
        <Router>
          <div className="wrapper">
            <header>
              <Navbar />
            </header>
            <main className="container">
              <div className="row">
                <Switch>
                  <Route exact path="/edit" component={EditPage} />
                  <Route exact path="/timer" component={TimerPage} />
                  <Route exact path="/create" component={CreatePage} />
                  <Route exact path="*" component={HomePage} />
                </Switch>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </EditProvider>
    </WorkoutProvider>
  )
}
