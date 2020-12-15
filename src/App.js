import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import login from "./components/login/login";
import register from "./components/register/register";
import axios from "axios";
import Nav from "./components/nav/nav";
import Wall from "./components/wall/wall";
import Explore from "./components/explore/explore";
import Dashboard from "./components/dashboard/dashboard";
import "./App.css";

axios.defaults.headers = {
  "Content-Type": "application/json",
  "auth-token": localStorage.getItem("jwt")
};

function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={login} />
          <Route path="/login/" exact component={login} />
          <Route path="/register/" exact component={register} />
        </Switch>
        <Switch>
          <Route
            path="/api/dashboard/"
            exact
            render={(props) => (
              <div>
                <Nav />
                <Dashboard />
              </div>
            )}
          />
          <Route
            path="/api/wall/"
            exact
            render={(props) => (
              <div>
                <Nav />
                <Wall />
              </div>
            )}
          />
          <Route
            path="/api/explore/"
            exact
            render={(props) => (
              <div>
                <Nav />
                <Explore />
              </div>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
