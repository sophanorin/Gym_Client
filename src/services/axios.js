import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api";

//global axois configurations
const Axios = axios.create();

Axios.defaults.baseURL = URL;
Axios.defaults.headers.common["Content-Type"] = "application/json";
Axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

Axios.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response) ||
                "Something went wrong with API"
        )
);

export default Axios;
