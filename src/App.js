import { Component } from "react";
import Test from "./container/test";
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class App extends Component {
  render() {
    return (
      <div>
        {this.props.rootStore.userStore.counter}
        <Test />
      </div>
    );
  }
}

export default App;
