import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:1337/"
});

export default request;
