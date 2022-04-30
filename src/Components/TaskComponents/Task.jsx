import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {GetOneTask} from "../../Reducers/taskReducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";


const Task = ({GetOneTask,task}) => {
    let {id} = useParams()

    useEffect(()=>{
        GetOneTask(id)
    },[task.length])

    return (
        <section className={'task'}>
            {task.title_task}
        </section>
    );
};

let mapStateToProps = (state) => ({
    task: state.task.task,
})

export default compose(
    connect(mapStateToProps, {GetOneTask}))(Task);