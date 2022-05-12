import {authAPI} from "../Api/api";
const SET_ME = 'auth/SET_ME'
const REGISTER_NEW_USER = 'auth/REGISTER_NEW_USER'
const TOKEN = 'auth/TOKEN'
const GET_USERS = 'auth/GET_USERS'
const ISFETCHING = 'auth/ISFETCHING'

let initialState = {
    users: [],
    email: null,
    id: null,
    username: null,
    register: {
        username: null,
    },
    register_success: false,
    token: null,
    isAuth: false,
    token_success: false,
    isFetching: false
};

export const authReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_ME:
            return {
                ...state, ...action.payload, isAuth: action.isAuth
            }
        case REGISTER_NEW_USER:
            return {
                ...state, register: action.payload, register_success: action.register_success
            }
        case TOKEN:
            return {
                ...state, token: action.token, token_success: action.token_success, isAuth: action.isAuth
            }
        case GET_USERS:
            return {
                ...state, users: action.payload,
            }
        case ISFETCHING:
            return {
                ...state, isFetching: action.payload,
            }
        default:
            return state;
    }
}
const setAuthMe = (payload, isAuth) => ({type: SET_ME, payload: payload, isAuth: isAuth})
const setRegister_User = (username, register_success) => ({
    type: REGISTER_NEW_USER,
    payload: username,
    register_success: register_success
})
const setToken = (token, token_success, isAuth) => ({
    type: TOKEN, token: token, token_success: token_success, isAuth: isAuth
})
const setUsers = (payload) => ({type: GET_USERS, payload: payload})
const setFetching = (payload) => ({type: ISFETCHING, payload: payload})


/* ----------------------  THUNKS ----------------------------------------------*/

export const Aut_Me = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.status === 200 || 201) {
        dispatch(setFetching(false))
        localStorage.setItem('isAuth', 'true')
        dispatch(setAuthMe(response.data, true));
    } else {
        dispatch(setFetching(false))
        localStorage.setItem('isAuth', 'false')
    }
}
export const Get_Users = () => async (dispatch) => {
    let response = await authAPI.getUsers();
    if (response.status === 200 || 201) {
         dispatch(setFetching(false))
        dispatch(setUsers(response.data));
    }else {
        dispatch(setFetching(false))
        dispatch(setUsers(null))
    }
}
export const Register_New_User = (username, password) => async (dispatch) => {
     dispatch(setFetching(true))
    let response = await authAPI.registration(username, password);
    if (response.status === 201 || 200) {
        dispatch(setFetching(false))
        dispatch(setRegister_User(response.data,true))
    }else {
        dispatch(setFetching(false))
        dispatch(setRegister_User(null, false))
    }
}

export const Loginization = (username, password) => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await authAPI.login(username, password);
    if (response.status === 200 || 201) {
        dispatch(setFetching(false))
        localStorage.setItem('isAuth', 'true')
        localStorage.setItem('auth_token', response.data.auth_token)
        dispatch(setToken(response.data.auth_token, true, true))
    } else {
        dispatch(setFetching(false))
        localStorage.removeItem('isAuth')
        dispatch(setToken(null, false, false))
    }
}
export const logoutization = () => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await authAPI.logout();
    if (response.status === 204 || 201 || 200) {
        dispatch(setFetching(false))
        localStorage.removeItem('auth_token');
        localStorage.setItem('isAuth', 'true')
        dispatch(setToken(null, false, false))
    } else {
        dispatch(setFetching(false))
        dispatch(setToken(null, false, true))

    }
}