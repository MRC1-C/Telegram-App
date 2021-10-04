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
  id = "";

  @observable
  form = {
      name: "",
      cost: "",
      quantity: ""
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
      await postRequest("/products", this.form);
    } catch (error) {
      console.log(error);
    }
  }
  @action
  async delete() {
    try {
      await deleteRequest(
        "/products/" + this.id
      );
    } catch (error) {
      console.log(error);
    }
  }
  @action
  async edit() {
    try {
      await patchRequest(
        "/products/" + this.id,
        this.form
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductStore;
