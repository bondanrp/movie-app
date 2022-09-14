import axios from "axios";
import { ACCESSTOKEN, BASEURL } from "@env";

const securedApi = axios.create({
  baseURL: BASEURL,
  headers: {
    ["Content-Type"]: "application/json;charset=utf-8",
    ["Authorization"]: `Bearer ${ACCESSTOKEN}`,
  },
});

module.exports = { securedApi };
