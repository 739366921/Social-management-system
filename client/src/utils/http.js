import axios from "axios";
import store from "../store";

axios.interceptors.request.use(
  config => {
    store.dispatch("setLoading", true);
    if (localStorage.jwtToken) {
      config.headers.Authorization = localStorage.jwtToken;
      // console.log(config);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.dispatch("setLoading", false);
    return response;
  },
  error => {
    store.dispatch("setLoading", false);
    return Promise.reject(error);
  }
);

export default axios;
