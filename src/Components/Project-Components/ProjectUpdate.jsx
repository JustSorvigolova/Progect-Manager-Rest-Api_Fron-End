import React, {useEffect} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {GetOneProject, ProjectUpdate} from "../../Reducers/projectReducer";
import "react-widgets/styles.css";
import {renderDatepicker, renderMultiselect, renderSupervisor, renderText, renderTextArea} from "./ProjectsCreate";
import {Get_Users} from "../../Reducers/authReducer";
import {compose} from "redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import {DateFormats} from "../../utils/DateFormats";
import {renderCheckbox} from "../TaskComponents/TaskUpdate";
import {SuccessfullAlert} from "../../utils/SuccessfullAlert";

const UpdateProjectForm = (props) => {
return (<form onSubmit={props.handleSubmit}>
            <Grid spacing={1} container justifyContent="center" alignItems="center" direction="column">
                    <Grid item sm={12} xs={"auto"} lg={12}>
                        <Field  name="title" component={renderText} type='text'/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field id={'start'} name="start" component={renderDatepicker}/>
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
                        <Field name="status" label={'status'} component={renderCheckbox} type={'checkbox'}/>
                    </Grid>
                    <Grid item sm={4} xs={"auto"}>
                        <Field id="outlined-basic" label="Outlined" variant="outlined" name="description"
                               type={'textarea'} component={renderTextArea}/>
                    </Grid>
                <Grid container padding={1} justifyContent={"space-evenly"}>
                    <Button padding={1} color="secondary" size="large" type="submit"
                            disabled={props.pristine || props.submitting}
                            variant="contained"><DoneOutlineOutlinedIcon/></Button>
            </Grid>
            </Grid>
        </form>
    )
}

const UpdateProjectFormReduxForm = reduxForm({
    form: 'updateProject'
})(UpdateProjectForm)


const UpdateProject = ({
                           id,
                           users,
                           Get_Users,
                           ProjectUpdate,
                           star,
                           en,
                           superv,
                           tit,
                           develop,
                           desc,
                           update_project_success
                       }) => {
    useEffect(() => {
        Get_Users()
    }, [users.length])

    let username = users.map(u => u.username)
    const onSubmit = (formData) => {
        let start = formData.start ? DateFormats(formData.start) : star
        let end = formData.end ? DateFormats(formData.end) : en
        let supervisor = formData.supervisor ? formData.supervisor : superv
        let title = formData.title ? formData.title : tit
        let developers = [formData.developers].length === [develop].length ? develop : formData.developers
        let description = formData.description ? formData.description : desc
        ProjectUpdate(id,
            {
                start: start,
                end: end,
                status: formData.status,
                description: description,
                title: title,
                supervisor: supervisor,
                developers: developers
            }
        )
    }
    return (
        <Grid container display={'flex'} justifyContent={'center'}>
            { !update_project_success?
                <UpdateProjectFormReduxForm data={username} onSubmit={onSubmit}/>
                :
                <SuccessfullAlert text={'Project'} Continue={'update'} link={'/'} Action={'Updated'}/>
            }

       </Grid>
    )
}

const mapStateToProps = (state) => ({
    users: state.auth.users,
    update_project_success: state.project.update_project_success
})
export default compose(
    connect(mapStateToProps, {GetOneProject, ProjectUpdate, Get_Users}))(UpdateProject);