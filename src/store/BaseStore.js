import { makeObservable, action, observable, runInAction } from "mobx";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../helper/api";

class BaseStore {
  @observable
  name = "";
  @observable
  id = "";

  @observable
  data = [];

  @observable
  selectedItem = null;
  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }
  @action setSelectedItem(item) {
    this.selectedItem = item;
  }
  @action
  async getData() {
    try {
      let data = await getRequest("/products");
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

export default BaseStore;
