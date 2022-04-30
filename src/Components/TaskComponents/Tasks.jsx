import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {GetAllTasks} from "../../Reducers/taskReducer";
import {compose} from "redux";

const Tasks = ({ tasks,GetAllTasks}) => {
    useEffect(() => {
        GetAllTasks()
    }, [tasks.length])
    return (
        <div>
            {tasks.map(u=> <div key={u.id}>{u.title_task}</div> )}

        </div>
    );
};

let mapStateToProps = (state) => ({
    tasks: state.task.tasks,
})

export default compose(connect(mapStateToProps, {GetAllTasks}))(Tasks);