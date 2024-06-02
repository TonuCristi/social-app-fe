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
  user_id: string;
  createdAt: string;
};

export type PostT = {
  id: string;
  description: string;
  image: string;
  user_id: string;
  createdAt: string;
};

export type PostRequest = {
  description: string;
  image: string;
  user_id: string;
};

export type PostRequestFile = {
  description: string;
  image: File;
  user_id: string;
};

// ----- Like -----
export type LikeResponse = {
  _id: string;
  user_id: string;
  post_id: string;
};

export type Like = {
  id: string;
  user_id: string;
  post_id: string;
};
