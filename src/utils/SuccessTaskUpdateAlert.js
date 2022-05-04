import React from 'react';
import Grid from "@mui/material/Grid";
import {Alert, AlertTitle} from "@mui/material";
import Box from "@mui/material/Box";
import success from './SuccessfullAlert.module.css'
import {Tick} from "./Tick";

export const SuccessTaskUpdateAlert= () => {
     return (
         <Grid container justifyContent="center">
    <Box  alignItems="center">
    <Alert className={success.lol}  severity="success">
        <AlertTitle> Success, You can edit Task after <Tick time={3}/> seconds </AlertTitle>
    </Alert>
           </Box>
    </Grid>

    )
}




