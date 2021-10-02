import { message } from "antd";
import { observable, action, makeObservable, runInAction } from "mobx";
import { postRequest } from "../helper/api";

class UserStore {

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
    try {
      let data = await postRequest(
        process.env.REACT_APP_API_AUTH_URL + "/auth/login",
        this.formData
      );
      if (data) {
        localStorage.setItem('accessToken', data?.access_token)
        this.parentStore.history.push('/products')
      }
    } catch (error) {
      message.error("Tài khoản mật khẩu không chính xác");
    }
  }

  @action
  async register() {
    try {
      let data = await postRequest(
        process.env.REACT_APP_API_AUTH_URL + "/auth/register",
        this.formData
      );
      if (data) {
        runInAction(() => {
          this.loading = false;
        });
        localStorage.setItem('accessToken', data?.access_token)
        this.parentStore.history.push('/products')
      }
    } catch (error) {
      message.error("Đăng ký không thành công");
    }
  }
}

  

export default UserStore;
