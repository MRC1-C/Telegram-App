import { observable, makeObservable } from "mobx";

class UserStore {

  @observable
  isVisibleModalCreateTeam = false;

  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }
}

  

export default UserStore;
