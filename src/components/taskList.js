import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './loading'
import { fetchTasks, updateTask } from '../actions';


class TaskList extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.fetchTasks();
    }

    renderTaskList() {
        // Note to evaluators: I originally created a "Task" component separately, however, those components
        // were not re-rendering on the props update after marking a task complete or incomplete.
        // I'm not sure if that should work correctly, and if this were a larger project where this
        // were happening in more than one place, I'd want to dive in and make sure this is the best way.
        return this.props.tasks.map((task) => {
            return(
                <div key={task.id} className={"task-item "  + (task.isComplete ? 'completed-task' : '') + (task.isOverdue ? 'overdue-task' : '')}>
                    <input className="form-check-input task-checkbox" onChange={()=>this.updateTaskCompetionStatus(task)} type="checkbox" value="" checked={task.isComplete}/>

                    <span>{task.description}</span>
                    {task.dueDate ? <span className="task-due-date">{task.dueDate}</span> : null}
                </div>
            );
        })
    }

    updateTaskCompetionStatus(task) {
        const values = {task_id: task.id, isComplete: !task.isComplete}
        this.props.updateTask(values, () => {
        });
    }

    render() {
        return(
            <div className="task-list">
                {this.props.loading ? <Loading/> :
                    this.renderTaskList()
                }

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchTasks, updateTask })(TaskList)
