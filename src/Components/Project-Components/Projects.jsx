import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {GetAllProject} from "../../Reducers/projectReducer";
import {compose} from "redux";
import {ProjectCards} from "./ProjectCards";
import Grid from "@mui/material/Grid";
import {ProjectsEmpty} from "../../utils/ProjectsEmpty";
import {ModalProps} from "../../utils/Modal";
import CreateProject from "./ProjectsCreate";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const styles = {
    position: 'fixed',
    top: '85%',
    left: '96%',
    transform: 'translate(-50%, -50%)',
    color: '#9c27b0',
    backgroundColor: '#ffffff',
    p: 4,
};


const Projects = ({GetAllProject, project_set_success, isAuth, projects, create_project_success}) => {
    const [openCreate, setOpenCreate] = useState(false);
    const OpenCreateProject = () => setOpenCreate(true);
    const CloseCreateProject = () => setOpenCreate(false);

    let project = projects.map(u => (
        <ProjectCards id={u.id} title={u.title} task={u.task} start={u.start} status={u.status} end={u.end}
                      supervisor={u.supervisor} key={u.id}/>))
    useEffect(() => {
        GetAllProject()
    }, [project_set_success || isAuth || projects.length])
    useEffect(() => {
        GetAllProject()
    }, [create_project_success])


    return (
        <>
            <Fab onClick={OpenCreateProject} sx={styles}  aria-label="add">
                <AddIcon/>
            </Fab>
            <ModalProps title={'Create Project'} open={openCreate} onClose={CloseCreateProject}
                        Components_child={<CreateProject/>}
                        onClick={CloseCreateProject}/>
            <Grid container padding={3} justifyContent={"center"}>
                {projects.length ? project :
                    <ProjectsEmpty/>
                }

            </Grid>
        </>
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    project_set_success: state.project.project_set_success,
    create_project_success: state.project.create_project_success
})
export default compose(
    connect(mapStateToProps, {GetAllProject})
)(Projects)