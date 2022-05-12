import {tasksAPI} from "../Api/api";
const SET_TASKS = 'task/SET_TASKS'
const SET_ONE_TASK = 'task/SET_ONE_TASK'
const TASK_CREATE_SUCCESS = 'task/TASK_CREATE_SUCCESS'
const TASK_DELETE_SUCCESS = 'task/TASK_DELETE_SUCCESS'
const TASK_UPDATE_SUCCESS = 'task/TASK_UPDATE_SUCCESS'

let initialState = {
    tasks: [],
    task: [],
    create_task_success: false,
    delete_task_success: false,
    update_task_success: false
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state, tasks: action.payload
            }
        case SET_ONE_TASK:
            return {
                ...state, task: action.payload
            }
        case TASK_CREATE_SUCCESS:
            return {
                ...state, create_task_success: action.payload
            }
        case TASK_DELETE_SUCCESS:
            return {
                ...state, delete_task_success: action.payload
            }
        case TASK_UPDATE_SUCCESS:
            return {
                ...state, update_task_success: action.payload
            }
        default:
            return state;
    }
}
/* -----------       ACTIONS     ----------- */
const set_Tasks = (payload) => ({type: SET_TASKS, payload: payload})
const setOneTask = (payload) => ({type: SET_ONE_TASK, payload: payload})
const taskCreateSuccess = (payload) => ({type: TASK_CREATE_SUCCESS, payload: payload})
const taskDeleteSuccess = (payload) => ({type: TASK_DELETE_SUCCESS, payload: payload})
const taskUpdateSuccess = (payload) => ({type: TASK_UPDATE_SUCCESS, payload: payload})

/* -----------       THUNKS     ----------- */

export const GetAllTasks = () => async (dispatch) => {
    const response = await tasksAPI.get_all_tasks();
    if (response.status === 200 || 201) {
        dispatch(set_Tasks(response.data))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(set_Tasks([]))
    } else {
        dispatch(set_Tasks([]))
    }
}
export const GetOneTask = (id) => async (dispatch) => {
    const response = await tasksAPI.get_one_task(id);
    if (response.status === 200 || 201) {
        dispatch(setOneTask(response.data))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(setOneTask([]))
    }else {
        dispatch(setOneTask([]))
    }
}
export const TaskCreate = (data) => async (dispatch) => {
    const response = await tasksAPI.create_task(data);
    if (response.status === 200 || 201) {
        dispatch(taskCreateSuccess(true))
        setTimeout(()=>{
            dispatch(taskCreateSuccess(false))
        },3000)

    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(taskCreateSuccess(false))
    }
}
export const TaskDelete = (id) => async (dispatch) => {
    const response = await tasksAPI.delete_task(id);
    if (response.status === 200 || 201) {
        dispatch(taskDeleteSuccess(true))
        setTimeout(() => {
            dispatch(taskDeleteSuccess(false))
        }, 10)
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(taskDeleteSuccess(false))
    }
}
export const TaskUpdate = (id, data) => async (dispatch) => {
    const response = await tasksAPI.update_task({id, data});
    if (response.status === 200 || 201) {
        dispatch(taskUpdateSuccess(true))
        setTimeout(()=>{
            dispatch(taskUpdateSuccess(false))
        },3000)
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(taskUpdateSuccess(false))
    }else {
        dispatch(taskUpdateSuccess(false))
    }
}