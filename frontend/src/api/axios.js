import axios from "axios";

const instance = axios.create({
  baseURL: "https://expense-tracker-backend-ekke.onrender.com/api",
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default instance;
