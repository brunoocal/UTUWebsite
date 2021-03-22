import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "@pages/Home";
import Test from "./CKEditor/Editor.jsx";
import "@styles/Global.scss";
import "@styles/SweetAnimations.scss";
import Admin from "@pages/Admin";
import Panel from "@pages/Panel";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />

          <Test></Test>
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/panel">
          <Panel />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
