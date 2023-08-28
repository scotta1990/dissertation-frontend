import axios from "axios";
import { baseUrl } from "./config";

export const getAllExercises = async (token) => {
  const url = `${baseUrl}/exercises`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};
