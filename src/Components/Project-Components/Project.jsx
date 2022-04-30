import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {GetOneProject, ProjectDelete} from "../../Reducers/projectReducer";
import {TaskDelete} from "../../Reducers/taskReducer";
import {compose} from "redux";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from "@mui/material/Box";
import {
    Card, CardContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";


const Project = (props) => {
    const {id} = useParams()
    let Delete_task = (id) => {
        props.TaskDelete(id)
    }
    useEffect(() => {
        props.GetOneProject(id)
    }, [props.delete_task_success])

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
    console.log(props.project.task)
    return (
        <Box sx={{width: "100%", height: 600}}>
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
                            </Grid>
                             {props.project.task ?
                            <Grid  justifyContent={"space-around"} container>
                                 {props.project.task.map(u =>
                                        <Grid item xs={"auto"}>
                                                    <List dense={true}>
                                                        <ListItem
                                                            secondaryAction={<IconButton edge="end" aria-label="delete">
                                                                <DeleteOutlineOutlinedIcon
                                                                    onClick={() => Delete_task(u.id)}
                                                                    key={u.id}/>
                                                            </IconButton>
                                                            }>
                                                            <ListItemText>{u.title_task}</ListItemText>{"<"}
                                                        </ListItem>
                                                    </List>

                                        </Grid>  )
                                 }

                            </Grid>
                                 :
                                 <Grid direction={'row'} container>
                                      <Grid item xs={12}>
                                        <List dense={true}>
                                            <ListItemText>Tasks Not</ListItemText>
                                        </List>
                                            </Grid>
                                 </Grid>
                            }
                             </Grid>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Grid container>
                        <Card>
                            cdcc
                        </Card>
                    </Grid>
                </Grid>

            </Grid>

        </Box>


);
};

const mapStateToProps = (state) => ({
        project: state.project.project,
        delete_task_success: state.task.delete_task_success,
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