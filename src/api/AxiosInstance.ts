import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request Interceptor: Automatically attach JWT to every Spring Boot call
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("flyeasy_token"); // Or use a cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 (Expired Token)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic to logout or refresh token
      localStorage.removeItem("flyeasy_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
