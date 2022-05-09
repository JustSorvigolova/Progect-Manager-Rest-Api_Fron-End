import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {Field, reduxForm} from "redux-form";
import Button from "@mui/material/Button";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import {TextField} from "@mui/material";
import {CommentUpdate} from "../../Reducers/commentReducer";


const renderTextCommentUpdate = ({input, value, valuefield}) => {
    return (
        <TextField size="small" onBlur={() => input.onBlur()} valuefield={valuefield} color="secondary" {...input}
                   style={{maxWidth: 150}} label={'comment'} value={value}
                   variant="outlined"/>
    )
}
const UpdateCommentForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container justifyContent={'center'} justifyItems={'center'}>
                <Field name="text_title" component={renderTextCommentUpdate}/>
                <Button padding={1} color="secondary" size="large" type="submit"
                        disabled={props.pristine || props.submitting}
                        variant="contained"><DoneOutlineOutlinedIcon/></Button>
            </Grid>
        </form>
    )
}
const UpdateCommentFormReduxForm = reduxForm({
    form: 'updateComment'
})(UpdateCommentForm)

const UpdateComment = (props) => {
    const onSubmit = (formData) => {
        props.CommentUpdate(props.id_comment,{
            user: props.currentUserName,
            project: props.project,
            text_title: formData.text_title,
            parent: null
        })
        props.setActiveComment(null)
    }
    return (
        <>
            {!props.update_comment_success &&
            <UpdateCommentFormReduxForm   onSubmit={onSubmit}/>
            }
        </>
    );
};

export default compose(connect(null, {CommentUpdate}))(UpdateComment);
