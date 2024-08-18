import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const TransactionsApi = {
  createExpense,
  updateExpense,
  deleteExpense,
  createIncome,
  updateIncome,
  deleteIncome,
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment
 
}




function createExpense(user, expense) {
  return instance.post('/kbf/api/1.0/transactions/expense', expense, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}



function updateExpense(user, expenseId,expense) {
  return instance.put(`/kbf/api/1.0/transactions/expense/${expenseId}`, expense, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function deleteExpense(user, expenseId) {
  return instance.delete(`/kbf/api/1.0/transactions/expense/${expenseId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function updateIncome(user, incomeId,income) {
  return instance.put(`/kbf/api/1.0/transactions/sales/${incomeId}`, income, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function deleteIncome(user, id) {
  return instance.delete(`/kbf/api/1.0/transactions/income/${id}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createIncome(user, income) {
  return instance.post('/kbf/api/1.0/transactions/sales', income, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getInvestments(user) {
  return instance.get('/kbf/api/1.0/transactions/invest',{
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createInvestment(user, investment) {
  return instance.post('/kbf/api/1.0/transactions/invest', investment, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function updateInvestment(user, investmentId,investment) {
  return instance.put(`/kbf/api/1.0/transactions/invest/${investmentId}`, investment, 
  {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}
function deleteInvestment(user, investmentId) {
  return instance.delete(`/kbf/api/1.0/transactions/invest/${investmentId}`, {
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