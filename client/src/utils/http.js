import axios from "axios";

axios.interceptors.request.use(config => {
  if (localStorage.jwtToken) {
    config.headers.Authorization = localStorage.jwtToken;
    // console.log(config);
  }
  return config;
});

export default axios;
