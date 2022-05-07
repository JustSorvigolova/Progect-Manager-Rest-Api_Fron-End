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
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

export const renderTextArea = ({input}) => {
    return (<TextareaAutosize {...input}
                              placeholder="description"
                              style={{minWidth: 300, height: 150}}
                              color="secondary"

    />)
}

export const renderText = ({input,value,valuefield}) => {
    return (

        <TextField onBlur={() => input.onBlur()} valuefield={valuefield} color="secondary" {...input} style={{minWidth:260}} label="Title" value={value}
                   variant="outlined"/>

    )
}

export const renderMultiselect = ({input, data, valuefield, textField}) => {
    return (<Box sx={{
        width: 400,
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
        width: 260,
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
            <Grid spacing={1} container justifyContent="center" alignItems="center" direction="column">
                    <Grid item sm={12} xs={"auto"} lg={12}>
                        <Field name="title" component={renderText} type='text'/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="start" component={renderDatepicker}/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field name="end" component={renderDatepicker}/>
                    </Grid>
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
                     <Grid container padding={1} justifyContent={"space-evenly"}>
                        <Button padding={1} color="success" size="large" type="submit" disabled={props.pristine || props.submitting}
                            variant="contained"><DoneOutlineOutlinedIcon/></Button>
                    </Grid>

            </Grid>
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