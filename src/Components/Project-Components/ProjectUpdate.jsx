import React, {useEffect} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {GetOneProject, ProjectUpdate} from "../../Reducers/projectReducer";
import "react-widgets/styles.css";
import {renderMultiselect, renderTextArea} from "./ProjectsCreate";
import {useParams} from "react-router-dom";
import {Get_Users} from "../../Reducers/Auth-Reducer/authReducer";
import {compose} from "redux";


const UpdateProjectForm = (props) => {
        return (
         <form  onSubmit={props.handleSubmit}>
        <div><Field  name="start"  component="input"   type="date"/></div>
        <div><Field name="end"  component="input" type='date'/></div>
        <div>developers<Field  name="developers" component={renderMultiselect}  data={props.data} /></div>
        <div>supervisor<Field  name="supervisor"  type={'text'} component="input"/></div>
        <div>title<Field name="title" placeholder={props.place.title}   component="input"  type='text'/></div>
         <div>status<Field  name="status"  component="input" type={'checkbox'}/></div>
        <div><Field  name="description" placeholder={props.place.description}  component={renderTextArea}/></div>
          <div>
              <section>
       <button type="submit"  disabled={props.pristine || props.submitting}>
          Update
        </button>
        <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
          Clear
        </button>
           </section>
          </div>
        </form>
 )
}

const UpdateProjectFormReduxForm = reduxForm({
    form: 'updateProject'
})(UpdateProjectForm)


const UpdateProject= (props) => {
 useEffect(()=>{
        props.Get_Users()
    },[props.users.length])

     useEffect(()=>{
        props.GetOneProject(id)
    },[props.project.length])

    const {id} = useParams()

    const onSubmit = (formData) =>{
        props.ProjectUpdate(id,formData)
        }
    let username = props.users.map(u=>u.username)
        return(
           <div>
            <h1>Project Update</h1>
            <UpdateProjectFormReduxForm place={props.project} data={username}   onSubmit={onSubmit}/>
           </div>
    )
}

const mapStateToProps =(state)=>({
    project: state.project.project,
    users :state.auth.users,
})


export default compose(
    connect(mapStateToProps,{GetOneProject,ProjectUpdate,Get_Users}))(UpdateProject);