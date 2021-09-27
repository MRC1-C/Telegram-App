import { message } from "antd";
import { observable, action, makeObservable, runInAction } from "mobx";
import userApi from "../service/UserService";

class UserStore {

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
  setFormFields(value) {
    this.formData = value;
  }
  @action
  async login() {
    this.loading = true;
    let data;
    try {
      data = await userApi.authLogin(
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
      message.error("Tài khoản mật khẩu không chính xác");
    }
  }

  @action
  async register(){
    let data;
    try {
      data = await userApi.authRegister(
        this.formData
      );
      if(data){
        this.token = data.access_token
      }
    } catch (error) {
      message.error(error)
    }
  }
  
}

export default UserStore;
