import { get, post, put, del } from "../utils/Request";

export const getUserByUsername = (username: string) => {
  return get("/photo/v1/photo/interact/" + username);
};
