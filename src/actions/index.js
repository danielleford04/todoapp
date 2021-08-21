import axios from 'axios';

const API_KEY = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';
const ROOT_URL = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io';
const config = {
    headers: {
        'X-Api-Key': API_KEY
    }
}

export const FETCH_TASKS = "FETCH_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";


export function fetchTasks() {
    const request = axios.get(`${ROOT_URL}/get`, config);

    return {
        type: FETCH_TASKS,
        payload: request
    };
}

export function updateTask(values, callback) {
    const request = axios.patch(`${ROOT_URL}/patch/${values.task_id}`, values, config)

    return {
        type: UPDATE_TASK,
        meta: { task_id: values.task_id },
        payload: request
    }
}
