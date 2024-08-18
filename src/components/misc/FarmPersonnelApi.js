import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const FarmPersonnelApi = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
  
}



function getAllEmployees(user) {
  return instance.get('/kbf/api/1.0/emp',{
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createEmployee(user, emp) {
  return instance.post('/kbf/api/1.0/emp', emp, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function updateEmployee(user, empId,emp) {
  return instance.put(`/kbf/api/1.0/emp/${empId}`, emp, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function deleteEmployee(user, empId) {
  return instance.delete(`/kbf/api/1.0/emp/${empId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getAllTasks(user) {
  return instance.get('/kbf/api/1.0/task',{
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function createTask(user, task) {
  return instance.post('/kbf/api/1.0/task', task, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function updateTask(user, taskId,task) {
  return instance.put(`/kbf/api/1.0/task/${taskId}`, task, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function deleteTask(user, taskId) {
  return instance.delete(`/kbf/api/1.0/task/${taskId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}