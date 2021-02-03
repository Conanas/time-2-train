import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useStayAwake from "use-stay-awake";
import 'materialize-css/dist/css/materialize.min.css';
import HomePage from './pages/HomePage/';
import CreatePage from './pages/CreatePage/';
import EditPage from './pages/EditPage'
import TimerPage from './pages/TimerPage';
import LoadPage from './pages/LoadPage/';
import Navbar from './components/Navbar/';
import HelloUser from './components/HelloUser/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/contexts/WorkoutContext';
import { LoadProvider } from './utils/contexts/LoadContext';
import { EditProvider } from './utils/contexts/EditContext';
import { UserProvider } from './utils/contexts/UserContext';
import "./App.css";

export default function App() {
  const device = useStayAwake();
  useEffect(() => {
    device.preventSleeping();
  }, [])
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
                  <div className="row">
                    <HelloUser />
                  </div>
                  <div className="row">
                    <Switch>
                      <Route exact path="/edit" component={EditPage} />
                      <Route exact path="/timer" component={TimerPage} />
                      <Route exact path="/create" component={CreatePage} />
                      <Route exact path="/load" component={LoadPage} />
                      <Route exact path="*" component={HomePage} />
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
