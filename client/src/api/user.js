import axios from "axios"

axios.defaults.withCredentials = true

const API = import.meta.env.VITE_HOST_API;
const TOKEN = localStorage.getItem("token");

axios.defaults.headers.common['x-access-token'] = TOKEN;

export const get_users_request = user => axios.get(`${API}users`, user)
export const get_user_by_id_request = id => axios.get(`${API}users/${id}`)
export const store_user_request = user => axios.post(`${API}users`, user)
export const update_user_request = user => axios.put(`${API}users/${user.id}`, user)
export const delete_user_request = user => axios.delete(`${API}users/${user.id}`)
