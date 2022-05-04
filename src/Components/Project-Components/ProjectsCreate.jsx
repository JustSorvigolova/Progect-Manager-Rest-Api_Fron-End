import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {ProjectCreate} from "../../Reducers/projectReducer";
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";
import {Get_Users} from "../../Reducers/Auth-Reducer/authReducer";
import {compose} from "redux";
import {TextareaAutosize, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DatePicker from "react-widgets/DatePicker";
import DropdownList from "react-widgets/DropdownList";
import Button from "@mui/material/Button";
import {DateFormats} from "../../utils/DateFormats";
import {SuccessfullAlert} from "../../utils/SuccessfullAlert";
import project_create from './ProjectCreate.module.css'
import AddSharpIcon from '@mui/icons-material/AddSharp';

export const renderTextArea = ({input}) => {
    return (<TextareaAutosize {...input}
                              placeholder="description"
                              style={{width: 250, height: 150}}
                              color="secondary"

    />)
}

export const renderText = ({input,value}) => {
    return (

        <TextField color="secondary" {...input} rows="10" cols="40" label="Title" value={value}
                   variant="outlined"/>

    )
}

export const renderMultiselect = ({input, data, valuefield, textField}) => {
    return (<Box sx={{
        width: 300,
    }}>
        <Multiselect {...input}
                     onBlur={() => input.onBlur()}
                     value={input.value || []}
                     data={data}
                     valuefield={valuefield}
                     textField={textField}
        /></Box>)

}

export const renderDatepicker = ({input, onChange, value}) => {

    return (

        <DatePicker
            {...input}
            onChange={onChange}
            value={value}
        />
    )
}

export const renderSupervisor = ({name, data, textField, valuefield, input}) => {
    return (<Box sx={{
        width: 250,
    }}>
        <DropdownList  {...input}
                       onBlur={() => input.onBlur(input.value)}
                       data={data}
                       textField={textField}
                       name={name}
                       onChange={input.onChange}
                       value={input.value}
                       valuefield={valuefield}
        />
    </Box>)
}
const CreateProjectForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <Box className={project_create.bg_project_create} sx={{width: 600, height: 600}}>
            <h1 className={project_create.bg_project_color}>Create Project</h1>
            <Grid container justifyContent="space-between" alignItems="center" direction="column">
                <Grid container spacing={2} justifyContent={"center"}>
                    <Grid item sm={4} xs={"auto"} lg={2}>
                        <h2 className={project_create.bg_project_color}>Start Project</h2>
                    </Grid>
                    <Grid item sm={6} xs={"auto"} lg={3}>
                        <Field defaultValue={'lol'} name="title" component={renderText} type='text'/>
                    </Grid>
                    <Grid item xs={4} lg={2}>
                        <h2 className={project_create.bg_project_color}>End Project</h2>
                    </Grid>
                </Grid>

                <Grid spacing={2} container direction="row" justifyContent={"center"}>
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="start" component={renderDatepicker}/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="end" component={renderDatepicker}/>
                    </Grid>
                </Grid>
                <Grid item xs={4} lg={2}>
                    <h2/>
                </Grid>
                <Grid spacing={3} container justifyContent="space-between" alignItems="center" direction="column">
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="supervisor" textField={"username"} data={props.data}
                               component={renderSupervisor}/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="developers" component={renderMultiselect} data={props.data}/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field id="outlined-basic" label="Outlined" variant="outlined" name="description"
                               type={'textarea'} component={renderTextArea}/>
                    </Grid>
                    <Button color="secondary" size="large" type="submit" disabled={props.pristine || props.submitting}
                            variant="contained"><AddSharpIcon/></Button>
                </Grid>

            </Grid>
        </Box>
    </form>)
}

const CreateProjectFormReduxForm = reduxForm({
    form: 'createProject'
})(CreateProjectForm)


const CreateProject = (props) => {
    useEffect(() => {
        props.Get_Users()
    }, [!props.users])

    const onSubmit = (formData) => {
        let start = DateFormats(formData.start)
        let end = DateFormats(formData.end)
        props.ProjectCreate({
            start: start,
            end: end,
            description: formData.description,
            title: formData.title,
            supervisor: formData.supervisor,
            developers: formData.developers
        })
    }
    let username = props.users.map(u => u.username)
    return (
        <Grid container display={'flex'} justifyContent={'center'}>
            {props.create_project_success ? <SuccessfullAlert Continue={"Create"} Action={"Created"} link={"/"} text={"Project"}/> :
                <CreateProjectFormReduxForm  onSubmit={onSubmit} data={username}/>
            }
        </Grid>)
}

const mapStateToProps = (state) => ({
    users: state.auth.users,
    create_project_success: state.project.create_project_success
})

export default compose(connect(mapStateToProps, {ProjectCreate, Get_Users}))(CreateProject);