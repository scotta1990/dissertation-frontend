import axios from "axios";
import { baseUrl } from "./config";

export const createWorkout = async (workout, token) => {
  const url = `${baseUrl}/workouts`;

  return await axios.post(url, workout, {
    headers: { "x-access-token": token },
  });
};
