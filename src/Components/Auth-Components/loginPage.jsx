import {Field, reduxForm} from "redux-form";
import React from "react";
import {TextField, ThemeProvider, Typography} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {Loginization} from "../../Reducers/authReducer";


const validate = values => {
    const errors = {}
    const requiredFields = [
        'username',
        'password',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    return errors
}

let Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {new Date().getFullYear()}
        </Typography>
    );
}
const theme = createTheme();
const renderTextFieldLogin = ({
                                  label, margin, name, required, autoComplete, fullWidth, autoFocus,
                                  input,
                                  meta: {touched, invalid, error},
                                  ...custom
                              }) => (
    <TextField
        fullWidth={fullWidth}
        margin={margin}
        name={name}
        autoFocus={autoFocus}
        label={label}
        autoComplete={autoComplete}
        required={required}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}/>)
const renderTextFieldPassword = ({
                                     label, margin, name, required, type, autoComplete, fullWidth,
                                     input,
                                     meta: {touched, invalid, error},
                                     ...custom
                                 }) => (
    <TextField
        fullWidth={fullWidth}
        margin={margin}
        label={label}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box sx={{
                        marginTop: 8, display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                        <Box noValidate sx={{mt: 1}}>
                            <Field margin={"normal"} autoComplete={"login"} autoFocus={true} label={"login"}
                                    fullWidth={true} name={"username"}
                                   component={renderTextFieldLogin}/>
                            <Field margin={"normal"} autoComplete={"current-password"} fullWidth={true}
                                    placeholder={"Password"} name={"password"}
                                   component={renderTextFieldPassword} type={"password"}/>

                            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Container>
            </ThemeProvider>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
    validate
})(LoginForm)


export const Login = ({Loginization}) => {
    const onSubmit = (formData) => {
        Loginization(formData.username, formData.password)
    }
    return (
        <div>
              <LoginReduxForm onSubmit={onSubmit}/>

        </div>
    )
}
export default compose(connect(null, {Loginization}))(Login)