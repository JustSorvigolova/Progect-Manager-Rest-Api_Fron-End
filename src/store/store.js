import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import {authReduser} from "../Reducers/authReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {projectReducer} from "../Reducers/projectReducer";
import {tasksReducer} from "../Reducers/taskReducer";
import {commentsReducer} from "../Reducers/commentReducer";


let rootReducer = combineReducers({
    auth: authReduser,
    project: projectReducer,
    task: tasksReducer,
    comment: commentsReducer,
    form: formReducer,
})
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;