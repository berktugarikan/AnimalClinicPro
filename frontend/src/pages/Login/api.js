import axios from "axios";

const BASE_URL = "http://localhost:8080";


export const login = async (username, password) => {
    await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password
    }).then(response => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);
    });
};
