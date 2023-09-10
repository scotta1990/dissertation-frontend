import axios from "axios";
import { baseUrl } from "./config";

export const getAllGoals = async (token) => {
  const url = `${baseUrl}/goals/`;
  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const addGoal = async (token, goal) => {
  const url = `${baseUrl}/goals/`;

  const response = await axios.post(url, goal, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const updateGoal = async (token, goalId, values) => {
  const url = `${baseUrl}/goals/${goalId}`;

  const response = await axios.put(url, values, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getWorkoutGoal = async (token) => {
  const url = `${baseUrl}/goals/workout`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getGoalByItemId = async (token, itemId) => {
  const url = `${baseUrl}/goals/specific?itemId=${itemId}`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getGoalRecommendation = async (token, type, itemId) => {
  const url = `${baseUrl}/goals/recommendation/${type}?itemId=${itemId}`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};
