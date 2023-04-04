import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: { id: "957902342" }
});

export default apiInstance