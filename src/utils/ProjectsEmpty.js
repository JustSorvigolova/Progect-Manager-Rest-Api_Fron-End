import React from 'react';
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle} from "@mui/material";
import Box from "@mui/material/Box";
import success from './SuccessfullAlert.module.css'
import {Tick} from "./Tick";



export const ProjectsEmpty = () => {
     return (
         <Grid container justifyContent="center">
        <Grid item xs={6} md={8}>
    <Box  alignItems="center"   sx={{
        width: "100%",
        height: 500}}>
    <Alert className={success.lol}>
        <AlertTitle> <h3>Welcome to Project Manager</h3><strong> You are here <Tick/> seconds </strong> </AlertTitle>
        <strong>
    </strong>
    </Alert>
           </Box>
  </Grid>
    </Grid>

    )
}




