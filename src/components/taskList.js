import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './loading'
import Task from './task';
import { fetchTasks} from '../actions';


class TaskList extends Component {
    constructor(props){
        super(props);
    }
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
        console.log(this.props)
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

export default connect(mapStateToProps, { fetchTasks })(TaskList)
