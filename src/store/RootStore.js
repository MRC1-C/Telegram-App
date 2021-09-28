import { configure } from "mobx";
import UserStore from "./UserStore";
import HomeStore from "./HomeStore"

configure({ enforceActions: "observed" });

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.homeStore = new HomeStore(this);
  }
}

export default RootStore;
