import axios from "axios";

const BASE_URL = "http://localhost:8080";


export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    localStorage.setItem("authUser", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
};
