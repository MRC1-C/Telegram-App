import { inject, observer } from "mobx-react";
import Basic from "../../Demo/Basic";

@inject("rootStore")
@observer
class Product extends Basic {
  constructor(props) {
    super(props);
    this.currentStore = props.rootStore.demoStore;
  }
  async componentDidMount() {
    await this.currentStore.getData();
    super.componentDidMount();
  }
  render() {
    return super.render();
  }
}

export default Product;
