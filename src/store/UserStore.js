import { message } from "antd";
import { observable, action, makeObservable, runInAction } from "mobx";
import { postRequest } from "../helper/api";

class UserStore {
  @observable
  counter = 0;

  @observable
  loading = false;

  @observable
  token = null;

  @observable
  error = null;

  @observable
  formData = {
    email: "",
    password: "",
  };
  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }
  @action
  incr() {
    this.counter++;
  }
  @action
  setFormFields(fields, value) {
    this.formData[fields] = value;
  }
  @action
  decr() {
    this.counter--;
  }

  @action
  async login() {
    this.loading = true;
    let data;
    try {
      data = await postRequest(
        "http://localhost:8000/auth/login",
        this.formData
      );
      if (data) {
        runInAction(() => {
          this.token = data?.access_token;
          this.loading = false;
        });
      }
    } catch (error) {
      this.loading = false;
      this.error = "error";
      message.error("Error");
    }
  }
}

export default UserStore;
