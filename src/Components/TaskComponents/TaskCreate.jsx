import React, {useEffect} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {TaskCreate} from "../../Reducers/taskReducer";
import {GetAllProject} from "../../Reducers/projectReducer";
import {compose} from "redux";
import Grid from "@mui/material/Grid";
import {renderText} from "../Project-Components/ProjectsCreate";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Button from "@mui/material/Button";
import {SuccessTaskCreateAlert} from "../../utils/SuccessTaskCreateAlert";

const CreateTaskForm = (props) => {
        return (
         <form onSubmit={props.handleSubmit}>
          <Grid padding={1} spacing={2} container justifyContent="space-around" alignItems="center" direction="column">
              <Grid item>
                     <Field name="title_task" component={renderText} type="text"/>
              </Grid>
         <Grid item>
      <Button  color="secondary" size="large" type="submit" disabled={props.pristine || props.submitting}
                            variant="contained"><AddSharpIcon/></Button>
                        </Grid>
                  </Grid>
        </form>
 )
}

const CreateTaskFormReduxForm = reduxForm({
    form: 'createTask'
})(CreateTaskForm)



const CreateTask= (props) => {
    useEffect(()=>{
        props.GetAllProject()
    },[props.projects.length])
    useEffect(()=>{
        props.GetAllProject()
    },[props.create_task_success])

    const onSubmit = (formData) =>{
        props.TaskCreate({title_task: formData.title_task, project: props.project})
        }
        return(
            <>
            { !props.create_task_success ?
            <CreateTaskFormReduxForm onSubmit={onSubmit}/>
                    :
                    <SuccessTaskCreateAlert/>
            }
         </>

    )
}

const mapStateToProps =(state)=>({
        users :state.auth.users,
        projects: state.project.projects,
        create_task_success: state.task.create_task_success
})

export default compose(connect(mapStateToProps,{TaskCreate,GetAllProject}))(CreateTask);