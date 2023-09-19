import axios from "axios";
import { baseUrl } from "./config";

export const getFeatures = async () => {
  const url = `${baseUrl}/features`;

  const response = await axios.get(url);
  return response.data;
};

export const toggleFeatureById = async (token, id) => {
  const url = `${baseUrl}/features/admin/toggle`;

  const response = await axios.post(
    url,
    { id: id },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return response.data;
};
