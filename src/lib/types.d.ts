// ----- User -----
export type UserResponse = {
  _id: string;
  name: string;
  email: string;
  password: string;
  birth_date: string;
  avatar: string;
  description: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  birth_date: string;
  avatar: string;
  description: string;
  createdAt: string;
};

export type UserSignupRequest = User<Omit, "id" | "createdAt">;

export type UserLoginRequest = User<
  Omit,
  "id" | "createdAt" | "name" | "birth_date" | "avatar" | "description"
>;

export type UserEditRequest = User<
  Omit,
  "id" | "email" | "password" | "createdAt"
>;

// ----- Post -----
export type PostResponse = {
  _id: string;
  description: string;
  image: string;
  createdAt: string;
};

export type PostT = {
  id: string;
  description: string;
  image: string;
  createdAt: string;
};
