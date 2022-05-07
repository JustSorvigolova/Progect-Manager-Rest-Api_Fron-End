import React, {useEffect} from "react";
import './App.css';
import {connect} from "react-redux";
import RegisterUser from "./Components/Auth-Components/Register_new_user";
import {Aut_Me, logoutization} from "./Reducers/Auth-Reducer/authReducer";
import Projects from "./Components/Project-Components/Projects";
import UpdateProject from "./Components/Project-Components/ProjectUpdate";
import {compose} from "redux";
import Login from "./Components/Auth-Components/loginPage";
import Header from "./Components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import {Preloader} from "./utils/Preloader";
import {NotFound} from "./utils/NotFound";
import Project from "./Components/Project-Components/Project";




const App = ({Aut_Me, isFetching, token_success, username, isAuth, logoutization}) => {
    let isauth = localStorage.getItem('isAuth')
    useEffect(() => {
        Aut_Me()
    }, [token_success])
     useEffect(() => {
        Aut_Me()
    }, [isauth])
    let Logout = () => {
        logoutization()
    }
    return <>
        {isFetching ? <Preloader/> :
            <>
            {
                isauth ?
                    (<div className="App">
                        <Header isAuth={isAuth} username={username} Logout={Logout}/>
                        <Routes>
                            <Route index element={<Projects isAuth={isAuth}/>}/>
                            <Route path="/project/:id" element={<Project/>}/>
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
    </>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    token_success: state.auth.token_success,
    username: state.auth.username,
    isFetching: state.auth.isFetching
})

export default compose(connect(mapStateToProps, {Aut_Me, logoutization}))(App);
