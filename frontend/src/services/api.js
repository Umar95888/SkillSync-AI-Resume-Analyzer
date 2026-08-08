import axios from "axios";

const API = axios.create({
  baseURL: "https://skillsync-ai-resume-analyzer-ed3n.onrender.com",
});

export default API;