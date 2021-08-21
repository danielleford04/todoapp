import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTasks, updateTask} from '../actions';

class Task extends Component {
    updateTaskCompetionStatus(task) {
        const values = {task_id: task.id, isComplete: !task.isComplete}
        this.props.updateTask(values, () => {
            // this.props.fetchTasks();
        });
    }

    render() {
        const taskDetails = this.props.taskDetails;
        return(
            <div key={taskDetails.id} className={"task-item "  + (taskDetails.isComplete ? 'completed-task' : '') + (taskDetails.isOverdue ? 'overdue-task' : '')}>
                <input className="form-check-input task-checkbox" onChange={()=>this.updateTaskCompetionStatus(taskDetails)} type="checkbox" value="" checked={taskDetails.isComplete}/>

                <span>{taskDetails.description}</span>
                {taskDetails.dueDate ? <span className="task-due-date">{taskDetails.dueDate}</span> : null}
            </div>
        );
    }
}

export default connect(null, { fetchTasks, updateTask })(Task)
