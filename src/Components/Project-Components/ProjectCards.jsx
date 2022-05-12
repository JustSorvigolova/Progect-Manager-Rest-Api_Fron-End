import React from 'react';
import {Card, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import project_card from './ProjectCreate.module.css'
import {Link} from "react-router-dom";

function CircularProgressWithLabel(props) {
    let color_circle = props.status ? project_card.color_circle_true : project_card.color_circle_false
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress id={color_circle} size={60} color={"secondary"} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export const ProjectCards = (props) => {
    let bg_card = props.status ? project_card.bg_card_true : project_card.bg_card_false
    let status = props.status ? "Completed" : "Uncompleted"
    let tasks = props.task.map(t => {
        if (t.project === props.title && t.done === true) {
            return 1
        } else {
            return 0
        }
    })

    console.log(props.task)
    let task_sum = tasks.reduce(function (sum, elem) {
        return sum + elem
    }, 0)

    let procent_func = (a, b) => {
        if (a && b !== null) {
            let d = a / b
            return d * 100
        } else {
            return 0
        }
    }
    let procent = props.status ? 100 : procent_func(task_sum, tasks.length)


    return (
        <Box sx={{minWidth: 340}} padding={2}>
            <Link className={project_card.link_underline_none} to={"/project/" + props.id}>
                <Card id={bg_card}>
                    <Typography component="span"  gutterBottom>
                        <h1>{props.title}</h1>
                    </Typography>
                    <Typography component="span">
                        <Grid container justifyContent={"space-around"}>
                            <Grid item xs={"auto"}><strong> Start:</strong> {props.start}</Grid>
                            <Grid item xs={"auto"}><strong> End:</strong> {props.end}</Grid>
                        </Grid>
                    </Typography>
                    <Typography component="span">
                        <Grid container justifyContent={"space-around"}>
                            <Grid item xs={"auto"}><h3 id={bg_card}>Supervisor: {props.supervisor}</h3></Grid>
                        </Grid>
                    </Typography>
                    <Typography component="span" variant="body2">
                        <CircularProgressWithLabel status={props.status} value={procent}/>
                    </Typography>
                    <Typography component="span" variant="body1">
                        <Grid container>
                            <Grid item xs={11}> <strong> Status:</strong> {status}</Grid>
                        </Grid>
                    </Typography>
                </Card>
            </Link>
        </Box>

    )
}

