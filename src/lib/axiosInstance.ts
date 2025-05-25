import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const axiosInstance = axios.create({
  baseURL: "http://192.168.175.249:5001/api",
  timeout: 10000,
})

// ✅ Attach token from AsyncStorage to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
