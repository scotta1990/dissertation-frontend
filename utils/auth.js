import axios from "axios";
import { baseUrl } from "./database/config";

const authenticate = async (mode, email, password) => {
  const url = `${baseUrl}/user/${mode}`;

  return await axios.post(
    url,
    {
      email: email,
      password: password,
    },
    { timeout: 900 }
  );
};

export const createUser = async (email, password) => {
  return await authenticate("register", email, password);
};

export const login = async (email, password) => {
  return await authenticate("login", email, password);
};
