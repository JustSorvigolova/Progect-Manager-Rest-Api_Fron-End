import {commentsAPI} from "../Api/api";

const SET_COMMENTS = 'comment/SET_COMMENTS'
const COMMENT_CREATE_SUCCESS = 'comment/COMMENT_CREATE_SUCCESS'
const COMMENT_DELETE_SUCCESS = 'comment/COMMENT_DELETE_SUCCESS'
const COMMENT_UPDATE_SUCCESS = 'comment/COMMENT_UPDATE_SUCCESS'
let initialState = {
    comments: [],
    create_comment_success: false,
    delete_comment_success: false,
    update_comment_success: false,
    set_comment_success: false
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state, comments: action.payload, set_comment_success: action.set_comment_success
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

const set_Comments = (comments, set_comment_success) => ({
    type: SET_COMMENTS,
    payload: comments,
    set_comment_success: set_comment_success
})
const commentCreateSuccess = (payload) => ({type: COMMENT_CREATE_SUCCESS, payload: payload})
const commentDeleteSuccess = (payload) => ({type: COMMENT_DELETE_SUCCESS, payload: payload})
const commentUpdateSuccess = (payload) => ({type: COMMENT_UPDATE_SUCCESS, payload: payload})

/* -----------       THUNKS     ----------- */

export const GetAllComments = () => async (dispatch) => {
    const response = await commentsAPI.get_all_comments();
    if (response.status === 200 || 201) {
        dispatch(set_Comments(response.data, true))
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(set_Comments([], false))
    }else {
         dispatch(set_Comments([], false))
    }
}
export const CommentCreate = (data) => async (dispatch) => {
    const response = await commentsAPI.create_comment(data);
    if (response.status === 200 || 201) {
        dispatch(commentCreateSuccess(true))
        setTimeout(() => {
            dispatch(commentCreateSuccess(false))
        }, 100)
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentCreateSuccess(false))
    }
}
export const CommentDelete = (id) => async (dispatch) => {
    const response = await commentsAPI.delete_comment(id);
    if (response.status === 200 || 201) {
        dispatch(commentDeleteSuccess(true))
        setTimeout(() => {
            dispatch(commentDeleteSuccess(false))
        }, 100)
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentDeleteSuccess(false))
    }else {
        dispatch(commentDeleteSuccess(false))
    }
}
export const CommentUpdate = (id, data) => async (dispatch) => {
    const response = await commentsAPI.update_comment({id, data});
    if (response.status === 200 || 201) {
        dispatch(commentUpdateSuccess(true))
        setTimeout(() => {
            dispatch(commentUpdateSuccess(false))
        }, 100)
    } else if (response.status === 400 || 404 || 401 || 403 || 500 || 501) {
        dispatch(commentUpdateSuccess(false))
    }
}