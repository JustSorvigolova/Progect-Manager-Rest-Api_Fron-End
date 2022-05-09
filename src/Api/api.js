import * as axios from "axios";

const token = localStorage.getItem('auth_token')

let instance_to_auth = axios.default.create({
    baseURL: 'http://127.0.0.1:8000/auth/',
    withCredentials: true,
    headers: {
                  'Authorization':  `token  ${token}`
     },
})

let instance_to_login = axios.default.create({
    baseURL: 'http://127.0.0.1:8000/auth/',
    withCredentials: true,
})
let instance_to_register = axios.default.create({
    baseURL: 'http://127.0.0.1:8000/auth/',
    withCredentials: true,
})
let instance = axios.default.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    withCredentials: true,
    headers: {
               'Authorization':  `token ${token}`
     }
})

/* ---------  ------   Api    -----------*/

export const authAPI = {
    me(){
        return instance_to_auth.get('users/me');
    },
    getUsers(){
        return instance_to_auth.get('users/');
    },
    login(username,password){
        return instance_to_login.post(`token/login`, {username,password});
    },
    logout(){
          return instance_to_auth.post(`token/logout`);
    },
    registration(username,password){
        return instance_to_register.post('users/',{username,password})
    }
}


export const projectsAPI = {
    get_all_projects(){
        return instance.get('projects/');
    },
    get_one_project(id){
        return instance.get(`project/${id}/`);
    },
    createProject(data){
        return instance.post(`projectscreate/`, data);
    },
     deleteProject(id){
        return instance.delete(`project/${id}/`);
    },
    updateProject(id,data){
        return instance.put(`project/${id}/`,data);
    },
}

export const tasksAPI = {
    get_all_tasks(){
        return instance.get('task/');
    },
    get_one_task(id){
        return instance.get(`task/${id}/`);
    },
    create_task(data){
        return instance.post(`task/`, data);
    },
    delete_task(id){
        return instance.delete(`task/${id}/`);
    },
    update_task({id,data}){
        return instance.put(`task/${id}/`,data);
    },
}

export const commentsAPI = {
    get_all_comments(){
        return instance.get('comment/');
    },
    get_one_comment(id){
        return instance.get(`comment/${id}/`);
    },
    create_comment(data){
        return instance.post(`comment/`, data);
    },
     delete_comment(id){
        return instance.delete(`comment/${id}/`);
    },
    update_comment({id, data}){
        return instance.put(`comment/${id}/`,data);
    },
}


