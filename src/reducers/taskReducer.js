import moment from 'moment';
import { FETCH_TASKS, UPDATE_TASK } from '../actions/index';

function sortTasks(tasks) {
    // format date and add "isOverdue" attribute
    // note: if this were for a larger project, I would probably break this functionality out into multiple
    // utility functions for readability: formatTaskDates, setTaskOverdueStatus, orderTasks
    for (let task of tasks) {
        task.isOverdue = false;
        if (task.dueDate) {
            // format date to readable format
            task.dueDate = moment(task.dueDate).format('MM/DD/YYYY');

            //check if it is overdue, and if so, set as 'isOverdue'
            const today_formatted = moment().format('MM/DD/YYYY');
            const today = moment(today_formatted);
            const dueDate = task.dueDate;
            if (today.isAfter(dueDate) && !task.isComplete) {
                task.isOverdue = true;
            }

        }
    }
    // Ordering tasks: 1st incomplete tasks in order of due date, last completed
    const completed_tasks = [];
    const incomplete_tasks_without_due_dates = [];
    const incomplete_tasks = [];
    for (let task of tasks) {
        if (task.isComplete) {
            completed_tasks.push(task)
        } else if (!task.dueDate) {
            incomplete_tasks_without_due_dates.push(task)
        } else
        {
            incomplete_tasks.push(task)
        }
    }

    function sortChronologically(arr) {
        var tasksSorted = arr.sort(function(a, b) {
            var keyA = new Date(a.dueDate),
                keyB = new Date(b.dueDate);
            // Compare the 2 dates
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });
        return tasksSorted;
    }
    const sortedIncompleteTasks = sortChronologically(incomplete_tasks)

    return incomplete_tasks.concat(incomplete_tasks_without_due_dates, completed_tasks)
}

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_TASKS:
            const tasks = action.payload.data;
            let sorted_tasks = [];
            if (tasks !== undefined) {

                sorted_tasks = sortTasks(tasks)
            }

            return sorted_tasks;

        case UPDATE_TASK:
            const updated_task_id = action.meta.task_id;

            let new_state = [];
            for (let task of state) {
                if (task.id !== updated_task_id) {
                    new_state.push(task)
                } else {
                    task.isComplete = !task.isComplete;
                    new_state.push(task)
                }
            }
            return sortTasks(new_state);
        default:
            return state;
    }
}
