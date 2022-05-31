import _axios from 'axios';
import objectToFormData from 'utils/objectToFormData';

const axios = _axios.create({
  withCredentials: true
});

axios.interceptors.response.use(
  (response)=> {
    return response.data;
  },
  (error)=> {
    if(!error.response) 
      return {error: {message: "Ha ocurrido un error desconocido"}};
    return {error: error.response.data};
  });

const baseURL = "http://192.168.100.6:4000/api";

const requests = {
  get: (url, config)=> 
    axios.get(`${baseURL}${url}`, config),

  postJSON: (url, data, config)=> 
    axios.post(`${baseURL}${url}`, data, 
    {...config, contentType: "application/json"}),

  postFormdata: async (url, data, config)=> 
    await axios.post(`${baseURL}${url}`, await objectToFormData(data), 
    {...config, contentType: "multipart/form-data"}),

  postUrlencoded: (url, data, config)=>
    axios.post(`${baseURL}${url}`, data, 
    {...config, contentType: "application/x-www-form-urlencoded"}),

  put: (url, data, config)=> 
    axios.put(`${baseURL}${url}`, data, config),

  delete: (url, config)=>
    axios.delete(`${baseURL}${url}`, config)
}

const User = {
  create: (data)=> 
    requests.postJSON("/user/create", data),

  login: (data)=>
    requests.postJSON("/user/login", data),
 
  logout: ()=> 
    requests.get("/user/logout"),

  current: (config)=>
    requests.get("/user/current", config)
}

const Profile = {
  current: ()=> 
    requests.get("/profile/current"),

  update: (data)=> 
    requests.postJSON("/profile/update", data)
}

const Avatar = {
  upload: (data)=> 
    requests.postFormdata("/avatar/upload", data),

  update: (data)=> 
    requests.postFormdata("/avatar/update", data),

  selectables: ()=>
    requests.get("/avatar/selectables"),

  delete: (avatarId)=>
    requests.delete(`/avatar/${avatarId}`)
}

export default {
  User,
  Avatar,
  Profile
};