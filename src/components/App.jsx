import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "@pages/Home";

import "@styles/Global.scss";
import "@styles/SweetAnimations.scss";
import Admin from "@pages/Admin";
import Panel from "@pages/Panel";
import Post from "@components/Post/Post";
import Test from "@pages/Test";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/panel">
          <Panel />
        </Route>
        <Route exact path="/posts/:postId">
          <Post />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
