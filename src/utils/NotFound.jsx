import React from 'react';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Link} from "react-router-dom";
import notfound from './preloader.module.css'

export const NotFound = () => (
    <div className={notfound.notfound}>
         <Container maxWidth="sm">
                    <Alert severity="error">
        <AlertTitle>Page Not Found </AlertTitle>
                        This is page not found >>>   <Link to={'/'}> Go Back</Link>
      </Alert>
                    </Container>
    </div>
);

