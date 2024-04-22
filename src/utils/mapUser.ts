import { UserResponse } from "../lib/types";

export const mapUser = (user: UserResponse) => {
  const { _id: id, ...rest } = user;
  return { id, ...rest };
};
