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
  getUserById(id: string) {
    return api
      .get(`${BASE_URL}/${id}`)
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
      .then(
        ({ data }: AxiosResponse<{ user: UserResponse; message: string }>) =>
          data
      );
  },
  changeUsername(name: string, id: string) {
    return api
      .put(`${BASE_URL}/changeUsername/${id}`, { name })
      .then(
        ({ data }: AxiosResponse<{ user: UserResponse; message: string }>) =>
          data
      );
  },
  changeBirthdate(birth_date: string, id: string) {
    return api
      .put(`${BASE_URL}/changeBirthdate/${id}`, { birth_date })
      .then(
        ({ data }: AxiosResponse<{ user: UserResponse; message: string }>) =>
          data
      );
  },
  changeDescription(description: string, id: string) {
    return api
      .put(`${BASE_URL}/changeDescription/${id}`, { description })
      .then(
        ({ data }: AxiosResponse<{ user: UserResponse; message: string }>) =>
          data
      );
  },
  changeAvatar(avatar: string, id: string) {
    return api
      .put(`${BASE_URL}/changeAvatar/${id}`, { avatar })
      .then(
        ({ data }: AxiosResponse<{ user: UserResponse; message: string }>) =>
          data
      );
  },
  searchUsers(search: string | undefined) {
    return api
      .get(`${BASE_URL}/searchUsers?s=${search}`)
      .then(({ data }: AxiosResponse<UserResponse[]>) => data);
  },
};
