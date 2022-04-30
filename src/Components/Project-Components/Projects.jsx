import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {GetAllProject} from "../../Reducers/projectReducer";
import {compose} from "redux";
import {ProjectCards} from "./ProjectCards";
import Grid from "@mui/material/Grid";


const Projects = ({GetAllProject, project_set_success, isAuth, projects}) => {

    let project = projects.map(u => (
        <ProjectCards id={u.id} title={u.title} task={u.task} start={u.start} status={u.status} end={u.end}
                      supervisor={u.supervisor} key={u.id}/>))
    useEffect(() => {
        GetAllProject()
    }, [project_set_success || isAuth || projects.length])


    return (
        <Grid container padding={3} justifyContent={"flex-start"}>
         {project}
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    project_set_success: state.project.project_set_success
})
export default compose(
    connect(mapStateToProps, {GetAllProject})
)(Projects)