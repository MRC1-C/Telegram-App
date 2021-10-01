import { makeObservable, action, observable, runInAction } from "mobx";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../helper/api";

class DemoStore {
  @observable
  name = "";
  @observable
  id = "";

  @observable
  data = [];
  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }

  @action
  async getData () {
    try {
      console.log("run store")
      let data = getRequest("/products");
      if (data) {
        runInAction(() => {
          this.data = data;
        });
      }
    } catch (error) {}
  }
  @action
  async create() {
    try {
      await postRequest(process.env.REACT_APP_API_AUTH_URL + "/products", {
        name: this.name,
      });
    } catch (error) {
      console.log(error);
    }
  }
  @action
  async delete() {
    try {
      await deleteRequest(
        process.env.REACT_APP_API_AUTH_URL + "/products/" + this.id
      );
    } catch (error) {
      console.log(error);
    }
    this.id = "";
  }
  @action
  async edit() {
    try {
      await patchRequest(
        process.env.REACT_APP_API_AUTH_URL + "/products/" + this.id,
        this.dataEdit
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default DemoStore;
