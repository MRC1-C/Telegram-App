import { makeObservable, action, observable, runInAction } from "mobx";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../helper/api";

class UserInfoStore {
  @observable
  data = [];

  @observable
  id = null;

  @observable
  form = {
      name: null,
  };

  constructor(parentStore) {
    makeObservable(this)
    this.parentStore = parentStore;
  }

  @action
  setId(value) {
    this.id = value;
  }

  @action
  setFormEdit(value) {
    this.form = value;
  }

  @action
  setForm(fields, value) {
    this.form[fields] = value;
  }
  @action
  async getData() {
    try {
      let data = await getRequest("/locations");
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
      await postRequest(process.env.REACT_APP_API_AUTH_URL + "/locations", this.form);
    } catch (error) {
      console.log(error);
    }
  }
  @action
  async delete() {
    try {
      await deleteRequest(
        process.env.REACT_APP_API_AUTH_URL + "/locations/" + this.id
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
        process.env.REACT_APP_API_AUTH_URL + "/locations/" + this.id,
        this.form
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserInfoStore;
