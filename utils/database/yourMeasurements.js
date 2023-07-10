import axios from "axios";
import { baseUrl } from "./config";

export const getMeasurementTypes = async (token) => {
  const url = `${baseUrl}/yourMeasurements/types`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getMeasurementsProfile = async (token) => {
  const url = `${baseUrl}/yourMeasurements/profile`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const getRecentMeasurementsByType = async (token, measurementTypeId) => {
  const url = `${baseUrl}/yourMeasurements?measurementTypeId=${measurementTypeId}`;

  const response = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const createMeasurement = async (token, measurement) => {
  const url = `${baseUrl}/yourMeasurements/`;

  const response = await axios.post(url, measurement, {
    headers: { "x-access-token": token },
  });
  return response.data;
};
