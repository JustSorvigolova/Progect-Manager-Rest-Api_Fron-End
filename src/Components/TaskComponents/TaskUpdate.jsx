import React, {useEffect} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {TaskUpdate} from "../../Reducers/taskReducer";
import {GetAllProject} from "../../Reducers/projectReducer";
import {Link, useParams} from "react-router-dom";
import {compose} from "redux";


const UpdateTaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>title_task<Field name="title_task" component="input" type="text"/></div>
            <div>project<Field name="project" component={'input'}/></div>
            <div>done<Field name="done" component={'input'} type={'checkbox'}/></div>
            <div>
                <button>update</button>
            </div>
        </form>
    )
}

const UpdateTaskFormReduxForm = reduxForm({
    form: 'UpdateTask'
})(UpdateTaskForm)


const Updatetask = (props) => {

    const {id} = useParams()

    useEffect(() => {
        props.GetAllProject()
    }, [props.projects.length])


    const onSubmit = (formData) => {
        props.TaskUpdate(id, formData)
    }
    if (props.update_task_success) {
        return (
            <>
                <div>Updated</div>
                <Link to={'/tasks'}>Tasks</Link>
            </>
        )
    }
    return (
        <div>
            <h1>TaskUpdate</h1>
            <UpdateTaskFormReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.auth.users,
    projects: state.project.projects,
    update_task_success: state.task.update_task_success
})

export default compose(connect(mapStateToProps, {TaskUpdate, GetAllProject}))(Updatetask);