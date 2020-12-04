import axios from "axios";

const request = axios.create({
  baseURL: "http://159.65.150.231:1557/"
});

export default request;
