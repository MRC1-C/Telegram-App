import { configure } from "mobx";
import UserStore from "./UserStore";
import { createBrowserHistory } from "history";
import ProductStore from "./ProductStore"

configure({ enforceActions: "observed" });


class RootStore {
  constructor() {
    this.history = createBrowserHistory();
    this.userStore = new UserStore(this);
    this.productStore = new ProductStore(this);
  }
}

export default RootStore;
