import React, {useEffect} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {TaskCreate} from "../../Reducers/taskReducer";
import {GetAllProject} from "../../Reducers/projectReducer";
import {Link} from "react-router-dom";
import {compose} from "redux";


const CreateTaskForm = (props) => {
        return (
         <form onSubmit={props.handleSubmit}>
        <div>title_task<Field name="title_task" component="input" type="text"/></div>
        <div>project<Field  name="project" component={'input'}  /></div>
          <div><button>Add</button></div>
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


    const onSubmit = (formData) =>{
        props.TaskCreate(formData)
        }
    if (props.create_task_success){
        return(
            <>
             <div>Created</div>
            <Link to={'/tasks'}>Tasks</Link>
            </>
            )
    }
        return(
           <div>
            <h1>TaskCreate</h1>
            <CreateTaskFormReduxForm onSubmit={onSubmit}/>
           </div>
    )
}

const mapStateToProps =(state)=>({
        users :state.auth.users,
        projects: state.project.projects,
        create_task_success: state.task.create_task_success
})

export default compose(connect(mapStateToProps,{TaskCreate,GetAllProject}))(CreateTask);