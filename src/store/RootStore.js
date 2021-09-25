import { configure, makeObservable } from "mobx";

import UserStore from "./UserStore";

configure({ enforceActions: "observed" });

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
