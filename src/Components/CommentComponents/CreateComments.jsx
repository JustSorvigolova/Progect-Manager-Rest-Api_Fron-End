import React, {useEffect} from 'react';
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {comment, GetAllComments} from "../../Reducers/commentReducer";

const CreateCommentForm = (props) => {
        return (
         <form onSubmit={props.handleSubmit}>
        <div>parent<Field  name="parent" component={'input'}  /></div>
        <div>project<Field  name="project" component={'input'} /></div>
        <div>comment<Field  name="text_title" component="input" type="text"/></div>

          <div><button>Add</button></div>
        </form>
 )
}

const CreateCommentFormReduxForm = reduxForm({
    form: 'createComment'
})(CreateCommentForm)



const CreateTask= (props) => {
    useEffect(()=>{
        props.GetAllComments()
    },[props.projects.length])

    const onSubmit = (formData) =>{
        props.TaskCreate(formData)
        }
    if (props.create_task_success){
        return(
            <>
             <div>Created</div>
            <Link to={'/tasks'}>Tasks</Link>
                {comment}
            </>
            )
    }
        return(
           <div>
            <h1>Comments</h1>
            <CreateCommentFormReduxForm onSubmit={onSubmit}/>
           </div>
    )
}

const mapStateToProps =(state)=>({
       comment: state.comment.comment
})

export default compose(connect(mapStateToProps,{GetAllComments,GetAllProject}))(CreateTask);