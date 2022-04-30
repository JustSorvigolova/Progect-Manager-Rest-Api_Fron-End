import React, {useEffect} from "react";
import './App.css';
import {connect} from "react-redux";
import RegisterUser from "./Components/Auth-Components/Register_new_user";
import {Aut_Me, logoutization} from "./Reducers/Auth-Reducer/authReducer";
import Project from "./Components/Project-Components/Project";
import Projects from "./Components/Project-Components/Projects";
import CreateProject from "./Components/Project-Components/ProjectsCreate";
import UpdateProject from "./Components/Project-Components/ProjectUpdate";
import Tasks from "./Components/TaskComponents/Tasks";
import CreateTask from "./Components/TaskComponents/TaskCreate";
import TaskUpdate from "./Components/TaskComponents/TaskUpdate";
import {compose} from "redux";
import Login from "./Components/Auth-Components/loginPage";
import Header from "./Components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import {Preloader} from "./utils/Preloader";
import {NotFound} from "./utils/NotFound";



const App = ({Aut_Me, isFetching, token_success, username, isAuth, logoutization}) => {
    useEffect(() => {
        Aut_Me()
    }, [token_success])
     useEffect(() => {
        Aut_Me()
    }, [isAuth])
    let Logout = () => {
        logoutization()
    }
    return <>
         { isFetching ? <Preloader/> : null }
                {   isAuth ?
                    (<div className="App">
                        <Header isAuth={isAuth} username={username} Logout={Logout}/>
                        <Routes>
                            <Route index element={<Projects isAuth={isAuth}/>}/>
                            <Route path="/project/:id" element={<Project isAuth={isAuth} />}/>
                            <Route path={"/project/create"} element={<CreateProject/>}/>
                            <Route path={"/project/update/:id"} element={<UpdateProject/>}/>
                            <Route path={'/tasks/'} element={<Tasks/>}/>
                            <Route path={'/task/create/'} element={<CreateTask/>}/>
                            <Route path={'/task/update/:id'} element={<TaskUpdate/>}/>
                            <Route path="*" element={<NotFound/>}/>

                        </Routes>

                    </div>)
                    :
                    (<div>
                        <Routes>
                            <Route index element={<Login/>}/>
                            <Route path="/register" element={<RegisterUser/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes></div>)
                }
    </>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    token_success: state.auth.token_success,
    username: state.auth.username,
    isFetching: state.auth.isFetching
})

export default compose(connect(mapStateToProps, {Aut_Me, logoutization}))(App);
