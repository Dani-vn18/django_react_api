import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

// return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
// Es lo mismo que:
// return tasksApi.get('/')

/*

Es lo mismo: 

export const getAllTasks = () => {
    return tasksApi.get('/')
}

Que:

export const getAllTasks = () => tasksApi.get('/');

*/

export const getAllTasks = () => tasksApi.get('/');

export const getTask = (id) => tasksApi.get(`/${id}/`);

export const createTask = (task) => tasksApi.post('/', task);

export const deleteTask = (id) => tasksApi.delete(`/${id}`);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
