import axios from "axios"

axios.defaults.withCredentials = true

const API = import.meta.env.VITE_HOST_API;

export const register_request = user => axios.post(`${API}auth/register`, user)
export const login_request = user => axios.post(`${API}auth/login`, user)
export const verify_token_request = token => axios.get(`${API}auth/verify`, {
    headers: {
        "x-access-token": token
    }
})