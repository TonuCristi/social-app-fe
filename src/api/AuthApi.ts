import { AxiosResponse } from "axios";
import {
  UserEditRequest,
  UserLoginRequest,
  UserResponse,
  UserSignupRequest,
} from "../lib/types";
import api from "../config/api";

const BASE_URL = "/users";

export const AuthApi = {
  signup(user: UserSignupRequest) {
    return api
      .post(`${BASE_URL}/signup`, user)
      .then(({ data }: AxiosResponse<string>) => data);
  },
  login(user: UserLoginRequest) {
    return api
      .post(`${BASE_URL}/login`, user)
      .then(({ data }: AxiosResponse<string>) => data);
  },
  getUser() {
    return api
      .get(`${BASE_URL}`)
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
  changePassword(
    passwords: {
      oldPassword: string;
      newPassword: string;
      newPasswordRepeat: string;
    },
    id: string
  ) {
    return api
      .put(`${BASE_URL}/changePassword/${id}`, passwords)
      .then(({ data }: AxiosResponse<{ message: string }>) => data);
  },
  changeEmail(email: string, id: string) {
    return api
      .put(`${BASE_URL}/changeEmail/${id}`, { email })
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
  editUser(user: UserEditRequest, id: string) {
    return api
      .put(`${BASE_URL}/updateUser/${id}`, user)
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
};
