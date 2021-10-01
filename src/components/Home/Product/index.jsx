import { inject, observer } from "mobx-react";
import Basic from "../../Demo/Basic";
import ProducDetailPopup from "./ProducDetailPopup";

@inject("rootStore")
@observer
class Product extends Basic {
  constructor(props) {
    super(props.rootStore.demoStore, props);
  }
  renderDetailData() {
    return <ProducDetailPopup currentStore={this.currentStore} />;
  }
  render() {
    return super.render();
  }
}

export default Product;
