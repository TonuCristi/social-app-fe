import { AxiosResponse } from "axios";
import {
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
};
