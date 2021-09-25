import { observable, action, makeObservable } from "mobx";

class UserStore {
  @observable
  counter = 9;
  constructor(parentStore) {
    makeObservable(this)
    this.parentStore = parentStore;
  }
  @action
  incr() {
    this.counter++;
  }

  @action
  decr() {
    this.counter--;
  }
}

export default UserStore;
