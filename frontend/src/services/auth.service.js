import axios from "axios";

const API_URL = "http://localhost:3000/";

const register = (name, email, password) => {
    return axios.post(API_URL + "users", {
        name: name,
        email: email,
        password: password,
    });
};


const AuthService = {
    register
}

export default AuthService;