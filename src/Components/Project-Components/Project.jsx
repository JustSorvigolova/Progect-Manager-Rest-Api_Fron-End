import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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

import {
    Card, CardContent,
    Divider,
    IconButton,
    List,
    ListItemText,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {SuccessDeletelAlert} from "../../utils/SuccessDeleteAlert";
import CreateTask from "../TaskComponents/TaskCreate";
import {ModalProps} from "../../utils/Modal";
import UpdateTask from "../TaskComponents/TaskUpdate";
import {CheckedTitleText} from "../../utils/CheckedTitleText";


const Project = (props) => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const OpenAddTask = () => setOpen(true);
    const CloseAddTask = () => setOpen(false);
    const OpenEditTask = (id, title_task, done) => {
        setOpenEdit(true);
        localStorage.setItem('id', id)
        localStorage.setItem('title_task', title_task)
    }
    const CloseEditTask = () => setOpenEdit(false);
    const {id} = useParams()
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.delete_task_success])
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.create_task_success])
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.update_task_success])

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

    return (
        <Box sx={{width: "100%", height: 600}}>
            {props.delete_project_success ?
                <SuccessDeletelAlert/>
                :
                <Grid padding={2} container justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Card>
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                    <h1>{props.project.title}</h1>
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

                                <Grid item sm={11} xs={"auto"}>
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
                                </Grid>
                                <Grid padding={1} item xs={12}>
                                    <Button onClick={OpenAddTask} variant="outlined"><AddIcon/></Button>
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
                                                            <DeleteOutlineOutlinedIcon/></IconButton>
                                                        <IconButton
                                                            onClick={() => OpenEditTask(u.id, u.title_task)}
                                                            edge="end" aria-label="update">
                                                            <EditOutlinedIcon/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>)
                                    }

                                </Grid>

                                <Grid padding={1} justifyContent={'center'} container>
                                    <Grid padding={1} item>
                                        <Button variant={'outlined'} onClick={() => Delete_projects(id)}
                                                color={"error"}>Remove
                                            <DeleteForeverOutlinedIcon sx={{ fontSize: 30 }}/></Button>
                                    </Grid>
                                    <Grid item padding={1}>
                                        <Button variant={'outlined'}
                                                color={"secondary"}>Update<EditOutlinedIcon
                                            sx={{ fontSize: 30 }}/></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            <Card>

                            </Card>
                        </Grid>
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
        project_set_success: state.project.project_set_success,
        delete_task_success: state.task.delete_task_success,
        delete_project_success: state.project.delete_project_success
    }
)

export default compose(
    connect(mapStateToProps,
        {
            GetOneProject, ProjectDelete, TaskDelete
        }
    ))(Project)

//
//     {/*    <div>*/
// }
// {/*        <button onClick={Delete_projects}>delete</button>*/
// }
// {/*        <section>*/
// }
// {/*            <Link to={'/project/update/'+id}><button>Update</button></Link>*/
// }
// {/* </section>*/
// }
// {/*        <section>*/
//
//
//

// {/*        </section>*/
// }

//
// {/*        </div>*/