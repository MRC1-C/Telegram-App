import { makeObservable, action, observable, runInAction } from "mobx";
import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from "../helper/api";

class ProductStore {
  @observable
  data = [];

  @observable
  id = null;

  @observable
  form = {
      name: null,
      cost: null,
      quantity: null,
      locationId: null,
      familyId: null

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
    console.log(value)
    this.form[fields] = value;
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
      await postRequest(process.env.REACT_APP_API_AUTH_URL + "/products", this.form);
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
        this.form
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductStore;
