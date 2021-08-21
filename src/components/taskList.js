import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './task';
import { fetchTasks } from '../actions';


class TaskList extends Component {
    componentDidMount() {
        this.props.fetchTasks();
    }

    renderTaskList() {
        return this.props.tasks.map((task) => {
            return (
                <Task taskDetails={task} key={task.id}/>
            );
        })
    }
    render() {
        return(
            <div className="task-list">
                {this.renderTaskList()}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks })(TaskList)
