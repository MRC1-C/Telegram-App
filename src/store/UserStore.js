import { message } from "antd";
import { observable, action, makeObservable, runInAction } from "mobx";
import { postRequest } from "../helper/api";

class UserStore {

  @observable
  loading = false;

  @observable
  isLogin = false;

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
  setFormFields(value) {
    this.formData = value;
  }
  @action
  async login() {
    this.loading = true;
    let data;
    try {
      data = await postRequest(
        process.env.REACT_APP_API_URL + "/auth/login",
        this.formData
      );
      if (data) {
        runInAction(() => {
          this.token = data?.access_token;
          this.loading = false;
          this.isLogin = true;
        });
        localStorage.setItem('accessToken', this.token)
      }
    } catch (error) {
      this.error = "error";
      message.error("Tài khoản mật khẩu không chính xác");
    }
  }

  @action
  async register() {
    //this.loading = true;
    let data;
    try {
      data = await postRequest(
        process.env.REACT_APP_API_URL + "/auth/register",
        this.formData
      );
      if (data) {
        runInAction(() => {
          this.token = data?.access_token;
          this.loading = false;
          this.isLogin = true;
        });
        localStorage.setItem('accessToken', this.token)
      }
    } catch (error) {
      this.error = "error";
      message.error("Error");
    }
  }
}

  

export default UserStore;
