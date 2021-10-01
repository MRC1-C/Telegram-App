import { Switch, Route } from "react-router-dom";
import LoginAndRegister from "./components/LoginAndRegister";
import Product from "./components/Home/Product";

function App() {
  return (
    <>
      <Switch>
        <Route component={LoginAndRegister} path="/login" />
        <Route component={Product} path="/" />
      </Switch>
    </>
  );
}

export default App;
