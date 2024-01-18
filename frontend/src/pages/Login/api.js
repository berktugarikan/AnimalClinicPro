import axios from "axios";

const BASE_URL = "http://localhost:8080";


export const login = async (email, password) => {
  try {
    const response = await axios.get(`${BASE_URL}/login/${email}/${password}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};