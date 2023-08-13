import axios from "axios";
import { baseUrl } from "./config";

export const addGoal = async (token, goal) => {
  const url = `${baseUrl}/goals/`;

  const response = await axios.post(url, goal, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getWorkoutGoal = async (token, goal) => {
  const url = `${baseUrl}/goals/workout`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};
