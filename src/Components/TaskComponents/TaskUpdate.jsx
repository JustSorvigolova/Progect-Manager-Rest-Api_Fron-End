import React from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {TaskUpdate} from "../../Reducers/taskReducer";
import {GetOneProject} from "../../Reducers/projectReducer";
import {compose} from "redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {SuccessTaskUpdateAlert} from "../../utils/SuccessTaskUpdateAlert";

const renderTextUpdate = ({input,value}) => {
    return (
        <TextField value={value} color="secondary" {...input} rows="10" cols="40" label="Title"
                   variant="outlined"/>

    )
}

export const renderCheckbox = ({ input, label}) => (
    <FormControlLabel
      control={
        <Checkbox color={'secondary'} checked={!!input.value} onChange={input.onChange}/>}
      label={label}
    />
)
const UpdateTaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
               <Grid padding={1} spacing={2} container justifyContent="space-around" alignItems="center" direction="column">
                   <Grid item>
                       <Field name="title_task"   component={renderTextUpdate} type="text"/>
                   </Grid>
                   <Grid item>
                       <Field name="done" label={'Done'}  component={renderCheckbox} type={'checkbox'}/>
                   </Grid>
                   <Grid item>
              <Button  color="secondary" size="large" type="submit" disabled={props.pristine || props.submitting}
                            variant="contained"><DoneOutlineOutlinedIcon/></Button>
                   </Grid>
               </Grid>
        </form>
    )
}

const UpdateTaskFormReduxForm = reduxForm({
    form: 'UpdateTask'
})(UpdateTaskForm)


const UpdateTask = (props) => {
    let id_task = localStorage.getItem('id')
    const onSubmit = (formData) => {
        let title_task = formData.title_task ? formData.title_task : localStorage.getItem('title_task')
        props.TaskUpdate(id_task,{title_task: title_task ,done: formData.done, project: props.project})
    }
    return (
        <>
            {!props.update_task_success ?
                 <UpdateTaskFormReduxForm onSubmit={onSubmit}/>
                :
             <SuccessTaskUpdateAlert/>
            }

        </>
    )
}

const mapStateToProps = (state) => ({
    users: state.auth.users,
    projects: state.project.projects,
    update_task_success: state.task.update_task_success
})

export default compose(connect(mapStateToProps, {TaskUpdate, GetOneProject}))(UpdateTask);