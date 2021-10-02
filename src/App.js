import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginAndRegister from "./components/LoginAndRegister";

function App() {
  return (
    <Switch>
        <Route component={LoginAndRegister} path="/login" />
        <Route component={Home} path="/" />
    </Switch>
  );
}

export default App;
