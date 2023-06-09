import axios from "axios";

const authenticate = async (mode, email, password) => {
  const url = `http://192.168.1.110:3000/api/user/${mode}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  return response.data.token;
};

export const createUser = (email, password) => {
  return authenticate("register", email, password);
};

export const login = (email, password) => {
  return authenticate("login", email, password);
};
