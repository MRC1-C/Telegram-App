import axiosClient from "../helper/api";

class UserApi {
    authLogin = (body) => {
        const url = '/auth/login';
        return axiosClient.post(url, body);
    };
    authRegister = (body) => {
        const url = '/auth/register';
        return axiosClient.post(url, body);
    }
}
const userApi = new UserApi();
export default userApi;