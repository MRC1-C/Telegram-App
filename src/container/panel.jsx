import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class Panel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      rootStore: { userStore },
    } = this.props;
    return (
      <div className="App">
        {/* <div>
          <button onClick={() => userStore.incr()}>Click 2</button>
        </div> */}
      </div>
    );
  }
}

export default Panel;
