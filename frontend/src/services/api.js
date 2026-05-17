import axios from "axios";

const api = axios.create({
  baseURL: "https://foodie-hub-h53n-bm3olo1kz-rijaranis-projects.vercel.app",
});

export default api;