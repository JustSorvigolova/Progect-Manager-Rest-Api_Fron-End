import React from 'react';
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle} from "@mui/material";
import Box from "@mui/material/Box";
import success from './SuccessfullAlert.module.css'
import {Link} from "react-router-dom";
import {Tick} from "./Tick";

export const SuccessfullAlert = ({text,link,Action, Continue}) => {

     return (
         <Grid container justifyContent="center">
        <Grid item xs={12}>
    <Box  alignItems="center"   sx={{
        minWidth: 400,
        minHeight: 150}}>
    <Alert className={success.lol}  severity="success">
        <AlertTitle > Success  <strong> You can {Continue} after <Tick time={6}/> seconds</strong> </AlertTitle>
        {text} has been {Action} —<strong><Link to={link}>Check it out!</Link></strong>
    </Alert>
           </Box>
  </Grid>
    </Grid>

    )
}




