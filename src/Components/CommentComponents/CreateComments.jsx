import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import Grid from "@mui/material/Grid";

const renderTextComment = ({input, value, valuefield}) => {
    return (

        <TextField  size="small" onBlur={() => input.onBlur()} valuefield={valuefield} color="secondary" {...input}
                   style={{maxWidth: 250}} label={'comment'} value={value}
                   variant="outlined"/>
    )
}
const CreateCommentForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container justifyContent={'center'} justifyItems={'center'}>
          <Field name="text_title"  component={renderTextComment}/>
             <Button padding={1} color="secondary" size="large" type="submit"
                            disabled={props.pristine || props.submitting}
                            variant="contained"><DoneOutlineOutlinedIcon/></Button>
                </Grid>
        </form>
    )
}

const CreateCommentFormReduxForm = reduxForm({
    form: 'createComment'
})(CreateCommentForm)


const CreateComment = (props) => {
    const onSubmit = (formData) => {
        props.addComment({user: props.user, project: props.project, text_title: formData.text_title, parent: null})
    }
    return (
        <>
            {!props.create_comment_success &&
                 <CreateCommentFormReduxForm  onSubmit={onSubmit}/>
            }
        </>
    )
}
const mapStateToProps = (state) => ({
    create_comment_success: state.comment.create_comment_success,
})
export default compose(connect(mapStateToProps, null))(CreateComment);