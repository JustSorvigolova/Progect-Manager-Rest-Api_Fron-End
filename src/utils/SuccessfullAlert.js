import React from 'react';
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle} from "@mui/material";
import Box from "@mui/material/Box";
import success from './SuccessfullAlert.module.css'
import {Link} from "react-router-dom";
import {Tick} from "./Tick";

export const SuccessfullAlert = ({text,link}) => {

     return (
         <Grid container justifyContent="center">
        <Grid item xs={6} md={8}>
    <Box  alignItems="center"   sx={{
        width: "100%",
        height: 500}}>
    <Alert className={success.lol}  severity="success">
        <AlertTitle > Success  <strong> You can Create after <Tick/> seconds</strong> </AlertTitle>
        {text} has been Created —<strong><Link to={link}>Check it out!</Link></strong>
    </Alert>
           </Box>
  </Grid>
    </Grid>

    )
}




