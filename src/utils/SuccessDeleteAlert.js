import React from 'react';
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle} from "@mui/material";
import Box from "@mui/material/Box";
import success from './SuccessfullAlert.module.css'
import {Tick} from "./Tick";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

export const SuccessDeletelAlert = () => {
     return (
         <Grid container justifyContent="center">
        <Grid item xs={6} md={8}>
    <Box  alignItems="center"   sx={{
        width: "100%",
        height: 500}}>
    <Alert className={success.lol}  severity="success">
        <AlertTitle > Success  <strong> You has Deleted <Tick/> seconds ago </strong> </AlertTitle>
        Project has been Deleted —<strong><Button color={"secondary"} variant={"outlined"}>Go back</Button>
    <Navigate to="/"  />
    </strong>
    </Alert>
           </Box>
  </Grid>
    </Grid>

    )
}




