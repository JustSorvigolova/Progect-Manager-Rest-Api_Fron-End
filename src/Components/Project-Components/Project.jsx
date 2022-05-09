import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {GetOneProject, ProjectDelete} from "../../Reducers/projectReducer";
import {TaskDelete} from "../../Reducers/taskReducer";
import {compose} from "redux";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Card, CardContent, Divider, IconButton, List, ListItemText, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {SuccessDeletelAlert} from "../../utils/SuccessDeleteAlert";
import CreateTask from "../TaskComponents/TaskCreate";
import {ModalProps} from "../../utils/Modal";
import UpdateTask from "../TaskComponents/TaskUpdate";
import {CheckedTitleText} from "../../utils/CheckedTitleText";
import {NotFound} from "../../utils/NotFound";
import {useParams} from "react-router-dom";
import UpdateProject from "./ProjectUpdate";
import {CommentCreate, CommentDelete, GetAllComments} from "../../Reducers/commentReducer";
import {Comments} from "../CommentComponents/Comments";
import proj from './ProjectCreate.module.css'

const Project = (props) => {
    const {id} = useParams()
    const [open, setOpen] = useState(false);
    const [openUpdateProject, setOpenUpdateProject] = useState(false);
    const OpenUpdate = () => setOpenUpdateProject(true);
    const CloseUpdate = () => setOpenUpdateProject(false);
    const [openEdit, setOpenEdit] = useState(false);
    const OpenAddTask = () => setOpen(true);
    const CloseAddTask = () => setOpen(false);
    const OpenEditTask = (id, title_task) => {
        setOpenEdit(true);
        localStorage.setItem('id', id)
        localStorage.setItem('title_task', title_task)
    }
    const CloseEditTask = () => setOpenEdit(false);
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.delete_task_success])
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.create_task_success])
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.update_task_success])
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.update_project_success])
    useEffect(() => {
        props.GetAllComments()
    }, [props.comments.length])
    useEffect(() => {
        props.GetAllComments()
    }, [props.update_comment_success])
    useEffect(() => {
        props.GetAllComments()
    }, [props.delete_comment_success])
    useEffect(() => {
        props.GetAllComments()
    }, [props.create_comment_success])
    let Delete_task = (id) => {
        props.TaskDelete(id)
    }

    let Delete_projects = () => {
        props.ProjectDelete(id)
    }
    let developers = new Array(props.project.developers).join()
    let developer_response = () => {
        if (developers.length / 2 > 30) {
            let data = developers.length / 2 - 3
            let data_1 = developers.slice(0, data);
            let data_2 = developers.slice(data);
            return {a: data_1, b: data_2}
        } else {
            return developers
        }
    }
    let dev_length = developer_response()
    if (props.project.length === 0) {
        return <NotFound/>
    }
    return (
        <Box sx={{width: "100%", minHeight: 600}}>
            {props.delete_project_success ?
                <SuccessDeletelAlert/>
                :
                <Grid spacing={1} padding={1} container justifyContent="center" alignItems="top">
                    <Grid item xs={12} md={6}>
                        <Card id={proj.bg_card_false}>
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                    <h2>{props.project.title}</h2>
                                    <hr/>
                                </Grid>
                                <Grid item xs={12}>
                                    <h3>Supervisor: {props.project.supervisor}</h3>
                                </Grid>
                                <Grid spacing={2} container direction="row" justifyContent={"center"}>
                                    <Grid item sm={6} xs={"auto"}>
                                        <Grid item xs={"auto"}><strong> Start:</strong> {props.project.start}</Grid>
                                    </Grid>
                                    <Grid item sm={6} xs={"auto"}>
                                        <Grid item xs={"auto"}><strong> End:</strong> {props.project.end}</Grid>
                                    </Grid>

                                </Grid>

                                <Grid item xs={12}>
                                    <Divider>Description</Divider>
                                </Grid>

                                <Grid item sm={12} xs={"auto"}>
                                    <CardContent>
                                        <Typography paragraph variant="body2">
                                            {props.project.description}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider>Developers</Divider>
                                </Grid>
                                {developers.length > 25 ?
                                    <Grid item sm={12} xs={12}>
                                        <CardContent>
                                            {dev_length.a}
                                        </CardContent>
                                        <CardContent>
                                            {dev_length.b}
                                        </CardContent>
                                    </Grid>

                                    :
                                    <Grid item sm={12} xs={12}>
                                        <CardContent>
                                            {dev_length}
                                        </CardContent>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <Divider>Tasks</Divider>
                                    <ModalProps title={'Update task'} open={openEdit} onClose={CloseEditTask}
                                                Components_child={<UpdateTask project={props.project.title}/>}
                                                onClick={CloseEditTask}/>
                                    <ModalProps title={'Add task'} open={open} onClose={CloseAddTask}
                                                Components_child={<CreateTask project={props.project.title}/>}
                                                onClick={CloseAddTask}/>
                                    <ModalProps title={'Update Project'} open={openUpdateProject} onClose={CloseUpdate}
                                                Components_child={<UpdateProject superv={props.project.supervisor}
                                                                                 tit={props.project.title}
                                                                                 star={props.project.start}
                                                                                 en={props.project.end}
                                                                                 develop={props.project.developers}
                                                                                 desc={props.project.description}
                                                                                 id={id}/>}
                                                onClick={CloseUpdate}/>
                                </Grid>
                                <Grid padding={1} item xs={12}>
                                    <Button onClick={OpenAddTask} color={'secondary'} variant="outlined"><AddIcon/></Button>
                                </Grid>
                                <Grid justifyContent={"start"} container>
                                    {!props.tasks ?
                                        <List dense={true}>
                                            <ListItemText>Not have Tasks</ListItemText>
                                        </List>
                                        :
                                        props.tasks.map(u =>
                                            <Grid key={u.id} item xs={12} md={6} lg={4}>
                                                <Grid padding={1} container justifyContent={'space-between'}>
                                                    <Grid item>
                                                        <ListItemText><CheckedTitleText done={u.done}
                                                                                        title={u.title_task}/></ListItemText>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={() => Delete_task(u.id)} edge="end"
                                                                    aria-label="delete">
                                                            <DeleteOutlineOutlinedIcon color={'error'}/></IconButton>
                                                        <IconButton
                                                            onClick={() => OpenEditTask(u.id, u.title_task)}
                                                            edge="end" aria-label="update">
                                                            <EditOutlinedIcon color={'secondary'}/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>)
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid padding={1} justifyContent={'center'} container>
                                    <Grid padding={1} item>
                                        <Button variant={'outlined'} onClick={() => Delete_projects(id)}
                                                color={"error"}>Remove
                                            <DeleteForeverOutlinedIcon sx={{fontSize: 30}}/></Button>
                                    </Grid>
                                    <Grid item padding={1}>
                                        <Button onClick={OpenUpdate} variant={'outlined'}
                                                color={"secondary"}>Update<EditOutlinedIcon
                                            sx={{fontSize: 30}}/></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <Comments CommentCreate={props.CommentCreate}
                                      CommentDelete={props.CommentDelete}
                                      update_comment_success={props.update_comment_success}
                                      delete_comment_success={props.delete_comment_success}
                                      create_comment_success={props.create_comment_success}
                                      comments={props.comments} id_project={id}
                                      project={props.project.title}
                                      currentUserName={props.currentUserName}/>
                        </Card>
                    </Grid>

                </Grid>

            }
        </Box>
    );
};

const mapStateToProps = (state) => ({
        create_task_success: state.task.create_task_success,
        project: state.project.project,
        tasks: state.project.project.task,
        update_task_success: state.task.update_task_success,
        update_project_success: state.project.update_project_success,
        project_set_success: state.project.project_set_success,
        delete_task_success: state.task.delete_task_success,
        delete_project_success: state.project.delete_project_success,
        comments: state.comment.comments,
        update_comment_success: state.comment.update_comment_success,
        delete_comment_success: state.comment.delete_comment_success,
        create_comment_success: state.comment.create_comment_success
    }
)

export default compose(
    connect(mapStateToProps,
        {
            GetOneProject, ProjectDelete, TaskDelete,
            CommentCreate, CommentDelete, GetAllComments
        }
    ))(Project)