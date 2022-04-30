import {commentsAPI} from "../Api/api";

const SET_COMMENTS = 'comment/SET_COMMENTS'
const SET_ONE_COMMENT = 'comment/SET_ONE_COMMENT'
const COMMENT_CREATE_SUCCESS = 'comment/COMMENT_CREATE_SUCCESS'
const COMMENT_DELETE_SUCCESS = 'comment/COMMENT_DELETE_SUCCESS'
const COMMENT_UPDATE_SUCCESS = 'comment/COMMENT_UPDATE_SUCCESS'

let initialState = {
    comments: [],
    comment: [],
    create_comment_success: false,
    delete_comment_success: false,
    update_comment_success: false
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state, comments: action.payload
            }
        case SET_ONE_COMMENT:
            return {
                ...state, comment: action.payload
            }
        case COMMENT_CREATE_SUCCESS:
            return {
                ...state, create_comment_success: action.payload
            }
        case COMMENT_DELETE_SUCCESS:
            return {
                ...state, delete_comment_success: action.payload
            }
        case COMMENT_UPDATE_SUCCESS:
            return {
                ...state, update_comment_success: action.payload
            }
        default:
            return state;
    }
}
/* -----------       ACTIONS     ----------- */

const set_Comments = (payload) => ({type: SET_COMMENTS, payload: payload})
const setOneComment = (payload) => ({type: SET_ONE_COMMENT, payload: payload})
const commentCreateSuccess = (payload) =>({type:COMMENT_CREATE_SUCCESS, payload: payload})
const commentDeleteSuccess = (payload) =>({type:COMMENT_DELETE_SUCCESS, payload: payload})
const commentUpdateSuccess = (payload) =>({type:COMMENT_UPDATE_SUCCESS, payload: payload})

/* -----------       THUNKS     ----------- */

export const GetAllComments = () => async (dispatch) => {
    const response = await commentsAPI.get_all_comments();

    if (response.status === 200 || 201) {
        dispatch(set_Comments(response.data))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(set_Comments("error"))
    }
}
export const GetOneComment = (id) => async (dispatch) => {
    const response = await commentsAPI.get_one_comment(id);
    if (response.status === 200 || 201) {
        dispatch(setOneComment(response.data))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(setOneComment("Error"))
    }
}

export const CommentCreate = (data) => async (dispatch) => {
    const response = await commentsAPI.create_comment(data);
    if (response.status ===  200 || 201) {
        dispatch(commentCreateSuccess(true))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentCreateSuccess("Error"))
    }
}
export const CommentDelete = (id) => async (dispatch) => {
    const response = await commentsAPI.delete_comment(id);
    if (response.status === 200 || 201) {
        dispatch(commentDeleteSuccess(true))
        setTimeout(()=>{
            dispatch(commentDeleteSuccess(false))
        },10)

    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentDeleteSuccess("Error"))
    }
}

export const CommentUpdate = (id,data) => async (dispatch) => {
    const response = await commentsAPI.update_comment({id, data});
    if (response.status === 200 || 201) {
        dispatch(commentUpdateSuccess(true))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentUpdateSuccess("Error"))
    }
}