import axios from "axios";
import { baseUrl } from "./config";

export const createWorkout = async (workout, token) => {
  const url = `${baseUrl}/workouts`;

  return await axios.post(url, workout, {
    headers: { "x-access-token": token },
  });
};

export const getAllWorkouts = async (token) => {
  const url = `${baseUrl}/workouts`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });

  return response.data;
};

export const getExerciseData = async (token) => {
  const url = `${baseUrl}/workouts/exercise/data`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });

  return response.data;
};
