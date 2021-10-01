import { configure } from "mobx";
import UserStore from "./UserStore";
import HomeStore from "./HomeStore"
import { createBrowserHistory } from "history";
import DemoStore from "./DemoStore";

configure({ enforceActions: "observed" });


class RootStore {
  constructor() {
    this.history = createBrowserHistory();
    this.userStore = new UserStore(this);
    this.homeStore = new HomeStore(this);
    this.demoStore = new DemoStore(this);
  }
}

export default RootStore;
