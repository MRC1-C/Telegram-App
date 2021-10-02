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
        key: "id",
        title: "Id",
        dataIndex: "id",
        editable: true,
      },
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        editable: true,
      },
      {
        key: "cost",
        title: "Cost",
        dataIndex: "cost",
        editable: true,
      },
      {
        key: "quantity",
        title: "Quantity",
        dataIndex: "quantity",
        editable: true,
      },
      {
        key: "locationId",
        title: "LocationId",
        dataIndex: "locationId",
        editable: true,
      },
      {
        key: "familyId",
        title: "FamilyId",
        dataIndex: "familyId",
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
