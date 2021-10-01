import { observable, makeObservable, action } from "mobx";
import { getRequest } from "../helper/api";

class UserStore {

  @observable
  isVisibleModalCreateTeam = false;

  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }
  @action
  async product(){
    try {
      let data = getRequest(
        process.env.REACT_APP_API_AUTH_URL + '/products'
      )
      if(data){
        return data;
      }
    } catch (error) {
      
    }
  }
}

  

export default UserStore;
