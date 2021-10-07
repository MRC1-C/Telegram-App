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
      quantity: "",
      locationId: "",
      familyId: "",
      detail: {
        short_description: "",
        description: ""
      },
      producer: [{
        key: '1',
        title: 'Tab1',
        name: "",
        locationLat: "",
        locationLong: ""
      }]
  };

  constructor(parentStore) {
    makeObservable(this)
    this.parentStore = parentStore;
  }

  @action 
  setProducer(key, fields, value ){
    this.form.producer.map(pr => {
      if(pr.key === key)
      {
        pr[fields] = value;   
      }
    })
  }

  @action
  removeProducer(key){
    this.form.producer = this.form.producer.filter(pr => pr.key !== key);
  }

  @action 
  addProducer(value){
    this.form.producer.push(value);
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
  setForm(fields, fields1, value) {
    if(fields1 === 0 )
      {
        this.form[fields] = value;
      }
    else
      this.form[fields][fields1] = value;
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
