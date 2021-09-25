import { configure, makeObservable } from "mobx";
import ProductStore from "./ProductStore";

import UserStore from "./UserStore";

configure({ enforceActions: "observed" });

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.prodcutStore = new ProductStore(this);
  }
}

export default RootStore;
