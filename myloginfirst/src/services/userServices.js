import http from "./httpServices";
// import apiUrl from "../config.json";

const apiEndpoint = "http://localhost:3000/new" + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
