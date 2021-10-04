import { inject, observer } from "mobx-react";
import Basic from "../../Demo/Basic";
import ProducDetailPopup from "./ProducDetailPopup/ProductDetaiCreate";

@inject("rootStore")
@observer
class Product extends Basic {
  constructor(props) {
    super(props.rootStore.productStore, props);
    this.columns = [
      {
        title: "Id",
        dataIndex: "id",
        editable: true,
      },
      {
        title: "Name",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "Cost",
        dataIndex: "cost",
        editable: true,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        editable: true,
      },
    ];
  }

  renderDetaiCreate() {
    return <ProducDetailPopup currentStore={this.currentStore} />;
  }

  renderDetaiEdit() {
    return <ProducDetailPopup currentStore={this.currentStore} />;
  }

  render() {
    return super.render();
  }
}

export default Product;
