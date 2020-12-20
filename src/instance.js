import axios from "axios";

const development = "http://localhost:3000";
const production = "https://postus-be.herokuapp.com";
const url = process.env.NODE_ENV === "production" ? production : development;

axios.defaults.baseURL = `${url}`;

export default axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("jwt"),
  },
});
