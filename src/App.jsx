import React, {useEffect} from "react";
import app from './App.module.css';
import {connect} from "react-redux";
import {RegisterUser} from "./Components/Auth-Components/Register_new_user";
import {Aut_Me, logoutization, Register_New_User} from "./Reducers/authReducer";
import Projects from "./Components/Project-Components/Projects";
import {compose} from "redux";
import {Route, Routes} from "react-router-dom";
import {Preloader} from "./utils/Preloader";
import {NotFound} from "./utils/NotFound";
import Project from "./Components/Project-Components/Project";
import {Header} from "./Components/Header/Header";
import Login from "./Components/Auth-Components/loginPage";


const App = ({
                 Aut_Me,
                 isFetching,
                 register_success,
                 token_success,
                 username,
                 isAuth,
                 logoutization,
                 currentUserName
             }) => {
    let isauth = localStorage.getItem('isAuth')
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
        {isauth ? <> {isFetching ? <Preloader/> :
                (<div className={app.App}>
                    <Header username={username} Logout={Logout}/>
                    <Routes>
                        <Route index element={<Projects isAuth={isAuth}/>}/>
                        <Route path="/project/:id" element={<Project currentUserName={currentUserName}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>

                </div>)}

            </>
            : <> {isFetching ? <Preloader/> :
                (<div>
                    <Routes>
                        <Route index element={<Login />}/>
                        <Route path="/register" element={<RegisterUser register_success={register_success}
                                                                       Register_New_User={Register_New_User}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes></div>)
            }
            </>
        }
    </>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    currentUserName: state.auth.username,
    token_success: state.auth.token_success,
    username: state.auth.username,
    isFetching: state.auth.isFetching,
    register_success: state.auth.register_success
})

export default compose(connect(mapStateToProps, {Aut_Me, Register_New_User, logoutization}))(App);
