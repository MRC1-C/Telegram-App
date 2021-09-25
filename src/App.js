import { Component } from "react";
import Test from "./container/test";
import Panel from "./container/panel";

class App extends Component {
  render() {
    return (
      <div>
        <Test />
        <Panel />
      </div>
    );
  }
}

export default App;
