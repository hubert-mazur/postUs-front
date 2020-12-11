import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import login from "./login/login";
import register from "./register/register";
import axios from "axios";
import dashboard from './dashboard';

axios.defaults.headers = {
  "Content-Type": "application/json",
};

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/api/login/" exact component={login} />
        </Switch>
        <Switch>
          <Route path="/api/register/" exact component={register} />
        </Switch>

        <Switch>
          <Route path="/api/dashboard/" exact component={dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
